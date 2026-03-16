<template>
  <section class="section-pad">
    <div class="container">
      <div class="mb-5">
        <h2 class="section-title">Um programa de pós-graduação pensado para você</h2>
        <p class="section-subtitle w-75">
          Aqui, você é o centro de tudo. Com uma base sólida, professores especialistas e uma metodologia que
          resolve problemas reais do seu dia a dia, o poder está em suas mãos.
          Escolha o caminho para o seu futuro, o programa de pós-graduação da Faculdade Santo Antônio, que traz qualidade e inovação pensados exclusivamente para você.
        </p>
      </div>

      <div class="row g-4">
        <!-- Presencial/Híbrido -->
        <div class="col-md-6">
          <div class="value-card">
            <div class="value-card-header">
              <i class="bi bi-people-fill icon"></i>
              <div>
                <h4>Ensino Presencial</h4>
              </div>
            </div>
            <p style="color:var(--fsa-text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
              Viva a experiência da sala de aula e uma rica rede de contatos:
            </p>
            <ul class="value-list">
              <li><i class="bi bi-check-circle-fill"></i>Contato imersivo e cultural</li>
              <li><i class="bi bi-check-circle-fill"></i>Estudos de casos práticos e ricos</li>
              <li><i class="bi bi-check-circle-fill"></i>Visão internacional e global</li>
            </ul>
            <div class="mt-4">
             <NuxtLink to="#cursos" style="font-weight:700; font-size:0.9rem" class="text-cyan">Conheça nossos cursos <i class="bi bi-arrow-right"></i></NuxtLink>
            </div>
          </div>
        </div>

        <!-- EAD -->
        <div class="col-md-6">
          <div class="value-card" style="border-color:rgba(56,182,255,0.3)">
            <div class="value-card-header">
              <i class="bi bi-laptop icon"></i>
              <div>
                <h4>Ensino EAD</h4>
              </div>
            </div>
            <p style="color:var(--fsa-text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
              Estudantes online têm a liberdade de estudar onde e quando quiserem:
            </p>
            <ul class="value-list">
              <li><i class="bi bi-check-circle-fill"></i>Estude no seu ritmo</li>
              <li><i class="bi bi-check-circle-fill"></i>Cursos focados no mercado</li>
              <li><i class="bi bi-check-circle-fill"></i>Especialização que faz a diferença</li>
            </ul>
            <div class="mt-4">
              <NuxtLink to="#cursos" style="font-weight:700; font-size:0.9rem" class="text-cyan">Conheça nossos cursos <i class="bi bi-arrow-right"></i></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.modality-badge-lrg {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
}
.modality-badge-lrg.ead {
  background: rgba(56,182,255,0.12);
  color: var(--fsa-cyan);
  border: 1px solid rgba(56,182,255,0.3);
}
.modality-badge-lrg.hibrido {
  background: rgba(16,185,129,0.12);
  color: #10b981;
  border: 1px solid rgba(16,185,129,0.3);
}
</style>
