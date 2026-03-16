<template>
  <div>
    <AppHeader />
    <main>
      <!-- Page Header -->
      <section style="background:var(--fsa-bg-secondary);padding:3rem 0;border-bottom:1px solid var(--fsa-border)">
        <div class="container">
          <div class="fsa-breadcrumb">
            <NuxtLink to="/">Início</NuxtLink>
            <span class="sep"><i class="bi bi-chevron-right"></i></span>
            <span class="current">Cursos</span>
          </div>
          <h1 style="font-size:2rem;font-weight:800;margin-bottom:0.5rem">
            Todos os Cursos de Pós-Graduação
          </h1>
          <p style="color:var(--fsa-text-secondary)">
            {{ filteredCourses.length }} curso(s) encontrado(s)
          </p>
        </div>
      </section>

      <!-- Filters -->
      <section style="background:var(--fsa-bg-primary);padding:1.5rem 0;border-bottom:1px solid var(--fsa-border);position:sticky;top:69px;z-index:100">
        <div class="container">
          <div class="row g-3 align-items-end">
            <div class="col-md-3">
              <label class="fsa-label">Área</label>
              <select v-model="filterArea" class="fsa-form-control" @change="applyFilters">
                <option value="">Todas as áreas</option>
                <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="fsa-label">Modalidade</label>
              <select v-model="filterModality" class="fsa-form-control" @change="applyFilters">
                <option value="">Todas as modalidades</option>
                <option value="EAD">EAD</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Presencial">Presencial</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="fsa-label">Duração</label>
              <select v-model="filterDuration" class="fsa-form-control" @change="applyFilters">
                <option value="">Qualquer duração</option>
                <option value="12">Até 12 meses</option>
                <option value="18">18 meses</option>
                <option value="24">24 meses ou mais</option>
              </select>
            </div>
            <div class="col-md-3">
              <button class="btn-fsa-outline w-100" @click="clearFilters" style="border-radius:var(--fsa-radius-sm)">
                <i class="bi bi-x-circle me-1"></i>Limpar filtros
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Courses Grid -->
      <section style="padding:3rem 0 5rem">
        <div class="container">
          <div v-if="filteredCourses.length > 0" class="row g-4">
            <div
              v-for="course in filteredCourses"
              :key="course.id"
              class="col-sm-6 col-lg-4 col-xl-3"
            >
              <CourseCard :course="course" />
            </div>
          </div>

          <div v-else class="text-center py-5">
            <i class="bi bi-search" style="font-size:3rem;color:var(--fsa-text-muted)"></i>
            <h4 style="color:var(--fsa-text-secondary);margin-top:1rem">Nenhum curso encontrado</h4>
            <p style="color:var(--fsa-text-muted)">Tente ajustar os filtros de busca</p>
            <button class="btn-fsa-outline" @click="clearFilters">Limpar filtros</button>
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import CourseCard from '~/components/ui/CourseCard.vue'
import { useCoursesStore } from '~/stores/courses'

useHead({ title: 'Cursos de Pós-Graduação — Faculdade Santo Antônio' })

const store = useCoursesStore()
await useAsyncData('courses', () => store.fetchCourses())

const filterArea     = ref('')
const filterModality = ref('')
const filterDuration = ref('')

const areas = computed(() => store.areas)
const filteredCourses = computed(() => store.filteredCourses)

const applyFilters = () => {
  store.setFilterArea(filterArea.value)
  store.setFilterModality(filterModality.value)
  store.setFilterDuration(filterDuration.value)
}

const clearFilters = () => {
  filterArea.value = ''
  filterModality.value = ''
  filterDuration.value = ''
  store.clearFilters()
}
</script>
