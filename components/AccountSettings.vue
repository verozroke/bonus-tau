<template>
  <div class="flex flex-col pb-4 text-left">
    <div class="text-2xl font-bold w-full leading-10 text-oxford">Настройки учетной записи</div>
    <div class="text-sm font-medium w-full leading-5 text-slate-500">Lorem ipsum dolor sit amet consectetur,
      adipisicing
      elit. Commodi maxime deserunt doloremque unde enim quaerat!</div>
    <div class="flex bg-slate-300 my-4 h-[1px] rounded-full w-full"></div>
    <div class="flex flex-wrap gap-10">
      <div class="flex flex-col">
        <div class="text-xl font-bold w-full leading-10 mb-3 text-oxford">Имя</div>
        <div class="text-xs font-medium w-full leading-5 -mt-2 text-slate-500">Lorem ipsum dolor sit amet consectetur
          adipisicing elit.</div>
        <v-text-field
          :rules="nameRules"
          placeholder="Напишите ваше имя"
          clearable
          label="Имя"
          v-model="settingStore.nameInput"
          class="mt-5"
          prepend-inner-icon="mdi-account-edit"
          variant="outlined"
        ></v-text-field>
        <v-btn
          @click="async () => await settingStore.saveName()"
          style="width: fit-content; text-transform: none;"
          class="px-4 mt-2 text-white"
          :color="colors.INDIGO"
        >Сохранить</v-btn>
      </div>

      <div class="flex flex-col">
        <div class="text-xl font-bold w-full leading-10 text-oxford mb-3">Фамилия</div>
        <div class="text-xs font-medium w-full leading-5 -mt-2 text-slate-500">Lorem ipsum dolor sit amet consectetur
          adipisicing elit.</div>
        <v-text-field
          :rules="nameRules"
          placeholder="Напишите вашу фамилию"
          clearable
          label="Фамилия"
          v-model="settingStore.surnameInput"
          class="mt-5"
          prepend-inner-icon="mdi-account-edit"
          variant="outlined"
        ></v-text-field>
        <v-btn
          @click="async () => await settingStore.saveSurname()"
          style="width: fit-content; text-transform: none;"
          class="px-4 mt-2 text-white"
          :color="colors.INDIGO"
        >Сохранить</v-btn>
      </div>
      <div class="flex flex-col">
        <div class="text-xl font-bold w-full leading-10 text-oxford mb-3">Номер телефона</div>
        <div class="text-xs font-medium w-full leading-5 -mt-2 text-slate-500">Lorem ipsum dolor sit amet consectetur
          adipisicing elit.</div>
        <v-text-field
          :rules="phoneRules"
          placeholder="Напишите ваш номер телефона"
          clearable
          label="Номер телефона"
          v-model="settingStore.phoneInput"
          class="mt-5"
          prepend-inner-icon="mdi-account-edit"
          variant="outlined"
        ></v-text-field>
        <v-btn
          @click="async () => await settingStore.savePhone()"
          style="width: fit-content; text-transform: none;"
          class="px-4 mt-2 text-white"
          :color="colors.INDIGO"
        >Сохранить</v-btn>
      </div>



    </div>
    <div class="text-2xl font-bold w-full leading-10 text-oxford mt-10 ">Смена пароля</div>
    <div class="text-sm font-medium w-full leading-5 text-slate-500">Lorem ipsum dolor sit amet consectetur,
      adipisicing
      elit. Commodi maxime deserunt doloremque unde enim quaerat!</div>
    <div class="flex bg-slate-300 my-4 h-[1px] rounded-full w-full"></div>
    <div class="flex flex-wrap gap-10">
      <div class="flex flex-col">
        <div class="text-xl font-bold w-full leading-10 text-oxford mb-3">Старый пароль</div>
        <div class="text-xs font-medium w-full leading-5 -mt-2 text-slate-500">Lorem ipsum dolor sit amet consectetur
          adipisicing elit.</div>
        <v-text-field
          :counter="20"
          :rules="passwordRules"
          density="compact"
          style="width: 350px;"
          placeholder="Напишите ваш старый пароль"
          type="password"
          clearable
          label="Старый пароль"
          v-model="settingStore.oldPasswordInput"
          class="mt-5 w-full"
          prepend-inner-icon="mdi-lock-question"
          variant="outlined"
        ></v-text-field>
      </div>
      <div class="flex flex-col">
        <div class="text-xl font-bold w-full leading-10 text-oxford mb-3">Новый пароль</div>
        <div class="text-xs font-medium w-full leading-5 -mt-2 text-slate-500">Lorem ipsum dolor sit amet consectetur
          adipisicing elit.</div>
        <v-text-field
          :counter="20"
          :rules="passwordRules"
          density="compact"
          style="width: 350px;"
          placeholder="Напишите ваш новый пароль"
          type="password"
          clearable
          label="Новый пароль"
          v-model="settingStore.newPasswordInput"
          class="mt-5 w-full"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
        ></v-text-field>
      </div>
      <div class="flex flex-col">
        <div class="text-xl font-bold w-full leading-10 text-oxford mb-3">Подтверждение пароля</div>
        <div class="text-xs font-medium w-full leading-5 -mt-2 text-slate-500">Lorem ipsum dolor sit amet consectetur
          adipisicing elit.</div>
        <v-text-field
          :counter="20"
          :rules="passwordRules"
          density="compact"
          style="width: 350px;"
          placeholder="Повторите ваш новый пароль"
          type="password"
          clearable
          label="Подтверждение пароля"
          v-model="settingStore.newPasswordRepeatInput"
          class="mt-5 w-full"
          prepend-inner-icon="mdi-lock-check"
          variant="outlined"
        />
      </div>
      <v-btn
        @click="async () => await settingStore.savePassword()"
        style="width: fit-content; text-transform: none;"
        class="px-4 mt-2 text-white"
        :color="colors.INDIGO"
      >Сменить пароль</v-btn>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { colors } from '~/core/color/color';


// const userStore = useUserStore()
const settingStore = ref({

})
const nameRules = ref([
  (v: any) => !!v || 'Поле обязательно',

])

const phoneRules = ref([
  (v: any) => !!v || 'Номер телефона обязателен',
  (v: any) => {
    const phoneNumberPattern = /^\+77\d{9}$/ // Match the pattern for +77 followed by 9 digits
    return v.match(phoneNumberPattern) ? true : 'Некорректный формат телефона (+77...)'
  }
])

const passwordRules = ref([
  (v: any) => !!v || 'Пароль обязателен',
  (v: any) => (v && v.length >= 1) || 'Пароль должен быть более чем 8 символов',
  (v: any) => (v && v.length <= 20) || 'Пароль должен быть менее чем 20 символов'
])

</script>

<style scoped></style>