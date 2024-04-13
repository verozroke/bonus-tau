<template>
  <div>hello world</div>
</template>

<script
  setup
  lang="ts"
>
import { useUserStore } from '@/stores/UserStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  await userStore.getUser()
  if (localStorage.getItem('token')) {
    router.push({ name: 'Map' })
    return
  }
})
</script>

<style scoped></style>
