import { defineStore } from 'pinia'
import type { Card } from '~/core/types/card'
import { cardService, type CardCreatePayload } from '~/services/card.service'

export const useCardStore = defineStore('CardStore', () => {
  const cards = ref<Card[]>([])

  const createCard = async (body: CardCreatePayload) => {
    const card: Card = await cardService.createCard(body)
    cards.value.push(card)
  }

  const getCards = async () => {
    const cardsData: Card[] = await cardService.getCards()
    cards.value = cardsData
  }

  const deleteCard = async (id: number) => {
    await cardService.deleteCard(id)
    cards.value = cards.value.filter((card) => card.id !== id)
  }

  return {
    cards,
    createCard,
    getCards,
    deleteCard
  }
})
