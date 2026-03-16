<template>
  <section class="section-pad">
    <div class="container">
      <div class="text-center mb-5">
        <div class="section-label">Depoimentos</div>
        <h2 class="section-title">O que dizem nossos alunos</h2>
        <p class="section-subtitle">
          Histórias reais de profissionais que transformaram suas carreiras
        </p>
      </div>

      <div class="row g-4">
        <div class="col-md-6 col-lg-4" v-for="t in testimonials" :key="t.name">
          <div class="testimonial-card">
            <div class="stars">
              <i class="bi bi-star-fill" v-for="i in t.rating" :key="i"></i>
            </div>
            <p class="quote">"{{ t.text }}"</p>
            <div class="d-flex align-items-center gap-2">
              <div class="avatar">{{ t.name[0] }}</div>
              <div>
                <div class="author">{{ t.name }}</div>
                <div class="author-role">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: 'Fernanda Costa',
    role: 'Enfermeira Obstetra — Hospital Albert Einstein',
    rating: 5,
    text: 'A pós em Ginecologia e Obstetrícia foi transformadora. O estágio supervisionado me preparou muito bem para a atuação em sala de parto. Recomendo a todos os enfermeiros que queiram se especializar na área.'
  },
  {
    name: 'Ricardo Almeida',
    role: 'Psicólogo Clínico — Clínica NeuroCognitiva',
    rating: 5,
    text: 'O curso de Neuropsicologia superou minhas expectativas. Os professores são referência na área e o conteúdo é completamente atualizado com as práticas mais recentes do mercado.'
  },
  {
    name: 'Juliana Mendes',
    role: 'Enfermeira UTI — Hospital Regional de Caçapava',
    rating: 5,
    text: 'Excelente curso de UTI com Cardiologia! A metodologia mista com aulas práticas em simulação me deu muita segurança para atuar na unidade intensiva. A coordenação é muito atenciosa e suporte sempre disponível.'
  },
  {
    name: 'Marcos Pereira',
    role: 'Enfermeiro — Estratégia Saúde da Família',
    rating: 5,
    text: 'O curso de Saúde Coletiva com ênfase em ESF foi exatamente o que eu precisava. Conteúdo prático, focado no dia a dia da UBS e com professores que realmente vivenciam o SUS.'
  },
  {
    name: 'Ana Clara Souza',
    role: 'Psicóloga — Centro de Atenção Psicossocial',
    rating: 5,
    text: 'A Faculdade Santo Antônio tem uma estrutura de suporte ao aluno excepcional. Mesmo no EAD, nunca me senti sozinha no processo de aprendizagem. Recomendo de olhos fechados.'
  },
  {
    name: 'Bruno Nascimento',
    role: 'Enfermeiro Intensivista — UTI Cardiológica',
    rating: 4,
    text: 'Ótima relação custo-benefício com certificado reconhecido pelo MEC. As aulas práticas em simulação foram o grande diferencial que me fez escolher a FSA em vez de outras instituições.'
  }
]
</script>

<style scoped>
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--fsa-navy), var(--fsa-cyan));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}
</style>
