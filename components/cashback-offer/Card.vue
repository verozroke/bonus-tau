<template>
  <div
    class="relative h-[235px] rounded-2xl w-[910px]  py-5 shadow-md"
    :style="{
      backgroundColor: bankColor,
      color: bankTextColor
    }"
  >
    <div class="flex flex-col justify-between h-full w-full px-5">
      <div class="flex justify-between">
        <p class="font-semibold text-4xl">{{ cashbackOffer.bank }}</p>
        <div class="flex items-end">
          <p class="font-bold -mt-1 text-lg">Условие: {{ cashbackOffer.condition }}</p>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="flex items-end">
          <p
            @click="isCardNumberOpen = !isCardNumberOpen"
            v-ripple
            class="font-semibold text-4xl -mb-1"
          >{{ cardNumber }}</p>
        </div>
        <p class="font-bold text-8xl -mb-3">{{ cashbackOffer.cashback_percentage }}%</p>
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { bankColorMap, bankTextColorMap } from '~/core/color/color';
import type { CashbackOffer } from '~/core/types/cashback-offer';

const props = defineProps<{
  cashbackOffer: CashbackOffer
}>()

const bankColor = computed(() => bankColorMap[props.cashbackOffer.bank as keyof typeof bankColorMap])
const bankTextColor = computed(() => bankTextColorMap[props.cashbackOffer.bank as keyof typeof bankColorMap])


const isCardNumberOpen = ref(false)
const cardNumber = computed(() => isCardNumberOpen.value ? props.cashbackOffer.card_number : '**** ' + props.cashbackOffer.card_number.split(' ')[3])



</script>

<style scoped></style>