<template>
  <div class="admin-bg-mesh">
    <!-- Login Screen -->
    <div v-if="!authenticated" class="login-wrapper">
      <div class="login-container">
        <!-- Esquerda: Branding/Decorativo -->
        <div class="login-brand-side">
          <div class="brand-content">
            <FsaLogo size="lg" />
            <div class="brand-text">
              <h2>O centro de comando da sua Instituição</h2>
              <p>Gerencie cursos, pagamentos e alunos com excelência e velocidade garantida pela nossa plataforma.</p>
            </div>
          </div>
          <div class="brand-decoration"></div>
        </div>
        
        <!-- Direita: Formulário -->
        <div class="login-form-side">
          <div class="login-form-inner">
            <div class="mb-4">
              <h3 class="fw-bold mb-1">Área Administrativa</h3>
              <p style="color:var(--fsa-text-secondary);font-size:0.9rem">
                Identifique-se para acessar o painel de controle.
              </p>
            </div>
            
            <form @submit.prevent="handleLogin">
              <div class="fsa-form-group">
                <label class="fsa-label" style="font-size:0.8rem">Senha de Acesso</label>
                <div class="input-group-modern" :class="{ 'has-error': loginError }">
                  <i class="bi bi-key icon-prefix"></i>
                  <input
                    v-model="password"
                    type="password"
                    class="fsa-input-modern w-100"
                    placeholder="Sua senha master"
                    autofocus
                    style="padding-left:2.5rem !important"
                  />
                </div>
                <div class="error-msg" v-if="loginError">
                  <i class="bi bi-exclamation-circle me-1"></i>Credenciais inválidas.
                </div>
              </div>
              
              <button type="submit" class="admin-btn-modern w-100 mt-2" style="padding:0.85rem">
                Entrar no Workspace <i class="bi bi-arrow-right ms-1"></i>
              </button>
            </form>
            
            <div class="login-footer">
              <i class="bi bi-shield-lock me-1"></i> Acesso Seguro 256-bit
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Panel -->
    <div v-else class="admin-dashboard-container">
      <!-- Sidebar Glass -->
      <aside class="admin-sidebar admin-glass">
        <div class="sidebar-header">
          <FsaLogo size="sm" />
        </div>
        
        <div class="sidebar-nav-group">
          <span class="nav-group-title">Geral</span>
          <NuxtLink to="/admin" class="neo-nav-link" :class="{ active: route.path === '/admin' }">
            <i class="bi bi-house"></i> Overview
          </NuxtLink>
        </div>

        <div class="sidebar-nav-group">
          <span class="nav-group-title">Gestão Educacional</span>
          <NuxtLink to="/admin/cursos" class="neo-nav-link" :class="{ active: route.path.startsWith('/admin/cursos') }">
            <i class="bi bi-journal-check"></i> Cursos & Vagas
          </NuxtLink>
        </div>

        <div class="sidebar-nav-group">
          <span class="nav-group-title">Sistema</span>
          <NuxtLink to="/admin/configuracoes" class="neo-nav-link" :class="{ active: route.path === '/admin/configuracoes' && route.query.tab !== 'pagamentos' && route.query.tab !== 'integracoes' }">
            <i class="bi bi-palette"></i> Banners & Site
          </NuxtLink>
          <NuxtLink to="/admin/configuracoes?tab=pagamentos" class="neo-nav-link" :class="{ active: route.query.tab === 'pagamentos' }" @click.prevent="navigateTo('/admin/configuracoes?tab=pagamentos')">
            <i class="bi bi-wallet2"></i> Financeiro
          </NuxtLink>
          <NuxtLink to="/admin/configuracoes?tab=integracoes" class="neo-nav-link" :class="{ active: route.query.tab === 'integracoes' }" @click.prevent="navigateTo('/admin/configuracoes?tab=integracoes')">
            <i class="bi bi-plugin"></i> Integrações
          </NuxtLink>
        </div>

        <!-- Sidebar Footer com avatar -->
        <div class="sidebar-footer">
          <div class="admin-profile">
            <div class="avatar-circle">
              <i class="bi bi-person-fill"></i>
            </div>
            <div class="profile-info">
              <span class="profile-name">FSA Admin</span>
              <span class="profile-role">Root Access</span>
            </div>
            <button @click="logout" class="logout-btn" title="Sair da conta">
              <i class="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="admin-main-wrapper">
        <!-- Top Header -->
        <header class="admin-topbar admin-header-glass">
          <div class="topbar-left">
             <div class="eco-search">
               <i class="bi bi-search"></i>
               <input type="text" placeholder="Buscar por alunos, cursos ou pagamentos (Em breve)..." disabled />
             </div>
          </div>
          <div class="topbar-right">
            <a href="/" target="_blank" class="topbar-icon-btn" title="Ver Site">
              <i class="bi bi-box-arrow-up-right"></i>
            </a>
            <button class="topbar-icon-btn" title="Notificações">
              <i class="bi bi-bell"></i>
              <span class="indicator-dot"></span>
            </button>
          </div>
        </header>

        <!-- Dynamic Content Slot -->
        <main class="page-content-wrapper">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FsaLogo from '~/components/ui/FsaLogo.vue'

const route = useRoute()
const authCookie = useCookie<boolean>('fsa-admin', { default: () => false })
const authenticated = ref(authCookie.value)
const password = ref('')
const loginError = ref(false)
const ADMIN_PASSWORD = 'fsaadmin2024'

