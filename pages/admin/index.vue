<template>
  <div class="dash">
    <!-- Header -->
    <div class="dash-header">
      <div>
        <p class="dash-greeting">{{ greeting }}, Admin</p>
        <h1 class="dash-title">Dashboard</h1>
      </div>
      <NuxtLink to="/admin/cursos/novo" class="btn-fsa-primary">
        <i class="bi bi-plus-lg me-2"></i>Novo Curso
      </NuxtLink>
    </div>

    <!-- Bento Grid -->
    <div class="bento-grid">

      <!-- ── Courses (big left cell) ── -->
      <div class="bento-card bento-courses">
        <div class="bc-head">
          <span class="bc-title"><i class="bi bi-collection me-2"></i>Cursos cadastrados</span>
          <NuxtLink to="/admin/cursos" class="bc-link">
            Ver todos <i class="bi bi-arrow-right ms-1"></i>
          </NuxtLink>
        </div>
        <div class="course-list">
          <div v-for="course in store.courses.slice(0, 6)" :key="course.id" class="cl-item">
            <div
              class="cl-thumb"
              :style="course.banner
                ? `background-image:url('${course.banner}');background-size:cover;background-position:center`
                : `background:${areaGrad(course.area)}`"
            >
              <i v-if="!course.banner" :class="areaIcon(course.area)" class="cl-thumb-icon"></i>
            </div>
            <div class="cl-info">
              <div class="cl-name">{{ course.name }}</div>
              <div class="cl-meta">
                <span class="tag-area" style="font-size:0.65rem">{{ course.area }}</span>
                <span style="opacity:0.4">·</span>
                <span>{{ course.duration }}m</span>
                <span style="opacity:0.4">·</span>
                <span>{{ course.modalities[0] }}</span>
              </div>
            </div>
            <div class="cl-side">
              <span class="cl-status" :class="course.status">{{ statusShort(course.status) }}</span>
              <NuxtLink :to="`/admin/cursos/${course.id}/editar`" class="cl-edit">
                <i class="bi bi-pencil-fill"></i>
              </NuxtLink>
            </div>
          </div>
          <div v-if="store.courses.length === 0" class="cl-empty">
            <i class="bi bi-inbox" style="font-size:2rem;color:var(--fsa-text-muted)"></i>
            <p style="color:var(--fsa-text-muted);margin:0.5rem 0 0;font-size:0.875rem">Nenhum curso cadastrado ainda.</p>
          </div>
        </div>
      </div>

      <!-- ── Right column ── -->
      <div class="bento-right">

        <!-- Metrics 2x2 -->
        <div class="metrics-grid">
          <div class="m-cell m-cyan">
            <div class="m-icon"><i class="bi bi-collection-fill"></i></div>
            <div class="m-val">{{ store.courses.length }}</div>
            <div class="m-lbl">Total</div>
          </div>
          <div class="m-cell m-green">
            <div class="m-icon"><i class="bi bi-check-circle-fill"></i></div>
            <div class="m-val">{{ activeCount }}</div>
            <div class="m-lbl">Ativos</div>
          </div>
          <div class="m-cell m-amber">
            <div class="m-icon"><i class="bi bi-hourglass-split"></i></div>
            <div class="m-val">{{ planningCount }}</div>
            <div class="m-lbl">Planejamento</div>
          </div>
          <div class="m-cell m-purple">
            <div class="m-icon"><i class="bi bi-diagram-3-fill"></i></div>
            <div class="m-val">{{ areaCount }}</div>
            <div class="m-lbl">Áreas</div>
          </div>
        </div>

        <!-- Area breakdown -->
        <div class="bento-card">
          <div class="bc-head">
            <span class="bc-title"><i class="bi bi-bar-chart me-2"></i>Por área</span>
          </div>
          <div class="area-list">
            <div v-for="a in areaBreakdown" :key="a.area" class="al-row">
              <div class="al-top">
                <span class="al-name">{{ a.area }}</span>
                <span class="al-count">{{ a.count }}</span>
              </div>
              <div class="al-track">
                <div class="al-fill" :style="`width:${a.pct}%`"></div>
              </div>
            </div>
            <div v-if="areaBreakdown.length === 0" style="color:var(--fsa-text-muted);font-size:0.8rem;text-align:center;padding:0.75rem 0">
              Sem dados
            </div>
          </div>
        </div>

        <!-- Quick actions -->
        <div class="bento-card">
          <div class="bc-head">
            <span class="bc-title"><i class="bi bi-lightning-fill me-2"></i>Ações rápidas</span>
          </div>
          <div class="qa-list">
            <NuxtLink to="/admin/cursos/novo" class="qa-item">
              <div class="qa-dot" style="background:rgba(56,182,255,0.15)"><i class="bi bi-plus-lg" style="color:var(--fsa-cyan)"></i></div>
              <div><div class="qa-label">Cadastrar curso</div><div class="qa-sub">Manualmente ou via IA</div></div>
              <i class="bi bi-chevron-right qa-arr"></i>
            </NuxtLink>
            <NuxtLink to="/admin/configuracoes" class="qa-item">
              <div class="qa-dot" style="background:rgba(139,92,246,0.15)"><i class="bi bi-image" style="color:#8b5cf6"></i></div>
              <div><div class="qa-label">Banners e site</div><div class="qa-sub">Hero, anúncio, contato</div></div>
              <i class="bi bi-chevron-right qa-arr"></i>
            </NuxtLink>
            <NuxtLink to="/admin/cursos" class="qa-item">
              <div class="qa-dot" style="background:rgba(34,197,94,0.15)"><i class="bi bi-pencil-square" style="color:#22c55e"></i></div>
              <div><div class="qa-label">Gerenciar cursos</div><div class="qa-sub">Editar, excluir, publicar</div></div>
              <i class="bi bi-chevron-right qa-arr"></i>
            </NuxtLink>
            <a href="/" target="_blank" class="qa-item">
              <div class="qa-dot" style="background:rgba(251,191,36,0.15)"><i class="bi bi-box-arrow-up-right" style="color:#fbbf24"></i></div>
              <div><div class="qa-label">Ver site público</div><div class="qa-sub">Abrir em nova aba</div></div>
              <i class="bi bi-chevron-right qa-arr"></i>
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCoursesStore } from '~/stores/courses'

