<template>
  <v-btn
    style="text-transform: none; color: #fff"
    prepend-icon="mdi-exit-to-app"
    :color="colors.INDIGO"
    @click="
      () => {
        userStore.logout()
      }
    "
  >
    <span style="padding-top: 4px">Выйти</span>
  </v-btn>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore'
import { colors } from '~/core/color/color'

const userStore = useUserStore()
</script>

<style scoped></style>
