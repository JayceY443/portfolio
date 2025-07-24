/**
 * 应用全局状态管理 Slice
 * 管理应用的全局状态，如主题、语言、导航等
 */

import { StoreApiWithImmer } from '../middleware'

export interface AppState {
  /** 主题 */
  theme: 'light' | 'dark' | 'system'
  
  /** 语言 */
  language: 'zh-CN' | 'en-US'
  
  /** 界面状态 */
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  
  /** 页面状态 */
  pageLoading: boolean
  pageTitle: string
  
  /** 通知系统 */
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message?: string
    duration?: number
    timestamp: number
  }>
  
  /** 模态框状态 */
  modals: Record<string, {
    open: boolean
    data?: any
  }>
  
  /** 应用配置 */
  config: {
    apiBaseUrl: string
    version: string
    environment: 'development' | 'production' | 'staging'
  }
}

export interface AppActions {
  /** 主题设置 */
  setTheme: (theme: AppState['theme']) => void
  toggleTheme: () => void
  
  /** 语言设置 */
  setLanguage: (language: AppState['language']) => void
  
  /** 界面控制 */
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setMobileMenuOpen: (open: boolean) => void
  toggleMobileMenu: () => void
  
  /** 页面状态 */
  setPageLoading: (loading: boolean) => void
  setPageTitle: (title: string) => void
  
  /** 通知系统 */
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
  
  /** 模态框控制 */
  openModal: (modalId: string, data?: any) => void
  closeModal: (modalId: string) => void
  closeAllModals: () => void
  
  /** 配置更新 */
  updateConfig: (config: Partial<AppState['config']>) => void
  
  /** 重置 */
  reset: () => void
}

export type AppSlice = AppState & AppActions

const initialAppState: AppState = {
  theme: 'system',
  language: 'zh-CN',
  sidebarOpen: false,
  mobileMenuOpen: false,
  pageLoading: false,
  pageTitle: 'Jayce Yang\'s Portfolio',
  notifications: [],
  modals: {},
  config: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: (process.env.NODE_ENV as AppState['config']['environment']) || 'development'
  }
}

export const createAppSlice: StoreApiWithImmer<AppSlice> = (set, get) => ({
  ...initialAppState,

  setTheme: (theme) => {
    set((state) => {
      state.theme = theme
    })
  },

  toggleTheme: () => {
    set((state) => {
      const currentTheme = state.theme
      if (currentTheme === 'light') {
        state.theme = 'dark'
      } else if (currentTheme === 'dark') {
        state.theme = 'system'
      } else {
        state.theme = 'light'
      }
    })
  },

  setLanguage: (language) => {
    set((state) => {
      state.language = language
    })
  },

  setSidebarOpen: (open) => {
    set((state) => {
      state.sidebarOpen = open
    })
  },

  toggleSidebar: () => {
    set((state) => {
      state.sidebarOpen = !state.sidebarOpen
    })
  },

  setMobileMenuOpen: (open) => {
    set((state) => {
      state.mobileMenuOpen = open
    })
  },

  toggleMobileMenu: () => {
    set((state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    })
  },

  setPageLoading: (loading) => {
    set((state) => {
      state.pageLoading = loading
    })
  },

  setPageTitle: (title) => {
    set((state) => {
      state.pageTitle = title
    })
  },

  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9)
    const timestamp = Date.now()
    
    set((state) => {
      state.notifications.push({
        ...notification,
        id,
        timestamp
      })
    })

    if (notification.duration !== 0) {
      const duration = notification.duration || 5000
      setTimeout(() => {
        get().removeNotification(id)
      }, duration)
    }
  },

  removeNotification: (id) => {
    set((state) => {
      state.notifications = state.notifications.filter(n => n.id !== id)
    })
  },

  clearNotifications: () => {
    set((state) => {
      state.notifications = []
    })
  },

  // 模态框控制
  openModal: (modalId, data) => {
    set((state) => {
      state.modals[modalId] = {
        open: true,
        data
      }
    })
  },

  closeModal: (modalId) => {
    set((state) => {
      if (state.modals[modalId]) {
        state.modals[modalId].open = false
        state.modals[modalId].data = undefined
      }
    })
  },

  closeAllModals: () => {
    set((state) => {
      Object.keys(state.modals).forEach(modalId => {
        state.modals[modalId].open = false
        state.modals[modalId].data = undefined
      })
    })
  },

  updateConfig: (config) => {
    set((state) => {
      Object.assign(state.config, config)
    })
  },

  reset: () => {
    set(initialAppState)
  }
}) 