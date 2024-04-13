<template>
  <!-- v-if="userStore.isAuthenticated" -->
  <v-bottom-navigation
    :color="colors.INDIGO"
    fixed
    grow
    :elevation="5"
  >
    <v-btn
      @click="goToPage('recommendations')"
      value="recommendations"
      prepend-icon="mdi-map-search"
      :active="link === 'recommendations'"
      stacked
      variant="text"
    >
      Рекомедации
    </v-btn>
    <v-btn
      @click="goToPage('maps')"
      value="maps"
      prepend-icon="mdi-map-search"
      :active="link === 'maps'"
      stacked
      variant="text"
    >
      Ближайшие
    </v-btn>
    <v-btn
      @click="goToPage('faq')"
      value="faq"
      prepend-icon="mdi-frequently-asked-questions"
      :active="link === 'faq'"
      stacked
      variant="text"
    >
      FAQ
    </v-btn>
    <v-btn
      :active="link === 'my-cards'"
      value="my-cards"
      @click="goToPage('my-cards')"
      prepend-icon="mdi-credit-card"
      stacked
      variant="text"
    >
      Карты
    </v-btn>
    <v-btn
      value="profile"
      :active="link === 'profile'"
      @click="goToPage('profile')"
      prepend-icon="mdi-account"
      stacked
      variant="text"
    >
      Кабинет
    </v-btn>
  </v-bottom-navigation>
</template>

<script
  setup
  lang="ts"
>
import { useRouter } from 'vue-router';
import { colors } from '~/core/color/color';


const router = useRouter()
const link = ref(window.location.pathname.split('/')[1] ? window.location.pathname.split('/')[1][0].toUpperCase() + window.location.pathname.split('/')[1].substring(1) : '')

const goToPage = (page: string) => {
  router.push('/' + page)
}

</script>

<style scoped></style>