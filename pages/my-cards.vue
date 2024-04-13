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
        v-for="card in cards"
        :key="card.id"
        :card="card"
      />
    </transition-group>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { colors } from '~/core/color/color';
import type { Card } from '~/core/types/card';

const cards = ref<Card[]>([
  {
    id: 1,
    card_number: "1234 5678 9012 3456",
    expire_date: "12/24",
    card_owner: "John Doe",
    bank: 'Halyk Bank',
    user_id: "123"
  },
  {
    id: 2,
    card_number: "9876 5432 1098 7654",
    expire_date: "05/23",
    card_owner: "Jane Smith",
    bank: 'Jusan Bank',
    user_id: "456"
  },
  {
    id: 3,
    card_number: "2468 1357 8024 6913",
    expire_date: "09/25",
    card_owner: "Alice Johnson",
    bank: 'Kaspi Bank',
    user_id: "789"
  }
])

const isDialogOpen = ref(false)


</script>

<style
  lang="scss"
  scoped
>
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