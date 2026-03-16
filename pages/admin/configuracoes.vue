<template>
  <div class="dash">
    <div class="dash-header">
      <div>
        <h1 class="dash-title">Configurações</h1>
        <p class="dash-sub">
          Personalize banners e textos do site
        </p>
      </div>
    </div>

    <div class="row g-4">
      <!-- Hero Section -->
      <div class="col-12">
        <div class="admin-card-base p-4">
          <h5 class="fw-bold mb-3 d-flex align-items-center gap-2">
            <div class="icon-square-neo cyan" style="width:32px;height:32px;font-size:1rem"><i class="bi bi-window-sidebar"></i></div>
            Hero — Página Inicial
          </h5>
          <div class="neo-hint-box mb-4">
            <i class="bi bi-info-circle me-1"></i>
            Imagem de fundo e textos da seção principal da homepage. Tamanho ideal: <strong>1920×700px</strong>.
          </div>
          <div class="row g-4">
            <div class="col-md-6">
              <label class="fsa-label">Imagem de Fundo do Hero</label>
              <div
                class="banner-preview mt-2"
                :style="settings.heroBg ? `background-image:url('${settings.heroBg}')` : ''"
                @click="heroBgInput?.click()"
              >
                <div v-if="!settings.heroBg" class="banner-placeholder">
                  <i class="bi bi-image text-muted fs-1 mb-2"></i>
                  <span>Clique p/ Upload</span>
                </div>
                <div v-else class="banner-change-overlay">
                  <i class="bi bi-pencil me-1"></i>Trocar Imagem
                </div>
              </div>
              <input ref="heroBgInput" type="file" accept="image/*" style="display:none" @change="(e) => onImageChange(e, 'heroBg')" />
            </div>
            <div class="col-md-6 d-flex flex-column gap-3">
              <div>
                <label class="fsa-label text-muted-neo">Ou URL da imagem</label>
                <input v-model="settings.heroBg" type="url" class="fsa-input-modern w-100" placeholder="https://..." />
              </div>
              <div>
                <label class="fsa-label">Título principal</label>
                <input v-model="settings.heroTitle" type="text" class="fsa-input-modern w-100 fw-bold" placeholder="Transforme sua carreira..." />
              </div>
              <div>
                <label class="fsa-label">Subtítulo</label>
                <textarea v-model="settings.heroSubtitle" class="fsa-input-modern w-100" rows="3" style="resize:vertical"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Announcement Bar -->
      <div class="col-12">
        <div class="admin-card-base p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0 d-flex align-items-center gap-2">
              <div class="icon-square-neo amber" style="width:32px;height:32px;font-size:1rem"><i class="bi bi-megaphone"></i></div>
              Barra de Anúncio
            </h5>
            <label class="neo-switch-wrap">
              <input type="checkbox" v-model="settings.announcementActive" style="display:none" />
              <div class="neo-switch" :class="{ on: settings.announcementActive }"><div class="thumb"></div></div>
              Visível
            </label>
          </div>
          <div class="neo-hint-box mb-4">
            <i class="bi bi-info-circle me-1"></i>
            Faixa no topo do site com promoções ou avisos importantes.
          </div>
          <div class="mt-2">
            <label class="fsa-label">Texto do anúncio</label>
            <input v-model="settings.announcementText" type="text" class="fsa-input-modern w-100 text-center fw-bold"
              placeholder="🎓 Inscrições abertas para 2026! Bolsas de até 40% OFF." style="color:var(--fsa-cyan)" />
          </div>
        </div>
      </div>

      <!-- Footer / Contact -->
      <div class="col-12">
        <div class="admin-card-base p-4">
          <h5 class="fw-bold mb-4 d-flex align-items-center gap-2">
            <div class="icon-square-neo primary" style="width:32px;height:32px;font-size:1rem"><i class="bi bi-geo-alt"></i></div>
            Contato e Rodapé
          </h5>
          <div class="neo-hint-box mb-4">
            <i class="bi bi-info-circle me-1"></i>
            Informações de contato exibidas no rodapé e nas páginas de cursos.
          </div>
          <div class="row g-4">
            <div class="col-md-4">
              <label class="fsa-label">WhatsApp</label>
              <div class="input-with-icon">
                <i class="bi bi-whatsapp"></i>
                <input v-model="settings.whatsapp" type="text" class="fsa-input-modern w-100" placeholder="(11) 99999-9999" />
              </div>
            </div>
            <div class="col-md-4">
              <label class="fsa-label">E-mail</label>
              <div class="input-with-icon">
                <i class="bi bi-envelope"></i>
                <input v-model="settings.email" type="email" class="fsa-input-modern w-100" placeholder="contato@fsa.edu.br" />
              </div>
            </div>
            <div class="col-md-4">
              <label class="fsa-label">Endereço</label>
              <div class="input-with-icon">
                <i class="bi bi-map"></i>
                <input v-model="settings.address" type="text" class="fsa-input-modern w-100" placeholder="Rua..." />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Save -->
      <div class="col-12 d-flex gap-3 justify-content-end pb-4 border-top border-white-5 pt-4">
        <span v-if="saveSuccess" class="ai-status success align-self-center">
          <i class="bi bi-check-circle-fill"></i> Salvo com sucesso!
        </span>
        <button class="admin-btn-modern px-5" @click="saveSettings" type="button" :disabled="saving">
          <i v-if="saving" class="bi bi-arrow-repeat spin me-2"></i>
          <i v-else class="bi bi-cloud-arrow-up me-2"></i>
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
.dash-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
.dash-title { font-size: 2rem; font-weight: 800; margin: 0; line-height: 1; text-shadow: 0 0 30px rgba(255,255,255,0.1); }
.dash-sub { font-size: 0.85rem; color: var(--fsa-text-muted); margin: 0.5rem 0 0; }
.text-muted-neo { color: var(--fsa-text-muted); font-size: 0.85rem; }

