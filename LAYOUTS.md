# Layouts Reference - 18 个版式详解

每个版式对应一个 `<section class="slide" data-layout="Rxx">`

---

## 核心版式 (R01-R12) - ATS 友好

### R01: Header
**骨架**:
```html
<header class="resume-header">
  <h1 class="name">姓名</h1>
  <p class="title">职位头衔</p>
  <div class="contact-info">
    <span class="contact-item">email</span>
    <span class="separator">|</span>
    <span class="contact-item">phone</span>
    <span class="separator">|</span>
    <span class="contact-item">location</span>
  </div>
</header>
```

**规则**:
- `name` 使用 H1，最大字号
- `contact-info` 必须是单行，三项，分隔符使用 `|`
- 不可添加头像（ATS 会错位）

---

### R02: Professional Summary
**骨架**:
```html
<section class="slide" data-layout="R02">
  <h2 class="section-title">Professional Summary</h2>
  <div class="summary-content">
    <p>3-4 行专业摘要，突出核心竞争力和职业定位。</p>
  </div>
</section>
```

**规则**:
- 仅一段 `<p>`，不允许列表
- 长度 3-4 行，每行约 10-15 词

---

### R03: Key Skills
**骨架**:
```html
<section class="slide" data-layout="R03">
  <h2 class="section-title">Key Skills</h2>
  <div class="skills-container">
    <span class="skill-tag">JavaScript</span>
    <span class="skill-tag">React</span>
    ...
  </div>
</section>
```

**规则**:
- 技能标签不超过 12 个
- 单行排列，自动换行
- 无逗号、无括号说明

---

### R04: Work Experience (Single)
**骨架**:
```html
<section class="slide" data-layout="R04">
  <h2 class="section-title">Work Experience</h2>
  <div class="experience-entry">
    <div class="exp-header">
      <span class="company">Company Name</span>
      <span class="date">01/2020 - Present</span>
    </div>
    <p class="position">Job Title</p>
    <ul class="bullets">
      <li>成就要点 1 (STAR 原则)</li>
      <li>成就要点 2</li>
    </ul>
  </div>
</section>
```

**规则**:
- `company` 使用加粗，`date` 右对齐
- bullet points 使用 `▸` 符号（保守）或 `—`（现代）
- 每段经历 3-5 个要点

---

### R05: Work Experience (Dual)
**骨架**:
```html
<section class="slide" data-layout="R05">
  <h2 class="section-title">Work Experience</h2>
  <div class="dual-experience">
    <!-- 左列 -->
    <div class="experience-entry">...</div>
    <!-- 右列 -->
    <div class="experience-entry">...</div>
  </div>
</section>
```

**规则**:
- 仅用于打印压缩版式
- 两列高度可不同，ATS 能读
- 每列最多 2 段经历

---

### R06: Education
**骨架**:
```html
<section class="slide" data-layout="R06">
  <h2 class="section-title">Education</h2>
  <div class="education-entry">
    <div class="edu-header">
      <span class="institution">University Name</span>
      <span class="date">09/2016 - 05/2020</span>
    </div>
    <p class="degree">Bachelor of Science in Computer Science</p>
    <p class="gpa">GPA: 3.8/4.0</p>
  </div>
</section>
```

---

### R07: Projects
**骨架**:
```html
<section class="slide" data-layout="R07">
  <h2 class="section-title">Projects</h2>
  <div class="project-entry">
    <h3 class="project-title">项目名称</h3>
    <p class="tech-stack">React, Node.js, PostgreSQL</p>
    <p>项目描述，突出你的角色和技术细节。</p>
  </div>
</section>
```

---

### R08: Certifications
**骨架**:
```html
<section class="slide" data-layout="R08">
  <h2 class="section-title">Certifications</h2>
  <ul class="cert-list">
    <li>
      AWS Certified Solutions Architect
      <span class="cert-date">2023</span>
      <span class="cert-issuer">Amazon Web Services</span>
    </li>
  </ul>
</section>
```

---

### R09: Languages
**骨架**:
```html
<section class="slide" data-layout="R09">
  <h2 class="section-title">Languages</h2>
  <div class="language-list">
    <div class="language-item">
      <span class="lang-name">English</span>
      <div class="proficiency-bar"><div class="fill" style="width: 95%"></div></div>
      <span class="proficiency-level">C2</span>
    </div>
  </div>
</section>
```

