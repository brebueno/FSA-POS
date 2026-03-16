<template>
  <div class="course-card">
    <!-- Card Image -->
    <div
      class="course-card-image"
      :style="course.banner
        ? `background-image:url('${course.banner}');background-size:cover;background-position:center`
        : `background:${areaGradient}`"
    >
      <div v-if="!course.banner" class="area-overlay">
        <i :class="areaIcon" class="area-icon"></i>
      </div>
      <div class="card-img-overlay-top">
        <span class="tag-area">{{ course.area }}</span>
      </div>
    </div>

    <!-- Card Body -->
    <div class="course-card-body">
      <div class="course-card-badge">PÓS-GRADUAÇÃO · {{ course.type }}</div>

      <h5 class="course-card-title">{{ course.name }}</h5>

      <div class="mb-2">
        <span
          v-for="modality in course.modalities"
          :key="modality"
          class="course-card-modality"
          :class="modalityClass(modality)"
        >
          <i :class="modalityIcon(modality)"></i>
          {{ modality }}
        </span>
      </div>

      <div class="d-flex gap-3 mb-2">
        <span class="d-flex align-items-center gap-1" style="font-size:0.78rem;color:var(--fsa-text-muted)">
          <i class="bi bi-clock" style="color:var(--fsa-cyan)"></i>
          {{ course.duration }} meses
        </span>
        <span class="d-flex align-items-center gap-1" style="font-size:0.78rem;color:var(--fsa-text-muted)">
          <i class="bi bi-book" style="color:var(--fsa-cyan)"></i>
          {{ course.workload }}h
        </span>
      </div>

      <div class="mt-auto">
        <div class="course-card-price-label">A partir de</div>
        <div class="course-card-price">
          <span class="price-currency">R$</span><span class="price-value">{{ formatInstallment(course.price.boleto) }}</span><span class="price-period">/mês</span>
        </div>
        <div style="font-size:0.75rem;color:var(--fsa-text-muted);margin-bottom:1rem">
          em {{ course.price.installments }}x
        </div>

        <NuxtLink
          :to="`/cursos/${course.slug}`"
          class="btn-fsa-block"
          style="font-size:0.875rem;padding:0.65rem 1rem"
        >
          Ver curso
        </NuxtLink>
      </div>
    </div>
  </div>
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

const areaGradient = computed(
  () => areaGradients[props.course.area] ?? 'linear-gradient(135deg, #0a1f3a 0%, #0d2f5a 100%)'
)
const areaIcon = computed(() => areaIcons[props.course.area] ?? 'bi bi-book')

const modalityClass = (m: string) => {
  if (m === 'EAD') return 'modality-ead'
  if (m === 'Híbrido') return 'modality-hibrido'
  return 'modality-live'
}
const modalityIcon = (m: string) => {
  if (m === 'EAD') return 'bi bi-laptop'
  if (m === 'Híbrido') return 'bi bi-people'
  return 'bi bi-camera-video'
}

const formatInstallment = (v: number) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
</script>

<style scoped>
.card-img-overlay-top {
  position: absolute;
  top: 12px;
  left: 12px;
}
.course-card-image { position: relative; }
</style>
