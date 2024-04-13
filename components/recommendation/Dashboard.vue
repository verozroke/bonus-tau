<template>
  <v-card
    class="mx-auto h-100"
    max-width="300"
    color="#f8fafc"
  >
    <v-list bg-color="#f8fafc">
      <v-list-subheader>Категории</v-list-subheader>

      <v-list-item
        v-for="(item, i) in categories"
        :key="i"
        :value="item"
        color="primary"
        rounded="xl"
        @click="goTo(item)"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>

    <v-list bg-color="#f8fafc">
      <v-list-subheader>Спонсоры</v-list-subheader>

      <v-list-item
        v-for="(item, i) in sponsors"
        :key="i"
        :value="item"
        rounded="xl"
        color="primary"
        @click="goTo(item)"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const categories = ref([
  { text: 'Продукты', id: 1, icon: 'mdi-basket' },
  { text: 'Медицина', id: 2, icon: 'mdi-medical-bag' },
  { text: 'Рестораны', id: 3, icon: 'mdi-pasta' }
])

const sponsors = ref([{ text: 'Magnum', id: 4, icon: 'mdi-store' }])

const goTo = (item: any) => {
  router.push(`/recommendations/${item.id}`)
}
</script>

<style scoped></style>
