// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  css: [
    '@/assets/fonts.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/main.css'
  ],
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        // <script src="https://myawesome-lib.js"></script>
        {
          src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBAX1pmERCOfG1TewmZvOviBNt0b-Vsl0g&map_ids=2ee5bbffbf8f0060&libraries=places,visualization'
        },
        { src: 'https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js' }
      ]
    }
  },
  build: {
    transpile: ['vuetify']
  },
  pinia: {
    autoImports: [
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
    ]
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxt/image']
})
