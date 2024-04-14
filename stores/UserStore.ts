import { computed } from 'vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type User } from '@/core/types/user'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth.service'
import { useToast } from '~/hooks/useToast'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User | null>(null)

  const router = useRouter()
  const { toast } = useToast()

  const getUser = async () => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
      return
    }

    try {
      const tokenUser = await authService.getUser()
      user!.value = tokenUser
      isAuthenticated.value = true
    } catch (error) {
      router.push('/login')
      localStorage.removeItem('token')
      throw new Error('Unauthorized 401')
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      toast.success({ message: 'Выход из вашего аккаунта произведен успешно.' })
      isAuthenticated.value = false
      router.push('/login')
    } catch (error) {
      toast.error({ message: 'Не удалось выйти из вашего аккаунта.' })
    }
  }

  const isAuthenticated = ref(false)

  return {
    isAuthenticated,
    user,
    getUser,
    logout
  }
})
