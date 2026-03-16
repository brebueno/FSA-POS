<template>
  <header>
    <AnnouncementBar />
    <nav class="fsa-navbar navbar navbar-expand-lg">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand">
          <FsaLogo size="md" />
        </NuxtLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarMain">
          <ul class="navbar-nav mx-auto gap-1">
            <li class="nav-item">
              <NuxtLink to="/cursos" class="nav-link" active-class="active">
                <i class="bi bi-mortarboard me-1"></i>Cursos
              </NuxtLink>
            </li>
            <li class="nav-item">
              <a href="#sobre" class="nav-link">
                <i class="bi bi-building me-1"></i>Sobre
              </a>
            </li>
            <li class="nav-item">
              <a href="#contato" class="nav-link">
                <i class="bi bi-envelope me-1"></i>Contato
              </a>
            </li>
          </ul>

          <div class="d-flex align-items-center gap-3">
            <a href="tel:+551236531110" class="nav-link d-none d-lg-flex align-items-center gap-1" style="color:var(--fsa-text-secondary)">
              <i class="bi bi-telephone" style="color:var(--fsa-cyan)"></i>
              (12) 3653-1110
            </a>
            <NuxtLink to="/cursos" class="btn-fsa-primary">
              Inscreva-se
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import AnnouncementBar from '~/components/layout/AnnouncementBar.vue'
import FsaLogo from '~/components/ui/FsaLogo.vue'
</script>
