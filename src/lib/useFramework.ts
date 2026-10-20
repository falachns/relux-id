import { useEffect, useState } from 'react'

export type Framework = 'blade' | 'react' | 'angular' | 'css'

const STORAGE_KEY = 'relux-framework-preference'
const EVENT_NAME = 'relux-framework-change'

export function getFrameworkPreference(): Framework {
  if (typeof window === 'undefined') return 'blade'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'blade' || stored === 'react' || stored === 'angular' || stored === 'css') {
    return stored
  }
  return 'blade'
}

export function setFrameworkPreference(fw: Framework) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, fw)
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: fw }))
}

export function useFramework() {
  const [framework, setFramework] = useState<Framework>(getFrameworkPreference)

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<Framework>
      if (customEvent.detail) {
        setFramework(customEvent.detail)
      }
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setFramework(e.newValue as Framework)
      }
    }

    window.addEventListener(EVENT_NAME, handleSync)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener(EVENT_NAME, handleSync)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const updateFramework = (next: Framework) => {
    setFramework(next)
    setFrameworkPreference(next)
  }

  return { framework, setFramework: updateFramework }
}
