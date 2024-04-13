<script
  lang="ts"
  setup
>
import ToastProvider from '@/providers/ToastProvider.vue'
</script>

<template>
  <!-- DONE! -->
  <NuxtLayout>
    <VitePwaManifest />
    <ToastProvider />
    <NuxtPage />
  </NuxtLayout>
</template>
