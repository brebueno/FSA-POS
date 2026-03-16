<template>
  <div class="dash">
    <div class="dash-header">
      <div>
        <div class="fsa-breadcrumb" style="margin-bottom:0.5rem">
          <NuxtLink to="/admin">Admin</NuxtLink>
          <span class="sep"><i class="bi bi-chevron-right"></i></span>
          <NuxtLink to="/admin/cursos">Cursos</NuxtLink>
          <span class="sep"><i class="bi bi-chevron-right"></i></span>
          <span class="current" style="color:var(--fsa-cyan)">Novo Curso</span>
        </div>
        <h1 class="dash-title">Novo Curso</h1>
      </div>
      <NuxtLink to="/admin/cursos" class="admin-btn-outline-modern">
        <i class="bi bi-arrow-left me-1"></i>Voltar
      </NuxtLink>
    </div>

    <div class="row g-4">
      <!-- PPC Upload + AI Neo -->
      <div class="col-12">
        <div class="admin-card-base p-4">
          <div class="d-flex align-items-center gap-3 mb-2">
            <div class="icon-square-neo cyan"><i class="bi bi-robot"></i></div>
            <div>
              <h5 class="fw-bold mb-1">Preenchimento com Inteligência Artificial</h5>
              <p class="text-muted-neo mb-0">Faça upload do PDF do Projeto Pedagógico (PPC) e deixe a IA extrair tudo.</p>
            </div>
          </div>

          <div
            class="upload-zone-neo mt-4"
            :class="{ 'drag-over': isDragging }"
            @click="triggerFileInput"
            @dragover.prevent="isDragging = true"
            @dragleave="isDragging = false"
            @drop.prevent="onDrop"
          >
            <div class="upload-content-box">
              <div v-if="!uploadedFile">
                <div class="upload-icon-neo"><i class="bi bi-cloud-arrow-up"></i></div>
                <div class="upload-title-neo">Arraste o PDF do PPC aqui ou clique para selecionar</div>
                <div class="upload-desc-neo">Tamanho máximo: 10MB</div>
              </div>
              <div v-else class="file-success-box">
                <div class="file-icon"><i class="bi bi-file-earmark-pdf-fill text-danger"></i></div>
                <div class="file-data">
                  <div class="f-name">{{ uploadedFile.name }}</div>
                  <div class="f-size">{{ (uploadedFile.size / 1024 / 1024).toFixed(2) }} MB</div>
                </div>
                <button type="button" class="btn-remove-file" @click.stop="uploadedFile = null">
                  <i class="bi bi-x"></i>
                </button>
              </div>
            </div>
          </div>
          <input ref="fileInput" type="file" accept=".pdf" style="display:none" @change="onFileChange" />

          <div class="d-flex gap-3 align-items-center mt-4">
            <button class="admin-btn-modern" :disabled="!uploadedFile || aiLoading" @click="analyzeWithAI" type="button">
              <i v-if="aiLoading" class="bi bi-arrow-repeat spin me-2"></i>
              <i v-else class="bi bi-magic me-2"></i>
              {{ aiLoading ? 'Analisando e Extraindo Dados...' : 'Analisar Documento' }}
            </button>
            <div v-if="aiSuccess" class="ai-status success">
              <i class="bi bi-check-circle-fill"></i> Dados preenchidos com sucesso! Verifique abaixo.
            </div>
            <div v-if="aiError" class="ai-status error">
              <i class="bi bi-exclamation-triangle-fill"></i> {{ aiError }}
            </div>
          </div>
        </div>
      </div>

      <!-- Banner Upload -->
      <div class="col-12">
        <div class="admin-card-base p-4">
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="icon-square-neo purple"><i class="bi bi-image"></i></div>
            <div>
              <h5 class="fw-bold mb-1">Mídia do Curso</h5>
              <p class="text-muted-neo mb-0">Esta imagem será o banner principal da página do curso (1200x400px).</p>
            </div>
          </div>
          
          <div class="row g-4 align-items-start">
            <div class="col-md-5">
              <div class="banner-preview" :style="form.banner ? `background-image:url('${form.banner}')` : ''" @click="triggerBannerInput">
                <div v-if="!form.banner" class="banner-placeholder">
                  <i class="bi bi-images mb-2 fs-2 text-muted"></i>
                  <span>Clique p/ enviar</span>
                </div>
                <div v-else class="banner-change-overlay">
                  <i class="bi bi-pencil me-1"></i>Alterar Imagem
                </div>
              </div>
              <input ref="bannerInput" type="file" accept="image/*" style="display:none" @change="onBannerChange" />
            </div>
            <div class="col-md-7">
              <div class="fsa-form-group">
                <label class="fsa-label">URL da Imagem Externa</label>
                <input v-model="form.banner" type="url" class="fsa-input-modern w-100" placeholder="https://exemplo.com/imagem.jpg" />
                <p class="mt-2 text-muted-neo" style="font-size:0.75rem">Use o campo acima caso a imagem já esteja hospedada online, ou faça o envio pelo quadro ao lado.</p>
              </div>
              <button v-if="form.banner" @click="form.banner = ''" class="admin-btn-outline-modern btn-sm mt-1" type="button">
                <i class="bi bi-trash"></i> Remover Imagem
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Form -->
      <div class="col-lg-8">
        <div class="admin-card-base p-4">
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="icon-square-neo primary"><i class="bi bi-pencil-square"></i></div>
            <h5 class="fw-bold mb-0">Informações Básicas</h5>
          </div>
          
          <div class="row g-4">
            <div class="col-md-7">
              <label class="fsa-label">Nome do curso *</label>
              <input v-model="form.name" type="text" class="fsa-input-modern w-100" placeholder="Ex: Neuropsicologia Aplicada" />
            </div>
            <div class="col-md-5">
              <label class="fsa-label">Tipo de Curso</label>
              <select v-model="form.type" class="fsa-input-modern w-100 neo-select">
                <option>Especialização</option>
                <option>MBA</option>
                <option>Aperfeiçoamento</option>
              </select>
            </div>
            
            <div class="col-md-7">
              <label class="fsa-label">Slug (URL amigável)</label>
              <div class="input-group-neo">
                <span class="ig-prefix">fsa.edu.br/cursos/</span>
                <input v-model="form.slug" type="text" class="fsa-input-modern ig-input w-100" placeholder="neuropsicologia" />
              </div>
            </div>
            <div class="col-md-5">
              <label class="fsa-label">Área de Atuação</label>
              <select v-model="form.area" class="fsa-input-modern w-100 neo-select">
                <option value="">Selecione a área...</option>
                <option>Psicologia</option><option>Enfermagem</option><option>Direito</option>
                <option>Odontologia</option><option>Pedagogia</option><option>Administração</option><option>Medicina</option>
              </select>
            </div>

            <div class="col-md-12">
              <label class="fsa-label d-block mb-3">Modalidade Disponível</label>
              <div class="d-flex gap-3 flex-wrap">
                <label class="modality-check-neo" v-for="m in ['EAD','Híbrido','Presencial']" :key="m">
                  <input type="checkbox" :value="m" v-model="form.modalities" />
                  <div class="m-card">
                    <i :class="m === 'EAD' ? 'bi bi-laptop' : m === 'Híbrido' ? 'bi bi-diagram-2' : 'bi bi-building'"></i>
                    <span>{{ m }}</span>
                  </div>
                </label>
              </div>
            </div>

            <div class="col-md-6">
              <label class="fsa-label">Duração Prevista (meses)</label>
              <div class="position-relative">
                <input v-model.number="form.duration" type="number" class="fsa-input-modern w-100" placeholder="18" />
                <span class="input-suffix">Meses</span>
              </div>
            </div>
            <div class="col-md-6">
              <label class="fsa-label">Carga Horária Total (h)</label>
              <div class="position-relative">
                <input v-model.number="form.workload" type="number" class="fsa-input-modern w-100" placeholder="360" />
                <span class="input-suffix">Horas</span>
              </div>
            </div>

            <div class="col-12 mt-4 pt-4 border-top">
              <h6 class="fw-bold mb-3 text-cyan">Corpo Docente</h6>
            </div>

            <div class="col-md-6">
              <label class="fsa-label">Coordenador(a)</label>
              <input v-model="form.coordinator" type="text" class="fsa-input-modern w-100" placeholder="Nome completo" />
            </div>
            <div class="col-md-6">
              <label class="fsa-label">Professor(a) Titular</label>
              <input v-model="form.professor" type="text" class="fsa-input-modern w-100" placeholder="Nome completo" />
            </div>

            <div class="col-12 mt-4 pt-4 border-top">
              <h6 class="fw-bold mb-3 text-cyan">Conteúdo Programático</h6>
            </div>

            <div class="col-12">
              <label class="fsa-label">Resumo do Curso (Aparece nos cards)</label>
              <textarea v-model="form.description" class="fsa-input-modern w-100" rows="2" placeholder="Breve introdução..."></textarea>
            </div>
            <div class="col-12">
              <label class="fsa-label">Descrição Completa</label>
              <textarea v-model="form.about" class="fsa-input-modern w-100" rows="5" placeholder="Tudo sobre o curso..."></textarea>
            </div>
            <div class="col-12">
              <label class="fsa-label">Público-Alvo</label>
              <textarea v-model="form.target" class="fsa-input-modern w-100" rows="3" placeholder="Para quem se destina..."></textarea>
            </div>
            <div class="col-12">
              <label class="fsa-label">Grade Curricular (uma disciplina por linha)</label>
              <textarea
                :value="form.curriculum.join('\n')"
                @input="onCurriculumInput"
                class="fsa-input-modern w-100 font-monospace" rows="8"
                placeholder="Disciplina 1&#10;Disciplina 2"
              ></textarea>
              <div class="text-end text-muted-neo mt-1" style="font-size:0.75rem">
                {{ form.curriculum.filter(Boolean).length }} disciplinas listadas
              </div>
            </div>
            <div class="col-12">
              <label class="fsa-label">Nome no Certificado</label>
              <input v-model="form.certificate" type="text" class="fsa-input-modern w-100" placeholder="Ex: Certificado de Especialização Lato Sensu..." />
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing & Status -->
      <div class="col-lg-4">
        <div class="admin-card-base p-4 mb-4">
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="icon-square-neo green"><i class="bi bi-currency-dollar"></i></div>
            <h5 class="fw-bold mb-0">Valores e Planos</h5>
          </div>
          
          <div class="mb-4">
            <label class="fsa-label">Mensalidade Boleto / PIX</label>
            <div class="price-input-wrapper">
              <span class="currency">R$</span>
              <input v-model.number="form.price.boleto" type="number" class="fsa-input-modern w-100 ps-5" placeholder="769,00" step="0.01" />
            </div>
          </div>
          <div class="mb-4">
            <label class="fsa-label">Parcelamento Padrão</label>
            <div class="position-relative">
              <input v-model.number="form.price.installments" type="number" class="fsa-input-modern w-100" placeholder="18" />
              <span class="input-suffix">Vezes</span>
            </div>
          </div>
          <div class="mb-4">
            <label class="fsa-label">Mensalidade Cartão de Crédito</label>
            <div class="price-input-wrapper">
              <span class="currency">R$</span>
              <input v-model.number="form.price.credit" type="number" class="fsa-input-modern w-100 ps-5" placeholder="599,00" step="0.01" />
            </div>
          </div>
          <div class="total-price-box">
            <div class="tp-lbl">Valor Total Estimado (Boleto)</div>
            <div class="tp-val">{{ formatCurrency(form.price.boleto * form.price.installments) }}</div>
          </div>
        </div>

        <div class="admin-card-base p-4 position-sticky" style="top: 80px">
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="icon-square-neo amber"><i class="bi bi-broadcast"></i></div>
            <h5 class="fw-bold mb-0">Publicação</h5>
          </div>
          
          <div class="mb-4">
            <label class="fsa-label">Status do Curso</label>
            <select v-model="form.status" class="fsa-input-modern w-100 neo-select">
              <option value="ativa">🟢 Publicado Ativo</option>
              <option value="em_planejamento">🟠 Em Planejamento</option>
              <option value="inativa">🔴 Inativo (Oculto)</option>
            </select>
          </div>
          
          <label class="neo-switch-wrap mt-2">
            <input type="checkbox" v-model="form.featured" style="display:none" />
            <div class="neo-switch" :class="{ on: form.featured }">
              <div class="thumb"></div>
            </div>
            Destacar na Home Principal
          </label>

          <hr class="my-4 border-secondary opacity-25">
          
          <button class="admin-btn-modern w-100" @click="saveCourse" type="button" :disabled="saving">
            <i v-if="saving" class="bi bi-arrow-repeat spin me-2"></i>
            <i v-else class="bi bi-cloud-check me-2"></i>
            {{ saving ? 'Salvando base de dados...' : 'Publicar Curso' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ title: 'Novo Curso — Admin FSA' })

