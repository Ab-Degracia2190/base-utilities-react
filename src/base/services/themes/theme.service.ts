import type { Theme } from '@/base/types/themes/theme.types'

export const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  return (localStorage.getItem('theme') as Theme) || 
         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

export const setStoredTheme = (theme: Theme): void => {
  localStorage.setItem('theme', theme)
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}