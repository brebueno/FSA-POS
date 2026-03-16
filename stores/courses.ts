import { defineStore } from 'pinia'
import type { Course } from '~/data/courses'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [] as Course[],
    filterArea: '' as string,
    filterModality: '' as string,
    filterDuration: '' as string
  }),

  getters: {
    featuredCourses: (state) => state.courses.filter((c) => c.featured),

    filteredCourses: (state) => {
      return state.courses.filter((c) => {
        const matchArea = !state.filterArea || c.area === state.filterArea
        const matchModality =
          !state.filterModality || c.modalities.includes(state.filterModality)
        const matchDuration =
          !state.filterDuration ||
          (state.filterDuration === '12' && c.duration <= 12) ||
          (state.filterDuration === '18' && c.duration === 18) ||
          (state.filterDuration === '24' && c.duration >= 24)
        return matchArea && matchModality && matchDuration
      })
    },

    areas: (state) => [...new Set(state.courses.map((c) => c.area))],

    getCourseBySlug: (state) => (slug: string) =>
      state.courses.find((c) => c.slug === slug),

    relatedCourses: (state) => (currentSlug: string, area: string) =>
      state.courses.filter((c) => c.slug !== currentSlug && c.area === area).slice(0, 3)
  },

  actions: {
    async fetchCourses() {
      const data = await $fetch<Course[]>('/api/courses')
      this.courses = data
    },
    setFilterArea(area: string) {
      this.filterArea = area
    },
    setFilterModality(modality: string) {
      this.filterModality = modality
    },
    setFilterDuration(duration: string) {
      this.filterDuration = duration
    },
    clearFilters() {
      this.filterArea = ''
      this.filterModality = ''
      this.filterDuration = ''
    }
  }
})
