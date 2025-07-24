/**
 * Main Store Configuration
 * 组合所有 slices 并提供主要的 store 导出
 */

import { create } from 'zustand'
import { createStoreWithMiddleware } from './middleware'
import { createUserSlice, UserSlice } from './slices/user-slice'
import { createAppSlice, AppSlice } from './slices/app-slice'

// 组合所有 slices 的类型
export type RootState = UserSlice & AppSlice

// 创建主要的 store
export const useStore = create<RootState>()(
  createStoreWithMiddleware(
    (set, get, api) => ({
      ...createUserSlice(set as any, get as any, api as any),
      ...createAppSlice(set as any, get as any, api as any)
    }),
    {
      name: 'jayce-portfolio-store',
      persist: true,
      devtools: true,
      immer: true,
      subscribe: true,
      persistOptions: {
        // 只持久化需要的状态，排除敏感信息
        partialize: (state: unknown) => {
          const typedState = state as RootState
          return {
            // 用户偏好设置
            currentUser: typedState.currentUser ? {
              ...typedState.currentUser,
              // 移除敏感信息，只保留基本信息和偏好
              id: typedState.currentUser.id,
              name: typedState.currentUser.name,
              avatar: typedState.currentUser.avatar,
              preferences: typedState.currentUser.preferences
            } : null,
            
            // 应用设置
            theme: typedState.theme,
            language: typedState.language,
            sidebarOpen: typedState.sidebarOpen
            
            // 不持久化的状态被排除
            // loading, error, notifications, modals 等临时状态
          }
        },
        version: 1,
        // 迁移函数，用于处理状态结构变更
        migrate: (persistedState: any, version: number) => {
          if (version === 0) {
            // 从版本 0 迁移到版本 1 的逻辑
            return {
              ...persistedState,
              // 添加新的默认值或转换旧数据
            }
          }
          return persistedState as RootState
        }
      }
    }
  )
)

// 导出类型
export type StoreState = RootState
export { type User, type UserSlice } from './slices/user-slice'
export { type AppSlice } from './slices/app-slice'

// 重新导出常用的 types
export * from './types' 