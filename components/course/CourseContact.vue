<template>
  <section class="course-section bg-section-alt" style="padding:4rem 0">
    <div class="container">
      <div class="row g-5 align-items-start">
        <!-- Institution info -->
        <div class="col-lg-6">
          <div class="course-section-label">Instituição</div>
          <h2 class="course-section-title">Sobre a Faculdade Santo Antônio</h2>
          <p style="color:var(--fsa-text-secondary);margin-top:1rem;line-height:1.8">
            A Faculdade Santo Antônio de Pós-Graduações está comprometida com a formação de
            profissionais de excelência, oferecendo cursos reconhecidos pelo MEC com corpo
            docente altamente qualificado.
          </p>
          <ul class="value-list mt-3">
            <li><i class="bi bi-check-circle-fill"></i>Credenciada Portaria MEC nº 364/2016</li>
            <li><i class="bi bi-check-circle-fill"></i>Localizada em Caçapava — SP</li>
            <li><i class="bi bi-check-circle-fill"></i>Mantenedora: Profa. Dra. Maria Eliza de Aguiar e Silva</li>
            <li><i class="bi bi-check-circle-fill"></i>Reitor: Prof. Dr. Raimundo Oliveira Filho</li>
            <li><i class="bi bi-check-circle-fill"></i>Suporte pedagógico individualizado</li>
            <li><i class="bi bi-check-circle-fill"></i>Plataforma EAD moderna e responsiva</li>
          </ul>

          <div class="contact-info mt-4">
            <a href="tel:+551236531110" class="contact-item">
              <i class="bi bi-telephone-fill"></i>
              (12) 3653-1110
            </a>
            <a href="https://wa.me/551236531110" class="contact-item">
              <i class="bi bi-whatsapp"></i>
              WhatsApp
            </a>
            <div class="contact-item" style="cursor:default">
              <i class="bi bi-geo-alt-fill"></i>
              Av. da Saudade, 26 — Caçapava, SP
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="col-lg-6">
          <div class="checkout-section-box">
            <h5><i class="bi bi-envelope"></i>Fale com nossa equipe</h5>

            <div v-if="!sent">
              <form @submit.prevent="handleSend">
                <div class="fsa-form-group">
                  <label class="fsa-label">Nome completo</label>
                  <input v-model="form.nome" type="text" class="fsa-form-control" placeholder="Seu nome" required />
                </div>
                <div class="fsa-form-group">
                  <label class="fsa-label">E-mail</label>
                  <input v-model="form.email" type="email" class="fsa-form-control" placeholder="seu@email.com" required />
                </div>
                <div class="fsa-form-group">
                  <label class="fsa-label">Telefone / WhatsApp</label>
                  <input v-model="form.telefone" type="tel" class="fsa-form-control" placeholder="(11) 99999-9999" @input="onPhone" maxlength="15" />
                </div>
                <div class="fsa-form-group">
                  <label class="fsa-label">Dúvida ou mensagem</label>
                  <textarea v-model="form.mensagem" class="fsa-form-control" rows="4" placeholder="Qual sua dúvida sobre o curso?" style="resize:vertical"></textarea>
                </div>
                <button type="submit" class="btn-fsa-block">
                  <i class="bi bi-send me-2"></i>Enviar mensagem
                </button>
              </form>
            </div>

            <div v-else class="text-center py-4">
              <i class="bi bi-check-circle-fill" style="font-size:2.5rem;color:var(--fsa-cyan)"></i>
              <h5 style="color:var(--fsa-cyan);margin-top:0.75rem">Mensagem enviada!</h5>
              <p style="color:var(--fsa-text-secondary);font-size:0.9rem">
                Nossa equipe retornará em até 24h úteis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { formatPhone } = useFormatters()
const form = reactive({ nome: '', email: '', telefone: '', mensagem: '' })
const sent = ref(false)

const onPhone = (e: Event) => {
  form.telefone = formatPhone((e.target as HTMLInputElement).value)
}

const handleSend = () => { sent.value = true }
</script>

<style scoped>
.contact-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.875rem;
  color: var(--fsa-text-secondary);
  margin-bottom: 0.75rem;
  text-decoration: none;
  transition: color 0.25s;
}
.contact-item i { color: var(--fsa-cyan); font-size: 1rem; }
.contact-item:hover { color: var(--fsa-cyan); }
.contact-info { display: flex; flex-direction: column; }
</style>
