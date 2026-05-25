# Image Prompts Reference - 配图提示词库

用于 GPT-Image / DALL-E 生成简历配图的标准提示词。确保风格与主题一致。

---

## 🎯 职业照生成

### 保守主题 (Conservative)
```
Professional corporate headshot, neutral background, business attire, polite smile, studio lighting, photorealistic, 8k
```

### 现代主题 (Modern)
```
Modern tech headshot, clean minimal background, smart casual, confident expression, natural light, professional but approachable, 8k
```

### Swiss Minimal
```
Swiss design portrait, stark white background, geometric composition, monochrome with accent color, confident direct gaze, Helvetica style, 8k
```

### Editorial 杂志风
```
Editorial portrait, warm paper texture background, cinematic lighting, artistic composition, thoughtful expression, Vogue magazine style, 8k
```

---

## 💻 截图美化 (Screenshot Framing)

用于项目展示中的"技术栈截图"卡片。

### macOS 窗口风格 (Modern/Swiss)
```
MacOS window frame, dark mode, clean desktop background, code editor or browser window, realistic shadows, centered composition
```

### 极简白底 (Conservative/Editorial)
```
Minimal document on warm paper, soft shadow, no distractions, photorealistic, editorial layout
```

### 科技感边框 (Swiss)
```
Brutalist tech frame, bold borders, monospace font in window, international orange accent, grid background, Swiss style
```

---

## 📊 技能可视化图表

### 技能雷达图 (Radar Chart)
```
Clean radar chart poster, dark blue background, neon accent lines, data visualization, technical skills: JavaScript, React, Node, Python, AWS, Docker, minimal design, white text
```

### 技能进度条 (Progress Bars)
```
Infographic poster, horizontal progress bars, 5 skills, gradient fills, percentage labels, Swiss typography, clean background
```

---

## 🏢 项目背景图 (Project Context)

### SaaS 项目
```
SaaS dashboard UI, modern design, charts and graphs, light theme, realistic browser window, productivity software
```

### AI/机器学习项目
```
AI/ML visualization, neural network diagram, data flowing, futuristic, blue and purple, code in background
```

### 移动应用项目
```
Mobile app interface, phone mockup, clean UI, user interaction, light mode, iOS style
```

### 开源项目
```
GitHub repository view, code editor, terminal, collaborative development, dark theme, multiple monitors
```

---

## 🎨 风格参数统一

所有提示词应保持一致的后缀，以确保质量：

```
, photorealistic, 8k, professional, high quality, no text overlay, clean composition
```

---

## ⚠️ 使用限制

- **职业照**：避免夸张表情、非专业背景、过度修图
- **代码截图**：确保代码没有敏感信息（API key、密码）
- **图表**：不使用 3D 效果，保持扁平化设计
- **文字**：生成的图片中不应包含可读文字（ATS 无法解析 SVG 文字）

---

## 🔄 工作流

1. 根据用户主题选择提示词模板
2. 替换占位变量（如项目名称、技术栈）
3. 调用 GPT-Image 或 DALL-E 生成
4. 自动裁剪为所需比例（16:9, 1:1, 4:3）
5. 优化压缩（< 100KB）
6. 嵌入到对应版式槽位

---

## 📐 输出规格

| 用途 | 尺寸 | 格式 | DPI |
|------|------|------|-----|
| 职业照 | 400×500 | JPEG | 72 |
| 项目截图 | 800×600 | JPEG | 72 |
| 技能图表 | 600×400 | PNG | 72 |
| 背景图 | 1920×1080 | JPEG | 72 |

---

*参考来源: guizang-ppt-skill image-prompts.md*
