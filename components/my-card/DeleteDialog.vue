<template>
  <v-dialog
    persistent
    v-model="isDeleteDialogOpen"
    width="auto"
  >
    <v-card style="padding: 40px">
      <v-card-title class="text-center"
        ><b>Вы уверены что хотите удалить данную карту?</b></v-card-title
      >
      <v-card-text class="text-center"
        >Напишите <b>"УДАЛИТЬ"</b> если вы уверены что хотите удалить данную карту</v-card-text
      >
      <v-text-field
        v-model="textInput"
        @input="checkDeleteStatus"
      >
      </v-text-field>
      <v-card-actions>
        <v-btn
          :loading="isLoading"
          style="width: 50%"
          @click="deleteCard(id!)"
          color="#d20f0d"
          prepend-icon="mdi-delete"
          :disabled="isDeleteButtonDisabled || isLoading"
          stacked
          >Подтвердить удаление</v-btn
        >
        <v-btn
          :disabled="isLoading"
          style="width: 50%"
          @click="$emit('close')"
          color="#d20f0d"
          prepend-icon="mdi-cancel"
          stacked
          >Отмена</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useToast } from '~/hooks/useToast'
import { ref, toRefs } from 'vue'

const { toast } = useToast()
const textInput = ref('')
const isDeleteButtonDisabled = ref(true)
const cardStore = useCardStore()

const props = defineProps({
  id: Number,
  isDeleteDialogOpen: Boolean
})

const isLoading = ref(false)
const emit = defineEmits(['close'])

const { isDeleteDialogOpen } = toRefs(props)

const deleteCard = (cardId: number) => {
  try {
    isLoading.value = true
    cardStore.deleteCard(cardId)
    toast.success({ message: 'Карта успешно удалена.' })
    emit('close')
    isLoading.value = false
  } catch (error) {
    console.log(error)
    toast.error({ message: 'Не удалось удалить вашу карту.' })

    isLoading.value = false
  }
}

const checkDeleteStatus = () => {
  if (textInput.value === 'УДАЛИТЬ') {
    isDeleteButtonDisabled.value = false
  } else {
    isDeleteButtonDisabled.value = true
  }
}
</script>

<style lang="scss" scoped></style>
