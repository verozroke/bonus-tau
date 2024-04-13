import { defineStore } from 'pinia';


export type ToastColor = '#28B0A6' | '#FA126C' | '#3c4dff'

export const useToastStore = defineStore('ToastStore', () => {
  const snackbar = ref<boolean>(false)
  const color = ref<ToastColor>('#28B0A6')
  const message = ref<string>('')
  const timeout = ref<number>(2000)

  const openSnackbar = (messageValue: string, timeoutValue: number = 2000, colorValue: ToastColor) => {
    timeout.value = timeoutValue
    message.value = messageValue
    color.value = colorValue
    snackbar.value = true

    setTimeout(() => setToDefault(), timeout.value + 4000)
  }

  const setToDefault = () => {
    color.value = '#28B0A6'
    message.value = ''
    timeout.value = 2000
  }

  return {
    snackbar,
    color,
    message,
    timeout,
    openSnackbar,
    setToDefault
  };
});
