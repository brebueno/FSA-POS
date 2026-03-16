<template>
  <section class="section-pad bg-section-alt" id="cursos">
    <div class="container">
      <div class="text-center mb-5">
        <div class="section-label">Nossos cursos</div>
        <h2 class="section-title">Cursos em Destaque</h2>
        <p class="section-subtitle">
          Escolha o curso ideal para alavancar sua carreira profissional
        </p>
      </div>

      <div class="courses-carousel-wrap">
        <button class="carousel-prev-btn" @click="prev" aria-label="Anterior">
          <i class="bi bi-chevron-left"></i>
        </button>

        <div class="courses-grid" ref="gridRef">
          <div class="row g-4">
            <div
              v-for="course in visibleCourses"
              :key="course.id"
              class="col-sm-6 col-lg-3"
            >
              <CourseCard :course="course" />
            </div>
          </div>
        </div>

        <button class="carousel-next-btn" @click="next" aria-label="Próximo">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>

      <div class="text-center mt-4">
        <NuxtLink to="/cursos" class="btn-fsa-outline">
          Ver todos os cursos <i class="bi bi-arrow-right ms-1"></i>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CourseCard from '~/components/ui/CourseCard.vue'
import { useCoursesStore } from '~/stores/courses'

const store = useCoursesStore()
const currentPage = ref(0)
const itemsPerPage = 4

const allCourses = computed(() => store.courses)
const totalPages = computed(() => Math.ceil(allCourses.value.length / itemsPerPage))

const visibleCourses = computed(() => {
  const start = currentPage.value * itemsPerPage
  return allCourses.value.slice(start, start + itemsPerPage)
})

const next = () => {
  if (currentPage.value < totalPages.value - 1) currentPage.value++
  else currentPage.value = 0
}

const prev = () => {
  if (currentPage.value > 0) currentPage.value--
  else currentPage.value = totalPages.value - 1
}
</script>
