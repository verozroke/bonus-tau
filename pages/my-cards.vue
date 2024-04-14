<template>
  <div class="cards">
    <v-btn
      @click="isDialogOpen = true"
      icon="mdi-plus"
      class="text-white add-button"
      :color="colors.INDIGO"
    >
    </v-btn>
    <MyCardDialog
      @close="isDialogOpen = false"
      :isDialogOpen="isDialogOpen"
    />
    <div class="cards__title">Ваши карты</div>
    <transition-group
      tag="ul"
      name="list"
      class="cards__card-list"
      appear
    >
      <CreditCard
        v-ripple
        v-for="card in cardStore.cards"
        :key="card.id"
        :card="card"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { colors } from '~/core/color/color'
import type { Card } from '~/core/types/card'

const cardStore = useCardStore()

const isDialogOpen = ref(false)

useHead({
  title: 'Мои карты | Bonastau'
})

const userStore = useUserStore()
onMounted(async () => {
  await userStore.getUser()
  await cardStore.getCards()
})
</script>

<style lang="scss" scoped>
.add-button {
  position: fixed;
  z-index: 999;
  bottom: 71px;
  right: 15px;
}

.cards {
  font-family: 'Overpass', sans-serif;
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f1f5f9;

  &__title {
    font-size: 64px;
    font-weight: 500;
    line-height: 1.4em;
  }

  &__subtitle {
    color: #71717a;
    font-size: 18px;
    width: 70%;
    text-align: center;
  }

  &__row {
    display: flex;
    gap: 15px;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
  }

  &__object-count {
    font-size: 32px;
    font-weight: 500;
    line-height: 1.4em;
  }

  &__card-list {
    margin-top: 3em;
    gap: 1em;
    display: flex;
    flex-direction: column;
  }
}
</style>
