import type { User } from '@/core/types/user'
import axios from 'axios'

export type LoginValidator = {
  phone: string
  password: string
}


export type RegisterValidator = {
  name: string
  surname: string
  phone: string
  password: string
  password2: string
}


class AuthService {
  baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async login(body: LoginValidator): Promise<string> {
    const { data } = await axios.post(`${this.baseUrl}/api/v1/login/`, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    localStorage.setItem('token', data.access)
    return 'Авторизация прошла успешно.'
  }

  async register(body: RegisterValidator) {
    const { data } = await axios.post(`${this.baseUrl}/api/v1/register/`, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return 'Переводим вас на страницу входа.'
  }

  async logout() {
    localStorage.removeItem('token')
  }


  async getUser(): Promise<User> {
    const token = localStorage.getItem('token')!
    const { data } = await axios.get(`${this.baseUrl}/api/v1/user/me/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })

    return data
  }


}

export const authService = new AuthService(import.meta.env.VITE_BACKEND_URL)
