import { useCallback, useMemo } from 'react'
import { useStore, type RootState } from './index'
import { useShallow } from 'zustand/react/shallow'

export const useStoreSelector = <T>(selector: (state: RootState) => T) => {
  return useStore(useShallow(selector))
}

export const useAuth = () => {
  return useStoreSelector((state) => ({
    currentUser: state.currentUser,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    login: state.login,
    loginWithGoogle: state.loginWithGoogle,
    register: state.register,
    logout: state.logout,
    resetPassword: state.resetPassword,
    checkAuth: state.checkAuth,
    setCurrentUser: state.setCurrentUser
  }))
}

export const useCurrentUser = () => {
  return useStore((state) => state.currentUser)
}

export const useUserPreferences = () => {
  return useStoreSelector((state) => ({
    preferences: state.currentUser?.preferences,
    updateUserPreferences: state.updateUserPreferences
  }))
}

export const useTheme = () => {
  return useStoreSelector((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
    toggleTheme: state.toggleTheme
  }))
}

export const useLanguage = () => {
  return useStoreSelector((state) => ({
    language: state.language,
    setLanguage: state.setLanguage
  }))
}

export const useSidebar = () => {
  return useStoreSelector((state) => ({
    sidebarOpen: state.sidebarOpen,
    setSidebarOpen: state.setSidebarOpen,
    toggleSidebar: state.toggleSidebar
  }))
}

export const useMobileMenu = () => {
  return useStoreSelector((state) => ({
    mobileMenuOpen: state.mobileMenuOpen,
    setMobileMenuOpen: state.setMobileMenuOpen,
    toggleMobileMenu: state.toggleMobileMenu
  }))
}

export const usePageState = () => {
  return useStoreSelector((state) => ({
    pageLoading: state.pageLoading,
    pageTitle: state.pageTitle,
    setPageLoading: state.setPageLoading,
    setPageTitle: state.setPageTitle
  }))
}

export const useNotifications = () => {
  return useStoreSelector((state) => ({
    notifications: state.notifications,
    addNotification: state.addNotification,
    removeNotification: state.removeNotification,
    clearNotifications: state.clearNotifications
  }))
}

export const useModals = () => {
  return useStoreSelector((state) => ({
    modals: state.modals,
    openModal: state.openModal,
    closeModal: state.closeModal,
    closeAllModals: state.closeAllModals
  }))
}

export const useAppConfig = () => {
  return useStoreSelector((state) => ({
    config: state.config,
    updateConfig: state.updateConfig
  }))
}

export const useModal = (modalId: string) => {
  const { modals, openModal, closeModal } = useModals()
  
  const open = useCallback((data?: any) => openModal(modalId, data), [openModal, modalId])
  const close = useCallback(() => closeModal(modalId), [closeModal, modalId])
  
  return useMemo(() => ({
    isOpen: modals[modalId]?.open || false,
    data: modals[modalId]?.data,
    open,
    close
  }), [modals, modalId, open, close])
}

export const useNotify = () => {
  const { addNotification } = useNotifications()
  
  const success = useCallback((title: string, message?: string) => 
    addNotification({ type: 'success', title, message }), [addNotification])
  const error = useCallback((title: string, message?: string) => 
    addNotification({ type: 'error', title, message }), [addNotification])
  const warning = useCallback((title: string, message?: string) => 
    addNotification({ type: 'warning', title, message }), [addNotification])
  const info = useCallback((title: string, message?: string) => 
    addNotification({ type: 'info', title, message }), [addNotification])
  
  return useMemo(() => ({
    success,
    error,
    warning,
    info
  }), [success, error, warning, info])
}

export const useNavigation = () => {
  const sidebar = useSidebar()
  const mobileMenu = useMobileMenu()
  
  const closeAll = useCallback(() => {
    sidebar.setSidebarOpen(false)
    mobileMenu.setMobileMenuOpen(false)
  }, [sidebar.setSidebarOpen, mobileMenu.setMobileMenuOpen])
  
  return useMemo(() => ({
    ...sidebar,
    ...mobileMenu,
    closeAll
  }), [sidebar, mobileMenu, closeAll])
}

export const useAsyncState = () => {
  return useStoreSelector((state) => ({
    loading: state.loading,
    error: state.error,
    setLoading: state.setLoading,
    setError: state.setError
  }))
}

export const useStoreReset = () => {
  const userReset = useStore((state) => state.reset)
  
  return useCallback(() => {
    userReset()
  }, [userReset])
} 