const { formatCurrency } = useFormatters()

const fileInput = ref<HTMLInputElement | null>(null)
const bannerInput = ref<HTMLInputElement | null>(null)
const uploadedFile = ref<File | null>(null)
const isDragging = ref(false)
const aiLoading = ref(false)
const aiSuccess = ref(false)
const aiError = ref('')
const saving = ref(false)

const form = reactive({
  name: '', slug: '', area: '', type: 'Especialização',
  modalities: [] as string[], duration: 18, workload: 420,
  coordinator: '', professor: '', description: '', about: '', target: '',
  curriculum: [] as string[], certificate: 'Certificado de Especialização Lato Sensu',
  status: 'em_planejamento' as 'ativa' | 'em_planejamento' | 'inativa',
  featured: false, banner: '',
  price: { boleto: 0, installments: 18, credit: 0, fullPrice: 0 }
})

watch(() => form.name, (val) => {
  form.slug = val
    .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
})

const triggerFileInput = () => fileInput.value?.click()
const triggerBannerInput = () => bannerInput.value?.click()

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) uploadedFile.value = file
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file && file.type === 'application/pdf') uploadedFile.value = file
}

const onBannerChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => { form.banner = ev.target?.result as string }
  reader.readAsDataURL(file)
}

const onCurriculumInput = (e: Event) => {
  form.curriculum = (e.target as HTMLTextAreaElement).value.split('\n')
}

