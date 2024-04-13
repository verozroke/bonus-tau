import axios from 'axios'


class UserService {
  baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async updateUser(userId: number, body: UpdateUserValidator): Promise<string> {
    const token = localStorage.getItem('token')!
    await axios.patchForm(`${this.baseUrl}/api/v1/users/${userId}/`, body, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    return 'Пользователь был обновлен.'
  }

  async uploadAvatar(userId: number, formData: FormData): Promise<string> {
    const token = localStorage.getItem('token')!
    const { data } = await axios.postForm(
      `${this.baseUrl}/api/v1/user/avatar/${userId}/upload/`,
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    return data.avatar_url
  }
  async deleteAvatar(userId: number): Promise<string> {
    const token = localStorage.getItem('token')!
    await axios.delete(`${this.baseUrl}/api/v1/user/avatar/${userId}/delete/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })

    return 'Фото профиля было успешно удалено.'
  }
}

export const userService = new UserService(import.meta.env.VITE_BACKEND_URL)
