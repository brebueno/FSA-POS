<template>
  <section class="section-pad bg-section-alt">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="text-center mb-4">
            <div class="section-label">Newsletter</div>
            <h2 class="section-title">Fique por dentro das novidades</h2>
            <p style="color:var(--fsa-text-secondary)">
              Receba informações sobre novos cursos, bolsas de estudo e conteúdos exclusivos
            </p>
          </div>

          <div class="lead-form-card">
            <div v-if="!subscribed">
              <form @submit.prevent="handleSubscribe">
                <div class="row g-3">
                  <div class="col-md-4">
                    <input
                      v-model="form.nome"
                      type="text"
                      class="fsa-form-control"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div class="col-md-4">
                    <input
                      v-model="form.email"
                      type="email"
                      class="fsa-form-control"
                      placeholder="Seu e-mail"
                      required
                    />
                  </div>
                  <div class="col-md-4">
                    <button type="submit" class="btn-fsa-block" style="border-radius:var(--fsa-radius-sm)">
                      <i class="bi bi-bell me-2"></i>Quero receber novidades
                    </button>
                  </div>
                </div>
                <p style="font-size:0.72rem;color:var(--fsa-text-muted);text-align:center;margin-top:0.75rem;margin-bottom:0">
                  Ao se inscrever, você concorda com nossa Política de Privacidade. Cancele quando quiser.
                </p>
              </form>
            </div>

            <div v-else class="text-center py-3">
              <i class="bi bi-check-circle-fill" style="font-size:2rem;color:var(--fsa-cyan)"></i>
              <h5 style="color:var(--fsa-cyan);margin-top:0.5rem">Inscrição confirmada!</h5>
              <p style="color:var(--fsa-text-secondary);font-size:0.9rem;margin-bottom:0">
                Você receberá nossas novidades em {{ form.email }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const form = reactive({ nome: '', email: '' })
const subscribed = ref(false)

const handleSubscribe = () => {
  subscribed.value = true
}
</script>

<style scoped>
.lead-form-card {
  background: var(--fsa-bg-card);
  border: 1px solid var(--fsa-border);
  border-radius: var(--fsa-radius);
  padding: 2rem;
  box-shadow: var(--fsa-shadow);
}
</style>
