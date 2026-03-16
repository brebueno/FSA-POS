<template>
  <div>
    <!-- Login Screen -->
    <div v-if="!authenticated" class="login-wrap">
      <div class="login-card">
        <div class="text-center mb-4">
          <FsaLogo size="lg" />
          <h4 style="margin-top:1.5rem;font-size:1.1rem">Área Administrativa</h4>
          <p style="color:var(--fsa-text-muted);font-size:0.875rem">Acesso restrito a administradores</p>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="fsa-form-group">
            <label class="fsa-label">Senha de acesso</label>
            <input
              v-model="password"
              type="password"
              class="fsa-form-control"
              :class="{ 'is-invalid': loginError }"
              placeholder="Digite a senha"
              autofocus
            />
            <span v-if="loginError" style="color:#ef4444;font-size:0.75rem;margin-top:0.25rem;display:block">
              Senha incorreta. Tente novamente.
            </span>
          </div>
          <button type="submit" class="btn-fsa-block">
            <i class="bi bi-lock-fill me-2"></i>Entrar
          </button>
        </form>
        <p style="font-size:0.72rem;color:var(--fsa-text-muted);text-align:center;margin-top:1rem">
          Acesso exclusivo para administradores FSA
        </p>
      </div>
    </div>

    <!-- Admin Panel -->
    <div v-else class="admin-layout d-flex">
      <!-- Sidebar -->
      <aside class="admin-sidebar">
        <div class="admin-sidebar-logo">
          <FsaLogo size="sm" />
        </div>
        <nav>
          <NuxtLink to="/admin" class="admin-nav-link" :class="{ active: route.path === '/admin' }">
            <i class="bi bi-grid-3x3-gap"></i>Dashboard
          </NuxtLink>
          <NuxtLink to="/admin/cursos" class="admin-nav-link" :class="{ active: route.path.startsWith('/admin/cursos') }">
            <i class="bi bi-mortarboard"></i>Cursos
          </NuxtLink>
          <NuxtLink to="/admin/configuracoes" class="admin-nav-link" :class="{ active: route.path === '/admin/configuracoes' }">
            <i class="bi bi-gear"></i>Configurações
          </NuxtLink>
          <div style="border-top:1px solid var(--fsa-border);margin:1rem 0"></div>
          <a href="#" class="admin-nav-link" @click.prevent="logout">
            <i class="bi bi-box-arrow-left"></i>Sair
          </a>
        </nav>
      </aside>

      <!-- Content -->
      <main class="admin-content">
        <slot />
      </main>
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
