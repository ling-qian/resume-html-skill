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
| **版式锁定** | 12 个标准 section（R01-R12），防止自由发挥导致解析失败 |
| **双主题** | 保守（金融/法律）+ 现代（科技/设计），一键切换 |
| **自动校验** | `validate-resume.mjs` 拦截 P0 错误，确保交付质量 |
| **单文件交付** | 无依赖，浏览器直接打开，支持打印为 PDF |
| **Agent 友好** | HTML 纯文本，Agent 可直接读写、修改、验证 |

---

## 📐 12 个版式

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

**规则：** 正文页必须从这 12 个版式选择，不得发明新结构。

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
- ❌ 未注册版式（非 R01-R12）

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
```

---

## 📂 项目结构

```
resume-html-skill/
├── SKILL.md
├── README.md
├── DESIGN.md
├── LICENSE
├── assets/
│   └── templates/
│       ├── template-conservative.html
│       ├── template-modern.html
│       └── templates.js          # 12版式片段库
├── references/
│   ├── checklist.md              # P0/P1质量清单
│   └── ats-rules.md              # ATS解析规则详解
└── scripts/
    └── validate-resume.mjs       # 自动校验脚本
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
