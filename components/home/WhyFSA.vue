<template>
  <section class="section-pad bg-section-alt" id="tipos-pos">
    <div class="container">
      <div class="row mb-5">
        <div class="col-lg-4">
          <h2 class="section-title">Entenda os<br/>tipos de pós-<br/>graduação</h2>
          <p class="section-subtitle mt-3">
            Os cursos de pós-graduação Lato Sensu são para quem deseja aprofundar
            os conhecimentos em uma área específica. Conheça as diferenças:
          </p>
        </div>
        <div class="col-lg-8">
          <div class="row g-4">
            <div class="col-md-6" v-for="tipo in tipos" :key="tipo.title">
              <div class="why-card d-flex align-items-end" :style="{ backgroundImage: 'url(' + tipo.bg + ')', backgroundSize: 'cover', backgroundPosition: 'center', height: '260px', borderRadius: 'var(--fsa-radius)', position: 'relative', overflow: 'hidden', padding: '1.5rem', border: '1px solid var(--fsa-border)' }">
                <div style="position:absolute; inset:0; background: linear-gradient(to top, rgba(7,15,28,0.95), transparent);"></div>
                <h4 style="position:relative; z-index:1; margin:0; font-weight:800; font-size:1.4rem;">{{ tipo.title }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Institutional Info (AMO / FSA) -->
      <div class="row mt-5 pt-5 g-4 align-items-center" style="border-top: 1px solid var(--fsa-border);">
        <div class="col-lg-6">
          <h3 class="section-title" style="font-size:2rem; line-height:1.2;">
            FSA: Lidere sua carreira com propósito e protagonismo
          </h3>
          <p style="color:var(--fsa-text-secondary);line-height:1.8;font-size:1.05rem; margin-top: 1.5rem;">
            Em mais de 20 anos de história sempre nos comprometemos a oferecer a você o mais alto nível de ensino, com a visão para antecipar as tendências do mercado e formar profissionais globais e completos, com inovação e propósito.
          </p>
        </div>
        <div class="col-lg-6 text-end d-none d-lg-block">
          <div style="display:inline-block; padding:3rem; background: rgba(56,182,255,0.05); border-radius: var(--fsa-radius); border: 1px solid rgba(56,182,255,0.2);">
            <i class="bi bi-mortarboard" style="font-size: 8rem; color: var(--fsa-cyan); opacity: 0.5;"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const tipos = [
  {
    title: 'Especialização',
    bg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'MBA',
    bg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop'
  }
]
</script>

<style scoped>
</style>
