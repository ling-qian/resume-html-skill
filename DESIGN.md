# Resume HTML Skill - Design System

## 核心原则

1. **ATS 优先**：所有版式必须通过 Workday/Greenhouse 解析器
2. **单文件交付**：零依赖，浏览器直接打开
3. **版式锁定**：12 个标准 section，禁止自由发挥
4. **主题预设**：2 套配色（保守/现代），禁止自定义 hex

---

## ATS 五阶段安全规则（基于 ResumeOptimizerPro）

### 🚫 禁止项（P0 - 绝对不允许）

| 规则 | 原因 | 违反后果 |
|------|------|---------|
| `<table>` 标签 | 解析器顺序错乱 | 工作经历乱序 |
| `<textarea>` 或 `contenteditable` | 识别为图片/对象 | 文字无法提取 |
| SVG 包含 `<text>` | 被视为图形 | 信息丢失 |
| Emoji / Unicode 图标作为项目符号 | 分词失败 | 技能/要点丢失 |
| 双列布局 (multi-column) | 阅读顺序错乱 | 内容全部错乱 |
| 背景图片上放文字 | OCR 失败率 +15% | 文本无法提取 |
| 扫描版 PDF 上传（禁止；这里是 HTML 所以 safe）| OCR 降低准确率到 ~85% | 字段错误 |

### ✅ 必须项

| 规则 | 要求 |
|------|------|
| 标准 section 标题 | `Experience`, `Education`, `Skills`, `Projects`, `Certifications` |
| 日期格式 | `MM/YYYY` 或 `Month YYYY`（统一） |
| 职位 Title Case | `Senior Software Engineer` 而非 `senior software engineer` |
| 字体大小 | 正文 ≥ 10pt (12px)，标题 ≥ 14pt (16px) |
| 颜色对比度 | WCAG AA 标准（4.5:1）|

---

## 12 个版式登记

每个版式对应一个 `<section class="slide" data-layout="Rxx">`

| ID | 名称 | 用途 | 必须保留骨架 |
|-----|------|------|------------|
| R01 | Header | 姓名、职位、联系信息 | 顶部大姓名字体、下方三列联系信息 |
| R02 | Professional Summary | 3-4 行专业摘要 | 左对齐段落，无缩进 |
| R03 | Key Skills | 技能标签云 | 单行技能标签，wrap allowed |
| R04 | Work Experience (Single) | 单个工作经历 | 公司+职位+日期+bullet points |
| R05 | Work Experience (Dual) | 两个并排工作经历 | 左右两列，高度可不同 |
| R06 | Education | 教育背景 | 学校+学位+专业+日期+GPA (可选) |
| R07 | Projects | 项目展示 | 项目名+技术栈+要点 |
| R08 | Certifications | 证书列表 | 证书名+颁发机构+日期 |
| R09 | Languages | 语言能力 | 语言+熟练度条 |
| R10 | Volunteer | 志愿服务 | 组织+角色+日期+要点 |
| R11 | Publications | 出版物 | 标题+发表处+日期 |
| R12 | Closing | 结尾/参考人 | "References available upon request" 或参考人信息 |

**规则：**
- 正文页必须从这 12 个中选择，不得发明 `R13` 等
- 每个版式的 HTML 结构必须严格保留类名和嵌套顺序

---

## 主题系统

### Theme A: Conservative (默认)
- **主色**：墨水黑 `#0a0a0b`
- **背景**：暖米白 `#f1efea`
- **强调色**：无（仅黑白灰）
- **字体**：英 `Georgia` / 中 `Noto Serif SC`（保守、易读）
- **适用场景**：金融、法律、政府、传统行业

### Theme B: Modern
- **主色**：深蓝 `#0a1f3d`
- **背景**：瓷白 `#f1f3f5`
- **强调色**：克莱因蓝 `#002FA7`
- **字体**：英 `IBM Plex Sans` / 中 `Noto Sans SC`（清晰、科技感）
- **适用场景**：科技、创业、设计、创意行业

**切换方式：** 在 `template.html` 的 `:root` 整体替换 `--ink`、`--ink-rgb`、`--paper`、`--paper-rgb`、`--accent`、`--accent-rgb`

---

## 文件结构

```
resume-html-skill/
├── SKILL.md              # Agent skill 定义
├── README.md             # 用户文档（中英）
├── DESIGN.md             # 本文件（设计系统）
├── LICENSE               # MIT
├── assets/
│   ├── templates/
│   │   ├── template-conservative.html   # 保守主题骨架
│   │   ├── template-modern.html         # 现代主题骨架
│   │   └── templates.js                 # 片段库（12个版式HTML片段）
│   ├── themes/
│   │   ├── conservative.css
│   │   └── modern.css
│   └── screenshot-backgrounds/           # 截图背景（如有）
├── references/
│   ├── checklist.md       # P0/P1 质量清单
│   ├── ats-rules.md       # ATS 详细规则（本文件精华）
│   └── section-order.md   # 标准 section 顺序建议
└── scripts/
    ├── validate-resume.mjs # 校验脚本
    └── test-samples/       # 测试用例（真实简历+失败的常见模式）
```

---

## 工作流（Agent Interaction）

1. **触发**：用户说"帮我做一份 ATS 友好的简历"或"生成单文件 HTML 简历"
2. **澄清**：
   - 目标行业（决定主题）
   - 工作年限（决定 section 优先级）
   - 是否需要打印优化（PDF 样式）
3. **拷贝模板**：根据主题选 `template-conservative.html` 或 `template-modern.html`
4. **填充内容**：
   - 先读用户提供的现有简历（Markdown/JSON）
   - 按标准 section 顺序，从 `templates.js` 选对应版式
   - 填入内容，保留类名不变
5. **自检**：运行 `validate-resume.mjs`，所有 P0 必须通过
6. **预览**：浏览器打开，检查换页/打印样式
7. **迭代**：用户可要求调整字体大小、间距等 inline style

---

## 质量门槛

### P0 (Showstopper)
- ❌ 存在 `<table>` 标签
- ❌ 存在 `contenteditable` 或 `textarea`
- ❌ SVG 包含 `<text>`
- ❌ Emoji 出现在正文
- ❌ 双列布局（column-count > 1）
- ❌ 非标准 section 标题（如 "My Journey"）

### P1 (Warning)
- ⚠️ 日期格式不统一
- ⚠️ 字体大小 < 10pt
- ⚠️ 对比度 < 4.5:1
- ⚠️ 超过 2 级标题嵌套

---

## 技术栈

- **HTML5**: 语义化标签，`section` 分页
- **CSS**: 变量系统，Flexbox 布局，打印媒体查询
- **JS (optional)**: 动态主题切换、生成 PDF（browser print）
- **Validation**: Node.js script using `jsdom` or regex-based parsing

---

## 下一步 (Day 2)

1. 实现 `template-conservative.html`（基础骨架 + 样式）
2. 实现 `templates.js`（12 个版式的 HTML 字符串）
3. 编写 `validate-resume.mjs`（P0/P1 规则）
4. 创建 `SKILL.md`（参考 guizang-ppt-skill 格式）
5. 测试：用 3-5 份真实简历生成，验证 ATS 解析（Workday demo）

---

## 参考来源

- ResumeOptimizerPro: How Resume Parsers Actually Work (五阶段 pipeline)
- Jobshinobi: Workday ATS Optimization Guide
- IEEE 2023: Parser accuracy benchmarks (87% vs 96% human)
- rendercv: YAML→PDF 排版理念（版式锁定+主题预设）
- guizang-ppt-skill: 22 版式锁定 + validate-swiss-deck.mjs 模式
