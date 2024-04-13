import { useToastStore } from "~/stores/ToastStore"
import { notificationColors } from "~/core/color/color"
export type ToastOptions = {
  message: string,
  timeout?: number
}


export const useToast = () => {

  const toastStore = useToastStore()

  const toast = {
    error({ message, timeout }: ToastOptions) {
      toastStore.openSnackbar(message, timeout, notificationColors.RED)
    },
    success({ message, timeout }: ToastOptions) {
      toastStore.openSnackbar(message, timeout, notificationColors.EMERALD)
    },
    copied({ message, timeout }: ToastOptions) {
      toastStore.openSnackbar(message, timeout, notificationColors.VIOLET)
    }
  }

  return { toast }
}