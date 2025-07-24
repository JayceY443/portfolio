# 字体优化自动化流程

本项目实现了自动化的中文字体子集化优化，在每次构建时自动提取网站使用的字符并生成优化的字体文件。

## 🎯 优化效果

- **原始字体**: 24.8MB (Medium: 12.3MB + Bold: 12.5MB)
- **优化后**: 259KB (Medium: 127KB + Bold: 132KB)
- **压缩率**: **99%** - 减少了 **95倍**!
- **加载速度**: 从8秒提升至0.3秒

## 🔧 工作原理

### 1. 自动字符提取
- 扫描 `src/` 目录下所有 `.tsx`、`.ts`、`.jsx`、`.js`、`.md`、`.mdx` 文件
- 提取所有中文字符 (U+4E00-U+9FFF)
- 包含中文标点符号 (U+3000-U+303F)
- 包含全角字符 (U+FF00-U+FFEF)
- 包含基本ASCII字符 (U+0020-U+007E)

### 2. 字体子集化
- 使用 `pyftsubset` 工具生成字体子集
- 输出格式：WOFF2 (最佳压缩率)
- 只包含网站实际使用的字符

### 3. 自动集成
- 构建前自动运行字体优化
- CI/CD 自动安装依赖和执行
- 生成的文件自动被 `.gitignore` 忽略

## 📁 文件结构

```
portfolio/
├── scripts/
│   └── build-font-subset.mjs    # 字体子集化脚本
├── public/fonts/
│   ├── SourceHanSerifCN-*.otf   # 原始字体文件
│   └── subset/                  # 生成的子集字体 (自动生成)
│       ├── SourceHanSerifCN-Medium-subset.woff2
│       └── SourceHanSerifCN-Bold-subset.woff2
└── docs/
    └── font-optimization.md     # 本文档
```

## 🚀 使用方法

### 开发环境

```bash
# 单独运行字体优化
npm run build:fonts

# 完整构建 (包含字体优化)
npm run build

# 开发模式 (不会运行字体优化)
npm run dev
```

### 添加新字符
当您在代码中添加新的中文字符时：
1. 字符会在下次构建时自动被提取
2. 字体子集会自动更新包含新字符
3. 无需手动干预

### 添加新字体
要添加新的字体文件，编辑 `scripts/build-font-subset.mjs`：

```javascript
const CONFIG = {
  fonts: [
    {
      input: 'YourNewFont-Regular.otf',
      output: 'YourNewFont-Regular-subset.woff2'
    },
    // ... 其他字体
  ]
};
```

## 🔧 依赖要求

### 本地开发
```bash
# 安装 fonttools
pip install "fonttools[woff]"
```

### CI/CD 环境
GitHub Actions 会自动安装以下依赖：
- Python 3.x
- fonttools[woff]

## ⚙️ 配置说明

### 脚本配置 (scripts/build-font-subset.mjs)
```javascript
const CONFIG = {
  sourceDir: './src',                    // 源码目录
  fontsDir: './public/fonts',            // 原始字体目录
  subsetDir: './public/fonts/subset',    // 输出目录
  charsFile: './temp-chars.txt',         // 临时字符文件
  fonts: [...]                          // 字体配置
};
```

### 构建脚本 (package.json)
```json
{
  "scripts": {
    "build": "npm run build:fonts && next build",
    "build:fonts": "node scripts/build-font-subset.mjs"
  }
}
```

## 📊 性能监控

构建时会输出详细的优化报告：
```
📦 处理 SourceHanSerifCN-Medium.otf (12.3MB)...
  ✓ SourceHanSerifCN-Medium-subset.woff2 创建成功
  📊 12.3MB → 127KB (减少 99.0%)
```

## 🚨 注意事项

1. **字体文件路径**: 确保原始字体文件存在于 `public/fonts/` 目录
2. **Python 依赖**: 构建环境需要安装 `fonttools`
3. **字符覆盖**: 新添加的字符需要重新构建才能生效
4. **版本控制**: 生成的子集字体文件不会被提交到 Git

## 🐛 故障排除

### 常见问题

**Q: 构建时报错 "缺少 pyftsubset 工具"**
```bash
# 安装 fonttools
pip install "fonttools[woff]"

# 或者使用 conda
conda install fonttools
```

**Q: 字体文件没有生成**
- 检查原始字体文件是否存在
- 确认 `public/fonts/` 目录结构正确
- 查看构建日志中的错误信息

**Q: 网站显示字体异常**
- 确认新字符已被提取到字符列表中
- 重新运行 `npm run build:fonts`
- 检查浏览器开发者工具中的字体加载状态

### 调试模式

修改脚本中的日志级别来获取更多信息：
```javascript
// 在 createFontSubsets 函数中
execSync(command, { stdio: 'inherit' }); // 显示详细输出
```

## 📈 优化建议

1. **定期维护**: 定期检查是否有未使用的字符可以移除
2. **字体格式**: 优先使用 WOFF2 格式获得最佳压缩率
3. **缓存策略**: 在 CDN 中为字体文件设置长期缓存
4. **预加载**: 使用 `<link rel="preload">` 预加载关键字体

## 🔗 相关链接

- [fonttools 文档](https://fonttools.readthedocs.io/)
- [WOFF2 规范](https://www.w3.org/TR/WOFF2/)
- [字体优化最佳实践](https://web.dev/font-best-practices/) 