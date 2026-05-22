---
name: resume-html-skill
description: Generate ATS-friendly single-file HTML resumes with locked layouts, two professional themes (Conservative/Modern), and automatic validation for applicant tracking systems. Creates portable, print-ready resumes that parse correctly in Workday, Greenhouse, and other ATS platforms.
triggers:
  - "帮我做一份 ATS 友好的简历"
  - "生成单文件 HTML 简历"
  - "resume ATS friendly"
  - "HTML resume"
  - "create resume"
  - "build resume"
  - "generate resume"
---

# Resume HTML Skill

> 由 OpenClaw 驱动，专为 ATS 解析优化的单文件 HTML 简历生成器

一个适配 Claude Code / OpenClaw 等 Agent 环境的简历技能，用于生成 **单文件 HTML 格式的 ATS 友好简历**。

## 核心特性

- ✅ **ATS 安全**: 严格遵循 ResumeOptimizerPro 五阶段规则，禁止 table、双列、emoji、SVG 文字
- ✅ **版式锁定**: 12 个标准 section 版式（R01-R12），禁止自由发挥
- ✅ **双主题**: 保守（墨水黑+暖米白）与现代（深蓝+克莱因蓝）
- ✅ **自动校验**: `validate-resume.mjs` 脚本拦截 P0 错误
- ✅ **零依赖交付**: 单 HTML 文件，浏览器直接打开/打印
- ✅ **打印优化**: 内置 A4/Letter 打印样式

---

## 触发关键词

- "帮我做一份 ATS 友好的简历"
- "生成单文件 HTML 简历"
- "create a resume that parses in Workday"
- "HTML resume"
- "build resume"

---

## 工作流

### Step 1 · 澄清需求

Agent 应询问：

1. 目标行业？（决定主题：保守/现代）
2. 工作年限？（决定 section 优先级和详略）
3. 是否有现有简历素材？（Markdown/JSON/TXT）
4. 是否需要打印优化？（A4 尺寸）

### Step 2 · 选择主题

- **Conservative**（默认）：金融、法律、政府、传统企业
- **Modern**：科技、创业、设计、创意行业

拷贝对应模板到工作区：
```bash
cp assets/templates/template-conservative.html output/index.html
# 或
cp assets/templates/template-modern.html output/index.html
```

### Step 3 · 读取模板

Agent 需要读取选中的模板文件（至少读到 `<style>` 块末尾），理解类名命名约定。

### Step 4 · 填充内容

从 `assets/templates/templates.js` 加载需要的版式片段，按顺序生成 slides：

标准顺序：
1. R01 Header
2. R02 Professional Summary (optional but recommended)
3. R03 Key Skills
4. R04/R05 Work Experience (use R05 for two recent roles side-by-side)
5. R06 Education
6. R07 Projects (optional but good for engineers)
7. R08 Certifications (if any)
8. R09 Languages (if relevant)
9. R10 Volunteer (if any)
10. R11 Publications (if any)
11. R12 Closing

注入数据时保留 `data-layout` 属性不变。

### Step 5 · 自检

运行验证脚本：
```bash
node scripts/validate-resume.mjs output/index.html
```

必须满足：
- 0 个 P0 errors
- 所有 warnings 已 review 并确认可接受

### Step 6 · 预览

在浏览器中打开 `output/index.html`：
- 检查换页（horizontal scroll 或 print preview）
- 确认字体大小可读（正文 ≥ 12px）
- 确认颜色对比度良好

### Step 7 · 交付

交付物：
- `output/index.html`（单文件，可直接发送）
- 可选：`output/resume.pdf`（通过浏览器打印为 PDF）

---

## 版式锁定规则

**硬约束:**
- 正文页只能使用 R01-R12 中登记版式，不得发明 R13/R14
- 每个 `<section class="slide">` 必须携带 `data-layout="Rxx"`
- 必须使用 `assets/templates/templates.js` 中的片段，不要重新发明 HTML 结构
- 只允许修改**内容**（文字、日期），**不允许修改类名和嵌套结构**

---

## 校验脚本

```bash
node scripts/validate-resume.mjs path/to/index.html
```

**P0 拦截:**
- `<table>` 标签
- `<textarea>` / `contenteditable`
- SVG `<text>`
- Emoji / Unicode  Symbols
- 双列布局 (`column-count >= 2`)
- 非标准 section 标题
- 缺失 `data-layout`

**Warnings:**
- 日期格式不统一
- 字体过小 (<12px)
- 对比度不足
- 缺少某些 section

---

## 设计系统

详见 `DESIGN.md` - 包含 12 个版式的详细骨架、CSS 变量、主题切换方法。

---

## 示例使用

**User:** "帮我基于这份 Markdown 简历做一份 ATS 友好的 HTML 版本，用于申请人工智能产品经理岗位。"

**Agent:**
1. 询问使用保守还是现代主题 → 用户选"现代"
2. 读取 `template-modern.html` 和 `templates.js`
3. 解析 Markdown，映射到对应版式：
   - 个人信息 → R01
   - 专业摘要 → R02
   - 技能列表 → R03
   - 工作经历（2个）→ R05
   - 项目经验 → R07
   - 教育背景 → R06
4. 生成 `output/index.html`
5. 运行 `validate-resume.mjs`，全部通过 ✅
6. 告诉用户："简历已生成，可预览。是否需要对某些部分调整？"

---

## 对比现有方案

| 能力 | resume-tailoring-skill (301⭐) | rendercv (16K⭐) | **resume-html-skill** |
|------|-------------------------------|----------------|----------------------|
| 输出格式 | DOCX/PDF/MD | PDF (via LaTeX) | **Single HTML** |
| ATS 优化 | 关键词匹配 | 排版质量 | **解析级安全** |
| 质量管控 | 无校验 | Schema 验证 | **版式锁定 + validate** |
| Agent 友好 | 中等（需 docx 库） | CLI 工具 | **高（纯文本 HTML）** |
| 交付便捷 | 需 Office/PDF 阅读器 | 需 PDF 阅读器 | **浏览器直接打开** |
| 打印支持 | 通过 DOCX | 原生 PDF | **@media print** |

---

## License

MIT

---

## 致谢

- Design pattern inspired by `guizang-ppt-skill` (11K⭐)
- ATS rules from ResumeOptimizerPro technical deep-dive
- Layout philosophy from rendercv (YAML→PDF)
