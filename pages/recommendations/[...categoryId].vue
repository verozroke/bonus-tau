<template>
  <NuxtLayout name="recommendations">
    <div class="w-screen padding-30 ">
      sex
      {{ JSON.stringify(route.params.categoryId[0]) }}
    </div>
  </NuxtLayout>
</template>

<script
  setup
  lang="ts"
>
import { useRoute } from 'vue-router';


const route = useRoute()

</script>

<style scoped></style>