<template>
  <section class="course-detail-hero">
    <div class="container">
      <div class="fsa-breadcrumb">
        <NuxtLink to="/">Início</NuxtLink>
        <span class="sep"><i class="bi bi-chevron-right"></i></span>
        <NuxtLink to="/cursos">Cursos</NuxtLink>
        <span class="sep"><i class="bi bi-chevron-right"></i></span>
        <span class="current">{{ course.name }}</span>
      </div>

      <div class="row g-5 align-items-center">
        <!-- Image -->
        <div class="col-lg-5">
          <div class="course-image-placeholder" :style="{ background: areaGradient }">
            <i :class="areaIcon" style="font-size:5rem;opacity:0.2;color:#fff"></i>
            <div class="image-badge">
              <i :class="areaIcon" style="color:var(--fsa-cyan)"></i>
              {{ course.area }}
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="col-lg-7">
          <span class="course-badge-type">{{ course.type }}</span>
          <h1 class="course-detail-title">{{ course.name }}</h1>

          <div class="mb-3">
            <span class="course-info-badge">
              <i class="bi bi-laptop"></i>
              {{ course.modalities.join(' · ') }}
            </span>
            <span class="course-info-badge">
              <i class="bi bi-grid"></i>
              {{ course.area }}
            </span>
            <span class="course-info-badge">
              <i class="bi bi-award"></i>
              {{ course.certificate }}
            </span>
          </div>

          <div class="mb-3">
            <span class="course-info-badge">
              <i class="bi bi-clock"></i>
              {{ course.duration }} meses
            </span>
            <span class="course-info-badge">
              <i class="bi bi-book"></i>
              {{ course.workload }}h de carga horária
            </span>
            <span class="course-info-badge">
              <i class="bi bi-person-badge"></i>
              {{ course.professor }}
            </span>
          </div>

          <p style="color:var(--fsa-text-secondary);font-size:0.95rem;margin-bottom:1.5rem;line-height:1.7">
            {{ course.description }}
          </p>

          <div class="mb-4">
            <div class="course-price-from">A partir de</div>
            <div class="course-price-value">
              <sup>R$</sup>{{ formatBoleto(course.price.boleto) }}<span style="font-size:1rem;color:var(--fsa-text-muted);font-weight:400">/mês</span>
            </div>
            <div style="font-size:0.8rem;color:var(--fsa-text-muted);margin-top:0.2rem">
              em {{ course.price.installments }}x no boleto
            </div>
          </div>

          <div class="d-flex flex-column flex-sm-row gap-3">
            <NuxtLink
              :to="`/checkout/${course.slug}/cadastro`"
              class="btn-fsa-block"
              style="max-width:280px"
            >
              <i class="bi bi-mortarboard me-2"></i>Inscreva-se agora
            </NuxtLink>
            <a href="#investimento" class="btn-fsa-outline" style="max-width:200px;display:flex;align-items:center;justify-content:center">
              Ver investimento
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Course } from '~/data/courses'

const props = defineProps<{ course: Course }>()

const areaGradients: Record<string, string> = {
  Psicologia: 'linear-gradient(135deg, #0a1a3e 0%, #1a2d6e 100%)',
  Enfermagem: 'linear-gradient(135deg, #0a2a2a 0%, #0d4040 100%)',
  Direito: 'linear-gradient(135deg, #1a0a2e 0%, #2d1a5e 100%)',
  Odontologia: 'linear-gradient(135deg, #1a1a0a 0%, #3a3a1a 100%)',
  Pedagogia: 'linear-gradient(135deg, #0a1a0a 0%, #1a3a1a 100%)'
}
const areaIcons: Record<string, string> = {
  Psicologia: 'bi bi-brain',
  Enfermagem: 'bi bi-heart-pulse',
  Direito: 'bi bi-building',
  Odontologia: 'bi bi-emoji-smile',
  Pedagogia: 'bi bi-mortarboard'
}

const areaGradient = computed(() => areaGradients[props.course.area] ?? 'linear-gradient(135deg, #0a1f3a 0%, #0d2f5a 100%)')
const areaIcon = computed(() => areaIcons[props.course.area] ?? 'bi bi-book')

const formatBoleto = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
</script>

<style scoped>
.image-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(7,15,28,0.85);
  border: 1px solid var(--fsa-border);
  border-radius: 6px;
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  backdrop-filter: blur(8px);
}
.course-image-placeholder { position: relative; }
</style>
