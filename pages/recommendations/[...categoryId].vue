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

const offers = ref<CashbackOffer[]>([
  {
    id: 1,
    card_number: '1234 5678 9012 3456',
    bank: 'Halyk Bank',
    cashback_percentage: 5,
    category_id: 1,
    condition: 'Нету'
  },
  {
    id: 2,
    card_number: '9876 5432 1098 7654',
    bank: 'Jusan Bank',
    cashback_percentage: 5,
    category_id: 1,
    condition: 'При любой покупке через приложение Jusan'
  },
  {
    id: 3,
    card_number: '2468 1357 8024 6913',
    bank: 'Kaspi Bank',
    cashback_percentage: 5,
    category_id: 1,
    condition: 'При любой покупке через приложение Kaspi'
  }
])

useHead({
  title: `${CategoriesMap[parseInt(route.params.categoryId[0] as $FixMe) as keyof typeof CategoriesMap]} | Bonastau`
})

onMounted(async () => {
  await userStore.getUser()
  if (!route.params.categoryId[0]) {
    router.push('/recommendations/1')
  }
})
</script>

<style scoped></style>
