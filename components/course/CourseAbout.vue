<template>
  <section class="course-section">
    <div class="container">
      <!-- About the Course -->
      <div class="row g-5 mb-5">
        <div class="col-lg-4">
          <div class="course-section-label">O curso</div>
          <h2 class="course-section-title" style="font-size: 2rem; color: #fff;">Aqui, conhecimento vira transformação profissional e potencializa o seu futuro</h2>
          <div class="section-divider"></div>
        </div>
        <div class="col-lg-8">
          <p style="color:var(--fsa-text-secondary);font-size:1rem;line-height:1.8">
            {{ course.about }}
          </p>
        </div>
      </div>

      <!-- Target audience -->
      <div class="row g-5">
        <div class="col-lg-4">
          <div class="course-section-label">Público-alvo</div>
          <h2 class="course-section-title" style="font-size: 2rem; color: #fff;">Para quem esse curso é indicado</h2>
          <div class="section-divider"></div>
        </div>
        <div class="col-lg-8">
          <div class="target-card">
            <div class="target-icon">
              <i class="bi bi-people-fill"></i>
            </div>
            <div>
              <p style="color:var(--fsa-text-secondary);font-size:1rem;line-height:1.8;margin:0">
                {{ course.target }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Course } from '~/data/courses'
defineProps<{ course: Course }>()
</script>

<style scoped>
.section-divider {
  width: 40px;
  height: 3px;
  background: var(--fsa-cyan);
  border-radius: 2px;
  margin-top: 1rem;
}
.target-card {
  background: var(--fsa-bg-card);
  border: 1px solid var(--fsa-border);
  border-left: 4px solid var(--fsa-cyan);
  border-radius: var(--fsa-radius-sm);
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.target-icon {
  width: 44px;
  height: 44px;
  background: rgba(56,182,255,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--fsa-cyan);
  flex-shrink: 0;
}
</style>
