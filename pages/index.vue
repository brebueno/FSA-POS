<template>
  <div>
    <AppHeader />
    <main>
      <HeroSection />
      <CoursesCarousel />
      <ValueProp />
      <WhyFSA />
      <Testimonials />
      <LeadForm />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import HeroSection from '~/components/home/HeroSection.vue'
import CoursesCarousel from '~/components/home/CoursesCarousel.vue'
import ValueProp from '~/components/home/ValueProp.vue'
import WhyFSA from '~/components/home/WhyFSA.vue'
import Testimonials from '~/components/home/Testimonials.vue'
import LeadForm from '~/components/home/LeadForm.vue'
import { useCoursesStore } from '~/stores/courses'

const store = useCoursesStore()
await useAsyncData('courses', () => store.fetchCourses())

useHead({
  title: 'Pós-Graduação — Faculdade Santo Antônio | Cursos Reconhecidos pelo MEC',
  meta: [
    {
      name: 'description',
      content:
        'Cursos de Pós-Graduação Lato Sensu em Enfermagem, Psicologia e mais. Modalidades EAD e Híbrido. Credenciada pelo MEC. Inscrições abertas para 2026.'
    }
  ]
})
</script>
