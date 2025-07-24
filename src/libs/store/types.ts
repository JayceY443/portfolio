/**
 * Zustand Store Types
 * 提供类型安全的 store 基础类型定义
 */

export interface BaseStoreState {
  // 通用的基础状态
  _hasHydrated?: boolean
  _version?: number
}

export interface BaseStoreActions {
  // 通用的基础操作
  reset: () => void
  setHasHydrated: (hasHydrated: boolean) => void
}

export type StoreState<T = {}> = T & BaseStoreState
export type StoreActions<T = {}> = T & BaseStoreActions
export type Store<T = {}, A = {}> = StoreState<T> & StoreActions<A>

// 异步状态管理
export interface AsyncState<T = any> {
  data: T | null
  loading: boolean
  error: string | null
}

export interface AsyncActions<T = any> {
  setLoading: (loading: boolean) => void
  setData: (data: T | null) => void
  setError: (error: string | null) => void
  reset: () => void
}

export type AsyncStore<T = any> = AsyncState<T> & AsyncActions<T>

// 通用的 CRUD 状态
export interface CrudState<T = any> {
  items: T[]
  selectedItem: T | null
  loading: boolean
  error: string | null
}

export interface CrudActions<T = any> {
  setItems: (items: T[]) => void
  addItem: (item: T) => void
  updateItem: (id: string | number, updates: Partial<T>) => void
  removeItem: (id: string | number) => void
  setSelectedItem: (item: T | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export type CrudStore<T = any> = CrudState<T> & CrudActions<T> 