/* Icon Squares Neo */
.icon-square-neo {
  width: 42px; height: 42px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;
}
.icon-square-neo.cyan { background: rgba(56, 182, 255, 0.15); color: var(--fsa-cyan); border: 1px solid rgba(56, 182, 255, 0.3); }
.icon-square-neo.amber { background: rgba(251, 191, 36, 0.15); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); }
.icon-square-neo.primary { background: rgba(30, 58, 138, 0.3); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }

/* Hints */
.neo-hint-box {
  background: rgba(255,255,255,0.02); border-left: 3px solid var(--fsa-cyan);
  padding: 0.75rem 1rem; font-size: 0.8rem; color: var(--fsa-text-secondary); border-radius: 0 8px 8px 0;
}

/* Switches Neo */
.neo-switch-wrap { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; color: var(--fsa-text); font-weight: 500; font-size: 0.9rem; user-select: none; }
.neo-switch {
  width: 44px; height: 24px; border-radius: 99px; background: rgba(0,0,0,0.4);
  border: 1px solid var(--fsa-border-glass); position: relative; transition: all 0.3s ease;
}
.neo-switch .thumb {
  width: 18px; height: 18px; border-radius: 50%; background: var(--fsa-text-muted);
  position: absolute; top: 2px; left: 2px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.neo-switch.on { background: rgba(56, 182, 255, 0.2); border-color: var(--fsa-cyan); }
.neo-switch.on .thumb { background: var(--fsa-cyan); left: 22px; box-shadow: 0 0 8px var(--fsa-cyan); }

.input-with-icon { position: relative; }
.input-with-icon i { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--fsa-text-muted); }
.input-with-icon .fsa-input-modern { padding-left: 2.75rem; }

.banner-preview {
  width: 100%; height: 160px; background: rgba(0,0,0,0.2); border: 1px dashed var(--fsa-border-glass);
  border-radius: var(--fsa-radius-sm); display: flex; align-items: center; justify-content: center;
  cursor: pointer; position: relative; overflow: hidden; background-size: cover; background-position: center; transition: all 0.3s;
}
.banner-preview:hover { border-color: var(--fsa-cyan); box-shadow: 0 0 20px rgba(56,182,255,0.1); }
.banner-placeholder { display: flex; flex-direction: column; align-items: center; text-align: center; color: var(--fsa-text-muted); font-size: 0.85rem; }
.banner-change-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(2px);
  display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.9rem; font-weight: 600; opacity: 0; transition: opacity 0.2s;
}
.banner-preview:hover .banner-change-overlay { opacity: 1; }

.border-white-5 { border-color: rgba(255,255,255,0.05) !important; }
.ai-status { font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; }
.ai-status.success { color: #34d399; }
.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
