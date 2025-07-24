# Zustand Store 架构

这是一个为 Next.js 项目设计的现代化 Zustand 状态管理架构，提供类型安全、持久化、开发工具支持等先进特性。

## 🚀 特性

- ✅ **TypeScript 完全支持** - 完整的类型安全
- ✅ **Immer 中间件** - 不可变状态更新
- ✅ **持久化存储** - 自动保存到 localStorage
- ✅ **开发工具支持** - Redux DevTools 集成
- ✅ **SSR 兼容** - Next.js 服务端渲染支持
- ✅ **分片架构** - 模块化的 store 设计
- ✅ **异步操作支持** - 内置 loading/error 状态管理
- ✅ **便捷 Hooks** - 简化组件中的使用

## 📁 项目结构

```
src/lib/store/
├── index.ts          # 主 store 和导出
├── types.ts          # 基础类型定义
├── middleware.ts     # 中间件配置
├── hooks.ts          # 便捷 hooks
├── examples.tsx      # 使用示例
├── slices/
│   ├── user-slice.ts # 用户状态管理
│   └── app-slice.ts  # 应用状态管理
└── README.md         # 这个文档
```

## 🛠️ 安装依赖

已包含在项目中：
- `zustand` - 状态管理库
- `immer` - 不可变状态更新

## 📖 基础使用

### 1. 导入主 Store

```tsx
import { useStore } from '@/lib/store'

// 直接使用 store
const MyComponent = () => {
  const user = useStore((state) => state.currentUser)
  const login = useStore((state) => state.login)
  
  return <div>{user?.name}</div>
}
```

### 2. 使用便捷 Hooks

```tsx
import { useAuth, useTheme, useNotify } from '@/lib/store/hooks'

const MyComponent = () => {
  const { currentUser, login, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const notify = useNotify()
  
  const handleLogin = async () => {
    await login('email', 'password')
    notify.success('登录成功')
  }
  
  return (
    <div>
      <p>用户: {currentUser?.name}</p>
      <p>主题: {theme}</p>
      <button onClick={handleLogin}>登录</button>
    </div>
  )
}
```

## 🔧 可用的 Hooks

### 认证相关
- `useAuth()` - 完整的认证状态和操作
- `useCurrentUser()` - 当前用户信息
- `useUserPreferences()` - 用户偏好设置

### 应用状态
- `useTheme()` - 主题控制
- `useLanguage()` - 语言设置
- `useSidebar()` - 侧边栏控制
- `useMobileMenu()` - 移动端菜单
- `usePageState()` - 页面状态（loading、title）

### 交互组件
- `useNotifications()` - 通知系统
- `useModals()` - 模态框管理
- `useModal(id)` - 特定模态框控制

### 便捷功能
- `useNotify()` - 简化的通知方法
- `useNavigation()` - 导航相关的综合控制
- `useAsyncState()` - 异步操作状态

## 📝 创建新的 Slice

### 1. 定义类型

```tsx
// slices/my-slice.ts
import { StoreApiWithImmer } from '../middleware'

export interface MyState {
  data: any[]
  loading: boolean
  error: string | null
}

export interface MyActions {
  setData: (data: any[]) => void
  addItem: (item: any) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export type MySlice = MyState & MyActions
```

### 2. 实现 Slice

```tsx
const initialState: MyState = {
  data: [],
  loading: false,
  error: null
}

export const createMySlice: StoreApiWithImmer<MySlice> = (set, get) => ({
  ...initialState,
  
  setData: (data) => {
    set((state) => {
      state.data = data
    })
  },
  
  addItem: (item) => {
    set((state) => {
      state.data.push(item)
    })
  },
  
  setLoading: (loading) => {
    set((state) => {
      state.loading = loading
    })
  },
  
  setError: (error) => {
    set((state) => {
      state.error = error
    })
  },
  
  reset: () => {
    set(initialState)
  }
})
```

### 3. 添加到主 Store