const analyzeWithAI = async () => {
  if (!uploadedFile.value) return
  aiLoading.value = true; aiSuccess.value = false; aiError.value = ''
  try {
    const base64 = await readFileAsBase64(uploadedFile.value)
    const response = await fetch('/api/parse-ppc', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ppcBase64: base64 })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.statusMessage || data.message || 'Erro na API')
    if (data.nome)         form.name        = data.nome
    if (data.slug)         form.slug        = data.slug
    if (data.area)         form.area        = data.area
    if (data.modalidade)   form.modalities  = Array.isArray(data.modalidade) ? data.modalidade : [data.modalidade]
    if (data.duracao)      form.duration    = Number(data.duracao)
    if (data.cargaHoraria) form.workload    = Number(data.cargaHoraria)
    if (data.coordenador)  form.coordinator = data.coordenador
    if (data.professor)    form.professor   = data.professor
    if (data.descricao)    form.description = data.descricao
    if (data.publicoAlvo)  form.target      = data.publicoAlvo
    if (data.disciplinas)  form.curriculum  = data.disciplinas
    if (data.certificado)  form.certificate = data.certificado
    if (data.precos?.boleto)   form.price.boleto       = Number(data.precos.boleto)
    if (data.precos?.parcelas) form.price.installments = Number(data.precos.parcelas)
    if (data.precos?.cartao)   form.price.credit       = Number(data.precos.cartao)
    aiSuccess.value = true
  } catch (e: any) {
    aiError.value = e.message || 'Erro ao analisar o PPC.'
  } finally {
    aiLoading.value = false
  }
}

const readFileAsBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = (e) => resolve((e.target?.result as string).split(',')[1])
  reader.onerror = reject
  reader.readAsDataURL(file)
})

const saveCourse = async () => {
  if (!form.name || !form.slug) { alert('Preencha pelo menos o nome e o slug do curso.'); return }
  saving.value = true
  try {
    await $fetch('/api/courses', {
      method: 'POST',
      body: {
        id: Date.now(), ...form,
        banner: form.banner || undefined,
        price: { ...form.price, fullPrice: form.price.boleto * form.price.installments }
      }
    })
    navigateTo('/admin/cursos')
  } catch (e: any) {
    alert('Erro ao salvar: ' + e.message)
    saving.value = false
  }
}
</script>

<style scoped>
.dash-header { margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: flex-end; }
.dash-title { font-size: 2rem; font-weight: 800; margin: 0; line-height: 1; text-shadow: 0 0 30px rgba(255,255,255,0.1); }
.text-muted-neo { color: var(--fsa-text-muted); font-size: 0.85rem; }

/* Icon Squares Neo */
.icon-square-neo {
  width: 42px; height: 42px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;
}
.icon-square-neo.cyan { background: rgba(56, 182, 255, 0.15); color: var(--fsa-cyan); border: 1px solid rgba(56, 182, 255, 0.3); }
.icon-square-neo.purple { background: rgba(167, 139, 250, 0.15); color: #a78bfa; border: 1px solid rgba(167, 139, 250, 0.3); }
.icon-square-neo.primary { background: rgba(30, 58, 138, 0.3); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
.icon-square-neo.green { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); }
.icon-square-neo.amber { background: rgba(251, 191, 36, 0.15); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); }

