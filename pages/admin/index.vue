<template>
  <div class="dash">
    <!-- Header -->
    <div class="dash-header">
      <div>
        <p class="dash-greeting">{{ greeting }}, Admin</p>
        <h1 class="dash-title">Visão Geral</h1>
      </div>
      <div class="d-flex gap-2">
        <NuxtLink to="/admin/configuracoes" class="admin-btn-outline-modern">
          <i class="bi bi-gear"></i> Configurações
        </NuxtLink>
        <NuxtLink to="/admin/cursos/novo" class="admin-btn-modern">
          <i class="bi bi-plus-lg"></i> Novo Curso
        </NuxtLink>
      </div>
    </div>

    <!-- Bento Grid -->
    <div class="bento-grid">

      <!-- ── Courses (big left cell) ── -->
      <div class="admin-card-base bento-courses">
        <div class="bc-head">
          <span class="bc-title"><i class="bi bi-collection me-2 text-cyan"></i>Cursos Recentes</span>
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
                <span class="tag-area-neo">{{ course.area }}</span>
                <span class="meta-dot">·</span>
                <span>{{ course.duration }}m</span>
                <span class="meta-dot">·</span>
                <span>{{ course.modalities[0] }}</span>
              </div>
            </div>
            <div class="cl-side">
              <span class="status-pill-neo" :class="course.status">
                <span class="status-dot"></span>
                {{ statusShort(course.status) }}
              </span>
              <NuxtLink :to="`/admin/cursos/${course.id}/editar`" class="cl-edit-neo">
                <i class="bi bi-pencil"></i>
              </NuxtLink>
            </div>
          </div>
          <div v-if="store.courses.length === 0" class="cl-empty">
            <div class="empty-icon-box"><i class="bi bi-inbox"></i></div>
            <p>Nenhum curso cadastrado ainda.</p>
          </div>
        </div>
      </div>

      <!-- ── Right column ── -->
      <div class="bento-right">

        <!-- Metrics 2x2 Neo -->
        <div class="metrics-grid">
          <div class="m-cell-neo">
            <div class="m-icon-box m-cyan"><i class="bi bi-journal-bookmark"></i></div>
            <div class="m-content">
              <div class="m-lbl">Total de Cursos</div>
              <div class="m-val">{{ store.courses.length }}</div>
            </div>
          </div>
          <div class="m-cell-neo">
            <div class="m-icon-box m-green"><i class="bi bi-check2-circle"></i></div>
            <div class="m-content">
              <div class="m-lbl">Cursos Ativos</div>
              <div class="m-val">{{ activeCount }}</div>
            </div>
          </div>
          <div class="m-cell-neo">
            <div class="m-icon-box m-amber"><i class="bi bi-clock-history"></i></div>
            <div class="m-content">
              <div class="m-lbl">Em Planejamento</div>
              <div class="m-val">{{ planningCount }}</div>
            </div>
          </div>
          <div class="m-cell-neo">
            <div class="m-icon-box m-purple"><i class="bi bi-diagram-3"></i></div>
            <div class="m-content">
              <div class="m-lbl">Áreas de Estudo</div>
              <div class="m-val">{{ areaCount }}</div>
            </div>
          </div>
        </div>

        <!-- Quick actions Neo -->
        <div class="admin-card-base">
          <div class="bc-head">
            <span class="bc-title"><i class="bi bi-lightning-charge me-2 text-cyan"></i>Ações Rápidas</span>
          </div>
          <div class="qa-list">
            <NuxtLink to="/admin/cursos/novo" class="qa-item-neo">
              <div class="qa-icon-wrap bg-cyan-subtle"><i class="bi bi-magic text-cyan"></i></div>
              <div class="qa-info">
                <span class="qa-label">Novo Curso via IA</span>
                <span class="qa-sub">Crie com upload do arquivo PPC</span>
              </div>
              <i class="bi bi-chevron-right qa-arr"></i>
            </NuxtLink>
            <NuxtLink to="/admin/configuracoes" class="qa-item-neo">
              <div class="qa-icon-wrap bg-purple-subtle"><i class="bi bi-brush" style="color:#a78bfa"></i></div>
              <div class="qa-info">
                <span class="qa-label">Personalizar Tema</span>
                <span class="qa-sub">Troque as imagens e textos do Hero</span>
              </div>
              <i class="bi bi-chevron-right qa-arr"></i>
            </NuxtLink>
            <NuxtLink to="/admin/configuracoes?tab=pagamentos" class="qa-item-neo">
              <div class="qa-icon-wrap bg-green-subtle"><i class="bi bi-cash-stack" style="color:#34d399"></i></div>
              <div class="qa-info">
                <span class="qa-label">Ajustar Financeiro</span>
                <span class="qa-sub">Descontos PIX e Integrações (Stripe)</span>
              </div>
              <i class="bi bi-chevron-right qa-arr"></i>
            </NuxtLink>
          </div>
        </div>

        <!-- Area breakdown -->
        <div class="admin-card-base">
          <div class="bc-head">
            <span class="bc-title"><i class="bi bi-bar-chart me-2 text-primary"></i>Distribuição de Áreas</span>
          </div>
          <div class="area-list">
            <div v-for="a in areaBreakdown" :key="a.area" class="al-row">
              <div class="al-top">
                <span class="al-name">{{ a.area }}</span>
                <span class="al-count">{{ a.count }} curso(s)</span>
              </div>
              <div class="al-track">
                <div class="al-fill" :style="`width:${a.pct}%`"></div>
              </div>
            </div>
            <div v-if="areaBreakdown.length === 0" class="empty-data-neo">
              Sem dados suficientes
            </div>
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
  s === 'ativa' ? 'Ativo' : s === 'em_planejamento' ? 'Planejamento' : 'Inativo'
