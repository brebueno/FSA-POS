import { useCheckoutStore } from '~/stores/checkout'

export const useCheckout = () => {
  const store = useCheckoutStore()
  const router = useRouter()

  const fetchAddressByCep = async (cep: string) => {
    const digits = cep.replace(/\D/g, '')
    if (digits.length !== 8) return null

    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
      if (!res.ok) return null
      const data = await res.json()
      if (data.erro) return null

      store.address.logradouro = data.logradouro || ''
      store.address.bairro = data.bairro || ''
      store.address.cidade = data.localidade || ''
      store.address.estado = data.uf || ''
      return data
    } catch {
      return null
    }
  }

  const goToPayment = () => {
    if (!store.isCadastroValid) return
    store.goToStep(2)
    router.push(`/checkout/${store.courseSlug}/pagamento`)
  }

  const goToCadastro = () => {
    store.goToStep(1)
    router.push(`/checkout/${store.courseSlug}/cadastro`)
  }

  const finishCheckout = () => {
    if (!store.isPagamentoValid) return
    // Future: POST to API
    alert('Inscrição realizada com sucesso! Em breve você receberá um e-mail de confirmação.')
    store.resetCheckout()
    router.push('/')
  }

  const getMethodLabel = (method: string): string => {
    const labels: Record<string, string> = {
      boleto_avista: 'Boleto / PIX à vista',
      boleto_parcelado: 'Boleto Parcelado',
      cartao_credito: 'Cartão de Crédito',
      cartao_recorrente: 'Cartão Recorrente'
    }
    return labels[method] || method
  }

  const getDiscountByMethod = (method: string): number => {
    if (method === 'boleto_avista') return 10
    if (method === 'cartao_credito') return 5
    return 0
  }

  return {
    store,
    fetchAddressByCep,
    goToPayment,
    goToCadastro,
    finishCheckout,
    getMethodLabel,
    getDiscountByMethod
  }
}
