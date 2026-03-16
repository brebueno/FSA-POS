<template>
  <div class="order-summary">
    <h5><i class="bi bi-receipt me-2"></i>Resumo do pedido</h5>

    <div class="order-summary-course">{{ courseName }}</div>
    <div class="order-summary-meta">
      <span v-if="modality">{{ modality }}</span>
      <span v-if="duration"> · {{ duration }} meses</span>
    </div>

    <div class="order-summary-line">
      <span>Valor original</span>
      <span>{{ formatCurrency(originalPrice) }}</span>
    </div>

    <div class="order-summary-line" v-if="bursaryDiscount > 0">
      <span>Desconto bolsa</span>
      <span class="order-discount">-{{ formatCurrency(bursaryDiscount) }}</span>
    </div>

    <div class="order-summary-line" v-if="paymentDiscount > 0">
      <span>Desconto pagamento ({{ paymentDiscountPct }}%)</span>
      <span class="order-discount">-{{ formatCurrency(paymentDiscount) }}</span>
    </div>

    <div class="order-summary-line" v-if="couponDiscount > 0">
      <span>Cupom de desconto</span>
      <span class="order-discount">-{{ formatCurrency(couponDiscount) }}</span>
    </div>

    <div class="order-summary-line total">
      <span>Valor final</span>
      <span class="price-final">{{ formatCurrency(finalPrice) }}</span>
    </div>

    <div v-if="installments > 1" style="font-size:0.78rem;color:var(--fsa-text-muted);margin-top:0.5rem;text-align:right">
      {{ installments }}x de {{ formatCurrency(finalPrice / installments) }}
    </div>

    <div class="mt-3 pt-3" style="border-top:1px solid var(--fsa-border)">
      <div class="d-flex align-items-center gap-2" style="font-size:0.78rem;color:var(--fsa-text-muted)">
        <i class="bi bi-shield-check" style="color:var(--fsa-cyan)"></i>
        Pagamento 100% seguro e criptografado
      </div>
      <div class="d-flex align-items-center gap-2 mt-1" style="font-size:0.78rem;color:var(--fsa-text-muted)">
        <i class="bi bi-award" style="color:var(--fsa-cyan)"></i>
        Certificado com reconhecimento MEC
      </div>
      <div class="d-flex align-items-center gap-2 mt-1" style="font-size:0.78rem;color:var(--fsa-text-muted)">
        <i class="bi bi-arrow-counterclockwise" style="color:var(--fsa-cyan)"></i>
        Garantia de 7 dias ou reembolso total
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  courseName: string
  modality?: string
  duration?: number
  originalPrice: number
  bursaryDiscount?: number
  paymentDiscountPct?: number
  couponDiscount?: number
  installments?: number
}>()

const { formatCurrency } = useFormatters()

const paymentDiscount = computed(() => {
  if (!props.paymentDiscountPct) return 0
  const afterBursary = props.originalPrice - (props.bursaryDiscount || 0)
  return afterBursary * (props.paymentDiscountPct / 100)
})

const finalPrice = computed(() => {
  const afterBursary = props.originalPrice - (props.bursaryDiscount || 0)
  const afterPayment = afterBursary - paymentDiscount.value
  const afterCoupon = afterPayment - (props.couponDiscount || 0)
  return Math.max(0, afterCoupon)
})
</script>
