export interface CoursePrice {
  boleto: number
  installments: number
  credit?: number
  fullPrice: number
}

export interface Course {
  id: number
  slug: string
  name: string
  area: string
  modalities: string[]
  duration: number
  workload: number
  type: string
  coordinator: string
  professor: string
  status: 'ativa' | 'em_planejamento' | 'inativa'
  featured: boolean
  price: CoursePrice
  description: string
  about: string
  target: string
  curriculum: string[]
  certificate: string
  banner?: string  // URL ou data URL da imagem do banner
}

export const courses: Course[] = [
  {
    id: 1,
    slug: 'neuropsicologia',
    name: 'Neuropsicologia',
    area: 'Psicologia',
    modalities: ['EAD'],
    duration: 24,
    workload: 480,
    type: 'Especialização',
    coordinator: 'Monique',
    professor: 'Profa. Livia Stocco',
    status: 'ativa',
    featured: true,
    price: {
      boleto: 680,
      installments: 24,
      fullPrice: 16320
    },
    description:
      'A pós em Neuropsicologia forma profissionais de saúde e educação aptos à avaliação e reabilitação neuropsicológica de crianças, adolescentes, adultos e idosos.',
    about:
      'Quais são as relações entre o funcionamento cerebral e o comportamento humano? A pós em Neuropsicologia parte desse questionamento para formar profissionais de saúde e educação aptos à realização da avaliação e reabilitação neuropsicológica de crianças, adolescentes, adultos e idosos. Durante a pós em Neuropsicologia, os estudantes aprenderão sobre o desenvolvimento cognitivo e as principais alterações e doenças relacionadas ao comportamento humano. O curso permite que o profissional aprofunde o conhecimento em Neuropsicofarmacologia, Terapia Cognitiva Comportamental (TCC), e Psiquiatria.',
    target:
      'Psicólogos e profissionais da área da saúde e educação, capacitando-os para realizar a avaliação e a reabilitação neuropsicológica.',
    curriculum: [
      'Avaliação e reabilitação neuropsicológica de adolescentes',
      'Avaliação e Reabilitação Neuropsicológica de Adultos',
      'Avaliação e Reabilitação Neuropsicológica de Idosos',
      'Neuropsicofarmacologia',
      'Neuropsicologia e Terapia Cognitiva Comportamental',
      'Neuropsicologia e Psiquiatria'
    ],
    certificate: 'Curso reconhecido pelo MEC'
  },
  {
    id: 2,
    slug: 'ginecologia-e-obstetricia',
    name: 'Enfermagem em Ginecologia e Obstetrícia',
    area: 'Enfermagem',
    modalities: ['Híbrido'],
    duration: 18,
    workload: 420,
    type: 'Especialização',
    coordinator: 'Ana Paula',
    professor: 'Profa. Priscila Rodrigues',
    status: 'em_planejamento',
    featured: true,
    price: {
      boleto: 769,
      installments: 18,
      credit: 599,
      fullPrice: 10782
    },
    description:
      'Especialização em Enfermagem Ginecologia e Obstetrícia com foco em atenção pré-natal, parto e puerpério, assistência ao recém-nascido e atenção ginecológica.',
    about:
      'O curso é destinado a enfermeiros que desejam aprofundar competências clínicas, assistenciais e gestoras na saúde da mulher – com ênfase em atenção pré-natal, parto e puerpério, assistência ao recém-nascido, e atenção ginecológica. Combina disciplinas teóricas, laboratórios de habilidades/simulação, seminários e estágio supervisionado em serviços de saúde.',
    target:
      'Enfermeiros graduados com registro ativo no COREN, que atuam ou pretendem atuar em maternidades, centros de parto normal, atenção primária (pré-natal), serviços obstétricos, unidades neonatais, e serviços de planejamento familiar.',
    curriculum: [
      'Fisiologia Reprodutiva e Ciclo Menstrual',
      'Atenção ao Pré-Natal de Baixo Risco',
      'Planejamento Familiar e Saúde Sexual',
      'Assistência ao Trabalho de Parto e Parto Humanizado',
      'Emergências Obstétricas',
      'Cuidados ao Recém-Nascido e Puerpério',
      'Ginecologia Clínica e Atenção Ambulatorial',
      'Gestão, Qualidade, Segurança e Ética',
      'Metodologia Científica e TCC'
    ],
    certificate: 'Certificado de Especialização Lato Sensu'
  },
  {
    id: 3,
    slug: 'uti-enfase-cardiologia',
    name: 'Enfermagem UTI com Ênfase em Cardiologia',
    area: 'Enfermagem',
    modalities: ['Híbrido'],
    duration: 18,
    workload: 420,
    type: 'Especialização',
    coordinator: 'Ana Paula',
    professor: 'Profa. Débora Laura F. C. e Silva / Thiago da Costa e Silva',
    status: 'em_planejamento',
    featured: true,
    price: {
      boleto: 769,
      installments: 18,
      credit: 599,
      fullPrice: 10782
    },
    description:
      'Especialização para enfermeiros atuarem com excelência em UTIs gerais e cardiológicas, desenvolvendo competências técnicas, raciocínio clínico avançado e tomada de decisão baseada em evidências.',
    about:
      'O curso qualifica enfermeiros para atuação especializada e de alta complexidade no ambiente de terapia intensiva, com foco nas condições clínicas e hemodinâmicas do paciente crítico cardiológico. Contempla conteúdos atualizados, metodologias ativas, estudos de caso, simulações realísticas e estágio supervisionado.',
    target:
      'Enfermeiros graduados que atuam ou desejam atuar em Unidades de Terapia Intensiva, Emergência, Cardiologia e setores de alta complexidade.',
    curriculum: [
      'Fundamentos da Terapia Intensiva',
      'Fisiopatologia do Paciente Crítico',
      'Cardiologia Intensiva',
      'Emergências Cardiovasculares',
      'Ventilação Mecânica e Cuidados Respiratórios',
      'Farmacologia Aplicada à UTI',
      'Procedimentos e Tecnologias em UTI',
      'Gestão, Liderança e Qualidade na UTI',
      'Ética, Humanização e Cuidados Paliativos',
      'Metodologia Científica e Produção Acadêmica'
    ],
    certificate: 'Certificado de Pós-Graduação Lato Sensu'
  },
  {
    id: 4,
    slug: 'saude-coletiva',
    name: 'Saúde Coletiva com ênfase em ESF',
    area: 'Enfermagem',
    modalities: ['Híbrido'],
    duration: 12,
    workload: 360,
    type: 'Especialização',
    coordinator: 'Ana Paula',
    professor: 'Enf. Ms Ana Paula Fernandes de Oliveira Macedo',
    status: 'em_planejamento',
    featured: false,
    price: {
      boleto: 489,
      installments: 12,
      credit: 395.9,
      fullPrice: 4750.8
    },
    description:
      'Pós-Graduação Lato Sensu em Saúde Coletiva com ênfase em Estratégia de Saúde da Família para atuar na Atenção Primária com visão crítica, ética e resolutiva.',
    about:
      'A Atenção Primária à Saúde constitui a porta de entrada preferencial do SUS, sendo a Estratégia de Saúde da Família o principal modelo de organização da assistência. O curso forma especialistas capazes de planejar ações com base no diagnóstico territorial, desenvolver intervenções em saúde coletiva e atuar em equipes multiprofissionais.',
    target:
      'Profissionais graduados da área da saúde: Enfermagem, Medicina, Odontologia, Fisioterapia, Psicologia, Nutrição, Serviço Social, Farmácia, Educação Física, Biomedicina, Terapia Ocupacional e outras áreas correlatas.',
    curriculum: [
      'Políticas Públicas de Saúde e Organização do SUS',
      'Determinantes Sociais da Saúde e Iniquidades',
      'Epidemiologia Aplicada à Atenção Primária',
      'Processo de Trabalho na Estratégia Saúde da Família',
      'Práticas Interprofissionais e Segurança do Paciente',
      'Gestão da Unidade Básica de Saúde',
      'Saúde da Mulher, Criança, Homem e Idoso',
      'Condições Crônicas e Saúde Mental na APS',
      'Populações Vulneráveis e Promoção da Saúde',
      'Saúde Digital e Inovação na APS',
      'Metodologia Científica e TCC'
    ],
    certificate: 'Certificado de Especialização Lato Sensu'
  }
]