definePageMeta({ layout: 'admin' })
useHead({ title: 'Dashboard — Admin FSA' })

const store = useCoursesStore()
await useAsyncData('courses', () => store.fetchCourses())

const h = new Date().getHours()
const greeting = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'

const activeCount   = computed(() => store.courses.filter(c => c.status === 'ativa').length)
const planningCount = computed(() => store.courses.filter(c => c.status === 'em_planejamento').length)
const areaCount     = computed(() => new Set(store.courses.map(c => c.area)).size)

const areaBreakdown = computed(() => {
  const map: Record<string, number> = {}
  store.courses.forEach(c => { map[c.area] = (map[c.area] ?? 0) + 1 })
  const total = store.courses.length || 1
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([area, count]) => ({ area, count, pct: Math.round(count / total * 100) }))
})

const grads: Record<string, string> = {
  Psicologia:  'linear-gradient(135deg,#0a1a3e,#1a2d6e)',
  Enfermagem:  'linear-gradient(135deg,#0a2a2a,#0d5040)',
  Direito:     'linear-gradient(135deg,#1a0a2e,#2d1a5e)',
  Odontologia: 'linear-gradient(135deg,#1a1a0a,#3a3a1a)',
  Pedagogia:   'linear-gradient(135deg,#0a1a0a,#1a3a1a)'
}
const icons: Record<string, string> = {
  Psicologia: 'bi bi-brain', Enfermagem: 'bi bi-heart-pulse',
  Direito: 'bi bi-building', Odontologia: 'bi bi-emoji-smile', Pedagogia: 'bi bi-mortarboard'
}
const areaGrad = (a: string) => grads[a] ?? 'linear-gradient(135deg,#0a1f3a,#0d2f5a)'
const areaIcon = (a: string) => icons[a] ?? 'bi bi-book'
const statusShort = (s: string) =>
  s === 'ativa' ? 'Ativa' : s === 'em_planejamento' ? 'Planejamento' : 'Inativa'
</script>

<style scoped>
.dash { }

.dash-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 1.75rem;
}
.dash-greeting {
  font-size: 0.72rem; color: var(--fsa-text-muted); margin: 0 0 0.1rem;
  text-transform: uppercase; letter-spacing: 0.1em;
}
.dash-title { font-size: 1.75rem; font-weight: 800; margin: 0; }

/* Bento layout */
.bento-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1rem;
  align-items: start;
}
.bento-right { display: flex; flex-direction: column; gap: 1rem; }
.bento-card {
  background: var(--fsa-bg-card);
  border: 1px solid var(--fsa-border);
  border-radius: var(--fsa-radius);
  overflow: hidden;
}

/* Card header */
.bc-head {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid var(--fsa-border);
}
.bc-title { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--fsa-text-secondary); }
.bc-link  { font-size: 0.75rem; color: var(--fsa-cyan); text-decoration: none; display: flex; align-items: center; transition: color 0.2s; }
.bc-link:hover { color: var(--fsa-cyan-hover); }

/* Course list */
.cl-item {
  display: flex; align-items: center; gap: 0.875rem;
  padding: 0.7rem 1.25rem; transition: background 0.2s; cursor: default;
}
.cl-item:hover { background: rgba(56,182,255,0.03); }
.cl-item + .cl-item { border-top: 1px solid rgba(30,58,95,0.5); }