---

### R10: Volunteer
**骨架**: 类似 Work Experience，使用 `organization`, `role`, 要点

---

### R11: Publications
**骨架**: 类似 Projects，使用 `pub-title`, `pub-venue`, `pub-date`

---

### R12: Closing
**骨架**:
```html
<section class="slide" data-layout="R12">
  <div class="closing-content">
    <h2>References</h2>
    <p>Available upon request.</p>
  </div>
</section>
```

---

## 演示版式 (R13-R18) - Phase 1 新增

这些版式适用于**幻灯片简历**（非严格 ATS 环境）：

### R13: Cover（大字封面）
- 巨大姓名（`3-5rem`）
- 职位置于下方
- tagline 简短价值主张
- 底部联系信息

**不适用于打印简历**（占满整页）

---

### R14: Stats（大数字成就）
- 2×2 网格（4 个关键数字）
- 每个卡片包含 `stat-value` 和 `stat-label`
- 示例：`15+ Years`, `50+ Projects`, `99% Uptime`

**数据来源**：应来自真实工作成就，而非估算

---

### R15: Project Cards（双列项目卡片）
- 网格布局，每张卡片包含标题、技术栈、描述
- 适合：作品集展示、面试幻灯片
- 建议限制 4-6 个项目

**注意**：双列在 ATS 中可能错乱，仅用于演示

---

### R16: Skills Tags（增强标签云）
- 更开放、稀疏的标签布局
- 可以使用边框样式（Swiss）或填充（Modern）

---

### R17: Timeline（职业时间线）
- 垂直时间线，左侧彩色轴线
- 每项包含 `year`, `role`, `company`
- 适合快速展示职业成长路径

---

### R18: Contact（联系方式页）
- 二维码占位（需嵌入图片）
- 姓名、职位重复
- 社交链接列表（LinkedIn, GitHub, Website）

**面试结束页**，便于保存联系方式

---

## 版式使用指南

### 标准顺序（单页简历）
```
R01 (Header)
  ↓
R02 (Summary)
  ↓
R03 (Skills) 或 R04/05 (Experience)
  ↓
R06 (Education) / R07 (Projects)
  ↓
R08-R11 (可选)
  ↓
R12 (Closing)
```

### 演示顺序（6-8 页幻灯片）
```
R13 (Cover)
  ↓
R02 (Summary)
  ↓
R14 (Stats) - 可选
  ↓
R04/R05 (Key Experience)
  ↓
R15 (Projects)
  ↓
R17 (Timeline) - 可选
  ↓
R16 (Skills)
  ↓
R18 (Contact)
```

---

## 主题适配建议

| 版式 | Conservative | Modern | Swiss | Editorial |
|------|--------------|--------|-------|----------|
| R01 | 衬线大标题 | 无衬线精简 | 超大字、不对称 | 衬线、优雅 |
| R14 | 边框卡片 | 圆角浅背景 | 粗黑边框、无圆角 | 细边框、斜体标签 |
| R15 | 宽松行距 | 紧凑卡片 | 直角卡片、粗边框 | 衬线、更宽松 |
| R17 | 圆点圆环 | 方形圆点 | 粗圆圈+白色描边 | 较小圆点、红色 |
| R18 | 居中组 | 居中组 | 对称网格 | 杂志风格 |

---

## 问题排查

**版式不显示？** 检查：
1. `templates.js` 中是否有对应的 `Rxx` 函数
2. `validate-resume.mjs` 白名单包含 `Rxx`
3. HTML 中 `data-layout="Rxx"` 正确拼写
4. 引入 `templates.js` 在 `</body>` 前

**样式丢失？** 检查：
1. 模板文件是否正确引入 `themes.js`
2. CSS 变量是否与主题匹配（Conservative 要用 conservative.html）
3. 浏览器查看是否有 `.cover-container` 等样式被覆盖

---

## 下一步扩展

- **R19**: Quote - 引用块（用于推荐语）
- **R20**: Image-Only - 全屏图上叠加大字
- **R21**: Grid-Profile - 侧边栏个人档案（类似 LinkedIn）
- **R22**: Tech-Stack - 技术栈可视化（进度条或雷达图）

建议在 Phase 3 完成后再评估。
