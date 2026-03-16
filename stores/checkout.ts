import { defineStore } from 'pinia'

export interface CheckoutPersonal {
  nome: string
  nomeSocial: string
  usarNomeSocial: boolean
  email: string
  telefone: string
  cpf: string
}

export interface CheckoutAddress {
  cep: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  usarMesmoEnderecoCob: boolean
}

export interface CheckoutPayment {
  method: 'boleto_avista' | 'boleto_parcelado' | 'cartao_credito' | 'cartao_recorrente' | ''
  installments: number
  dueDay: number
  cardName: string
  cardNumber: string
  cardExpiry: string
  cardCvv: string
  couponCode: string
  couponDiscount: number
  contract1Accepted: boolean
  contract2Accepted: boolean
}

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    courseSlug: '' as string,
    courseName: '' as string,
    courseModality: '' as string,
    courseDuration: 0 as number,
    coursePrice: 0 as number,
    courseInstallments: 0 as number,
    currentStep: 1 as number,

    personal: {
      nome: '',
      nomeSocial: '',
      usarNomeSocial: false,
      email: '',
      telefone: '',
      cpf: ''
    } as CheckoutPersonal,

    address: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      usarMesmoEnderecoCob: true
    } as CheckoutAddress,

    payment: {
      method: '',
      installments: 1,
      dueDay: 10,
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      couponCode: '',
      couponDiscount: 0,
      contract1Accepted: false,
      contract2Accepted: false
    } as CheckoutPayment
  }),

  getters: {
    isPersonalValid: (state) => {
      const p = state.personal
      return (
        p.nome.trim().length >= 3 &&
        p.email.includes('@') &&
        p.telefone.replace(/\D/g, '').length >= 10 &&
        p.cpf.replace(/\D/g, '').length === 11
      )
    },

    isAddressValid: (state) => {
      const a = state.address
      return (
        a.cep.replace(/\D/g, '').length === 8 &&
        a.logradouro.trim().length > 0 &&
        a.numero.trim().length > 0 &&
        a.cidade.trim().length > 0
      )
    },

    isCadastroValid: (state) => {
      const p = state.personal
      const a = state.address
      return (
        p.nome.trim().length >= 3 &&
        p.email.includes('@') &&
        p.telefone.replace(/\D/g, '').length >= 10 &&
        p.cpf.replace(/\D/g, '').length === 11 &&
        a.cep.replace(/\D/g, '').length === 8 &&
        a.logradouro.trim().length > 0 &&
        a.numero.trim().length > 0
      )
    },

    isPagamentoValid: (state) => {
      return (
        state.payment.method !== '' &&
        state.payment.contract1Accepted &&
        state.payment.contract2Accepted
      )
    },

    basePrice: (state) => state.coursePrice,

    discountedPrice: (state) => {
      const base = state.coursePrice * state.courseInstallments
      const discount = base * 0.1 // 10% desconto boleto à vista
      return base - discount
    },

    finalMonthlyPrice: (state) => {
      const coupon = state.payment.couponDiscount || 0
      let price = state.coursePrice
      price = price * (1 - coupon / 100)
      return price
    },

    totalPrice: (state) => {
      const installments = state.payment.installments || state.courseInstallments
      const coupon = state.payment.couponDiscount || 0
      let price = state.coursePrice * installments
      price = price * (1 - coupon / 100)
      return price
    }
  },

  actions: {
    setCourse(slug: string, name: string, modality: string, duration: number, price: number, installments: number) {
      this.courseSlug = slug
      this.courseName = name
      this.courseModality = modality
      this.courseDuration = duration
      this.coursePrice = price
      this.courseInstallments = installments
    },
    goToStep(step: number) {
      this.currentStep = step
    },
    resetCheckout() {
      this.currentStep = 1
      this.personal = { nome: '', nomeSocial: '', usarNomeSocial: false, email: '', telefone: '', cpf: '' }
      this.address = { cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', usarMesmoEnderecoCob: true }
      this.payment = { method: '', installments: 1, dueDay: 10, cardName: '', cardNumber: '', cardExpiry: '', cardCvv: '', couponCode: '', couponDiscount: 0, contract1Accepted: false, contract2Accepted: false }
    }
  }
})
