<template>
  <div class="checkout-page">
    <CheckoutHeader
      :course-name="store.courseName || course?.name || 'Curso'"
      :modality="store.courseModality || course?.modalities[0]"
      :current-step="1"
    />

    <div class="checkout-body">
      <div class="container">
        <div class="row g-4">
          <!-- Main Form -->
          <div class="col-lg-8">
            <div class="checkout-content-wrapper">
              <div class="checkout-content-inner">

                <!-- Header -->
                <div class="checkout-icon-header mb-4">
                  <div class="icon-wrap">
                    <i class="bi bi-person-fill"></i>
                  </div>
                  <div>
                    <h2>Cadastro</h2>
                    <p>Preencha seus dados para iniciar a matrícula</p>
                  </div>
                </div>

                <!-- Dados Pessoais -->
                <div class="checkout-section-box">
                  <h5><i class="bi bi-person"></i>Dados Pessoais</h5>

                  <div class="row g-3">
                    <!-- Nome -->
                    <div class="col-12">
                      <div class="fsa-form-group mb-0">
                        <label class="fsa-label">Nome completo *</label>
                        <input
                          v-model="store.personal.nome"
                          type="text"
                          class="fsa-form-control"
                          :class="{ 'is-invalid': errors.nome }"
                          placeholder="Digite seu nome completo"
                          autocomplete="name"
                        />
                        <span v-if="errors.nome" class="field-error">{{ errors.nome }}</span>
                      </div>
                      <!-- Nome Social Toggle -->
                      <div class="mt-2">
                        <label class="inline-toggle" @click="store.personal.usarNomeSocial = !store.personal.usarNomeSocial">
                          <div class="toggle-switch" :class="{ on: store.personal.usarNomeSocial }"></div>
                          Usar nome social
                        </label>
                      </div>
                      <div v-if="store.personal.usarNomeSocial" class="mt-2">
                        <input
                          v-model="store.personal.nomeSocial"
                          type="text"
                          class="fsa-form-control"
                          placeholder="Nome social (como prefere ser chamado(a))"
                        />
                      </div>
                    </div>

                    <!-- Email -->
                    <div class="col-md-6">
                      <div class="fsa-form-group mb-0">
                        <label class="fsa-label">E-mail *</label>
                        <input
                          v-model="store.personal.email"
                          type="email"
                          class="fsa-form-control"
                          :class="{ 'is-invalid': errors.email }"
                          placeholder="seu@email.com"
                          autocomplete="email"
                        />
                        <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
                      </div>
                    </div>

                    <!-- Telefone -->
                    <div class="col-md-6">
                      <div class="fsa-form-group mb-0">
                        <label class="fsa-label">Celular / WhatsApp *</label>
                        <input
                          v-model="store.personal.telefone"
                          type="tel"
                          class="fsa-form-control"
                          :class="{ 'is-invalid': errors.telefone }"
                          placeholder="(11) 99999-9999"
                          maxlength="15"
                          @input="onPhoneInput"
                          autocomplete="tel"
                        />
                        <span v-if="errors.telefone" class="field-error">{{ errors.telefone }}</span>
                      </div>
                    </div>

                    <!-- CPF -->
                    <div class="col-md-6">
                      <div class="fsa-form-group mb-0">
                        <label class="fsa-label">CPF *</label>
                        <input
                          v-model="store.personal.cpf"
                          type="text"
                          class="fsa-form-control"
                          :class="{ 'is-invalid': errors.cpf }"
                          placeholder="000.000.000-00"
                          maxlength="14"
                          @input="onCpfInput"
                          autocomplete="off"
                        />
                        <span v-if="errors.cpf" class="field-error">{{ errors.cpf }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Endereço Residencial -->
                <div class="checkout-section-box">
                  <h5><i class="bi bi-geo-alt"></i>Endereço Residencial</h5>

                  <div class="row g-3">
                    <!-- CEP -->
                    <div class="col-md-4">
                      <div class="fsa-form-group mb-0">
                        <label class="fsa-label">CEP *</label>
                        <div class="cep-input-wrap">
                          <input
                            v-model="store.address.cep"
                            type="text"
                            class="fsa-form-control"
                            :class="{ 'is-invalid': errors.cep }"
                            placeholder="00000-000"
                            maxlength="9"
                            @input="onCepInput"
                          />
                          <span v-if="cepLoading" class="cep-loading">
                            <i class="bi bi-arrow-repeat spin"></i>
                          </span>
                        </div>
                        <span v-if="errors.cep" class="field-error">{{ errors.cep }}</span>
                        <a
                          href="https://buscacepinter.correios.com.br/"
                          target="_blank"
                          style="font-size:0.72rem;color:var(--fsa-cyan)"
                        >
                          Não sei meu CEP
                        </a>
                      </div>
                    </div>

                    <!-- Logradouro -->
                    <div class="col-md-8">
                      <div class="fsa-form-group mb-0">
                        <label class="fsa-label">Logradouro *</label>
                        <input
                          v-model="store.address.logradouro"
                          type="text"
                          class="fsa-form-control"
                          :class="{ 'is-invalid': errors.logradouro }"
                          placeholder="Rua, Avenida, etc."
                          autocomplete="street-address"
                        />
                        <span v-if="errors.logradouro" class="field-error">{{ errors.logradouro }}</span>
                      </div>
                    </div>

                    <!-- Número -->
                    <div class="col-md-4">
                      <div class="fsa-form-group mb-0">
                        <label class="fsa-label">Número *</label>
                        <input
                          v-model="store.address.numero"
                          type="text"
                          class="fsa-form-control"
                          :class="{ 'is-invalid': errors.numero }"
                          placeholder="123"
                        />
                        <span v-if="errors.numero" class="field-error">{{ errors.numero }}</span>
                      </div>
                    </div>

                    <!-- Complemento -->
                    <div class="col-md-8">
                      <div class="fsa-form-group mb-0">
                        <label class="fsa-label">Complemento</label>
                        <input
                          v-model="store.address.complemento"
                          type="text"
                          class="fsa-form-control"
                          placeholder="Apto, Bloco, etc. (opcional)"
                        />
                      </div>
                    </div>

                    <!-- Bairro -->
                    <div class="col-md-4">
                      <div class="fsa-form-group mb-0">
                        <label class="fsa-label">Bairro</label>
                        <input
                          v-model="store.address.bairro"
                          type="text"
                          class="fsa-form-control"
                          placeholder="Bairro"
                        />
                      </div>
                    </div>

                    <!-- Cidade -->
                    <div class="col-md-5">
                      <div class="fsa-form-group mb-0">
                        <label class="fsa-label">Cidade *</label>
                        <input
                          v-model="store.address.cidade"
                          type="text"
                          class="fsa-form-control"
                          :class="{ 'is-invalid': errors.cidade }"
                          placeholder="Cidade"
                        />
                        <span v-if="errors.cidade" class="field-error">{{ errors.cidade }}</span>
                      </div>
                    </div>

                    <!-- Estado -->
                    <div class="col-md-3">
                      <div class="fsa-form-group mb-0">
                        <label class="fsa-label">Estado</label>
                        <select v-model="store.address.estado" class="fsa-form-control">
                          <option value="">UF</option>
                          <option v-for="uf in ufs" :key="uf" :value="uf">{{ uf }}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- Same billing address toggle -->
                  <div class="mt-3 pt-3" style="border-top:1px solid var(--fsa-border)">
                    <label class="inline-toggle" @click="store.address.usarMesmoEnderecoCob = !store.address.usarMesmoEnderecoCob">
                      <div class="toggle-switch" :class="{ on: store.address.usarMesmoEnderecoCob }"></div>
                      Utilizar mesmo endereço para cobrança
                    </label>
                  </div>
                </div>

                <!-- Actions -->
                <div class="d-flex gap-3 justify-content-between mt-2">
                  <NuxtLink :to="`/cursos/${cursoSlug}`" class="btn-fsa-outline">
                    <i class="bi bi-arrow-left me-2"></i>Voltar
                  </NuxtLink>
                  <button
                    class="btn-fsa-block"
                    style="max-width:220px"
                    :disabled="!isValid"
                    @click="handleNext"
                  >
                    Próximo <i class="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>

              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="col-lg-4">
            <OrderSummary
              :course-name="store.courseName || course?.name || 'Curso'"
              :modality="store.courseModality || course?.modalities[0]"
              :duration="store.courseDuration || course?.duration"
              :original-price="originalPrice"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckoutHeader from '~/components/checkout/CheckoutHeader.vue'
import OrderSummary from '~/components/checkout/OrderSummary.vue'
import { useCheckoutStore } from '~/stores/checkout'
import { useCoursesStore } from '~/stores/courses'

definePageMeta({ layout: false })

const route = useRoute()
const router = useRouter()
const cursoSlug = route.params.curso as string

const store = useCheckoutStore()
const coursesStore = useCoursesStore()
const { fetchAddressByCep } = useCheckout()
const { formatPhone, formatCPF, formatCEP } = useFormatters()

const course = computed(() => coursesStore.getCourseBySlug(cursoSlug))

// Initialize store with course data if not already set
onMounted(() => {
  if (!store.courseSlug && course.value) {
    store.setCourse(
      course.value.slug,
      course.value.name,
      course.value.modalities[0],
      course.value.duration,
      course.value.price.boleto,
      course.value.price.installments
    )
  }
})

const originalPrice = computed(() => {
  const c = course.value
  if (!c) return 0
  return c.price.boleto * c.price.installments
})

const errors = reactive({
  nome: '', email: '', telefone: '', cpf: '',
  cep: '', logradouro: '', numero: '', cidade: ''
})

const cepLoading = ref(false)

const validate = () => {
  const p = store.personal
  const a = store.address
  errors.nome       = p.nome.trim().length < 3 ? 'Nome muito curto' : ''
  errors.email      = !p.email.includes('@') ? 'E-mail inválido' : ''
  errors.telefone   = p.telefone.replace(/\D/g, '').length < 10 ? 'Telefone inválido' : ''
  errors.cpf        = p.cpf.replace(/\D/g, '').length !== 11 ? 'CPF inválido (11 dígitos)' : ''
  errors.cep        = a.cep.replace(/\D/g, '').length !== 8 ? 'CEP inválido' : ''
  errors.logradouro = a.logradouro.trim().length === 0 ? 'Logradouro obrigatório' : ''
  errors.numero     = a.numero.trim().length === 0 ? 'Número obrigatório' : ''
  errors.cidade     = a.cidade.trim().length === 0 ? 'Cidade obrigatória' : ''
  return Object.values(errors).every((e) => e === '')
}

const isValid = computed(() => store.isCadastroValid)

const onPhoneInput = (e: Event) => {
  store.personal.telefone = formatPhone((e.target as HTMLInputElement).value)
}
const onCpfInput = (e: Event) => {
  store.personal.cpf = formatCPF((e.target as HTMLInputElement).value)
}
const onCepInput = async (e: Event) => {
  const val = (e.target as HTMLInputElement).value
  store.address.cep = formatCEP(val)
  const digits = val.replace(/\D/g, '')
  if (digits.length === 8) {
    cepLoading.value = true
    await fetchAddressByCep(digits)
    cepLoading.value = false
  }
}

const handleNext = () => {
  if (!validate()) return
  store.goToStep(2)
  router.push(`/checkout/${cursoSlug}/pagamento`)
}

const ufs = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC',
  'SP','SE','TO'
]

useHead({ title: `Cadastro — ${course.value?.name ?? 'Curso'} — FSA` })
</script>

<style scoped>
.field-error {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
  display: block;
}
.cep-input-wrap { position: relative; }
.cep-loading {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--fsa-cyan);
}
.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
