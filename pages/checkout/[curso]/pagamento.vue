<template>
  <div class="checkout-page">
    <CheckoutHeader
      :course-name="store.courseName || course?.name || 'Curso'"
      :modality="store.courseModality || course?.modalities[0]"
      :current-step="2"
    />

    <div class="checkout-body">
      <div class="container">
        <div class="row g-4">
          <!-- Main Form -->
          <div class="col-lg-8">
            <div class="checkout-content-wrapper">
              <div class="checkout-content-inner">

                <!-- Header -->
                <div class="checkout-icon-header mb-4">
                  <div class="icon-wrap">
                    <i class="bi bi-credit-card"></i>
                  </div>
                  <div>
                    <h2>Pagamento e Contrato</h2>
                    <p>Escolha a forma de pagamento e aceite os contratos</p>
                  </div>
                </div>

                <!-- Payment Methods -->
                <div class="checkout-section-box">
                  <h5><i class="bi bi-wallet2"></i>Forma de Pagamento</h5>

                  <!-- Method 1: Boleto / PIX à vista -->
                  <div
                    class="payment-method-card"
                    :class="{ selected: store.payment.method === 'boleto_avista' }"
                    @click="selectMethod('boleto_avista')"
                  >
                    <div class="payment-method-badge">MAIOR DESCONTO</div>
                    <div class="payment-method-radio"></div>
                    <div class="payment-method-body">
                      <div class="payment-method-title">
                        <i class="bi bi-qr-code me-2" style="color:var(--fsa-cyan)"></i>
                        Boleto ou PIX (à vista)
                      </div>
                      <div class="payment-method-desc">
                        Pague de uma vez e ganhe <strong style="color:var(--fsa-cyan)">10% de desconto</strong>
                        — Total: {{ formatCurrency(totalAVista) }}
                      </div>
                    </div>
                  </div>

                  <!-- Method 2: Boleto Parcelado -->
                  <div
                    class="payment-method-card"
                    :class="{ selected: store.payment.method === 'boleto_parcelado' }"
                    @click="selectMethod('boleto_parcelado')"
                  >
                    <div class="payment-method-radio"></div>
                    <div class="payment-method-body">
                      <div class="payment-method-title">
                        <i class="bi bi-barcode me-2" style="color:var(--fsa-cyan)"></i>
                        Boleto Parcelado
                      </div>
                      <div class="payment-method-desc">
                        Parcele em até {{ course?.price.installments || 18 }}x
                        — {{ formatCurrency(course?.price.boleto || 0) }}/mês no boleto
                      </div>
                    </div>
                  </div>

                  <!-- Method 3: Cartão de crédito -->
                  <div
                    class="payment-method-card"
                    :class="{ selected: store.payment.method === 'cartao_credito' }"
                    @click="selectMethod('cartao_credito')"
                  >
                    <div class="payment-method-badge" style="background:var(--fsa-discount)">DESCONTO ESPECIAL</div>
                    <div class="payment-method-radio"></div>
                    <div class="payment-method-body">
                      <div class="payment-method-title">
                        <i class="bi bi-credit-card me-2" style="color:var(--fsa-cyan)"></i>
                        Cartão de Crédito
                      </div>
                      <div class="payment-method-desc">
                        <span v-if="course?.price.credit">
                          A partir de {{ formatCurrency(course.price.credit) }}/mês
                          em até {{ course.price.installments }}x
                        </span>
                        <span v-else>
                          Parcele em até 12x na fatura do cartão
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Method 4: Cartão Recorrente -->
                  <div
                    class="payment-method-card"
                    :class="{ selected: store.payment.method === 'cartao_recorrente' }"
                    @click="selectMethod('cartao_recorrente')"
                  >
                    <div class="payment-method-radio"></div>
                    <div class="payment-method-body">
                      <div class="payment-method-title">
                        <i class="bi bi-arrow-repeat me-2" style="color:var(--fsa-cyan)"></i>
                        Cartão Recorrente
                      </div>
                      <div class="payment-method-desc">
                        Cobrança automática mensal — sem se preocupar com boletos
                        — em até {{ course?.price.installments || 18 }}x
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Conditional: Card Fields -->
                <div
                  v-if="store.payment.method === 'cartao_credito' || store.payment.method === 'cartao_recorrente'"
                  class="checkout-section-box"
                >
                  <h5><i class="bi bi-credit-card-2-front"></i>Dados do Cartão</h5>
                  <div class="row g-3">
                    <div class="col-12">
                      <label class="fsa-label">Nome no cartão</label>
                      <input
                        v-model="store.payment.cardName"
                        type="text"
                        class="fsa-form-control"
                        placeholder="Como aparece no cartão"
                        autocomplete="cc-name"
                      />
                    </div>
                    <div class="col-12">
                      <label class="fsa-label">Número do cartão</label>
                      <input
                        v-model="store.payment.cardNumber"
                        type="text"
                        class="fsa-form-control"
                        placeholder="0000 0000 0000 0000"
                        maxlength="19"
                        @input="onCardNumberInput"
                        autocomplete="cc-number"
                      />
                    </div>
                    <div class="col-6">
                      <label class="fsa-label">Validade</label>
                      <input
                        v-model="store.payment.cardExpiry"
                        type="text"
                        class="fsa-form-control"
                        placeholder="MM/AA"
                        maxlength="5"
                        @input="onExpiryInput"
                        autocomplete="cc-exp"
                      />
                    </div>
                    <div class="col-6">
                      <label class="fsa-label">CVV</label>
                      <input
                        v-model="store.payment.cardCvv"
                        type="text"
                        class="fsa-form-control"
                        placeholder="123"
                        maxlength="4"
                        autocomplete="cc-csc"
                      />
                    </div>
                  </div>
                </div>

                <!-- Installments + Coupon -->
                <div class="checkout-section-box" v-if="store.payment.method">
                  <h5><i class="bi bi-calculator"></i>Parcelamento e Cupom</h5>

                  <div class="row g-3">
                    <div class="col-md-7">
                      <label class="fsa-label">Número de parcelas</label>
                      <select v-model="store.payment.installments" class="fsa-form-control">
                        <option
                          v-for="n in maxInstallments"
                          :key="n"
                          :value="n"
                        >
                          {{ n }}x de {{ formatCurrency(monthlyValue(n)) }}
                          {{ n === 1 ? '(à vista)' : '' }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-5">
                      <label class="fsa-label">Cupom de desconto</label>
                      <div class="coupon-wrap">
                        <input
                          v-model="couponInput"
                          type="text"
                          class="fsa-form-control"
                          placeholder="CUPOM10"
                          style="text-transform:uppercase"
                          @keyup.enter="applyCoupon"
                        />
                        <button class="coupon-btn" @click="applyCoupon" type="button">
                          Aplicar
                        </button>
                      </div>
                      <span v-if="couponMsg" class="field-msg" :class="couponMsg.type">
                        {{ couponMsg.text }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Conditional: Due Date for Boleto Parcelado -->
                <div class="checkout-section-box" v-if="store.payment.method === 'boleto_parcelado'">
                  <h5><i class="bi bi-calendar-event"></i>Dia de Vencimento</h5>
                  <div class="d-flex flex-wrap gap-2">
                    <button
                      v-for="day in [1, 10, 20, 28]"
                      :key="day"
                      class="due-day-btn"
                      :class="{ selected: store.payment.dueDay === day }"
                      @click="store.payment.dueDay = day"
                      type="button"
                    >
                      Dia {{ day }}
                    </button>
                  </div>
                  <p style="font-size:0.78rem;color:var(--fsa-text-muted);margin-top:0.75rem;margin-bottom:0">
                    <i class="bi bi-info-circle me-1"></i>
                    O primeiro boleto será gerado após a confirmação da matrícula.
                  </p>
                </div>

                <!-- Contracts -->
                <div class="checkout-section-box">
                  <h5><i class="bi bi-file-earmark-text"></i>Contrato e Termos</h5>

                  <!-- Contract 1: Matrícula -->
                  <div class="contract-check-item">
                    <div
                      class="fsa-checkbox"
                      :class="{ checked: store.payment.contract1Accepted }"
                      @click="store.payment.contract1Accepted = !store.payment.contract1Accepted"
                    ></div>
                    <label @click="store.payment.contract1Accepted = !store.payment.contract1Accepted" style="font-weight: 600; font-size: 0.9rem;">
                      <strong style="color:var(--fsa-text)">Contrato de matrícula (obrigatório)</strong>
                    </label>
                    <div class="contract-actions">
                      <button class="contract-toggle-btn" @click="showContract1 = !showContract1" type="button">
                        <i :class="showContract1 ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
                      </button>
                      <button class="contract-toggle-btn" type="button">
                        <i class="bi bi-download"></i>
                      </button>
                    </div>
                  </div>
                  <div v-if="showContract1" class="contract-content">
                    <strong>CONTRATO DE PRESTAÇÃO DE SERVIÇOS EDUCACIONAIS</strong><br/><br/>
                    Pelo presente instrumento, a FACULDADE SANTO ANTÔNIO DE PÓS-GRADUAÇÕES, doravante denominada CONTRATADA,
                    com sede na Av. da Saudade, 26, Centro, Caçapava/SP, CEP 12282-480, credenciada pelo Ministério da
                    Educação por meio da Portaria nº 364, de 05 de maio de 2016, compromete-se a prestar os serviços
                    educacionais descritos neste instrumento ao CONTRATANTE, nos termos da legislação vigente.<br/><br/>
                    <strong>Cláusula 1ª — Do Objeto:</strong> O presente contrato tem por objeto a prestação de serviços
                    educacionais de pós-graduação lato sensu, na modalidade e curso escolhidos pelo CONTRATANTE durante
                    o processo de matrícula online.<br/><br/>
                    <strong>Cláusula 2ª — Do Prazo:</strong> O curso terá duração conforme estabelecido no Projeto
                    Pedagógico do Curso (PPC), disponível no Portal do Aluno.<br/><br/>
                    <strong>Cláusula 3ª — Do Valor:</strong> O valor dos serviços educacionais será conforme plano de
                    pagamento selecionado pelo CONTRATANTE no ato da matrícula.<br/><br/>
                    <strong>Cláusula 4ª — Da Garantia:</strong> O CONTRATANTE poderá desistir do contrato no prazo de
                    7 (sete) dias corridos a contar da data de matrícula, com direito ao reembolso integral dos valores pagos.
                  </div>

                  <!-- Contract 2: Regulamento -->
                  <div class="contract-check-item">
                    <div
                      class="fsa-checkbox"
                      :class="{ checked: store.payment.contract2Accepted }"
                      @click="store.payment.contract2Accepted = !store.payment.contract2Accepted"
                    ></div>
                    <label @click="store.payment.contract2Accepted = !store.payment.contract2Accepted" style="font-weight: 600; font-size: 0.9rem;">
                      <strong style="color:var(--fsa-text)">Declaro que já sou graduado no ensino superior nesta data (obrigatório)</strong>
                    </label>
                    <div class="contract-actions">
                      <button class="contract-toggle-btn" @click="showContract2 = !showContract2" type="button">
                        <i :class="showContract2 ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
                        {{ showContract2 ? 'Fechar' : 'Ver' }}
                      </button>
                      <button class="contract-toggle-btn" type="button">
                        <i class="bi bi-download"></i>
                      </button>
                    </div>
                  </div>
                  <div v-if="showContract2" class="contract-content">
                    <strong>REGULAMENTO ACADÊMICO</strong><br/><br/>
                    O presente Regulamento Acadêmico regula as relações entre a Faculdade Santo Antônio de Pós-Graduações
                    e seus alunos matriculados nos cursos de pós-graduação lato sensu.<br/><br/>
                    <strong>Art. 1º — Das Atividades Acadêmicas:</strong> As atividades acadêmicas serão realizadas
                    conforme o calendário acadêmico divulgado no início de cada período letivo.<br/><br/>
                    <strong>Art. 2º — Da Frequência:</strong> Para obtenção do certificado, o aluno deverá cumprir
                    o mínimo de 75% (setenta e cinco por cento) de frequência em cada disciplina.<br/><br/>
                    <strong>Art. 3º — Do Aproveitamento:</strong> Será considerado aprovado o aluno que obtiver
                    nota igual ou superior a 7,0 (sete) nas avaliações previstas no PPC.<br/><br/>
                    <strong>POLÍTICA DE PRIVACIDADE:</strong> Os dados pessoais coletados serão tratados em
                    conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018), sendo
                    utilizados exclusivamente para fins acadêmicos e administrativos.
                  </div>

                  <p v-if="!bothAccepted" style="font-size:0.78rem;color:var(--fsa-text-muted);margin-top:0.75rem;margin-bottom:0">
                    <i class="bi bi-exclamation-circle me-1" style="color:#f59e0b"></i>
                    Aceite ambos os contratos para prosseguir
                  </p>
                </div>

                <!-- Actions -->
                <div class="d-flex gap-3 justify-content-between mt-2">
                  <button class="btn-fsa-outline" @click="goBack" type="button">
                    <i class="bi bi-arrow-left me-2"></i>Voltar
                  </button>
                  <button
                    class="btn-fsa-block"
                    style="max-width:220px"
                    :disabled="!canFinish"
                    @click="handleFinish"
                    type="button"
                  >
                    <i class="bi bi-check-circle me-2"></i>Concluir matrícula
                  </button>
                </div>

              </div>
            </div>
          </div>

          <!-- Sidebar: Order Summary -->
          <div class="col-lg-4">
            <OrderSummary
              :course-name="store.courseName || course?.name || 'Curso'"
              :modality="store.courseModality || course?.modalities[0]"
              :duration="store.courseDuration || course?.duration"
              :original-price="originalPrice"
              :payment-discount-pct="paymentDiscountPct"
              :coupon-discount="couponDiscountValue"
              :installments="store.payment.installments"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckoutHeader from '~/components/checkout/CheckoutHeader.vue'
import OrderSummary from '~/components/checkout/OrderSummary.vue'
import { useCheckoutStore } from '~/stores/checkout'
import { useCoursesStore } from '~/stores/courses'

definePageMeta({ layout: false })

const route = useRoute()
const router = useRouter()
const cursoSlug = route.params.curso as string

const store = useCheckoutStore()
const coursesStore = useCoursesStore()
const { formatCurrency, formatCardNumber, formatCardExpiry } = useFormatters()

const course = computed(() => coursesStore.getCourseBySlug(cursoSlug))

onMounted(() => {
  if (!store.courseSlug && course.value) {
    store.setCourse(
      course.value.slug,
      course.value.name,
      course.value.modalities[0],
      course.value.duration,
      course.value.price.boleto,
      course.value.price.installments
    )
  }
  if (!store.payment.installments) {
    store.payment.installments = course.value?.price.installments || 1
  }
})

const originalPrice = computed(() => {
  const c = course.value
  if (!c) return 0
  return c.price.boleto * c.price.installments
})

const totalAVista = computed(() => originalPrice.value * 0.9)

const paymentDiscountPct = computed(() => {
  if (store.payment.method === 'boleto_avista') return 10
  if (store.payment.method === 'cartao_credito') return 5
  return 0
})

const couponInput = ref('')
const couponMsg = ref<{ type: string; text: string } | null>(null)

const validCoupons: Record<string, number> = {
  FSA10: 10,
  SAUDE20: 20,
  ENFERMAGEM15: 15
}

const couponDiscountPct = ref(0)
const couponDiscountValue = computed(() => {
  const base = originalPrice.value
  return base * (couponDiscountPct.value / 100)
})

const applyCoupon = () => {
  const code = couponInput.value.toUpperCase().trim()
  if (validCoupons[code]) {
    couponDiscountPct.value = validCoupons[code]
    store.payment.couponDiscount = validCoupons[code]
    couponMsg.value = { type: 'success', text: `Cupom aplicado! ${validCoupons[code]}% de desconto.` }
  } else {
    couponDiscountPct.value = 0
    store.payment.couponDiscount = 0
    couponMsg.value = { type: 'error', text: 'Cupom inválido ou expirado.' }
  }
}

const maxInstallments = computed(() => {
  const base = course.value?.price.installments || 18
  if (store.payment.method === 'cartao_credito') return Math.min(base, 12)
  return base
})

const monthlyValue = (n: number) => {
  const base = originalPrice.value
  const disc = paymentDiscountPct.value
  const afterDisc = base * (1 - disc / 100)
  const afterCoupon = afterDisc - couponDiscountValue.value
  return Math.max(0, afterCoupon / n)
}

const showContract1 = ref(false)
const showContract2 = ref(false)

const bothAccepted = computed(
  () => store.payment.contract1Accepted && store.payment.contract2Accepted
)
const canFinish = computed(() => store.isPagamentoValid)

const selectMethod = (method: typeof store.payment.method) => {
  store.payment.method = method
  store.payment.installments = method === 'boleto_avista' ? 1 : (course.value?.price.installments || 18)
}

const onCardNumberInput = (e: Event) => {
  store.payment.cardNumber = formatCardNumber((e.target as HTMLInputElement).value)
}
const onExpiryInput = (e: Event) => {
  store.payment.cardExpiry = formatCardExpiry((e.target as HTMLInputElement).value)
}

const goBack = () => {
  store.goToStep(1)
  router.push(`/checkout/${cursoSlug}/cadastro`)
}

const handleFinish = () => {
  if (!canFinish.value) return
  alert('Matrícula concluída com sucesso! Você receberá um e-mail de confirmação em breve. Bem-vindo(a) à Faculdade Santo Antônio!')
  store.resetCheckout()
  router.push('/')
}

useHead({ title: `Pagamento — ${course.value?.name ?? 'Curso'} — FSA` })
</script>

<style scoped>
.coupon-wrap {
  display: flex;
  gap: 0;
}
.coupon-wrap .fsa-form-control {
  border-radius: var(--fsa-radius-sm) 0 0 var(--fsa-radius-sm);
}
.coupon-btn {
  background: var(--fsa-cyan);
  color: #000;
  border: none;
  padding: 0 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 0 var(--fsa-radius-sm) var(--fsa-radius-sm) 0;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s;
}
.coupon-btn:hover { background: var(--fsa-cyan-hover); }

.due-day-btn {
  background: var(--fsa-bg-secondary);
  border: 1.5px solid var(--fsa-border);
  color: var(--fsa-text-secondary);
  border-radius: var(--fsa-radius-sm);
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
}
.due-day-btn:hover { border-color: var(--fsa-cyan); color: var(--fsa-cyan); }
.due-day-btn.selected {
  background: rgba(56,182,255,0.1);
  border-color: var(--fsa-cyan);
  color: var(--fsa-cyan);
}

.field-msg { font-size: 0.75rem; margin-top: 0.35rem; display: block; }
.field-msg.success { color: #22c55e; }
.field-msg.error   { color: #ef4444; }
</style>
