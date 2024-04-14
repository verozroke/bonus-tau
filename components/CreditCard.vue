<template>
  <div
    @click.self="isDeleteDialogOpen = true"
    class="relative h-[250px] w-100 rounded-2xl py-8 shadow-md"
    :style="{
      backgroundColor: bankColor,
      color: bankTextColor
    }"
  >
    <MyCardDeleteDialog
      :id="card.id"
      @close="isDeleteDialogOpen = false"
      :isDeleteDialogOpen="isDeleteDialogOpen"
    />
    <div class="flex flex-col justify-between h-full w-full px-8 sm:top-8">
      <div class="flex justify-between">
        <div>
          <p class="font-normal text-lg">Номер карты</p>
          <p
            @click="isCardNumberOpen = !isCardNumberOpen"
            v-ripple
            class="tracking-more-wider font-semibold text-4xl"
          >
            {{ cardNumber }}
          </p>
        </div>
        <p class="font-bold text-4xl">{{ card.bank_title }}</p>
      </div>
      <div class="pt-4 pr-6 sm:pt-6">
        <div class="flex flex-wrap gap-10">
          <div>
            <p class="font-normal">Имя владельца</p>
            <p class="font-semibold tracking-widest uppercase">{{ userStore.user ? toLatin(userStore.user.surname + ' '
      + userStore.user.name) : '' }}</p>
          </div>
          <div class="">
            <p class="text-base font-normal">Срок действия</p>
            <p
              @click="isExpireDateOpen = !isExpireDateOpen"
              v-ripple
              class="text-lg font-semibold tracking-widest"
            >
              {{ expireDate }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { bankColorMap, bankTextColorMap } from '~/core/color/color'
import type { Card } from '~/core/types/card'
import { toLatin } from '~/core/utils'

const userStore = useUserStore()
const props = defineProps<{
  card: Card
}>()

const isDeleteDialogOpen = ref(false)

const bankColor = computed(() => bankColorMap[props.card.bank_title as keyof typeof bankColorMap])
const bankTextColor = computed(() => bankTextColorMap[props.card.bank_title as keyof typeof bankColorMap])

const isCardNumberOpen = ref(false)
const cardNumber = computed(() =>
  isCardNumberOpen.value ? props.card.number : '**** ' + props.card.number.slice(12, 16)

)

const isExpireDateOpen = ref(false)
const expireDate = computed(() => (isExpireDateOpen.value ? props.card.usage_date : '**/**'))
</script>

<style scoped></style>
