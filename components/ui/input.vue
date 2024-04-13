<template>
  <v-text-field
    :label="label"
    :placeholder="placeholder ?? undefined"
    :counter="counter ?? undefined"
    :clearable="true"
    :rules="rules ?? []"
    :prepend-icon="prependIcon ?? null"
    :type="type"
    v-model="model"
    variant="outlined"
    :loading="loading"
    :disabled="disabled"
  ></v-text-field>
</template>

<script setup lang="ts">
const model = defineModel()

defineProps<{
  label: string
  placeholder?: string
  prependIcon?: string
  type: string
  rules?: any[]
  disabled?: boolean
  loading?: boolean
  counter?: number
}>()
</script>

<style scoped></style>
