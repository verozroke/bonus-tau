import type { User } from '@/core/types/user'
import axios from 'axios'

export type CardCreatePayload = {
  number: string
  usage_date: string
  bank_title: string
  card_type: string
}

class CardService {
  baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async createCard(body: CardCreatePayload) {
    const token = localStorage.getItem('token')!
    console.log(token)
    const { data } = await axios.post(`${this.baseUrl}/api/v1/cards/`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    return data
  }

  async getCards() {
    const token = localStorage.getItem('token')!
    const { data } = await axios.get(`${this.baseUrl}/api/v1/cards/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    return data.results
  }

  async deleteCard(id: number) {
    const token = localStorage.getItem('token')!
    const { data } = await axios.delete(`${this.baseUrl}/api/v1/cards/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    return 'SUCCESS'
  }
}

export const cardService = new CardService('http://localhost:8000')
