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

const { toast } = useToast()

useHead({
  title: 'Вход | Bonastau'
})

</script>

<style scoped></style>