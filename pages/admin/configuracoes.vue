<template>
  <div>
    <div class="admin-content-header">
      <div>
        <h1>Configurações</h1>
        <p style="color:var(--fsa-text-muted);font-size:0.85rem;margin:0">
          Personalize banners e textos do site
        </p>
      </div>
    </div>

    <div class="row g-4">
      <!-- Hero Section -->
      <div class="col-12">
        <div style="background:var(--fsa-bg-card);border:1px solid var(--fsa-border);border-radius:var(--fsa-radius);padding:1.5rem">
          <h5 style="font-weight:700;margin-bottom:0.25rem">
            <i class="bi bi-house me-2" style="color:var(--fsa-cyan)"></i>
            Hero — Página Inicial
          </h5>
          <p style="color:var(--fsa-text-secondary);font-size:0.85rem;margin-bottom:1.25rem">
            Imagem de fundo e textos da seção principal da homepage.
          </p>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="fsa-label">Imagem de fundo do Hero</label>
              <div
                class="banner-preview"
                :style="settings.heroBg ? `background-image:url('${settings.heroBg}')` : ''"
                @click="heroBgInput?.click()"
              >
                <div v-if="!settings.heroBg" class="banner-placeholder">
                  <i class="bi bi-image" style="font-size:2rem;color:var(--fsa-text-muted)"></i>
                  <span style="color:var(--fsa-text-muted);font-size:0.85rem;margin-top:0.5rem;display:block">Clique para fazer upload</span>
                </div>
                <div v-else class="banner-change-overlay">
                  <i class="bi bi-pencil me-1"></i>Trocar imagem
                </div>
              </div>
              <input ref="heroBgInput" type="file" accept="image/*" style="display:none" @change="(e) => onImageChange(e, 'heroBg')" />
            </div>
            <div class="col-md-6">
              <div class="fsa-form-group">
                <label class="fsa-label">Ou URL da imagem</label>
                <input v-model="settings.heroBg" type="url" class="fsa-form-control" placeholder="https://..." />
              </div>
              <div class="fsa-form-group">
                <label class="fsa-label">Título principal</label>
                <input v-model="settings.heroTitle" type="text" class="fsa-form-control" placeholder="Transforme sua carreira..." />
              </div>
              <div class="fsa-form-group mb-0">
                <label class="fsa-label">Subtítulo</label>
                <textarea v-model="settings.heroSubtitle" class="fsa-form-control" rows="3" style="resize:vertical"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Announcement Bar -->
      <div class="col-12">
        <div style="background:var(--fsa-bg-card);border:1px solid var(--fsa-border);border-radius:var(--fsa-radius);padding:1.5rem">
          <h5 style="font-weight:700;margin-bottom:0.25rem">
            <i class="bi bi-megaphone me-2" style="color:var(--fsa-cyan)"></i>
            Barra de Anúncio
          </h5>
          <p style="color:var(--fsa-text-secondary);font-size:0.85rem;margin-bottom:1.25rem">
            Faixa no topo do site com promoções ou avisos importantes.
          </p>
          <div class="row g-3">
            <div class="col-md-8">
              <label class="fsa-label">Texto do anúncio</label>
              <input v-model="settings.announcementText" type="text" class="fsa-form-control"
                placeholder="🎓 Inscrições abertas para 2026! Bolsas de até 40% OFF." />
            </div>
            <div class="col-md-4 d-flex align-items-end">
              <label class="inline-toggle" style="margin-bottom:0" @click="settings.announcementActive = !settings.announcementActive">
                <div class="toggle-switch" :class="{ on: settings.announcementActive }"></div>
                Barra ativa
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer / Contact -->
      <div class="col-12">
        <div style="background:var(--fsa-bg-card);border:1px solid var(--fsa-border);border-radius:var(--fsa-radius);padding:1.5rem">
          <h5 style="font-weight:700;margin-bottom:0.25rem">
            <i class="bi bi-telephone me-2" style="color:var(--fsa-cyan)"></i>
            Contato e Rodapé
          </h5>
          <p style="color:var(--fsa-text-secondary);font-size:0.85rem;margin-bottom:1.25rem">
            Informações de contato exibidas no rodapé e nas páginas de cursos.
          </p>
          <div class="row g-3">
            <div class="col-md-4">
              <label class="fsa-label">WhatsApp</label>
              <input v-model="settings.whatsapp" type="text" class="fsa-form-control" placeholder="(11) 99999-9999" />
            </div>
            <div class="col-md-4">
              <label class="fsa-label">E-mail</label>
              <input v-model="settings.email" type="email" class="fsa-form-control" placeholder="contato@fsa.edu.br" />
            </div>
            <div class="col-md-4">
              <label class="fsa-label">Endereço</label>
              <input v-model="settings.address" type="text" class="fsa-form-control" placeholder="Rua..." />
            </div>
          </div>
        </div>
      </div>

      <!-- Save -->
      <div class="col-12 d-flex gap-3 justify-content-end pb-4">
        <span v-if="saveSuccess" style="color:#22c55e;font-size:0.875rem;align-self:center">
          <i class="bi bi-check-circle-fill me-1"></i>Configurações salvas!
        </span>
        <button class="btn-fsa-primary" @click="saveSettings" type="button" :disabled="saving"
          style="border-radius:var(--fsa-radius-sm);padding:0.65rem 2rem">
          <i v-if="saving" class="bi bi-arrow-repeat spin me-2"></i>
          <i v-else class="bi bi-floppy me-2"></i>
          {{ saving ? 'Salvando...' : 'Salvar Configurações' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ title: 'Configurações — Admin FSA' })

const heroBgInput = ref<HTMLInputElement | null>(null)
const saving = ref(false)
const saveSuccess = ref(false)

const settings = reactive({
  heroBg: '',
  heroTitle: '',
  heroSubtitle: '',
  announcementText: '',
  announcementActive: true,
  whatsapp: '',
  email: '',
  address: ''
})

onMounted(async () => {
  const data = await $fetch<any>('/api/settings')
  Object.assign(settings, data)
})

const onImageChange = (e: Event, field: string) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => { (settings as any)[field] = ev.target?.result as string }
  reader.readAsDataURL(file)
}

const saveSettings = async () => {
  saving.value = true
  saveSuccess.value = false
  try {
    await $fetch('/api/settings', { method: 'PUT', body: settings })
    saveSuccess.value = true
    setTimeout(() => saveSuccess.value = false, 3000)
  } finally {
    saving.value = false
  }
}
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
.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
