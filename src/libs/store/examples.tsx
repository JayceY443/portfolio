'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  useAuth, 
  useTheme, 
  useNotify, 
  useModal, 
  useNavigation,
  usePageState,
  useCurrentUser 
} from './hooks'

export const AuthExample = () => {
  const { currentUser, isAuthenticated, login, logout, loading } = useAuth()
  const notify = useNotify()

  const handleLogin = async () => {
    try {
      await login('jayce.y.443@icloud.com', 'password123')
      notify.success('登录成功', '欢迎回来！')
    } catch (error) {
      notify.error('登录失败', '请检查用户名和密码')
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>认证状态示例</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant={isAuthenticated ? 'default' : 'secondary'}>
            {isAuthenticated ? '已登录' : '未登录'}
          </Badge>
          {currentUser && (
            <span className="text-sm text-muted-foreground">
              {currentUser.name} ({currentUser.email})
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {!isAuthenticated ? (
            <Button onClick={handleLogin} disabled={loading}>
              {loading ? '登录中...' : '登录'}
            </Button>
          ) : (
            <Button variant="outline" onClick={handleLogout}>
              退出登录
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// === 主题切换示例 ===
export const ThemeExample = () => {
  const { theme, setTheme, toggleTheme } = useTheme()

  return (
    <Card>
      <CardHeader>
        <CardTitle>主题切换示例</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">当前主题:</span>
          <Badge>{theme}</Badge>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setTheme('light')}>
            浅色
          </Button>
          <Button variant="outline" onClick={() => setTheme('dark')}>
            深色
          </Button>
          <Button variant="outline" onClick={() => setTheme('system')}>
            系统
          </Button>
          <Button onClick={toggleTheme}>
            切换主题
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// === 通知系统示例 ===
export const NotificationExample = () => {
  const notify = useNotify()

  return (
    <Card>
      <CardHeader>
        <CardTitle>通知系统示例</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            onClick={() => notify.success('成功', '操作已完成')}
          >
            成功通知
          </Button>
          <Button 
            variant="outline" 
            onClick={() => notify.error('错误', '操作失败')}
          >
            错误通知
          </Button>
          <Button 
            variant="outline" 
            onClick={() => notify.warning('警告', '请注意')}
          >
            警告通知
          </Button>
          <Button 
            variant="outline" 
            onClick={() => notify.info('信息', '这是一条信息')}
          >
            信息通知
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export const ModalExample = () => {
  const userModal = useModal('user-profile')
  const settingsModal = useModal('settings')
  const currentUser = useCurrentUser()

  return (
    <Card>
      <CardHeader>
        <CardTitle>模态框管理示例</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => userModal.open({ user: currentUser })}
          >
            打开用户资料 {userModal.isOpen && '(已打开)'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => settingsModal.open()}
          >
            打开设置 {settingsModal.isOpen && '(已打开)'}
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" onClick={userModal.close}>
            关闭用户资料
          </Button>
          <Button size="sm" onClick={settingsModal.close}>
            关闭设置
          </Button>
        </div>
        
        {userModal.isOpen && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm">用户资料模态框已打开</p>
            <p className="text-xs text-muted-foreground">
              数据: {JSON.stringify(userModal.data)}
            </p>
          </div>
        )}
        
        {settingsModal.isOpen && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm">设置模态框已打开</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// === 导航控制示例 ===
export const NavigationExample = () => {
  const { 
    sidebarOpen, 
    mobileMenuOpen, 
    toggleSidebar, 
    toggleMobileMenu, 
    closeAll 
  } = useNavigation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>导航控制示例</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Badge variant={sidebarOpen ? 'default' : 'secondary'}>
            侧边栏: {sidebarOpen ? '打开' : '关闭'}
          </Badge>
          <Badge variant={mobileMenuOpen ? 'default' : 'secondary'}>
            移动菜单: {mobileMenuOpen ? '打开' : '关闭'}
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={toggleSidebar}>
            切换侧边栏
          </Button>
          <Button variant="outline" onClick={toggleMobileMenu}>
            切换移动菜单
          </Button>
          <Button onClick={closeAll}>
            关闭所有
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// === 页面状态示例 ===
export const PageStateExample = () => {
  const { pageLoading, pageTitle, setPageLoading, setPageTitle } = usePageState()

  const simulateLoading = () => {
    setPageLoading(true)
    setTimeout(() => {
      setPageLoading(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>页面状态示例</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">页面标题:</span>
            <Badge>{pageTitle}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">加载状态:</span>
            <Badge variant={pageLoading ? 'default' : 'secondary'}>
              {pageLoading ? '加载中' : '已加载'}
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setPageTitle('新标题 - ' + Date.now())}
          >
            更新标题
          </Button>
          <Button onClick={simulateLoading} disabled={pageLoading}>
            {pageLoading ? '加载中...' : '模拟加载'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// === 综合示例组件 ===
export const ZustandExamples = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Zustand Store 使用示例</h1>
        <p className="text-muted-foreground">
          演示如何在组件中使用各种 Zustand hooks 和功能
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <AuthExample />
        <ThemeExample />
        <NotificationExample />
        <ModalExample />
        <NavigationExample />
        <PageStateExample />
      </div>
    </div>
  )
} 