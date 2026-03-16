<template>
  <div>
    <div class="admin-content-header">
      <div>
        <h1>Cursos</h1>
        <p style="color:var(--fsa-text-muted);font-size:0.85rem;margin:0">
          {{ store.courses.length }} curso(s) cadastrado(s)
        </p>
      </div>
      <NuxtLink to="/admin/cursos/novo" class="btn-fsa-primary">
        <i class="bi bi-plus-lg me-2"></i>Novo Curso
      </NuxtLink>
    </div>

    <div style="background:var(--fsa-bg-card);border:1px solid var(--fsa-border);border-radius:var(--fsa-radius);padding:1.5rem">
      <div style="overflow-x:auto">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Área</th>
              <th>Modalidade</th>
              <th>Duração</th>
              <th>Preço/mês</th>
              <th>Status</th>
              <th>Banner</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in store.courses" :key="course.id">
              <td>
                <div style="font-weight:600">{{ course.name }}</div>
                <div style="font-size:0.75rem;color:var(--fsa-text-muted)">/cursos/{{ course.slug }}</div>
              </td>
              <td><span class="tag-area">{{ course.area }}</span></td>
              <td>
                <span v-for="m in course.modalities" :key="m" class="course-card-modality"
                  :class="m === 'EAD' ? 'modality-ead' : 'modality-hibrido'" style="margin-right:4px">{{ m }}</span>
              </td>
              <td style="color:var(--fsa-text-secondary)">{{ course.duration }}m</td>
              <td style="color:var(--fsa-cyan);font-weight:700">
                {{ formatCurrency(course.price.boleto) }}
              </td>
              <td>
                <span class="status-badge"
                  :class="course.status === 'ativa' ? 'status-ativa' : course.status === 'em_planejamento' ? 'status-planejamento' : 'status-inativa'">
                  <i :class="course.status === 'ativa' ? 'bi bi-circle-fill' : 'bi bi-clock'"></i>
                  {{ statusLabel(course.status) }}
                </span>
              </td>
              <td>
                <span v-if="course.banner" style="color:#22c55e;font-size:0.8rem">
                  <i class="bi bi-image-fill"></i> Sim
                </span>
                <span v-else style="color:var(--fsa-text-muted);font-size:0.8rem">—</span>
              </td>
              <td>
                <div class="d-flex gap-2">
                  <NuxtLink :to="`/cursos/${course.slug}`" class="action-btn" title="Ver no site">
                    <i class="bi bi-eye"></i>
                  </NuxtLink>
                  <NuxtLink :to="`/admin/cursos/${course.id}/editar`" class="action-btn" title="Editar">
                    <i class="bi bi-pencil"></i>
                  </NuxtLink>
                  <button class="action-btn danger" title="Excluir" type="button" @click="deleteCourse(course.id, course.name)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCoursesStore } from '~/stores/courses'

definePageMeta({ layout: 'admin' })
useHead({ title: 'Cursos — Admin FSA' })

const store = useCoursesStore()
const { formatCurrency } = useFormatters()
await useAsyncData('courses', () => store.fetchCourses())

const statusLabel = (s: string) => {
  if (s === 'ativa') return 'Ativa'
  if (s === 'em_planejamento') return 'Planejamento'
  return 'Inativa'
}

const deleteCourse = async (id: number, name: string) => {
  if (!confirm(`Excluir "${name}"? Esta ação não pode ser desfeita.`)) return
  await $fetch(`/api/courses/${id}`, { method: 'DELETE' })
  await store.fetchCourses()
}
</script>

<style scoped>
.action-btn {
  width: 30px; height: 30px; border-radius: 6px;
  background: var(--fsa-bg-secondary); border: 1px solid var(--fsa-border);
  color: var(--fsa-text-secondary); font-size: 0.8rem;
  display: inline-flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.25s; text-decoration: none;
}
.action-btn:hover { border-color: var(--fsa-cyan); color: var(--fsa-cyan); }
.action-btn.danger:hover { border-color: #ef4444; color: #ef4444; }
</style>
