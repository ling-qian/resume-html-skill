# Resume HTML Skill · ATS 友好单文件简历

![GitHub stars](https://img.shields.io/github/stars/ling-qian/resume-html-skill?style=flat-square)
![License](https://img.shields.io/github/license/ling-qian/resume-html-skill?style=flat-square)
![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)
![HTML Resume](https://img.shields.io/badge/HTML-Resume-0A7CFF?style=flat-square)

一个为 Claude Code / OpenClaw 等 Agent 设计的简历生成技能，产出 **单文件 HTML、ATS 解析安全、打印就绪** 的专业简历。

> 70%+ 简历在面试前就被 ATS 拦截——本技能确保你的简历通过机器筛选。

---

## 🎯 30 秒安装

```bash
npx skills add https://github.com/ling-qian/resume-html-skill --skill resume-html-skill
```

或手动克隆到 `~/.claude/skills/resume-html-skill`（Claude Code）或 `~/.openclaw/workspace/.agents/skills/resume-html-skill`（OpenClaw）。

---

## 🚀 快速开始

触发技能：

```
帮我基于这份 Markdown 做一份 ATS 友好的简历，申请后端开发岗位。
```

Agent 会：
1. 询问主题（保守/现代）
2. 读取模板和版式库
3. 填充你的内容
4. 运行自动校验
5. 生成 `output/index.html`

---

## ✨ 核心特性

| 特性 | 说明 |
|------|------|
| **ATS 安全** | 禁止 table、双列、emoji、SVG 文字，遵循 Workday/Greenhouse 解析规则 |
| **版式锁定** | 18 个标准 section（R01-R18），防止自由发挥导致解析失败 |
| **多风格系统** | 4 套预设风格（保守/现代/Swiss/Editorial），通过 themes.js 切换 |
| **配图工作流** | Phase 3: 职业照生成、截图美化、技能图表（GPT-Image 集成） |
| **多平台封面** | Phase 3: 自动生成 LinkedIn / 公众号 / 小红书等多尺寸封面 |
| **自动校验** | `validate-resume.mjs` 拦截 P0 错误，确保交付质量 |
| **单文件交付** | 无依赖，浏览器直接打开，支持打印为 PDF |
| **Agent 友好** | HTML 纯文本，Agent 可直接读写、修改、验证 |

---

## 📐 18 个版式

| ID | 名称 | 用途 |
|-----|------|------|
| R01 | Header | 姓名、职位、联系信息 |
| R02 | Professional Summary | 3-4 行专业摘要 |
| R03 | Key Skills | 技能标签云 |
| R04 | Work Experience (Single) | 单列工作经历 |
| R05 | Work Experience (Dual) | 双列并排经历 |
| R06 | Education | 教育背景 |
| R07 | Projects | 项目展示 |
| R08 | Certifications | 证书列表 |
| R09 | Languages | 语言能力 |
| R10 | Volunteer | 志愿服务 |
| R11 | Publications | 出版物 |
| R12 | Closing | 结尾/参考人 |
| R13 | Cover | 大字封面（个人品牌展示） |
| R14 | Stats | 大数字成就展示 |
| R15 | Project Cards | 双列项目卡片（作品集） |
| R16 | Skills Tags | 增强型技能标签云 |
| R17 | Timeline | 职业时间线 |
| R18 | Contact | 二维码 + 社交链接页 | 二维码 + 社交链接页 |

**规则：** 正文页必须从这 18 个版式选择，不得发明新结构。

> **注**：R13-R18 为 Phase 1 新增版式，主要用于演示型简历或作品集，而非严格 ATS 扫描场景。

---

## 🎨 主题

### Conservative (默认)
- 墨水黑 `#0a0a0b` + 暖米白 `#f1efea`
- 衬线字体（Source Serif 4 / Noto Serif SC）
- 适合：金融、法律、政府、传统行业

### Modern
- 深蓝 `#0a1f3d` + 克莱因蓝 `#002FA7`
- 无衬线字体（IBM Plex Sans / Noto Sans SC）
- 适合：科技、创业、设计、创意行业

### Swiss (Phase 2 新增)
- 纯黑 `#000000` + 纯白 `#FFFFFF` + 国际橙 `#FF3B30`
- 无衬线字体（Inter / Noto Sans SC）
- 强网格、直角、不对称布局
- 适合：设计师、建筑师、极简主义作品集

### Editorial (Phase 2 新增)
- 深灰 `#2D2D2D` + 暖米白 `#F5F5F0` + 猩红 `#C41E3A`
- 衬线字体（Cormorant Garamond / Noto Serif SC）
- 宽松行距、杂志社论风格
- 适合：文化、艺术、学术、出版

### 切换主题

`themes.js` 自动应用（优先级：URL > localStorage > data-default-theme）：

```html
<html data-default-theme="modern">
```

URL 覆盖: `output.html?theme=swiss`

JavaScript: `window.ResumeThemes.setTheme('editorial')`

---

## ✅ 质量门槛

### P0 (Showstopper) - 绝对禁止
- ❌ `<table>` 元素
- ❌ `<textarea>` 或 `contenteditable`
- ❌ SVG `<text>`
- ❌ Emoji / Unicode 图标符号
- ❌ 双列布局（`column-count >= 2`）
- ❌ 背景图片遮挡文字
- ❌ 非标准 section 标题（如 "My Journey"）
- ❌ 未注册版式（非 R01-R18）

### P1 (Warning) - 建议修复
- ⚠️ 日期格式不统一
- ⚠️ 字体 < 12px
- ⚠️ 对比度 < 4.5:1
- ⚠️ 超过 2 级标题嵌套

---

## 📝 使用示例

**User:** "帮我做一份简历，申请人工智能产品经理"

**Agent 对话:**

```
Agent: 您希望使用哪个主题？
  1. Conservative（保守，适合传统行业）
  2. Modern（现代，适合科技/设计）
User: Modern
Agent: 请提供您的现有简历（Markdown/TXT）或直接告诉我您的信息。
User: [提供 Markdown 内容]
Agent: [生成 output/index.html]
Agent: 运行校验... 0 errors, 1 warning。
       预览链接: file:///.../output/index.html
       需要调整吗？
```

---

## 🔧 手动验证

```bash
# 生成后自动校验
node scripts/validate-resume.mjs output/index.html

# 期望输出: ✅ Validation passed (0 errors)
# 如果使用新版式 (R13-R18)，确保你也已更新 templates.js 和验证器白名单
```

## 🖼️ 生成多平台封面

将简历数据转为社交媒体封面（LinkedIn 头图、微信公众号等）：

```bash
# 准备数据文件 (cover-data.json)
node scripts/generate-covers.mjs \
  --input examples/cover-data.json \
  --output output/covers \
  --theme swiss \
  --platforms linkedin,wechat
```

支持平台：`linkedin`, `wechat`, `xiaohongshu`, `twitter`, `youtube`

输出：`output/covers/linkedin-swiss.png`, `wechat-swiss.png`, ...

---

## 📂 项目结构

```
resume-html-skill/
├── SKILL.md
├── README.md
├── DESIGN.md
├── LAYOUTS.md           # 18 个版式的详细使用指南与主题适配
├── LICENSE
├── assets/
│   └── templates/
│       ├── template-conservative.html
│       ├── template-modern.html
│       ├── template-swiss.html          # Phase 2 新增
│       ├── template-editorial.html      # Phase 2 新增
│       ├── templates.js                # 18版式片段库 (R01-R18)
│       └── themes.js                   # 主题预设系统（4 套风格）
├── references/
│   ├── checklist.md              # P0/P1 质量清单
│   ├── ats-rules.md              # ATS 解析规则详解
│   ├── image-prompts.md          # Phase 3 配图提示词库
│   └── screenshot-framing.md     # Phase 3 截图美化规范
└── scripts/
    ├── validate-resume.mjs       # 自动校验脚本
    ├── generate-covers.mjs       # Phase 3 多平台封面生成
    └── frame-screenshots.mjs     # Phase 3 截图美化脚本（计划中）
```

---

## 🆚 为什么选择 HTML 而不是 DOCX/PDF？

| 格式 | Agent 友好 | ATS 安全 | 交付便捷 | 修改成本 |
|------|-----------|----------|----------|----------|
| DOCX | ❌ 需库 | ⚠️ 依赖排版 | 需 Word | 高 |
| PDF  | ❌ 不可编辑 | ✅ 如果 ATS 能解析 | 需阅读器 | 极高 |
| **HTML** | **✅ 纯文本** | **✅ 规则可控** | **浏览器即开** | **低** |

---

## 🤝 贡献

欢迎 Issue 和 PR！请确保：
- 修改版式时在 `templates.js` 而非直接改骨架
- 新增版式需对应注册 ID (R13+) 并更新 `validate-resume.mjs` 的白名单
- 保持 ATS 安全规则不变

---

## 📚 参考来源

- [ResumeOptimizerPro - How Resume Parsers Actually Work](https://resumeoptimizerpro.com/blog/how-resume-parsers-actually-work)
- [Jobshinobi - Workday ATS Optimization Guide](https://www.jobshinobi.com/blog/how-to-optimize-resume-for-workday-ats)
- [rendercv - YAML→PDF 简历构建器](https://github.com/rendercv/rendercv) (排版理念参考)
- [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) (版式锁定模式)

---

## License

MIT © 2026

## 🎮 CLI 使用指南

```bash
# 1️⃣ 多平台封面生成（一站式）
npx resume-html-skill covers \
  --input data.json \
  --output ./generated/covers \
  --theme swiss \
  --platforms linkedin,wechat,xiaohongshu

# 2️⃣ 截图美化（批量）
npx resume-html-skill frame \
  --input ./raw-screenshots \
  --output ./assets/framed \
  --theme modern \
  --style macos

# 3️⃣ 生成职业照
npx resume-html-skill headshot \
  --prompt "professional software engineer, smiling, studio lighting" \
  --output ./assets/headshot.png \
  --theme modern
```

> ⚠️ **注意**: 运行前请确保已安装依赖：
> ```bash
> npm install
> ```

## Phase 3: 配图工作流与多平台封面

> 版本: `v1.3.0` · 状态: ✅ 已实现

### ✨ 主要特性

| 特性 | 说明 |
|------|------|
| 🖼️ 多平台封面生成 | 自动生成 LinkedIn / 公众号 / 小红书 / Twitter / YouTube 封面 |
| 🎨 主题适配 | 封面根据选定的主题配色与字体自动渲染 |
| 📐 Canvas 高清渲染 | 输出 PNG 高清图像 (最高 2560×1440) |
| 🖥️ 截图美化 | 为项目截图添加 macOS / Minimal / Brutalist 风格边框 |
| 🤖 AI 职业照集成 | 对接 DALL-E 3 自动生成专业头照 |

---

### 📦 依赖安装

```bash
# 在技能目录下运行
cd /Users/tom/.openclaw/workspace/.agents/skills/resume-html-skill
npm install
```

依赖说明：
- `canvas`：用于封面渲染 ⚠️ 需要系统 Cairo 库（macOS: `brew install pkg-config cairo pango libpng jpeg giflib`）
- `sharp`：截图处理
- `commander`：CLI 框架
- `openai`：职业照生成

---

### 🎮 CLI 使用

#### 1️⃣ 生成多平台封面

```bash
npx resume-html-skill covers \
  --input examples/cover-data.json \
  --output generated/covers \
  --theme swiss \
  --platforms linkedin,wechat,xiaohongshu
```

参数：
- `--input`: JSON 简历数据（包含 name, title, tagline）
- `--output`: 输出目录
- `--theme`: 主题（conservative, modern, swiss, editorial）
- `--platforms`: 逗号分隔的平台列表

输出文件：
```
generated/covers/
├── linkedin-swiss.png
├── wechat-swiss.png
└── xiaohongshu-swiss.png
```

#### 2️⃣ 批量截图美化

```bash
npx resume-html-skill frame \
  --input tmp/screenshots \
  --output assets/framed \
  --theme modern \
  --style macos \
  --width 1200
```

`--style` 可选值：
- `macos`：模拟 macOS 窗口，带红黄绿按钮（现代主题）
- `minimal`：极细边框，无装饰（保守/杂志风）
- `brutalist`：粗黑边框，直角（Swiss 风格）

#### 3️⃣ 生成职业照

```bash
npx resume-html-skill headshot \
  --prompt "professional software engineer, smiling, studio lighting" \
  --output assets/headshot.png \
  --theme swiss
```

环境变量：
- `OPENAI_API_KEY`: OpenAI API Key（必填，或通过 `--apiKey` 传递）

---

### 📚 提示词库

见 `references/image-prompts.md`，包含：
- 职业照生成模板（4 主题版）
- 截图美化提示
- 技能图表、项目背景图提示

---


#### 🔄 统一 images 命令支持的完整类型

| 类型 | 说明 | 必填选项 |
|------|------|----------|
| `headshot` | 生成职业照 | `--input` (prompt) |
| `cover` | 多平台封面 | `--input` (JSON) |
| `framed` | 截图美化 | `--input` (目录或文件) |

示例 - 批量生成所有平台封面：
```bash
npx resume-html-skill images --type cover \
  --input examples/cover-data.json \
  --output ./covers \
  --theme editorial \
  --platforms linkedin,wechat,youtube
```

示例 - 美化截图（默认 macOS 风格）：
```bash
npx resume-html-skill images --type framed \
  --input ./raw-screenshots \
  --output ./framed \
  --theme swiss \
  --style brutalist \
  --width 1200
```

### 🛠️ 脚本 API（Node.js 调用）

```javascript
// covers
const { generateCovers } = require('./scripts/generate-covers.cjs');
await generateCovers({
  input: 'data.json',
  output: './covers',
  theme: 'editorial',
  platforms: ['linkedin', 'wechat']
});

// frame
const { frameScreenshots } = require('./scripts/frame-screenshots.cjs');
await frameScreenshots({
  input: './raw',
  output: './framed',
  theme: 'swiss',
  style: 'macos',
  width: 1000
});

// headshot
const { generateHeadshot } = require('./scripts/generate-headshot.cjs');
await generateHeadshot({
  prompt: 'data scientist with glasses, professional',
  output: './headshot.png',
  theme: 'modern'
});
```

---

### 📁 文件结构

```
assets/
├── framed/          # 截图美化后文件
├── backgrounds/     # 纹理资源
└── icons/           # 社交图标

scripts/
├── cli.js           # CLI 入口
├── generate-covers.cjs
├── frame-screenshots.cjs
└── generate-headshot.cjs

references/
├── image-prompts.md      # 提示词库
└── screenshot-framing.md # 美化规范

examples/
└── cover-data.json       # 封面生成示例数据
```
