<template>
  <NuxtLayout name="recommendations">
    <div
      class="w-screen min-h-screen px-28 pt-12"
      style="background-color: #f1f5f9"
    >
      <span class="text-3xl">Лучшие предложения для категории "{{
        CategoriesMap[
        parseInt(route.params.categoryId[0] as $FixMe) as keyof typeof CategoriesMap
        ]
      }}"</span>
      <div class="flex flex-col gap-5 w-[910px] py-5">
        <CashbackOfferCard
          v-for="cashbackOffer in offers"
          :key="cashbackOffer.id"
          :cashback-offer="cashbackOffer"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script
  setup
  lang="ts"
>
import { useRoute, useRouter } from 'vue-router'
import { CategoriesMap } from '~/core/constants/constants'
import type { CashbackOffer } from '~/core/types/cashback-offer'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const cardStore = useCardStore()

const offers = ref<CashbackOffer[]>([
])

useHead({
  title: `${CategoriesMap[parseInt(route.params.categoryId[0] as $FixMe) as keyof typeof CategoriesMap]} | Bonastau`
})

onMounted(async () => {
  await userStore.getUser()
  if (!route.params.categoryId[0]) {
    router.push('/recommendations/1')
  }

  offers.value = await cardStore.getOffers(parseInt(route.params.categoryId[0] as string))
})
</script>

<style scoped></style>
