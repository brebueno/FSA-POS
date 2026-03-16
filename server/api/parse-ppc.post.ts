import Anthropic from '@anthropic-ai/sdk'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.ppcBase64 && !body?.ppcText) {
    throw createError({ statusCode: 400, statusMessage: 'ppcBase64 ou ppcText é obrigatório' })
  }

  const config = useRuntimeConfig()
  const apiKey = config.anthropicApiKey

  if (!apiKey || apiKey.startsWith('sk-ant-COLOQUE')) {
    throw createError({ statusCode: 500, statusMessage: 'ANTHROPIC_API_KEY não configurada. Adicione sua chave no arquivo .env' })
  }

  const client = new Anthropic({ apiKey })

  const jsonSchema = `{
  "nome": "Nome completo do curso",
  "slug": "slug-em-kebab-case",
  "area": "Área (Enfermagem, Psicologia, Direito, Odontologia, Pedagogia, Administração)",
  "modalidade": ["EAD"] ou ["Híbrido"] ou ["Presencial"],
  "duracao": número de meses,
  "cargaHoraria": número de horas,
  "coordenador": "Nome do coordenador",
  "professor": "Nome do professor responsável",
  "descricao": "Descrição curta (2-3 frases)",
  "publicoAlvo": "Público-alvo do curso",
  "disciplinas": ["Disciplina 1", "Disciplina 2", ...],
  "precos": { "boleto": valor mensal, "parcelas": número, "cartao": valor cartão },
  "certificado": "Tipo de certificado"
}`

  const instruction = `Analise este PPC (Projeto Pedagógico do Curso) e extraia as informações em JSON válido.
Retorne APENAS o JSON, sem markdown, sem texto adicional.
Estrutura: ${jsonSchema}
Se algum campo não estiver disponível, use null.`

  try {
    let messageContent: Anthropic.MessageParam['content']

    if (body.ppcBase64) {
      // Send as native PDF document (Claude supports PDFs natively)
      messageContent = [
        {
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: body.ppcBase64
          }
        } as any,
        {
          type: 'text',
          text: instruction
        }
      ]
    } else {
      messageContent = `${instruction}\n\nPPC:\n${body.ppcText.slice(0, 15000)}`
    }

    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 4096,
      messages: [{ role: 'user', content: messageContent }]
    })

    const rawText = message.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { type: 'text'; text: string }).text)
      .join('')

    const cleanJson = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    let parsed: Record<string, unknown>
    try {
      parsed = JSON.parse(cleanJson)
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/)
      if (match) {
        parsed = JSON.parse(match[0])
      } else {
        throw new Error('Não foi possível extrair JSON da resposta da IA')
      }
    }

    return parsed
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    throw createError({ statusCode: 500, statusMessage: `Erro ao processar com IA: ${msg}` })
  }
})
