<template>
  <v-form
    ref="loginForm"
    @submit.prevent="async () => await onLogin()"
    class="flex flex-col w-[400px]"
  >
    <h3 class="text-3xl text-black font-bold mb-2">C возвращением.</h3>
    <h5 class="text-sm text-slate-600">
      Нету аккаунта?
      <span
        @click="() => router.push('/register')"
        class="underline cursor-pointer underline-offset-2"
        >Создать аккаунт.</span
      >
    </h5>

    <div class="flex w-full flex-col py-4 gap-1">
      <UiInput
        label="Номер телефона"
        v-model="number"
        :rules="phoneRules"
        :counter="20"
        placeholder="Введите ваш номер телефона."
        type="text"
      />
      <UiInput
        label="Пароль"
        v-model="password"
        :rules="passwordRules"
        placeholder="Введите пароль."
        type="text"
      />
    </div>
    <div class="flex justify-end w-full -mt-4">
      <span
        ripple
        class="text-sm text-slate-600 underline cursor-pointer underline-offset-2"
        >Забыли пароль?</span
      >
    </div>
    <div class="flex justify-end">
      <UiButton
        class="mt-3"
        type="submit"
        mode="elevated"
        :color="colors.INDIGO"
        :text-color="colors.WHITE"
        >Войти
      </UiButton>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { colors } from '~/core/color/color'
import { useToast } from '~/hooks/useToast'
import { authService, type LoginValidator } from '~/services/auth.service'

const router = useRouter()
const userStore = useUserStore()
const { toast } = useToast()
const loginForm = ref(null)

const number = ref('')
const password = ref('')
const isLoading = ref<boolean>(false)

const isValid = async () => {
  // @ts-expect-error registerForm type gives automaticcaly in vuetify
  const { valid } = await loginForm.value!.validate()
  return valid
}

const resetForm = () => {
  //@ts-expect-error registerForm type gives automaticcaly in vuetify
  loginForm.value?.reset()
}

const onLogin = async () => {
  const body: LoginValidator = {
    phone: number.value,
    password: password.value
  }

  if (await isValid()) {
    try {
      isLoading.value = true
      const message = await authService.login(body)
      userStore.isAuthenticated = true
      isLoading.value = false
      resetForm()
      router.push('/')
      toast.success({ message })
    } catch (e) {
      isLoading.value = false
      console.error(e)
      toast.error({ message: 'Не удалось войти.' })
    }
  } else {
    toast.error({ message: 'Введите все поля корректно.' })
  }
}

const phoneRules = ref([
  (v: any) => !!v || 'Номер телефона обязателен',
  (v: any) => {
    const phoneNumberPattern = /^\+77\d{9}$/ // Match the pattern for +77 followed by 9 digits
    return v.match(phoneNumberPattern) ? true : 'Некорректный формат телефона (+77...)'
  }
])

const passwordRules = ref([
  (v: any) => !!v || 'Пароль обязателен',
  (v: any) => (v && v.length >= 1) || 'Пароль должен быть более чем 1 символов',
  (v: any) => (v && v.length <= 20) || 'Пароль должен быть менее чем 20 символов'
])
</script>

<style scoped></style>
