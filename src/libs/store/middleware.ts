/**
 * Zustand Middleware Configuration
 * 提供预配置的中间件组合，包含持久化、开发工具、不可变更新等
 */

import { StateCreator } from 'zustand'
import { devtools, persist, createJSONStorage, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type StoreApi<T> = StateCreator<T, [], [], T>
export type StoreApiWithImmer<T> = StateCreator<T, [['zustand/immer', never]], [], T>

/**
 * 开发工具中间件配置
 */
export const withDevtools = <T>(
  storeApi: StoreApi<T>,
  name?: string
) => devtools(storeApi, {
  name: name || 'zustand-store',
  enabled: process.env.NODE_ENV === 'development'
})

/**
 * 持久化中间件配置
 */
export const withPersist = <T>(
  storeApi: StoreApi<T>,
  name: string,
  options?: {
    version?: number
    migrate?: (persistedState: unknown, version: number) => T
    partialize?: (state: T) => Partial<T>
    onRehydrateStorage?: (state: T) => void | ((state?: T, error?: unknown) => void)
  }
) => persist(storeApi, {
  name,
  storage: createJSONStorage(() => {
    // 优先使用 localStorage，fallback 到 sessionStorage
    if (typeof window !== 'undefined') {
      return window.localStorage
    }
    // SSR 环境下的 fallback
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    }
  }),
  version: options?.version || 1,
  migrate: options?.migrate,
  partialize: options?.partialize,
  onRehydrateStorage: options?.onRehydrateStorage
})

/**
 * Immer 中间件 - 支持不可变状态更新
 */
export const withImmer = <T>(storeApi: StoreApiWithImmer<T>) => immer(storeApi)

/**
 * 订阅中间件 - 支持细粒度的状态订阅
 */
export const withSubscribe = <T>(storeApi: StoreApi<T>) => subscribeWithSelector(storeApi)

/**
 * 组合多个中间件的辅助函数
 */
export const createStoreWithMiddleware = <T>(
  storeApi: StoreApiWithImmer<T>,
  options: {
    name: string
    persist?: boolean
    devtools?: boolean
    immer?: boolean
    subscribe?: boolean
    persistOptions?: Parameters<typeof withPersist>[2]
  }
) => {
  let store = storeApi

  // 应用 Immer 中间件
  if (options.immer !== false) {
    store = withImmer(store) as any
  }

  // 应用订阅中间件
  if (options.subscribe) {
    store = withSubscribe(store as any) as any
  }

  // 应用持久化中间件
  if (options.persist) {
    store = withPersist(store as any, options.name, options.persistOptions) as any
  }

  // 应用开发工具中间件
  if (options.devtools !== false) {
    store = withDevtools(store as any, options.name) as any
  }

  return store
}

/**
 * 异步操作包装器 - 自动处理 loading 和 error 状态
 */
export const createAsyncAction = <T extends { setLoading: (loading: boolean) => void, setError: (error: string | null) => void }>(
  store: T
) => {
  return async <R>(asyncFn: () => Promise<R>): Promise<R | null> => {
    try {
      store.setLoading(true)
      store.setError(null)
      const result = await asyncFn()
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '发生未知错误'
      store.setError(errorMessage)
      console.error('Async action error:', error)
      return null
    } finally {
      store.setLoading(false)
    }
  }
}

/**
 * Store 重置工具
 */
export const createResetStore = <T>(initialState: T) => {
  return (set: (state: T | ((state: T) => T)) => void) => () => {
    set(initialState)
  }
} 