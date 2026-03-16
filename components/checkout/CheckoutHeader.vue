<template>
  <header class="checkout-header">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <!-- Logo -->
        <NuxtLink to="/">
          <FsaLogo size="sm" />
        </NuxtLink>

        <!-- Course info -->
        <div class="course-header-info">
          <span class="course-header-name">{{ courseName }}</span>
          <span v-if="modality" class="course-header-meta">
            <span class="course-card-modality" :class="modalityClass">
              <i :class="modalityIcon"></i>
              {{ modality }}
            </span>
          </span>
        </div>

        <!-- Step Indicator -->
        <StepIndicator :current-step="currentStep" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import FsaLogo from '~/components/ui/FsaLogo.vue'
import StepIndicator from '~/components/checkout/StepIndicator.vue'

const props = defineProps<{
  courseName: string
  modality?: string
  currentStep: number
}>()

const modalityClass = computed(() => {
  if (props.modality === 'EAD') return 'modality-ead'
  if (props.modality === 'Híbrido') return 'modality-hibrido'
  return 'modality-live'
})
const modalityIcon = computed(() => {
  if (props.modality === 'EAD') return 'bi bi-laptop'
  if (props.modality === 'Híbrido') return 'bi bi-people'
  return 'bi bi-camera-video'
})
</script>

<style scoped>
.course-header-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}
.course-header-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--fsa-text);
  max-width: 240px;
  text-align: center;
  line-height: 1.2;
}
.course-header-meta { display: flex; align-items: center; }
</style>