</script>

<style scoped>
.dash-header {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 2rem;
}
.dash-greeting {
  font-size: 0.75rem; color: var(--fsa-cyan); margin: 0 0 0.25rem;
  text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;
}
.dash-title { font-size: 2rem; font-weight: 800; margin: 0; line-height: 1; text-shadow: 0 0 30px rgba(255,255,255,0.1); }

/* Neo Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
  align-items: start;
}
.bento-right { display: flex; flex-direction: column; gap: 1.5rem; }

/* Headers Cards Neo */
.bc-head {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--fsa-border-glass);
  background: rgba(0,0,0,0.15);
}
.bc-title { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--fsa-text); }
.bc-link  { font-size: 0.8rem; color: var(--fsa-text-secondary); text-decoration: none; display: flex; align-items: center; transition: color 0.2s; }
.bc-link:hover { color: var(--fsa-cyan); }

/* Course List Neo */
.cl-item {
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem 1.5rem; transition: background 0.2s;
  border-bottom: 1px solid var(--fsa-border-glass);
}
.cl-item:last-child { border-bottom: none; }
.cl-item:hover { background: rgba(255,255,255,0.02); }

.cl-thumb {
  width: 48px; height: 48px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);
}
.cl-thumb-icon { font-size: 1.2rem; color: rgba(255,255,255,0.6); }

.cl-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.35rem; }
.cl-name {
  font-size: 0.95rem; font-weight: 600;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1;
}
.cl-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem; font-size: 0.75rem; color: var(--fsa-text-muted); }
.meta-dot { opacity: 0.5; font-size: 0.5rem; }
.tag-area-neo {
  background: rgba(255,255,255,0.05); padding: 0.15rem 0.6rem;
  border-radius: 20px; color: var(--fsa-text-secondary); font-size: 0.7rem; font-weight: 600;
  border: 1px solid rgba(255,255,255,0.05);
}

.cl-side { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }

.status-pill-neo {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.7rem; font-weight: 600; padding: 0.25rem 0.75rem;
  border-radius: 20px; white-space: nowrap; border: 1px solid transparent;
}
.status-dot { width: 6px; height: 6px; border-radius: 50%; }
.status-pill-neo.ativa           { background: rgba(52, 211, 153, 0.1); color: #34d399; border-color: rgba(52, 211, 153, 0.2); }
.status-pill-neo.ativa .status-dot { background: #34d399; box-shadow: 0 0 8px #34d399; }
.status-pill-neo.em_planejamento { background: rgba(251, 191, 36, 0.1); color: #fbbf24; border-color: rgba(251, 191, 36, 0.2); }
.status-pill-neo.em_planejamento .status-dot { background: #fbbf24; box-shadow: 0 0 8px #fbbf24; }
.status-pill-neo.inativa         { background: rgba(148, 163, 184, 0.1); color: #94a3b8; border-color: rgba(148, 163, 184, 0.2); }
.status-pill-neo.inativa .status-dot { background: #94a3b8; }

.cl-edit-neo {
  width: 32px; height: 32px; border-radius: 8px;
  background: rgba(255,255,255,0.03); border: 1px solid var(--fsa-border-glass);
  color: var(--fsa-text-secondary); font-size: 0.85rem;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.cl-edit-neo:hover {
  background: var(--fsa-cyan); color: #000; border-color: var(--fsa-cyan);
  box-shadow: 0 4px 12px rgba(56, 182, 255, 0.2);
}

.cl-empty { padding: 4rem 2rem; text-align: center; }
.empty-icon-box {
  width: 64px; height: 64px; border-radius: 16px; margin: 0 auto 1rem;
  background: rgba(255,255,255,0.03); border: 1px solid var(--fsa-border-glass);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; color: var(--fsa-text-muted);
}

/* Metrics Neo List */
.metrics-grid { display: flex; flex-direction: column; gap: 0.75rem; }
.m-cell-neo {
  background: var(--fsa-bg-card); border: 1px solid var(--fsa-border-glass);
  border-radius: var(--fsa-radius-sm); padding: 1rem 1.25rem;
  display: flex; align-items: center; gap: 1.25rem; transition: var(--transition);
}
.m-cell-neo:hover { border-color: rgba(255,255,255,0.15); transform: translateX(4px); }
.m-icon-box {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
}
.m-icon-box.m-cyan { background: rgba(56, 182, 255, 0.15); color: var(--fsa-cyan); border: 1px solid rgba(56, 182, 255, 0.3); }
.m-icon-box.m-green { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); }
.m-icon-box.m-amber { background: rgba(251, 191, 36, 0.15); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); }
.m-icon-box.m-purple { background: rgba(167, 139, 250, 0.15); color: #a78bfa; border: 1px solid rgba(167, 139, 250, 0.3); }

.m-content { display: flex; flex-direction: column; }
.m-lbl { font-size: 0.7rem; color: var(--fsa-text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.2rem; }
.m-val { font-size: 1.5rem; font-weight: 800; color: var(--fsa-text); line-height: 1; }

/* Quick Actions Neo */
.qa-list { display: flex; flex-direction: column; }
.qa-item-neo {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.25rem 1.5rem; text-decoration: none;
  border-bottom: 1px solid var(--fsa-border-glass); transition: background 0.2s;
}
.qa-item-neo:last-child { border-bottom: none; }
.qa-item-neo:hover { background: rgba(255,255,255,0.03); }
.qa-icon-wrap {
  width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
}
.bg-cyan-subtle { background: rgba(56, 182, 255, 0.1); }
.bg-purple-subtle { background: rgba(167, 139, 250, 0.1); }
.bg-green-subtle { background: rgba(52, 211, 153, 0.1); }

.qa-info { display: flex; flex-direction: column; gap: 0.25rem; }
.qa-label { font-size: 0.85rem; font-weight: 600; color: var(--fsa-text); }
.qa-sub   { font-size: 0.75rem; color: var(--fsa-text-muted); }
.qa-arr   { font-size: 0.7rem; color: var(--fsa-text-muted); margin-left: auto; transition: transform 0.2s; }
.qa-item-neo:hover .qa-arr { transform: translateX(3px); color: var(--fsa-cyan); }


/* Area Breakdown Neo */
.area-list { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
.al-row { display: flex; flex-direction: column; gap: 0.5rem; }
.al-top { display: flex; justify-content: space-between; align-items: flex-end; }
.al-name  { font-size: 0.8rem; font-weight: 600; color: var(--fsa-text); }
.al-count { font-size: 0.75rem; color: var(--fsa-text-muted); }
.al-track { height: 6px; background: rgba(0,0,0,0.3); border-radius: 99px; overflow: hidden; box-shadow: inset 0 1px 3px rgba(0,0,0,0.5); }
.al-fill  { height: 100%; background: linear-gradient(90deg, #1E9FE8, var(--fsa-cyan)); border-radius: 99px; transition: width 1s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 8px rgba(56, 182, 255, 0.5); }

.empty-data-neo { text-align: center; color: var(--fsa-text-muted); font-size: 0.8rem; padding: 1rem 0; }

/* Responsive */
@media (max-width: 1100px) {
  .bento-grid { grid-template-columns: 1fr; }
  .bento-right { display: grid; grid-template-columns: 1fr 1fr; }
  .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .bento-right { grid-template-columns: 1fr; }
  .metrics-grid { grid-template-columns: 1fr; }
}
</style>
