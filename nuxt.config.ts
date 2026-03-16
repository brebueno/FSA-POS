export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false
      }
    ]
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    '~/assets/css/main.css'
  ],
  modules: ['@pinia/nuxt'],
  plugins: ['~/plugins/bootstrap.client.ts'],
  runtimeConfig: {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || ''
  },
  app: {
    head: {
      title: 'Pós-Graduação - Faculdade Santo Antônio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Faculdade Santo Antônio - Cursos de Pós-Graduação Lato Sensu em Enfermagem, Psicologia, Direito, Odontologia e mais.'
        }
      ]
    }
  }
})
