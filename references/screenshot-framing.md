# Screenshot Framing Guide - 截图美化规范

将代码、应用界面、仪表板等截图嵌入简历时，使用统一的"套壳"样式，提升专业度。

---

## 🎯 核心原则

1. **一致品牌感** - 所有截图使用相同边框、阴影、配色
2. **不遮挡内容** - 边框宽度 ≤ 8px，不影响原始界面阅读
3. **自动适配** - 脚本根据图片比例自动选择 framing 模式
4. **主题匹配** - 边框颜色跟随当前主题的 `--accent` 色

---

## 🖼️ 三种 Framing 模式

### 1. macOS Window (现代主题首选)

**特点**: 模拟 macOS 窗口，包含红黄绿三按钮，标题栏

**技术实现**:
- 背景: 渐变或纯色（主题 paper 色）
- 边框: 1px solid 深灰
- 窗口栏: 高度 24px，背景 rgba(0,0,0,0.05)
- 按钮: 三个圆形，红(#FF5F56)/黄(#FFBD2E)/绿(#27C93F)
- 阴影: 0 4px 12px rgba(0,0,0,0.15)

**适用场景**: 代码编辑器、浏览器、SaaS 界面

---

### 2. Minimal Frame (保守 / 杂志风)

**特点**: 极细边框，无装饰，强调内容本身

**技术实现**:
- 边框: 1px solid var(--ink)
- 内边距: 8px 白底
- 阴影: 无或轻度 (0 2px 8px rgba(0,0,0,0.08))
- 圆角: 2px

**适用场景**: 学术出版物、文档截图、静态图表

---

### 3. Brutalist Border (Swiss 风格)

**特点**: 粗黑边框，直角，无阴影，硬朗

**技术实现**:
- 边框: 3px solid #000000
- 内边距: 12px
- 阴影: 无
- 圆角: 0

**适用场景**: 设计展示、极简主义、需强调边框的项目

---

## 📐 尺寸规格

| 版式 | 容器宽度 | 图片高度 | 边框宽度 | 内边距 |
|------|----------|----------|----------|--------|
| R07 (Projects) | 100% | 300-400px | 1-3px | 12px |
| R15 (Project Cards) | 卡片内 | 180-220px | 1-2px | 8px |
| R13 (Cover) | 可选背景 | 全屏 | 0 | 0 |

---

## 🔧 Canvas 生成脚本 API

```javascript
// frameScreenshot(inputPath, outputPath, options)
const { frameScreenshot } = require('./frame-screenshot.mjs');

// 示例
await frameScreenshot('screenshot.png', 'framed.png', {
  theme: 'modern',           // 'conservative' | 'modern' | 'swiss' | 'editorial'
  style: 'macos',           // 'macos' | 'minimal' | 'brutalist'
  width: 800,               // 目标宽度，高度自动
  accentColor: '#002FA7'    // 可选覆盖主题 accent
});
```

---

## 📁 输出目录结构

```
assets/
└── backgrounds/
    ├── macos-window-dark.svg
    ├── macos-window-light.svg
    ├── minimal-frame.svg
    ├── brutalist-frame.svg
    └── textures/
        ├── paper-grain.png
        └── dot-grid.png
```

---

## ⚡ 自动化流程

1. 原始截图（PNG / JPG）放在 `tmp/screenshots/`
2. 运行 `scripts/frame-screenshots.mjs` 批量处理
3. 输出到 `assets/framed/` 并重命名为 `project-{id}.png`
4. 生成 HTML 时引用 `framed/` 下的文件

```bash
node scripts/frame-screenshots.mjs \
  --input tmp/screenshots \
  --output assets/framed \
  --theme modern \
  --style macos
```

---

## 🎨 主题变量映射

 framing 使用 CSS 变量来自适应主题：

```css
--frame-border: var(--accent);    /* 边框颜色 */
--frame-bg: var(--paper);         /* 背景色 */
--frame-shadow: 0 4px 12px rgba(0,0,0,0.15);
--frame-radius: 4px;              /* 或 0 依风格 */
```

---

## ⚠️ 注意事项

- 原始截图不应包含系统菜单栏/ dock 栏
- 截图分辨率 ≥ 800×600 以保证放大清晰度
- 避免在截图中隐藏敏感信息
- 所有截图应统一风格（一次生成统一用 macOS 或 Minimal）

---

## 📚 参考案例

- **guizang-ppt-skill**: `scripts/frame-screenshot.mjs` (有苹果窗口实现)
- **clean-shot-x**: 商业截图美化软件风格参考
- **Raycast**: 极简窗口设计

---

*生成脚本待实现 (Phase 3 待办)*
