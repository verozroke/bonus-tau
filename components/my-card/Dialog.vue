<template>
  <v-dialog
    persistent
    v-model="isDialogOpen"
    width="auto"
  >
    <v-card style="padding: 40px">
      <v-card-title class="text-center"><b>Создать карту</b></v-card-title>
      <v-form
        ref="loginForm"
        class="flex flex-col w-[400px]"
      >
        <!-- SELECT -->
        <v-select
          label="Банк"
          :items="['Halyk Bank', 'Home bank', 'Kaspi Bank']"
          v-model="bank"
          variant="outlined"
        ></v-select>
        <UiInput
          label="Номер карты"
          v-model="cardNumber"
          :rules="cardNumberRules"
          :counter="16"
          placeholder="Введите номер карты."
          type="text"
        />
        <UiInput
          label="Имя владельца"
          v-model="ownerName"
          :rules="ownerNameRules"
          placeholder="Введите имя владельца карты."
          type="text"
        />
        <UiInput
          label="Срок действия"
          v-model="expireDate"
          :rules="expireDateRules"
          :counter="5"
          placeholder="Введите срок действия. Пример: 06/18"
          type="text"
        />
      </v-form>
      <v-card-actions>
        <v-btn
          :loading="isLoading"
          style="width: 50%"
          @click="createCard()"
          :color="colors.INDIGO"
          prepend-icon="mdi-credit-card-plus"
          :disabled="isLoading"
          stacked
        >Создать карту</v-btn>
        <v-btn
          :disabled="isLoading"
          style="width: 50%"
          @click="$emit('close')"
          :color="colors.RED"
          prepend-icon="mdi-cancel"
          stacked
        >Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script
  lang="ts"
  setup
>
import { useToast } from '~/hooks/useToast'
import { ref, toRefs } from 'vue'
import { colors } from '~/core/color/color'
import type { Card } from '~/core/types/card'
import type { CardCreatePayload } from '~/services/card.service'

const { toast } = useToast()

const props = defineProps({
  isDialogOpen: Boolean
})

const isLoading = ref(false)
const emit = defineEmits(['close'])

const { isDialogOpen } = toRefs(props)
const cardStore = useCardStore()
const cardNumber = ref('')
const ownerName = ref('')
const expireDate = ref('')
const bank = ref('Halyk Bank')

const isValid = async () => {
  // @ts-expect-error registerForm type gives automaticcaly in vuetify
  const { valid } = await loginForm.value!.validate()
  return valid
}

const resetForm = () => {
  //@ts-expect-error registerForm type gives automaticcaly in vuetify
  loginForm.value?.reset()
}

const ownerNameRules = ref([
  (v: any) => !!v || 'Имя владельца карты обязательно',
  (v: any) => {
    const nameParts = v.split(' ')
    return nameParts.length === 2 ? true : 'Имя владельца карты должно состоять из двух слов'
  }
])

const cardNumberRules = ref([
  (v: string) => !!v || 'Номер карты обязателен',
  (v: string) => {
    const cardNumberPattern = /^\d{16}$/ // Match the pattern for exactly 16 digits
    return v.match(cardNumberPattern)
      ? true
      : 'Неверный формат номера кредитной карты (требуется 16 цифр)'
  }
])

const expireDateRules = ref([
  (v: any) => !!v || 'Дата истечения срока действия обязательна',
  (v: any) => {
    const expireDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/ // Проверка на шаблон XX/XX
    return v.match(expireDatePattern)
      ? true
      : 'Неверный формат даты истечения срока действия (должен быть XX/XX)'
  }
])

const createCard = async () => {
  const body: CardCreatePayload = {
    bank_title: bank.value,
    number: cardNumber.value,
    usage_date: expireDate.value,
    card_type: 'Visa MasterCard'
  }

  try {
    isLoading.value = true
    await cardStore.createCard(body)
    toast.success({ message: 'Карта успешно создана.' })
    emit('close')
    isLoading.value = false
  } catch (error) {
    toast.error({ message: 'Не удалось создать вашу карту.' })

    isLoading.value = false
  }
}
</script>

<style
  lang="scss"
  scoped
></style>
