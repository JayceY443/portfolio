# Supabase 认证配置指南

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://app.supabase.com)
2. 创建一个新项目
3. 等待数据库设置完成

## 2. 获取项目配置

在 Supabase 控制台中：
1. 转到 **Settings** → **API**
2. 复制以下信息：
   - **URL**: 您的项目 URL
   - **anon public**: 匿名公钥

## 3. 配置环境变量

在项目根目录创建 `.env.local` 文件，并添加以下内容：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

将 `your-project-ref` 和 `your-anon-key` 替换为您的实际值。

## 4. 配置 Google OAuth（可选）

如果您想使用 Google 登录功能：

1. 在 Supabase 控制台中，转到 **Authentication** → **Providers**
2. 启用 **Google** 提供者
3. 在 [Google Cloud Console](https://console.cloud.google.com/) 中：
   - 创建或选择一个项目
   - 启用 Google+ API
   - 创建 OAuth 2.0 客户端 ID
   - 将授权回调 URL 设置为：`https://your-project-ref.supabase.co/auth/v1/callback`
4. 将 Google 客户端 ID 和密钥添加到 Supabase 配置中

## 5. 用户表（可选）

如果您想存储额外的用户信息，可以创建一个用户配置文件表：

```sql
-- 创建用户配置文件表
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  
  PRIMARY KEY (id)
);

-- 启用行级安全性
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 创建策略
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 创建触发器以自动更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
```

## 6. 测试配置

1. 启动开发服务器：`pnpm dev`
2. 访问应用程序
3. 点击用户头像图标
4. 尝试注册或登录
5. 如果配置了 Google OAuth，测试 Google 登录

## 故障排除

- 确保环境变量正确设置
- 检查 Supabase 项目是否正常运行
- 验证回调 URL 配置是否正确
- 查看浏览器控制台和 Supabase 日志以获取错误信息 