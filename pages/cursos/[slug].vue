<template>
  <div>
    <!-- Minimal navbar for course detail -->
    <nav class="fsa-navbar navbar">
      <div class="container d-flex align-items-center justify-content-between">
        <NuxtLink to="/">
          <FsaLogo size="sm" />
        </NuxtLink>
        <div class="d-flex align-items-center gap-3">
          <NuxtLink to="/cursos" class="nav-link d-none d-md-block" style="color:var(--fsa-text-secondary)">
            <i class="bi bi-arrow-left me-1"></i>Voltar aos cursos
          </NuxtLink>
          <NuxtLink
            v-if="course"
            :to="`/checkout/${course.slug}/cadastro`"
            class="btn-fsa-primary"
          >
            <i class="bi bi-mortarboard me-1"></i>Inscreva-se
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Not Found -->
    <div v-if="!course" class="text-center py-5">
      <i class="bi bi-exclamation-triangle" style="font-size:3rem;color:var(--fsa-text-muted)"></i>
      <h3 style="margin-top:1rem;color:var(--fsa-text-secondary)">Curso não encontrado</h3>
      <NuxtLink to="/cursos" class="btn-fsa-outline mt-3">Ver todos os cursos</NuxtLink>
    </div>

    <main v-if="course">
      <!-- Hero -->
      <CourseHero :course="course" />

      <div style="background: linear-gradient(180deg, var(--fsa-bg-primary) 0%, var(--fsa-bg-secondary) 100%);">
        <!-- About -->
        <CourseAbout :course="course" />

        <!-- Pricing (O seu futuro começa aqui) -->
        <CoursePricing :course="course" />
      </div>

      <!-- Curriculum -->
      <CourseCurriculum :course="course" />

      <!-- Institution + Contact -->
      <CourseContact :course="course" />

      <!-- Related courses -->
      <section v-if="related.length > 0" class="section-pad-sm" style="background:var(--fsa-bg-secondary)">
        <div class="container">
          <div class="section-label">Outros cursos</div>
          <h3 style="font-weight:700;margin-bottom:2rem">Outros cursos que você pode gostar</h3>
          <div class="row g-4">
            <div v-for="c in related" :key="c.id" class="col-sm-6 col-lg-4">
              <CourseCard :course="c" />
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import FsaLogo from '~/components/ui/FsaLogo.vue'
import CourseCard from '~/components/ui/CourseCard.vue'
import CourseHero from '~/components/course/CourseHero.vue'
import CourseAbout from '~/components/course/CourseAbout.vue'
import CourseCurriculum from '~/components/course/CourseCurriculum.vue'
import CoursePricing from '~/components/course/CoursePricing.vue'
import CourseContact from '~/components/course/CourseContact.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import { useCoursesStore } from '~/stores/courses'

const route = useRoute()
const store = useCoursesStore()

const course = computed(() => store.getCourseBySlug(route.params.slug as string))
const related = computed(() =>
  course.value ? store.relatedCourses(course.value.slug, course.value.area) : []
)

useHead(() => ({
  title: course.value
    ? `${course.value.name} — Pós-Graduação FSA`
    : 'Curso não encontrado — FSA',
  meta: [
    {
      name: 'description',
      content: course.value?.description ?? ''
    }
  ]
}))
</script>
