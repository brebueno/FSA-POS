<template>
  <div>
    <div class="admin-content-header">
      <div>
        <div class="fsa-breadcrumb" style="margin-bottom:0.5rem">
          <NuxtLink to="/admin">Admin</NuxtLink>
          <span class="sep"><i class="bi bi-chevron-right"></i></span>
          <NuxtLink to="/admin/cursos">Cursos</NuxtLink>
          <span class="sep"><i class="bi bi-chevron-right"></i></span>
          <span class="current">Editar</span>
        </div>
        <h1>Editar Curso</h1>
      </div>
      <div class="d-flex gap-2">
        <NuxtLink :to="`/cursos/${form.slug}`" class="btn-fsa-outline" target="_blank">
          <i class="bi bi-eye me-1"></i>Ver no site
        </NuxtLink>
        <NuxtLink to="/admin/cursos" class="btn-fsa-outline">
          <i class="bi bi-arrow-left me-1"></i>Voltar
        </NuxtLink>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5" style="color:var(--fsa-text-muted)">
      <i class="bi bi-arrow-repeat spin" style="font-size:2rem"></i>
      <p>Carregando...</p>
    </div>

    <div v-else class="row g-4">
      <!-- Banner Upload -->
      <div class="col-12">
        <div style="background:var(--fsa-bg-card);border:1px solid var(--fsa-border);border-radius:var(--fsa-radius);padding:1.5rem">
          <h5 style="font-weight:700;margin-bottom:1rem">
            <i class="bi bi-image me-2" style="color:var(--fsa-cyan)"></i>
            Banner do Curso
          </h5>
          <p style="color:var(--fsa-text-secondary);font-size:0.875rem;margin-bottom:1.25rem">
            Imagem exibida no card e no topo da página do curso. Recomendado: 1200×400px, JPG ou PNG.
          </p>
          <div class="row g-3 align-items-start">
            <div class="col-md-6">
              <div
                class="banner-preview"
                :style="form.banner ? `background-image:url('${form.banner}')` : ''"
                @click="bannerInput?.click()"
              >
                <div v-if="!form.banner" class="banner-placeholder">
                  <i class="bi bi-image" style="font-size:2rem;color:var(--fsa-text-muted)"></i>
                  <span style="color:var(--fsa-text-muted);font-size:0.85rem;margin-top:0.5rem;display:block">Clique para fazer upload</span>
                </div>
                <div v-else class="banner-change-overlay">
                  <i class="bi bi-pencil me-1"></i>Trocar imagem
                </div>
              </div>
              <input ref="bannerInput" type="file" accept="image/*" style="display:none" @change="onBannerChange" />
            </div>
            <div class="col-md-6">
              <label class="fsa-label">Ou cole a URL da imagem</label>
              <input v-model="form.banner" type="url" class="fsa-form-control" placeholder="https://..." />
              <p style="font-size:0.75rem;color:var(--fsa-text-muted);margin-top:0.5rem;margin-bottom:0.5rem">
                Você pode usar uma URL externa ou fazer upload acima.
              </p>
              <button v-if="form.banner" @click="form.banner = ''" class="btn-fsa-outline" type="button" style="font-size:0.8rem;padding:0.35rem 0.75rem">
                <i class="bi bi-trash me-1"></i>Remover banner
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Form -->
      <div class="col-lg-8">
        <div style="background:var(--fsa-bg-card);border:1px solid var(--fsa-border);border-radius:var(--fsa-radius);padding:1.5rem">
          <h5 style="font-weight:700;margin-bottom:1.25rem">
            <i class="bi bi-pencil-square me-2" style="color:var(--fsa-cyan)"></i>
            Dados do Curso
          </h5>
          <div class="row g-3">
            <div class="col-md-8">
              <label class="fsa-label">Nome do curso *</label>
              <input v-model="form.name" type="text" class="fsa-form-control" />
            </div>
            <div class="col-md-4">
              <label class="fsa-label">Tipo</label>
              <select v-model="form.type" class="fsa-form-control">
                <option>Especialização</option><option>MBA</option><option>Aperfeiçoamento</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="fsa-label">Slug (URL)</label>
              <div class="d-flex gap-0">
                <span class="slug-prefix">/cursos/</span>
                <input v-model="form.slug" type="text" class="fsa-form-control" style="border-radius:0 var(--fsa-radius-sm) var(--fsa-radius-sm) 0" />
              </div>
            </div>
            <div class="col-md-6">
              <label class="fsa-label">Área</label>
              <select v-model="form.area" class="fsa-form-control">
                <option value="">Selecione...</option>
                <option>Psicologia</option><option>Enfermagem</option><option>Direito</option>
                <option>Odontologia</option><option>Pedagogia</option><option>Administração</option><option>Medicina</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="fsa-label">Modalidade</label>
              <div class="d-flex gap-2 flex-wrap mt-1">
                <label v-for="m in ['EAD','Híbrido','Presencial']" :key="m" class="modality-check">
                  <input type="checkbox" :value="m" v-model="form.modalities" style="display:none" />
                  <span class="course-card-modality"
                    :class="{ 'modality-ead': m === 'EAD', 'modality-hibrido': m !== 'EAD', selected: form.modalities.includes(m) }"
                    style="cursor:pointer">{{ m }}</span>
                </label>
              </div>
            </div>
            <div class="col-md-4">
              <label class="fsa-label">Duração (meses)</label>
              <input v-model.number="form.duration" type="number" class="fsa-form-control" min="1" max="48" />
            </div>
            <div class="col-md-4">
              <label class="fsa-label">Carga Horária (h)</label>
              <input v-model.number="form.workload" type="number" class="fsa-form-control" min="1" />
            </div>
            <div class="col-md-6">
              <label class="fsa-label">Coordenador(a)</label>
              <input v-model="form.coordinator" type="text" class="fsa-form-control" />
            </div>
            <div class="col-md-6">
              <label class="fsa-label">Professor(a) responsável</label>
              <input v-model="form.professor" type="text" class="fsa-form-control" />
            </div>
            <div class="col-12">
              <label class="fsa-label">Descrição curta</label>
              <textarea v-model="form.description" class="fsa-form-control" rows="2" style="resize:vertical"></textarea>
            </div>
            <div class="col-12">
              <label class="fsa-label">Sobre o curso</label>
              <textarea v-model="form.about" class="fsa-form-control" rows="5" style="resize:vertical"></textarea>
            </div>
            <div class="col-12">
              <label class="fsa-label">Público-alvo</label>
              <textarea v-model="form.target" class="fsa-form-control" rows="3" style="resize:vertical"></textarea>
            </div>
            <div class="col-12">
              <label class="fsa-label">Grade Curricular (uma disciplina por linha)</label>
              <textarea
                :value="form.curriculum.join('\n')"
                @input="(e) => form.curriculum = (e.target as HTMLTextAreaElement).value.split('\n')"
                class="fsa-form-control" rows="8"
                style="resize:vertical;font-family:monospace;font-size:0.85rem"></textarea>
              <span style="font-size:0.75rem;color:var(--fsa-text-muted)">
                {{ form.curriculum.filter(Boolean).length }} disciplina(s)
              </span>
            </div>
            <div class="col-12">
              <label class="fsa-label">Certificado</label>
              <input v-model="form.certificate" type="text" class="fsa-form-control" />
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing & Status -->
      <div class="col-lg-4">
        <div style="background:var(--fsa-bg-card);border:1px solid var(--fsa-border);border-radius:var(--fsa-radius);padding:1.5rem;margin-bottom:1rem">
          <h5 style="font-weight:700;margin-bottom:1.25rem">
            <i class="bi bi-currency-dollar me-2" style="color:var(--fsa-cyan)"></i>Preços
          </h5>
          <div class="fsa-form-group">
            <label class="fsa-label">Preço boleto (R$/mês)</label>
            <input v-model.number="form.price.boleto" type="number" class="fsa-form-control" min="0" step="0.01" />
          </div>
          <div class="fsa-form-group">
            <label class="fsa-label">Nº de parcelas</label>
            <input v-model.number="form.price.installments" type="number" class="fsa-form-control" min="1" />
          </div>
          <div class="fsa-form-group mb-0">
            <label class="fsa-label">Preço cartão (R$/mês)</label>
            <input v-model.number="form.price.credit" type="number" class="fsa-form-control" min="0" step="0.01" />
          </div>
        </div>
        <div style="background:var(--fsa-bg-card);border:1px solid var(--fsa-border);border-radius:var(--fsa-radius);padding:1.5rem">
          <h5 style="font-weight:700;margin-bottom:1.25rem">
            <i class="bi bi-toggles me-2" style="color:var(--fsa-cyan)"></i>Publicação
          </h5>
          <div class="fsa-form-group">
            <label class="fsa-label">Status</label>
            <select v-model="form.status" class="fsa-form-control">
              <option value="ativa">Ativa</option>
              <option value="em_planejamento">Em Planejamento</option>
              <option value="inativa">Inativa</option>
            </select>
          </div>
          <div class="fsa-form-group mb-0">
            <label class="inline-toggle" @click="form.featured = !form.featured">
              <div class="toggle-switch" :class="{ on: form.featured }"></div>
              Destacar na página inicial
            </label>
          </div>
        </div>
      </div>

      <!-- Save -->
      <div class="col-12 d-flex gap-3 justify-content-end pb-4">
        <span v-if="saveSuccess" style="color:#22c55e;font-size:0.875rem;align-self:center">
          <i class="bi bi-check-circle-fill me-1"></i>Salvo com sucesso!
        </span>
        <NuxtLink to="/admin/cursos" class="btn-fsa-outline">Cancelar</NuxtLink>
        <button class="btn-fsa-primary" @click="saveCourse" type="button" :disabled="saving"
          style="border-radius:var(--fsa-radius-sm);padding:0.65rem 2rem">
          <i v-if="saving" class="bi bi-arrow-repeat spin me-2"></i>
          <i v-else class="bi bi-floppy me-2"></i>
          {{ saving ? 'Salvando...' : 'Salvar Alterações' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const route = useRoute()
const id = Number(route.params.id)
const { formatCurrency } = useFormatters()

const loading = ref(true)
const saving = ref(false)
const saveSuccess = ref(false)
const bannerInput = ref<HTMLInputElement | null>(null)

const form = reactive({
  name: '', slug: '', area: '', type: 'Especialização',
  modalities: [] as string[], duration: 18, workload: 420,
  coordinator: '', professor: '', description: '', about: '', target: '',
  curriculum: [] as string[], certificate: '', status: 'em_planejamento' as string,
  featured: false, banner: '',
  price: { boleto: 0, installments: 18, credit: 0, fullPrice: 0 }
})

onMounted(async () => {
  const courses = await $fetch<any[]>('/api/courses')
  const course = courses.find((c) => c.id === id)
  if (!course) { navigateTo('/admin/cursos'); return }
  Object.assign(form, {
    ...course,
    banner: course.banner ?? '',
    price: { boleto: course.price?.boleto ?? 0, installments: course.price?.installments ?? 18, credit: course.price?.credit ?? 0, fullPrice: course.price?.fullPrice ?? 0 }
  })
  loading.value = false
})

const onBannerChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => { form.banner = ev.target?.result as string }
  reader.readAsDataURL(file)
}

const saveCourse = async () => {
  if (!form.name || !form.slug) { alert('Preencha o nome e slug.'); return }
  saving.value = true
  saveSuccess.value = false
  try {
    await $fetch(`/api/courses/${id}`, {
      method: 'PUT',
      body: {
        ...form,
        banner: form.banner || undefined,
        price: { ...form.price, fullPrice: form.price.boleto * form.price.installments }
      }
    })
    saveSuccess.value = true
    setTimeout(() => saveSuccess.value = false, 3000)
  } finally {
    saving.value = false
  }
}

useHead({ title: 'Editar Curso — Admin FSA' })
</script>

<style scoped>
.banner-preview {
  width: 100%; height: 160px; background: var(--fsa-bg-secondary);
  border: 2px dashed var(--fsa-border); border-radius: var(--fsa-radius-sm);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; position: relative; overflow: hidden;
  background-size: cover; background-position: center; transition: border-color 0.2s;
}
.banner-preview:hover { border-color: var(--fsa-cyan); }
.banner-placeholder { display: flex; flex-direction: column; align-items: center; }
.banner-change-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.6);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 0.9rem; font-weight: 600; opacity: 0; transition: opacity 0.2s;
}
.banner-preview:hover .banner-change-overlay { opacity: 1; }
.slug-prefix {
  background: var(--fsa-bg-secondary); border: 1.5px solid var(--fsa-border);
  border-right: none; border-radius: var(--fsa-radius-sm) 0 0 var(--fsa-radius-sm);
  padding: 0.65rem 0.75rem; font-size: 0.85rem; color: var(--fsa-text-muted); white-space: nowrap;
}
.modality-check .selected { opacity: 1 !important; box-shadow: 0 0 0 2px var(--fsa-cyan); }
.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
