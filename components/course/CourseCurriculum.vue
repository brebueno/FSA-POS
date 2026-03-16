<template>
  <section class="course-section bg-section-alt" style="padding:4rem 0">
    <div class="container">
      <div class="row g-4 mb-4">
        <div class="col-12 text-center">
          <div class="course-section-label">Grade Curricular</div>
          <h2 class="course-section-title">Veja o que você vai aprender</h2>
          <p style="color:var(--fsa-text-secondary);margin-top:0.5rem">
            {{ course.curriculum.length }} disciplinas · {{ course.workload }}h de carga horária total
          </p>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-lg-8 mx-auto">
          <div class="fsa-accordion accordion" id="curriculumAccordion">
            <div
              v-for="(item, index) in course.curriculum"
              :key="index"
              class="accordion-item"
            >
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  :class="{ collapsed: index !== 0 }"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#collapse${index}`"
                  :aria-expanded="index === 0 ? 'true' : 'false'"
                  :aria-controls="`collapse${index}`"
                >
                  <span class="discipline-number">{{ String(index + 1).padStart(2, '0') }}</span>
                  <span class="ms-2">{{ item }}</span>
                </button>
              </h2>
              <div
                :id="`collapse${index}`"
                class="accordion-collapse collapse"
                :class="{ show: index === 0 }"
                data-bs-parent="#curriculumAccordion"
              >
                <div class="accordion-body">
                  <p>
                    Esta disciplina aborda os fundamentos e aplicações práticas de
                    <strong style="color:var(--fsa-cyan)">{{ item }}</strong>, com base nas
                    evidências mais recentes e nas diretrizes nacionais e internacionais.
                  </p>
                  <div class="d-flex flex-wrap gap-2 mt-2">
                    <span class="disc-tag"><i class="bi bi-book"></i> Teórica</span>
                    <span class="disc-tag"><i class="bi bi-tools"></i> Prática</span>
                    <span class="disc-tag"><i class="bi bi-laptop"></i> Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Download PPC CTA -->
      <div class="text-center mt-4">
        <p style="color:var(--fsa-text-muted);font-size:0.875rem">
          <i class="bi bi-info-circle me-1"></i>
          Grade curricular sujeita a ajustes. Consulte o PPC completo para detalhes.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Course } from '~/data/courses'
defineProps<{ course: Course }>()
</script>

<style scoped>
.discipline-number {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--fsa-cyan);
  background: rgba(56,182,255,0.1);
  border: 1px solid rgba(56,182,255,0.2);
  border-radius: 4px;
  padding: 0.1rem 0.4rem;
  flex-shrink: 0;
}
.disc-tag {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--fsa-text-muted);
  background: rgba(30,58,95,0.5);
  border: 1px solid var(--fsa-border);
  border-radius: 20px;
  padding: 0.2rem 0.6rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
</style>
