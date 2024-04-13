import axios from 'axios'
import {
  ObjectOfOrganizationOptionMap,
  type ObjectBuilding,
  type ObjectInfo
} from '@/types/ObjectBuilding'
import type { HistoryAction } from '@/types/HistoryAction'
import { formatDate } from '@/helpers/formatTime'

export type CreateObjectValidator = {
  organization_name: string
  iin: string
  address: string
  organization_object: string
  structural_po_class: string
  fire_resistance_rating: string
  functional_po_class: string
  functional_purpose: string
  date_commissioning: string
  rating: string
  number_floor: number
  full_name: string
  building_height: number
  area: number
  volume: number
  year_construction_reconstruction: number
  change_functional_purpose_date: string
}

export type UpdateObjectInfoPayload = Omit<
  ObjectBuilding,
  'rating' | 'id' | 'owner' | 'organization_object'
> & {
  organization_object: string
}

export type BuildingCoordinatesValidator = {
  lat: number
  lng: number
  // buildingId
  building: number
}

class ObjectService {
  baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getObjects(): Promise<ObjectBuilding[]> {
    const token = localStorage.getItem('token')!
    const { data } = await axios.get(`${this.baseUrl}/api/v1/buildings/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    return data.results
  }

  async deleteObject(id: number): Promise<string> {
    const token = localStorage.getItem('token')!
    await axios.delete(`${this.baseUrl}/api/v1/buildings/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    return 'Ваш Паспорт ПБО был удален из нашей информационной системы.'
  }

  async getObjectInfo(objectId: string) {
    const token = localStorage.getItem('token')!
    const { data } = await axios.get(`${this.baseUrl}/api/v1/buildings/${objectId}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    return data
  }

  async updateObjectInfo(objectId: string, body: UpdateObjectInfoPayload): Promise<string> {
    const timeZoneOffset1 = body.date_commissioning!.getTimezoneOffset()
    const timeZoneOffset2 = body.change_functional_purpose_date!.getTimezoneOffset()
    body.date_commissioning!.setMinutes(body.date_commissioning!.getMinutes() - timeZoneOffset1)
    body.change_functional_purpose_date!.setMinutes(
      body.change_functional_purpose_date!.getMinutes() - timeZoneOffset2
    )
    const payload = {
      ...body,
      date_commissioning: body.date_commissioning!.toISOString().split('T')[0],
      change_functional_purpose_date: body
        .change_functional_purpose_date!.toISOString()
        .split('T')[0]
    }

    payload.organization_object =
      ObjectOfOrganizationOptionMap[
        body.organization_object as keyof typeof ObjectOfOrganizationOptionMap
      ]
    const token = localStorage.getItem('token')!
    await axios.patch(`${this.baseUrl}/api/v1/buildings/${objectId}/`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    return 'Поля успешно обновлены.'
  }

  async createObject(body: CreateObjectValidator) {
    const token = localStorage.getItem('token')!
    const { data } = await axios.post(`${this.baseUrl}/api/v1/buildings/`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })

    return data
  }

  async getHistories(objectId: string): Promise<HistoryAction[]> {
    const token = localStorage.getItem('token')!
    const { data } = await axios.get(`${this.baseUrl}/api/v1/buildings/${objectId}/history/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })

    return data.results
  }

  async createCoordinates(body: BuildingCoordinatesValidator) {
    const token = localStorage.getItem('token')!
    const { data } = await axios.post(`${this.baseUrl}/api/v1/building/coordinates/`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    return data
  }
}

export const objectService = new ObjectService(import.meta.env.VITE_BACKEND_URL)
