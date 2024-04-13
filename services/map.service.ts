import axios from 'axios'
import type { CashbackOfferCoordinatesType } from '~/core/types/map'

class MapService {
  baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getMarkers(): Promise<CashbackOfferCoordinatesType[]> {

    // const token = localStorage.getItem('token')!
    // const { data } = await axios.get(`${this.baseUrl}/api/v1/building/coordinates/`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + token
    //   }
    // })
    return [
      {
        cashback_percentage: 5,
        category_id: 1,
        lat: 51.5074,
        lng: -0.1278
      },
      {
        cashback_percentage: 5,
        category_id: 1,
        lat: 51.8074,
        lng: -0.1278
      },
      {
        cashback_percentage: 3,
        category_id: 2,
        lat: 40.7128,
        lng: -74.0060
      },
      {
        cashback_percentage: 2,
        category_id: 3,
        lat: 34.0522,
        lng: -118.2437
      },
    ]
  }
}

export const mapService = new MapService(import.meta.env.VITE_BACKEND_URL)
