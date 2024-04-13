import axios from 'axios'

class MapService {
  baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getMarkers(): Promise<ObjectCoordinatesType[]> {
    const token = localStorage.getItem('token')!
    const { data } = await axios.get(`${this.baseUrl}/api/v1/building/coordinates/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    return data.results
  }
}

export const mapService = new MapService(import.meta.env.VITE_BACKEND_URL)
