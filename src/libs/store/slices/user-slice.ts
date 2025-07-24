import { StoreApiWithImmer } from '../middleware'
import { authHelpers, supabase } from '../../supabase'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: 'zh-CN' | 'en-US'
    notifications: boolean
  }
}

export interface UserState {
  currentUser: User | null
  isAuthenticated: boolean
  
  loading: boolean
  error: string | null

  users: User[]
  selectedUser: User | null
}

export interface UserActions {
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: (email: string, password: string, name?: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  refreshToken: () => Promise<void>
  checkAuth: () => Promise<void>
  
  setCurrentUser: (user: User | null) => void
  updateUserProfile: (updates: Partial<User>) => void
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void
  
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  updateUser: (id: string, updates: Partial<User>) => void
  removeUser: (id: string) => void
  setSelectedUser: (user: User | null) => void
  
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  reset: () => void
}

export type UserSlice = UserState & UserActions

const initialUserState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  users: [],
  selectedUser: null
}

// 将 Supabase 用户转换为应用程序用户
const transformToAppUser = (supabaseUser: any): User | null => {
  // 验证必需的用户数据
  if (!supabaseUser || !supabaseUser.id || !supabaseUser.email) {
    console.warn('Invalid user data received from Supabase:', supabaseUser)
    return null
  }

  return {
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email,
    email: supabaseUser.email,
    avatar: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture,
    role: 'user', // 默认角色，可以根据需要调整
    preferences: {
      theme: 'system',
      language: 'zh-CN',
      notifications: true
    }
  }
}