const handleLogin = () => {
  if (password.value === ADMIN_PASSWORD) {
    authCookie.value = true
    authenticated.value = true
    loginError.value = false
    password.value = ''
  } else {
    loginError.value = true
  }
}

const logout = () => {
  authCookie.value = false
  authenticated.value = false
}
</script>

<style scoped>
/* ── Layout Novo de Login (Split Screen Glass) ── */
.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
}
.login-container {
  display: flex;
  width: 100%;
  max-width: 1000px;
  background: rgba(15, 34, 64, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--fsa-border-glass);
  border-radius: var(--fsa-radius-lg);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  min-height: 500px;
}
.login-brand-side {
  flex: 1.2;
  background: linear-gradient(135deg, var(--fsa-navy) 0%, #030811 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  overflow: hidden;
}
.login-brand-side::before {
  content: '';
  position: absolute;
  top: -50%; right: -50%;
  width: 100%; height: 100%;
  background: radial-gradient(circle, rgba(56,182,255,0.15) 0%, transparent 70%);
}
.brand-content { z-index: 2; position: relative; }
.brand-text { margin-top: 3rem; }
.brand-text h2 { font-size: 1.8rem; font-weight: 800; line-height: 1.2; margin-bottom: 1rem; }
.brand-text p { color: var(--fsa-text-secondary); font-size: 0.95rem; }

.login-form-side {
  flex: 1;
  background: rgba(255,255,255,0.02);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}
.login-form-inner { width: 100%; max-width: 380px; }

.input-group-modern { position: relative; }
.icon-prefix {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--fsa-text-muted);
  font-size: 1.1rem;
  pointer-events: none;
}
.input-group-modern.has-error input {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15) !important;
}
.input-group-modern.has-error .icon-prefix { color: #ef4444; }

.error-msg {
  color: #f87171;
  font-size: 0.75rem;
  margin-top: 0.4rem;
  font-weight: 500;
}
.login-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.75rem;
  color: var(--fsa-text-muted);
}

@media (max-width: 768px) {
  .login-container { flex-direction: column; }
  .login-brand-side { display: none; }
  .login-form-side { padding: 2rem; }
}

/* ── Neo Admin Dashboard Layout ── */
.admin-dashboard-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar Neo */
.admin-sidebar {
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--fsa-border-glass);
}
.sidebar-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--fsa-border-glass);
}

.sidebar-nav-group {
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.nav-group-title {
  display: block;
  padding: 0 1.5rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--fsa-text-muted);
  margin-bottom: 0.5rem;
}

.neo-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1.5rem;
  color: var(--fsa-text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  border-left: 2px solid transparent;
}
.neo-nav-link i { font-size: 1.1rem; color: var(--fsa-text-muted); transition: color 0.2s; }
.neo-nav-link:hover {
  background: rgba(255,255,255,0.03);
  color: var(--fsa-text);
}
.neo-nav-link.active {
  background: linear-gradient(90deg, rgba(56, 182, 255, 0.1) 0%, transparent 100%);
  border-left-color: var(--fsa-cyan);
  color: var(--fsa-text);
}
.neo-nav-link.active i { color: var(--fsa-cyan); }

.sidebar-footer {
  margin-top: auto;
  padding: 1rem;
  border-top: 1px solid var(--fsa-border-glass);
}
.admin-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: var(--fsa-radius-sm);
  transition: background 0.2s;
}
.admin-profile:hover { background: rgba(255,255,255,0.04); }
.avatar-circle {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(56, 182, 255, 0.15);
  color: var(--fsa-cyan);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
}
.profile-info { flex: 1; display: flex; flex-direction: column; }
.profile-name { font-size: 0.8rem; font-weight: 600; }
.profile-role { font-size: 0.7rem; color: var(--fsa-text-muted); }
.logout-btn {
  background: transparent; border: none;
  color: var(--fsa-text-muted); font-size: 1.1rem;
  cursor: pointer; padding: 0.2rem; transition: color 0.2s;
}
.logout-btn:hover { color: #f87171; }


/* Main Content Wrapper */
.admin-main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
}

/* Neo Topbar */
.admin-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  height: 60px;
}
.topbar-left { flex: 1; display: flex; align-items: center; }
.eco-search {
  display: flex; align-items: center; gap: 0.75rem;
  background: rgba(0,0,0,0.2);
  border: 1px solid var(--fsa-border-glass);
  border-radius: 8px;
  padding: 0.4rem 0.85rem;
  width: 100%; max-width: 400px;
}
.eco-search i { color: var(--fsa-text-muted); font-size: 0.85rem; }
.eco-search input {
  background: transparent; border: none; color: var(--fsa-text);
  font-size: 0.85rem; width: 100%; outline: none;
}
.eco-search input::placeholder { color: var(--fsa-text-muted); }

.topbar-right { display: flex; align-items: center; gap: 0.5rem; }
.topbar-icon-btn {
  width: 36px; height: 36px;
  border-radius: 8px;
  background: transparent; border: 1px solid transparent;
  display: flex; align-items: center; justify-content: center;
  color: var(--fsa-text-secondary);
  font-size: 1rem; cursor: pointer; transition: all 0.2s;
  position: relative;
}
.topbar-icon-btn:hover {
  background: rgba(255,255,255,0.05);
  border-color: var(--fsa-border-glass);
  color: var(--fsa-text);
}
.indicator-dot {
  position: absolute; top: 8px; right: 8px;
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--fsa-cyan); box-shadow: 0 0 6px var(--fsa-cyan);
}

/* Page Content Viewport */
.page-content-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}
</style>
