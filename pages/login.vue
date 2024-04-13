<template>
  <div class="absolute flex-col gap-4 flex items-center justify-center bg-slate-100 inset-0 overflow-hidden">
    <UiLogo />
    <h5 class="text-base text-slate-600 mb-4">Используй кэшбэк выгодно.</h5>
    <AuthLoginForm />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { useToast } from '~/hooks/useToast'
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()

useHead({
  title: 'Вход | Bonastau'
})

onMounted(async () => {
  if (userStore.isAuthenticated || localStorage.getItem('token')) {
    try {
      await userStore.getUser()
      router.push('/login')
      return
    } catch (error) {
      return
    }
  }
})
</script>

<style scoped></style>