```tsx
// index.ts
import { createMySlice, MySlice } from './slices/my-slice'

export type RootState = UserSlice & AppSlice & MySlice

export const useStore = create<RootState>()(
  createStoreWithMiddleware(
    (set, get, api) => ({
      ...createUserSlice(set as any, get as any, api as any),
      ...createAppSlice(set as any, get as any, api as any),
      ...createMySlice(set as any, get as any, api as any)
    }),
    // ... 配置选项
  )
)
```

## 🔄 异步操作

### 使用内置的异步包装器

```tsx
import { createAsyncAction } from '@/lib/store/middleware'

export const createMySlice: StoreApiWithImmer<MySlice> = (set, get) => {
  const asyncAction = createAsyncAction(get())
  
  return {
    // ... 其他状态和操作
    
    fetchData: async () => {
      await asyncAction(async () => {
        const response = await fetch('/api/data')
        const data = await response.json()
        
        set((state) => {
          state.data = data
        })
      })
    }
  }
}
```

### 手动处理异步操作

```tsx
fetchData: async () => {
  set((state) => {
    state.loading = true
    state.error = null
  })
  
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    
    set((state) => {
      state.data = data
      state.loading = false
    })
  } catch (error) {
    set((state) => {
      state.error = error.message
      state.loading = false
    })
  }
}
```

## 💾 持久化配置

### 自定义持久化字段

```tsx
export const useStore = create<RootState>()(
  createStoreWithMiddleware(
    // ... store 创建逻辑
    {
      persistOptions: {
        // 只持久化特定字段
        partialize: (state: unknown) => {
          const typedState = state as RootState
          return {
            theme: typedState.theme,
            language: typedState.language,
            userPreferences: typedState.currentUser?.preferences
          }
        },
        
        // 版本控制和迁移
        version: 2,
        migrate: (persistedState: any, version: number) => {
          if (version === 1) {
            // 从版本 1 升级到版本 2
            return {
              ...persistedState,
              newField: 'defaultValue'
            }
          }
          return persistedState
        }
      }
    }
  )
)
```

## 🎯 最佳实践

### 1. 状态结构设计
- 保持状态扁平化
- 使用具体的类型定义
- 分离同步和异步状态

### 2. 操作设计
- 每个操作都有明确的职责
- 使用 Immer 进行状态更新
- 异步操作要处理错误状态

### 3. 性能优化
- 使用选择器减少重新渲染
- 合理分割 store
- 避免在 render 中创建选择器

### 4. 类型安全
- 定义完整的 TypeScript 类型
- 使用泛型提高复用性
- 利用类型推断减少手动类型定义

## 🔍 调试

### 使用 Redux DevTools

```tsx
// 开发环境下自动启用
// 在浏览器中安装 Redux DevTools 扩展
// 可以查看状态变化、时间旅行调试等
```

### 日志记录

```tsx
// 在操作中添加日志
setData: (data) => {
  console.log('Setting data:', data)
  set((state) => {
    state.data = data
  })
}
```

## 🌟 示例页面

运行项目后，可以在以下路径查看完整示例：

```tsx
// 在任意页面中导入并使用
import { ZustandExamples } from '@/lib/store/examples'

export default function ExamplePage() {
  return <ZustandExamples />
}
```

## 🚨 注意事项

1. **SSR 兼容性**: 持久化状态在服务端渲染时会有 hydration 问题，已在中间件中处理
2. **性能**: 避免在高频更新的场景中使用过大的状态对象
3. **内存泄漏**: 确保在组件卸载时清理订阅（hooks 会自动处理）
4. **类型安全**: 始终使用 TypeScript，避免 `any` 类型

## 📚 相关资源

- [Zustand 官方文档](https://github.com/pmndrs/zustand)
- [Immer 官方文档](https://immerjs.github.io/immer/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

---

这个架构为你的 Next.js 项目提供了一个强大、灵活且类型安全的状态管理解决方案。🎉 