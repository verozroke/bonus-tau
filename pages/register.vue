<template>
  <div class="absolute flex-col gap-4 flex items-center justify-center bg-slate-100 inset-0 overflow-hidden">
    <UiLogo />
    <h5 class="text-base text-slate-600 mb-4">Используй кэшбэк выгодно.</h5>
    <AuthRegisterForm />
  </div>
</template>

<script
  setup
  lang="ts"
>


useHead({
  title: 'Регистрация | Bonastau'
})

</script>

<style scoped></style>