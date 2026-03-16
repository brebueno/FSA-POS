<template>
  <section class="hero-section" style="padding: 4rem 0;">
    <div class="container">
      <div class="row align-items-center g-5">
        <!-- Left: Content -->
        <div class="col-lg-7">
          <div class="section-label" style="font-size: 2.5rem; letter-spacing: -1px; text-transform:none; color: var(--fsa-cyan); font-style: italic; font-weight: 900; margin-bottom: 0;">
            FSA <span style="color: #fff; background: rgba(56,182,255,0.2); padding: 0 10px; border-radius: 4px;">PÓS</span>
          </div>

          <h1 class="hero-title" style="font-size: clamp(2.5rem, 4vw, 3.5rem); line-height: 1; text-transform: uppercase; margin-bottom: 1.5rem; letter-spacing: -1px;">
            Março é o mês para<br/>
            <span class="highlight">transformar seu futuro</span>
          </h1>

          <div style="border-left: 4px solid var(--fsa-cyan); padding-left: 1rem; margin-bottom: 2rem;">
            <p style="color:var(--fsa-text);font-size:1.1rem;font-weight:700;margin-bottom:0.25rem;">
              FAÇA UMA PÓS-GRADUAÇÃO
            </p>
            <p style="color:var(--fsa-text-secondary);font-size:0.9rem;margin:0;">
              E DESTAQUE-SE NO MERCADO.
            </p>
          </div>

          <NuxtLink to="#cursos" class="btn-fsa-primary" style="display: inline-block; padding: 0.8rem 2rem; font-size: 1rem;">
            Conheça os cursos
          </NuxtLink>
        </div>

        <!-- Right: Lead Form -->
        <div class="col-lg-5">
          <div class="hero-lead-form">
            <h4 style="font-size: 1.25rem; margin-bottom: 1.5rem; text-align: center;">
              Deixe seus dados e fique<br/>
              <span class="text-cyan">por dentro das novidades!</span>
            </h4>

            <div v-if="!submitted">
              <form @submit.prevent="handleSubmit">
                <div class="fsa-form-group">
                  <label class="fsa-label">Nome completo *</label>
                  <input
                    v-model="form.nome"
                    type="text"
                    class="fsa-form-control"
                    :class="{ 'is-invalid': errors.nome }"
                    placeholder="Digite seu nome"
                  />
                  <span v-if="errors.nome" class="field-error">{{ errors.nome }}</span>
                </div>

                <div class="fsa-form-group">
                  <label class="fsa-label">E-mail *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="fsa-form-control"
                    :class="{ 'is-invalid': errors.email }"
                    placeholder="seu@email.com"
                  />
                  <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
                </div>

                <div class="fsa-form-group">
                  <label class="fsa-label">Celular *</label>
                  <input
                    v-model="form.telefone"
                    type="tel"
                    class="fsa-form-control"
                    :class="{ 'is-invalid': errors.telefone }"
                    placeholder="(11) 99999-9999"
                    @input="onPhoneInput"
                    maxlength="15"
                  />
                  <span v-if="errors.telefone" class="field-error">{{ errors.telefone }}</span>
                </div>

                <div class="fsa-form-group">
                  <label class="fsa-label">Curso de interesse</label>
                  <select v-model="form.curso" class="fsa-form-control">
                    <option value="">Selecione um curso</option>
                    <option value="neuropsicologia">Neuropsicologia</option>
                    <option value="ginecologia-e-obstetricia">Enfermagem em Ginecologia e Obstetrícia</option>
                    <option value="uti-enfase-cardiologia">Enfermagem UTI com Ênfase em Cardiologia</option>
                    <option value="saude-coletiva">Saúde Coletiva com ênfase em ESF</option>
                  </select>
                </div>

                <button type="submit" class="btn-fsa-block">
                  <i class="bi bi-send me-2"></i>Enviar e receber informações
                </button>

                <p style="font-size:0.72rem;color:var(--fsa-text-muted);margin-top:0.75rem;text-align:center">
                  <i class="bi bi-shield-lock me-1"></i>
                  Seus dados estão protegidos. Não fazemos spam.
                </p>
              </form>
            </div>

            <div v-else class="text-center py-4">
              <div style="font-size:3rem;color:var(--fsa-cyan);margin-bottom:1rem">
                <i class="bi bi-check-circle-fill"></i>
              </div>
              <h5 style="color:var(--fsa-cyan)">Recebemos seu contato!</h5>
              <p style="color:var(--fsa-text-secondary);font-size:0.9rem">
                Nossa equipe entrará em contato em até 24 horas úteis.
              </p>
              <button class="btn-fsa-outline mt-2" @click="submitted = false">Enviar outro</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { formatPhone } = useFormatters()

const form = reactive({ nome: '', email: '', telefone: '', curso: '' })
const errors = reactive({ nome: '', email: '', telefone: '' })
const submitted = ref(false)

const onPhoneInput = (e: Event) => {
  form.telefone = formatPhone((e.target as HTMLInputElement).value)
}

const validate = () => {
  errors.nome = form.nome.trim().length < 3 ? 'Nome muito curto' : ''
  errors.email = !form.email.includes('@') ? 'E-mail inválido' : ''
  errors.telefone = form.telefone.replace(/\D/g, '').length < 10 ? 'Telefone inválido' : ''
  return !errors.nome && !errors.email && !errors.telefone
}

const handleSubmit = () => {
  if (!validate()) return
  submitted.value = true
}
</script>

<style scoped>
.hero-stat { text-align: center; }
.hero-stat-value { font-size: 1.4rem; font-weight: 800; color: var(--fsa-cyan); }
.hero-stat-label { font-size: 0.75rem; color: var(--fsa-text-muted); }
.field-error { font-size: 0.75rem; color: #ef4444; margin-top: 0.25rem; display: block; }
</style>
