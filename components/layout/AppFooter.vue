<template>
  <footer class="fsa-footer" id="contato">
    <div class="container">
      <div class="row g-4">
        <!-- Logo & info -->
        <div class="col-lg-4">
          <div class="fsa-footer-logo">
            <FsaLogo size="md" />
          </div>
          <p>
            Faculdade Santo Antônio de Pós-Graduações — formando profissionais de excelência
            com cursos reconhecidos pelo MEC desde 2016.
          </p>
          <p style="font-size:0.8rem;">
            <i class="bi bi-geo-alt me-1" style="color:var(--fsa-cyan)"></i>
            Av. da Saudade, 26 | Centro, Caçapava — SP | CEP 12282-480
          </p>
          <p style="font-size:0.8rem;">
            <i class="bi bi-telephone me-1" style="color:var(--fsa-cyan)"></i>
            <a href="tel:+551236531110">(12) 3653-1110</a>
          </p>
          <div class="d-flex gap-2 mt-2">
            <a href="#" class="social-btn"><i class="bi bi-instagram"></i></a>
            <a href="#" class="social-btn"><i class="bi bi-facebook"></i></a>
            <a href="#" class="social-btn"><i class="bi bi-linkedin"></i></a>
            <a href="#" class="social-btn"><i class="bi bi-whatsapp"></i></a>
          </div>
        </div>

        <!-- Cursos -->
        <div class="col-sm-6 col-lg-2">
          <h6>Cursos</h6>
          <NuxtLink to="/cursos/neuropsicologia" class="fsa-footer-link">Neuropsicologia</NuxtLink>
          <NuxtLink to="/cursos/ginecologia-e-obstetricia" class="fsa-footer-link">Ginecologia e Obstetrícia</NuxtLink>
          <NuxtLink to="/cursos/uti-enfase-cardiologia" class="fsa-footer-link">UTI com Ênfase em Cardiologia</NuxtLink>
          <NuxtLink to="/cursos/saude-coletiva" class="fsa-footer-link">Saúde Coletiva ESF</NuxtLink>
          <NuxtLink to="/cursos" class="fsa-footer-link">Ver todos os cursos</NuxtLink>
        </div>

        <!-- Institucional -->
        <div class="col-sm-6 col-lg-2">
          <h6>Institucional</h6>
          <a href="#sobre" class="fsa-footer-link">Sobre a FSA</a>
          <a href="#" class="fsa-footer-link">Corpo Docente</a>
          <a href="#" class="fsa-footer-link">Credenciamento MEC</a>
          <a href="#" class="fsa-footer-link">Portal do Aluno</a>
          <NuxtLink to="/admin" class="fsa-footer-link">Área Admin</NuxtLink>
        </div>

        <!-- Contato -->
        <div class="col-lg-4" id="contato-form">
          <h6>Entre em Contato</h6>
          <form @submit.prevent="submitContact">
            <div class="fsa-form-group">
              <input
                v-model="contactForm.nome"
                type="text"
                class="fsa-form-control"
                placeholder="Seu nome"
              />
            </div>
            <div class="fsa-form-group">
              <input
                v-model="contactForm.email"
                type="email"
                class="fsa-form-control"
                placeholder="Seu e-mail"
              />
            </div>
            <div class="fsa-form-group">
              <textarea
                v-model="contactForm.mensagem"
                class="fsa-form-control"
                rows="3"
                placeholder="Sua mensagem"
                style="resize:vertical"
              ></textarea>
            </div>
            <button type="submit" class="btn-fsa-primary w-100" style="border-radius:6px">
              <i class="bi bi-send me-2"></i>Enviar Mensagem
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="fsa-footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <div>
          &copy; {{ new Date().getFullYear() }} Faculdade Santo Antônio — Todos os direitos reservados
        </div>
        <div class="d-flex gap-3">
          <a href="#">Política de Privacidade</a>
          <a href="#">Termos de Uso</a>
          <a href="#">Ouvidoria</a>
        </div>
        <div style="font-size:0.75rem">
          Credenciada Portaria MEC nº 364 de 05/05/2016
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const contactForm = reactive({ nome: '', email: '', mensagem: '' })

const submitContact = () => {
  alert('Mensagem enviada! Entraremos em contato em breve.')
  contactForm.nome = ''
  contactForm.email = ''
  contactForm.mensagem = ''
}
</script>

<style scoped>
.social-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(56,182,255,0.08);
  border: 1px solid var(--fsa-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--fsa-text-secondary);
  font-size: 0.9rem;
  transition: all 0.25s;
}
.social-btn:hover {
  background: var(--fsa-cyan);
  border-color: var(--fsa-cyan);
  color: #000;
}
</style>