/* Neo Upload Zone */
.upload-zone-neo {
  border: 2px dashed rgba(56, 182, 255, 0.3); border-radius: 16px;
  background: rgba(0,0,0,0.15); cursor: pointer; transition: all 0.3s ease;
  position: relative; overflow: hidden;
}
.upload-zone-neo.drag-over, .upload-zone-neo:hover {
  border-color: var(--fsa-cyan); background: rgba(56, 182, 255, 0.05);
  box-shadow: 0 0 40px rgba(56, 182, 255, 0.1);
}
.upload-content-box { padding: 3rem 2rem; text-align: center; }
.upload-icon-neo { font-size: 2.5rem; color: var(--fsa-cyan); margin-bottom: 1rem; opacity: 0.8; }
.upload-title-neo { font-size: 1.1rem; font-weight: 600; color: var(--fsa-text); margin-bottom: 0.25rem; }
.upload-desc-neo { font-size: 0.85rem; color: var(--fsa-text-muted); }

.file-success-box {
  display: flex; align-items: center; justify-content: center; gap: 1rem;
  background: rgba(255,255,255,0.03); border: 1px solid var(--fsa-border-glass);
  padding: 1rem 1.5rem; border-radius: 12px; margin: 0 auto; max-width: 400px;
}
.file-icon { font-size: 2rem; }
.file-data { text-align: left; }
.f-name { font-weight: 600; color: var(--fsa-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 250px; }
.f-size { font-size: 0.75rem; color: var(--fsa-text-muted); }
.btn-remove-file {
  background: rgba(239, 68, 68, 0.1); border: 1px solid transparent; color: #ef4444;
  width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  margin-left: auto; cursor: pointer; transition: all 0.2s;
}
.btn-remove-file:hover { background: #ef4444; color: #fff; }

.ai-status { font-size: 0.85rem; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; }
.ai-status.success { color: #34d399; }
.ai-status.error { color: #f87171; }

/* Banner Preview */
.banner-preview {
  width: 100%; aspect-ratio: 1200 / 400; background: rgba(0,0,0,0.2);
  border: 2px dashed rgba(255,255,255,0.1); border-radius: var(--fsa-radius-sm);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; position: relative; overflow: hidden;
  background-size: cover; background-position: center; transition: all 0.3s ease;
}
.banner-preview:hover { border-color: rgba(167, 139, 250, 0.5); }
.banner-placeholder { display: flex; flex-direction: column; align-items: center; color: var(--fsa-text-muted); font-size: 0.85rem; font-weight: 500; }
.banner-change-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.6);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 0.95rem; font-weight: 600; opacity: 0; transition: opacity 0.2s; backdrop-filter: blur(2px);
}
.banner-preview:hover .banner-change-overlay { opacity: 1; }

/* Neo Inputs Extras */
.input-group-neo { display: flex; border-radius: var(--fsa-radius-sm); overflow: hidden; }
.ig-prefix {
  background: rgba(255,255,255,0.03); border: 1px solid var(--fsa-border-glass); border-right: none;
  padding: 0.75rem 1rem; color: var(--fsa-text-muted); font-size: 0.9rem; font-family: monospace;
}
.ig-input { border-top-left-radius: 0 !important; border-bottom-left-radius: 0 !important; }

.neo-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 16px 12px; }

.input-suffix { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--fsa-text-muted); font-size: 0.8rem; pointer-events: none; }
.price-input-wrapper { position: relative; }
.price-input-wrapper .currency { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--fsa-text-muted); font-weight: 600; }

