# 个人作品集网站

基于 Next.js 和 shadcn/ui 构建的现代化个人作品集网站，展示个人技能、经验、价值观和项目案例。

## ✨ 特性

- 🎨 现代化设计，使用 shadcn/ui 组件库
- 📱 完全响应式，支持移动端和桌面端
- 🚀 基于 Next.js 15 和 React 19
- 🎯 平滑滚动导航和锚点定位
- 🌙 支持深色/浅色主题切换
- ⚡ 高性能，快速加载
- 🔧 TypeScript 支持，类型安全

## 📁 页面结构

1. **关于我** - 个人介绍、基本信息和联系方式
2. **我的技能** - 技术技能展示，包含熟练度评级
3. **我的价值观** - 核心价值观和工作理念
4. **我的流程** - 开发流程和工作方法
5. **工作经验** - 详细的职业发展历程
6. **项目案例** - 精选项目展示，支持分类筛选

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm、yarn、pnpm 或 bun

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS 4
- **组件库**: shadcn/ui
- **图标**: Lucide React
- **类型检查**: TypeScript
- **代码规范**: ESLint

## 🎨 自定义配置

### 个人信息修改

在以下文件中修改个人信息：

- `src/components/about-section.tsx` - 个人介绍
- `src/components/skills-section.tsx` - 技能信息
- `src/components/experience-section.tsx` - 工作经验
- `src/components/projects-section.tsx` - 项目案例

### 主题颜色

主题颜色在 `src/app/globals.css` 中定义，可以根据需要进行调整。

### 字体

项目使用 Geist 字体，可以在 `src/app/layout.tsx` 中修改字体配置。

## 📦 组件说明

- `Navigation` - 顶部导航组件，支持平滑滚动
- `AboutSection` - 关于我部分
- `SkillsSection` - 技能展示，带进度条和分类
- `ValuesSection` - 价值观展示，卡片布局
- `ProcessSection` - 工作流程，步骤式展示
- `ExperienceSection` - 工作经验，时间线布局
- `ProjectsSection` - 项目案例，网格布局带筛选

## 🚀 部署

### Vercel (推荐)

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### 其他平台

支持部署到任何支持 Node.js 的平台：

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 许可证

MIT License - 详见 LICENSE 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，欢迎联系：
- 邮箱：jayce.y.443@icloud.com
- GitHub: [@JayceY443]

---

⭐ 如果这个项目对你有帮助，欢迎给个星标！
