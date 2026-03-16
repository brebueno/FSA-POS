<template>
  <section class="course-section" id="investimento">
    <div class="container">
      <div class="mb-5">
        <div class="course-section-label">Investimento</div>
        <h2 class="course-section-title" style="font-size: 2.2rem;">O seu futuro<br/>começa aqui!</h2>
      </div>

      <div class="row g-4 justify-content-center">
        <!-- Boleto Parcelado -->
        <div class="col-md-6 col-lg-4">
          <div class="pricing-card">
            <div class="pricing-card-title">
              <i class="bi bi-barcode me-2" style="color:var(--fsa-cyan)"></i>
              Boleto Parcelado
            </div>
            <p style="font-size:0.8rem;color:var(--fsa-text-muted)">Parcele no boleto sem juros</p>
            <div class="pricing-price">
              <sup>R$</sup>{{ formatPrice(course.price.boleto) }}<small>/mês</small>
            </div>
            <p style="font-size:0.8rem;color:var(--fsa-text-muted)">
              em {{ course.price.installments }}x
            </p>
            <p style="font-size:0.8rem;color:var(--fsa-text-muted)">
              Total: {{ formatCurrency(course.price.boleto * course.price.installments) }}
            </p>
            <ul class="pricing-feature-list">
              <li><i class="bi bi-check-circle-fill"></i>Sem necessidade de cartão de crédito</li>
              <li><i class="bi bi-check-circle-fill"></i>Vencimento em datas flexíveis</li>
              <li><i class="bi bi-check-circle-fill"></i>Cancelamento sem multa em 7 dias</li>
              <li><i class="bi bi-check-circle-fill"></i>Acesso imediato após confirmação</li>
            </ul>
            <NuxtLink :to="`/checkout/${course.slug}/cadastro`" class="btn-fsa-block">
              Inscreva-se
            </NuxtLink>
          </div>
        </div>

        <!-- Cartão de Crédito (featured) -->
        <div class="col-md-6 col-lg-4" v-if="course.price.credit">
          <div class="pricing-card featured">
            <div class="pricing-card-badge">MELHOR OPÇÃO</div>
            <div class="pricing-card-title">
              <i class="bi bi-credit-card me-2" style="color:var(--fsa-cyan)"></i>
              Cartão de Crédito
            </div>
            <p style="font-size:0.8rem;color:var(--fsa-text-muted)">Parcele na fatura do cartão</p>
            <div class="pricing-price">
              <sup>R$</sup>{{ formatPrice(course.price.credit) }}<small>/mês</small>
            </div>
            <p style="font-size:0.8rem;color:var(--fsa-text-muted)">
              em {{ course.price.installments }}x
            </p>
            <p style="font-size:0.8rem;color:var(--fsa-text-muted)">
              Total: {{ formatCurrency(course.price.credit * course.price.installments) }}
            </p>
            <ul class="pricing-feature-list">
              <li><i class="bi bi-check-circle-fill"></i>Desconto especial no cartão</li>
              <li><i class="bi bi-check-circle-fill"></i>Aceita todos os cartões</li>
              <li><i class="bi bi-check-circle-fill"></i>Cancelamento sem multa em 7 dias</li>
              <li><i class="bi bi-check-circle-fill"></i>Acesso imediato após confirmação</li>
            </ul>
            <NuxtLink :to="`/checkout/${course.slug}/cadastro`" class="btn-fsa-block">
              Inscreva-se com desconto
            </NuxtLink>
          </div>
        </div>

        <!-- PIX / À Vista -->
        <div class="col-md-6 col-lg-4">
          <div class="pricing-card">
            <div class="pricing-card-badge" style="background:var(--fsa-discount)">ATÉ 10% OFF</div>
            <div class="pricing-card-title" style="margin-top:0.75rem">
              <i class="bi bi-qr-code me-2" style="color:var(--fsa-cyan)"></i>
              PIX / Boleto à Vista
            </div>
            <p style="font-size:0.8rem;color:var(--fsa-text-muted)">Pagamento único com desconto</p>
            <div class="pricing-price">
              <sup>R$</sup>{{ formatPrice(course.price.fullPrice * 0.9) }}
            </div>
            <p style="font-size:0.8rem;color:var(--fsa-text-muted)">
              <s style="color:var(--fsa-text-muted)">{{ formatCurrency(course.price.fullPrice) }}</s>
              → 10% de desconto
            </p>
            <ul class="pricing-feature-list">
              <li><i class="bi bi-check-circle-fill"></i>Maior desconto disponível</li>
              <li><i class="bi bi-check-circle-fill"></i>Pagamento via PIX instantâneo</li>
              <li><i class="bi bi-check-circle-fill"></i>Cancelamento sem multa em 7 dias</li>
              <li><i class="bi bi-check-circle-fill"></i>Acesso imediato após confirmação</li>
            </ul>
            <NuxtLink :to="`/checkout/${course.slug}/cadastro`" class="btn-fsa-block">
              Inscreva-se e economize
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Guarantee -->
      <div class="guarantee-bar mt-5">
        <div class="row g-3 justify-content-center text-center">
          <div class="col-sm-4 col-md-3" v-for="g in guarantees" :key="g.text">
            <div class="d-flex flex-column align-items-center gap-1">
              <i :class="g.icon" style="font-size:1.4rem;color:var(--fsa-cyan)"></i>
              <span style="font-size:0.8rem;color:var(--fsa-text-secondary)">{{ g.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Course } from '~/data/courses'

const props = defineProps<{ course: Course }>()
const { formatCurrency } = useFormatters()

const formatPrice = (v: number) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const guarantees = [
  { icon: 'bi bi-shield-check', text: 'Garantia de 7 dias' },
  { icon: 'bi bi-award', text: 'Certificado MEC' },
  { icon: 'bi bi-lock', text: 'Pagamento seguro' },
  { icon: 'bi bi-headset', text: 'Suporte dedicado' }
]
</script>

<style scoped>
.guarantee-bar {
  background: var(--fsa-bg-card);
  border: 1px solid var(--fsa-border);
  border-radius: var(--fsa-radius);
  padding: 1.5rem;
}
</style>
