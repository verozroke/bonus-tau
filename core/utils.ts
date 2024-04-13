export const goTo = (href: string) => {
  const a = document.createElement('a')
  a.href = href
  a.target = '_blank'
  a.click()
}