.border-top { border-top-color: var(--fsa-border-glass) !important; }

/* Checkboxes Modality Neo */
.modality-check-neo { cursor: pointer; flex: 1; min-width: 120px; }
.modality-check-neo input { display: none; }
.m-card {
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  background: rgba(0,0,0,0.2); border: 1px solid var(--fsa-border-glass);
  padding: 1rem; border-radius: var(--fsa-radius-sm); transition: all 0.2s ease;
  color: var(--fsa-text-muted); font-weight: 600; text-align: center; font-size: 0.85rem;
}
.m-card i { font-size: 1.5rem; transition: color 0.2s; }
.modality-check-neo:hover .m-card { border-color: rgba(255,255,255,0.2); }
.modality-check-neo input:checked + .m-card {
  background: rgba(56, 182, 255, 0.1); border-color: var(--fsa-cyan);
  color: var(--fsa-text); box-shadow: 0 0 20px rgba(56, 182, 255, 0.1);
}
.modality-check-neo input:checked + .m-card i { color: var(--fsa-cyan); }

/* Total Price Box */
.total-price-box {
  background: linear-gradient(135deg, rgba(52, 211, 153, 0.1), transparent);
  border: 1px solid rgba(52, 211, 153, 0.2); border-radius: var(--fsa-radius-sm);
  padding: 1.25rem; text-align: center;
}
.tp-lbl { color: var(--fsa-text-secondary); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin-bottom: 0.5rem; }
.tp-val { color: #34d399; font-size: 2rem; font-weight: 800; line-height: 1; }

/* Switch Toggle Neo */
.neo-switch-wrap { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; color: var(--fsa-text); font-weight: 500; font-size: 0.9rem; user-select: none; }
.neo-switch {
  width: 44px; height: 24px; border-radius: 99px; background: rgba(0,0,0,0.4);
  border: 1px solid var(--fsa-border-glass); position: relative; transition: all 0.3s ease;
}
.neo-switch .thumb {
  width: 18px; height: 18px; border-radius: 50%; background: var(--fsa-text-muted);
  position: absolute; top: 2px; left: 2px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.neo-switch.on { background: rgba(56, 182, 255, 0.2); border-color: var(--fsa-cyan); }
.neo-switch.on .thumb { background: var(--fsa-cyan); left: 22px; box-shadow: 0 0 8px var(--fsa-cyan); }

.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
