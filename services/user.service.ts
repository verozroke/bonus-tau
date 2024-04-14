import axios from 'axios'

class UserService {
  baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async updateUser(userId: number, body: any): Promise<string> {
    const token = localStorage.getItem('token')!
    await axios.patchForm(`${this.baseUrl}/api/v1/users/${userId}/`, body, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    return 'Пользователь был обновлен.'
  }

}

export const userService = new UserService('http://localhost:8000')