.cl-thumb {
  width: 42px; height: 42px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.cl-thumb-icon { font-size: 1rem; color: rgba(255,255,255,0.35); }

.cl-info { flex: 1; min-width: 0; }
.cl-name {
  font-size: 0.875rem; font-weight: 600;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0.2rem;
}
.cl-meta { display: flex; align-items: center; gap: 0.3rem; font-size: 0.7rem; color: var(--fsa-text-muted); }

.cl-side { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
.cl-status {
  font-size: 0.65rem; font-weight: 700; padding: 0.15rem 0.5rem;
  border-radius: 20px; white-space: nowrap;
}
.cl-status.ativa           { background: rgba(34,197,94,0.12);  color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }
.cl-status.em_planejamento { background: rgba(249,115,22,0.12); color: #f97316; border: 1px solid rgba(249,115,22,0.25); }
.cl-status.inativa         { background: rgba(100,116,139,0.1); color: #64748b; border: 1px solid rgba(100,116,139,0.2); }

.cl-edit {
  width: 28px; height: 28px; border-radius: 6px;
  background: var(--fsa-bg-secondary); border: 1px solid var(--fsa-border);
  color: var(--fsa-text-muted); font-size: 0.68rem;
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; transition: all 0.2s;
}
.cl-edit:hover { border-color: var(--fsa-cyan); color: var(--fsa-cyan); background: rgba(56,182,255,0.08); }
.cl-empty { padding: 2.5rem; text-align: center; }

/* Metrics 2x2 */
.metrics-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;
}
.m-cell {
  background: var(--fsa-bg-card); border: 1px solid var(--fsa-border);
  border-radius: var(--fsa-radius); padding: 1rem 1rem 0.875rem;
  position: relative; overflow: hidden;
}
.m-cell::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
}
.m-cyan::after   { background: var(--fsa-cyan); }
.m-green::after  { background: #22c55e; }
.m-amber::after  { background: #f59e0b; }
.m-purple::after { background: #8b5cf6; }

.m-icon { font-size: 0.85rem; margin-bottom: 0.5rem; }
.m-cyan   .m-icon { color: var(--fsa-cyan); }
.m-green  .m-icon { color: #22c55e; }
.m-amber  .m-icon { color: #f59e0b; }
.m-purple .m-icon { color: #8b5cf6; }

.m-val { font-size: 1.9rem; font-weight: 800; line-height: 1; margin-bottom: 0.2rem; }
.m-lbl { font-size: 0.65rem; color: var(--fsa-text-muted); text-transform: uppercase; letter-spacing: 0.06em; }

/* Area breakdown */
.area-list { padding: 0.875rem 1.25rem 1rem; }
.al-row { margin-bottom: 0.75rem; }
.al-row:last-child { margin-bottom: 0; }
.al-top { display: flex; justify-content: space-between; margin-bottom: 0.3rem; }
.al-name  { font-size: 0.78rem; font-weight: 600; color: var(--fsa-text-secondary); }
.al-count { font-size: 0.72rem; color: var(--fsa-text-muted); font-weight: 700; }
.al-track { height: 3px; background: var(--fsa-bg-secondary); border-radius: 99px; overflow: hidden; }
.al-fill  { height: 100%; background: linear-gradient(90deg, var(--fsa-cyan), #1E9FE8); border-radius: 99px; transition: width 0.6s ease; }

/* Quick actions */
.qa-item {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.75rem 1.25rem; text-decoration: none;
  color: var(--fsa-text); transition: background 0.2s;
}
.qa-item:hover { background: rgba(56,182,255,0.04); color: var(--fsa-text); }
.qa-item + .qa-item { border-top: 1px solid rgba(30,58,95,0.5); }
.qa-dot {
  width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 0.8rem;
}
.qa-label { font-size: 0.8rem; font-weight: 600; }
.qa-sub   { font-size: 0.68rem; color: var(--fsa-text-muted); }
.qa-arr   { font-size: 0.65rem; color: var(--fsa-text-muted); margin-left: auto; }

/* Responsive */
@media (max-width: 1100px) {
  .bento-grid { grid-template-columns: 1fr; }
  .bento-right { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .metrics-grid { grid-template-columns: repeat(4, 1fr); }
  .bento-right > .bento-card:last-child { grid-column: span 2; }
}
@media (max-width: 640px) {
  .bento-right { grid-template-columns: 1fr; }
  .metrics-grid { grid-template-columns: 1fr 1fr; }
  .bento-right > .bento-card:last-child { grid-column: span 1; }
  .dash-title { font-size: 1.4rem; }
}
</style>