export const createUserSlice: StoreApiWithImmer<UserSlice> = (set, get) => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session?.user && session.user.email) {
      // 确保用户数据完整
      const appUser = transformToAppUser(session.user)
      if (appUser) {
        set((state) => {
          state.currentUser = appUser
          state.isAuthenticated = true
          state.error = null
        })
      }
    } else if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED' && !session?.user) {
      set((state) => {
        state.currentUser = null
        state.isAuthenticated = false
        state.error = null
      })
    }
    // 对于其他事件（如 INITIAL_SESSION），只有在真正有用户时才设置状态
    else if (event === 'INITIAL_SESSION' && session?.user && session.user.email) {
      const appUser = transformToAppUser(session.user)
      if (appUser) {
        set((state) => {
          state.currentUser = appUser
          state.isAuthenticated = true
          state.error = null
        })
      }
    } else if (event === 'INITIAL_SESSION' && !session?.user) {
      // 确保初始状态下没有用户时状态是清空的
      set((state) => {
        state.currentUser = null
        state.isAuthenticated = false
        state.error = null
      })
    }
  })
  
  const userSlice = {
    ...initialUserState,

    login: async (email: string, password: string) => {
      try {
        set((state) => {
          state.loading = true
          state.error = null
        })
        
        const { user } = await authHelpers.signInWithEmail(email, password)
        if (user) {
          const appUser = transformToAppUser(user)
          if (appUser) {
            set((state) => {
              state.currentUser = appUser
              state.isAuthenticated = true
            })
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '登录失败'
        set((state) => {
          state.error = errorMessage
        })
        console.error('登录错误:', error)
      } finally {
        set((state) => {
          state.loading = false
        })
      }
    },

    loginWithGoogle: async () => {
      try {
        set((state) => {
          state.loading = true
          state.error = null
        })
        
        await authHelpers.signInWithGoogle()
        // 用户将被重定向到 Google 登录页面
        // 实际的用户设置将在认证状态变化时处理
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Google 登录失败'
        set((state) => {
          state.error = errorMessage
        })
        console.error('Google 登录错误:', error)
      } finally {
        set((state) => {
          state.loading = false
        })
      }
    },

    register: async (email: string, password: string, name?: string) => {
      try {
        set((state) => {
          state.loading = true
          state.error = null
        })
        
        const { user } = await authHelpers.signUpWithEmail(email, password, { name })
        if (user) {
          const appUser = transformToAppUser(user)
          if (appUser) {
            set((state) => {
              state.currentUser = appUser
              state.isAuthenticated = true
            })
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '注册失败'
        set((state) => {
          state.error = errorMessage
        })
        console.error('注册错误:', error)
      } finally {
        set((state) => {
          state.loading = false
        })
      }
    },

    logout: async () => {
      try {
        set((state) => {
          state.loading = true
          state.error = null
        })
        
        await authHelpers.signOut()
        set((state) => {
          state.currentUser = null
          state.isAuthenticated = false
          state.error = null
        })
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '登出失败'
        set((state) => {
          state.error = errorMessage
        })
        console.error('登出错误:', error)
      } finally {
        set((state) => {
          state.loading = false
        })
      }
    },

    resetPassword: async (email: string) => {
      try {
        set((state) => {
          state.loading = true
          state.error = null
        })
        
        await authHelpers.resetPassword(email)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '重置密码失败'
        set((state) => {
          state.error = errorMessage
        })
        console.error('重置密码错误:', error)
      } finally {
        set((state) => {
          state.loading = false
        })
      }
    },

    refreshToken: async () => {
      try {
        set((state) => {
          state.loading = true
          state.error = null
        })
        
        const { data, error } = await supabase.auth.refreshSession()
        if (error) throw error
        
        if (data.user) {
          const appUser = transformToAppUser(data.user)
          if (appUser) {
            set((state) => {
              state.currentUser = appUser
              state.isAuthenticated = true
            })
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '刷新令牌失败'
        set((state) => {
          state.error = errorMessage
        })
        console.error('刷新令牌错误:', error)
      } finally {
        set((state) => {
          state.loading = false
        })
      }
    },

    checkAuth: async () => {
      try {
        set((state) => {
          state.loading = true
          state.error = null
        })
        
        const user = await authHelpers.getCurrentUser()
        if (user) {
          const appUser = transformToAppUser(user)
          if (appUser) {
            set((state) => {
              state.currentUser = appUser
              state.isAuthenticated = true
            })
          } else {
            set((state) => {
              state.currentUser = null
              state.isAuthenticated = false
            })
          }
        } else {
          set((state) => {
            state.currentUser = null
            state.isAuthenticated = false
          })
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '检查认证状态失败'
        set((state) => {
          state.error = errorMessage
        })
        console.error('检查认证状态错误:', error)
      } finally {
        set((state) => {
          state.loading = false
        })
      }
    },

    setCurrentUser: (user: User | null) => {
      set((state) => {
        state.currentUser = user
        state.isAuthenticated = !!user
      })
    },

    updateUserProfile: (updates: Partial<User>) => {
      set((state) => {
        if (state.currentUser) {
          Object.assign(state.currentUser, updates)
        }
      })
    },

    updateUserPreferences: (preferences: Partial<User['preferences']>) => {
      set((state) => {
        if (state.currentUser) {
          Object.assign(state.currentUser.preferences, preferences)
        }
      })
    },

    setUsers: (users: User[]) => {
      set((state) => {
        state.users = users
      })
    },

    addUser: (user: User) => {
      set((state) => {
        state.users.push(user)
      })
    },

    updateUser: (id: string, updates: Partial<User>) => {
      set((state) => {
        const userIndex = state.users.findIndex(user => user.id === id)
        if (userIndex !== -1) {
          Object.assign(state.users[userIndex], updates)
        }
      })
    },

    removeUser: (id: string) => {
      set((state) => {
        state.users = state.users.filter(user => user.id !== id)
      })
    },

    setSelectedUser: (user: User | null) => {
      set((state) => {
        state.selectedUser = user
      })
    },

    setLoading: (loading: boolean) => {
      set((state) => {
        state.loading = loading
      })
    },

    setError: (error: string | null) => {
      set((state) => {
        state.error = error
      })
    },

    reset: () => {
      set(initialUserState)
    }
  }

  return userSlice
} 