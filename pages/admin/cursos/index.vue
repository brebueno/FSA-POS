<template>
  <div class="dash">
    <div class="dash-header">
      <div>
        <h1 class="dash-title">Meus Cursos</h1>
        <p class="dash-sub">
          Gerenciando {{ store.courses.length }} curso(s) em sua instituição
        </p>
      </div>
      <NuxtLink to="/admin/cursos/novo" class="admin-btn-modern">
        <i class="bi bi-plus-lg"></i> Novo Curso
      </NuxtLink>
    </div>

    <div class="admin-card-base table-card-neo">
      <div class="table-responsive">
        <table class="neo-table">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Área</th>
              <th>Modalidades</th>
              <th>Carga Horária</th>
              <th>Valor (Mensal)</th>
              <th>Status</th>
              <th>Mídia</th>
              <th class="text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="store.courses.length === 0">
              <td colspan="8" class="text-center py-5 text-muted">
                <i class="bi bi-inbox fs-2 mb-2 d-block"></i>
                Nenhum curso encontrado.
              </td>
            </tr>
            <tr v-for="course in store.courses" :key="course.id" class="neo-tr">
              <td>
                <div class="course-name-cell">
                  <span class="c-name">{{ course.name }}</span>
                  <span class="c-slug">/{{ course.slug }}</span>
                </div>
              </td>
              <td><span class="tag-area-neo">{{ course.area }}</span></td>
              <td>
                <div class="d-flex gap-1 flex-wrap">
                  <span v-for="m in course.modalities" :key="m" class="modality-pill-neo" :class="{'ead': m === 'EAD', 'hibrido': m !== 'EAD'}">
                    {{ m }}
                  </span>
                </div>
              </td>
              <td class="text-muted-neo">{{ course.duration }}h</td>
              <td class="price-cell">{{ formatCurrency(course.price.boleto) }}</td>
              <td>
                <span class="status-pill-neo" :class="course.status">
                  <span class="status-dot"></span>
                  {{ statusLabel(course.status) }}
                </span>
              </td>
              <td>
                <div v-if="course.banner" class="media-badge success">
                  <i class="bi bi-image"></i> Ok
                </div>
                <div v-else class="media-badge missing">—</div>
              </td>
              <td>
                <div class="action-cell">
                  <NuxtLink :to="`/cursos/${course.slug}`" target="_blank" class="neo-action-btn" title="Ver Página">
                    <i class="bi bi-box-arrow-up-right"></i>
                  </NuxtLink>
                  <NuxtLink :to="`/admin/cursos/${course.id}/editar`" class="neo-action-btn" title="Editar">
                    <i class="bi bi-pencil"></i>
                  </NuxtLink>
                  <button @click="deleteCourse(course.id, course.name)" class="neo-action-btn danger" title="Remover">
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
  if (s === 'ativa') return 'Ativo'
  if (s === 'em_planejamento') return 'Planejamento'
  return 'Inativo'
}

const deleteCourse = async (id: number, name: string) => {
  if (!confirm(`Remover definitivamente "${name}"? Esta ação não pode ser desfeita.`)) return
  await $fetch(`/api/courses/${id}`, { method: 'DELETE' })
  await store.fetchCourses()
}
</script>

<style scoped>
.dash-header {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 2rem;
}
.dash-title { font-size: 2rem; font-weight: 800; margin: 0; line-height: 1; text-shadow: 0 0 30px rgba(255,255,255,0.1); }
.dash-sub { font-size: 0.85rem; color: var(--fsa-text-muted); margin: 0.5rem 0 0; }

.table-card-neo { padding: 0; }

/* Neo Table Setup */
.neo-table { width: 100%; border-collapse: collapse; text-align: left; }
.neo-table th {
  background: rgba(0,0,0,0.15); border-bottom: 1px solid var(--fsa-border-glass);
  padding: 1rem 1.5rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.05em; color: var(--fsa-text-muted); white-space: nowrap;
}
.neo-tr { transition: background 0.2s; border-bottom: 1px solid var(--fsa-border-glass); }
.neo-tr:last-child { border-bottom: none; }
.neo-tr:hover { background: rgba(255,255,255,0.02); }
.neo-table td { padding: 1rem 1.5rem; vertical-align: middle; white-space: nowrap; }

/* Cell Styles Neo */
.course-name-cell { display: flex; flex-direction: column; gap: 0.15rem; }
.c-name { font-size: 0.9rem; font-weight: 600; color: var(--fsa-text); }
.c-slug { font-size: 0.75rem; color: var(--fsa-text-muted); }

.tag-area-neo {
  background: rgba(255,255,255,0.05); padding: 0.2rem 0.6rem;
  border-radius: 20px; color: var(--fsa-text-secondary); font-size: 0.75rem; font-weight: 600;
  border: 1px solid rgba(255,255,255,0.05); display: inline-block;
}

.modality-pill-neo {
  font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.5rem;
  border-radius: 6px; letter-spacing: 0.05em;
}
.modality-pill-neo.ead { background: rgba(56, 182, 255, 0.1); color: var(--fsa-cyan); border: 1px solid rgba(56, 182, 255, 0.2); }
.modality-pill-neo.hibrido { background: rgba(167, 139, 250, 0.1); color: #a78bfa; border: 1px solid rgba(167, 139, 250, 0.2); }

.text-muted-neo { color: var(--fsa-text-muted); font-size: 0.85rem; font-weight: 500; }
.price-cell { color: var(--fsa-text); font-weight: 600; font-family: monospace; font-size: 0.95rem; }

.status-pill-neo {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem;
  border-radius: 20px; border: 1px solid transparent;
}
.status-dot { width: 6px; height: 6px; border-radius: 50%; }
.status-pill-neo.ativa { background: rgba(52, 211, 153, 0.1); color: #34d399; border-color: rgba(52, 211, 153, 0.2); }
.status-pill-neo.ativa .status-dot { background: #34d399; box-shadow: 0 0 8px #34d399; }
.status-pill-neo.em_planejamento { background: rgba(251, 191, 36, 0.1); color: #fbbf24; border-color: rgba(251, 191, 36, 0.2); }
.status-pill-neo.em_planejamento .status-dot { background: #fbbf24; box-shadow: 0 0 8px #fbbf24; }
.status-pill-neo.inativa { background: rgba(148, 163, 184, 0.1); color: #94a3b8; border-color: rgba(148, 163, 184, 0.2); }
.status-pill-neo.inativa .status-dot { background: #94a3b8; }

.media-badge { font-size: 0.8rem; font-weight: 500; }
.media-badge.success { color: #34d399; }
.media-badge.missing { color: var(--fsa-text-muted); }

/* Row Actions Neo */
.action-cell { display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; }
.neo-action-btn {
  width: 32px; height: 32px; border-radius: 8px;
  background: rgba(255,255,255,0.03); border: 1px solid var(--fsa-border-glass);
  color: var(--fsa-text-secondary); font-size: 0.85rem;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; text-decoration: none; cursor: pointer;
}
.neo-action-btn:hover {
  background: var(--fsa-cyan); color: #000; border-color: var(--fsa-cyan);
  box-shadow: 0 4px 12px rgba(56, 182, 255, 0.2);
}
.neo-action-btn.danger:hover {
  background: #ef4444; color: #fff; border-color: #ef4444;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}
</style>
