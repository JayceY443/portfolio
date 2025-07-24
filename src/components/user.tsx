'use client'

import { useAuth } from "@/libs/store/hooks"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { LoginForm } from "./auth/login-form"
import { User2, LogOut, Settings } from "lucide-react"
import { useEffect, useState } from "react"

const User = () => {
  const { currentUser, logout, loading } = useAuth()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      setOpen(false)
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  const handleLoginSuccess = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer h-auto p-0 hover:bg-transparent">
          {currentUser ? (
            <Avatar className="size-8">
              <AvatarImage src={currentUser.avatar} width={32} height={32} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="size-8">
              <User2 className="size-4" />
            </Avatar>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {currentUser ? (
          // 已登录用户菜单
          <>
            <DialogHeader>
              <DialogTitle>用户菜单</DialogTitle>
              <DialogDescription>
                欢迎回来，{currentUser.name}！
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-4 p-4">
              <Avatar className="size-16">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-lg">
                  {currentUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{currentUser.name}</h3>
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start" disabled>
                <Settings className="mr-2 h-4 w-4" />
                设置
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start text-destructive hover:text-destructive" 
                onClick={handleLogout}
                disabled={loading}
              >
                <LogOut className="mr-2 h-4 w-4" />
                登出
              </Button>
            </div>
          </>
        ) : (
          // 登录表单
          <>
            <DialogHeader>
              <DialogTitle>登录</DialogTitle>
              <DialogDescription>
                请登录以访问您的账户
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <LoginForm onSuccess={handleLoginSuccess} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default User