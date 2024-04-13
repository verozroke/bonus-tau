import axios from 'axios'
import { CategoriesMap } from '~/core/constants/constants'
import type { CashbackOfferCoordinatesType } from '~/core/types/map'

class MapService {
  baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getMarkers(query: string): Promise<CashbackOfferCoordinatesType[]> {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?location=42.3675294%2C-71.186966&query=${query}&radius=5000&key=${'AIzaSyBAX1pmERCOfG1TewmZvOviBNt0b-Vsl0g'}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(data)
    return data
  }
}

export const mapService = new MapService(import.meta.env.VITE_BACKEND_URL)
