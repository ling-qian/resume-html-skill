#!/usr/bin/env node
// Quick test to generate a resume using templates

const { readFileSync, writeFileSync, mkdirSync } = require('node:fs');
const path = require('node:path');
const templates = require('./assets/templates/templates.js');

// Data extracted from Ling Qian's resume (example)
const baseData = {
  name: "零骞",
  title: "AI研发工程师",
  email: "296928959@qq.com",
  phone: "13524346412",
  location: "深圳",
  linkedin: "",
  github: "https://ling-qian.github.io/",
  summary: "在互联网行业工作多年，擅长移动互联网（iOS/Android）和传统PC应用的产品界面规划设计。熟悉移动Web技术标准与前端开发，与各平台开发团队配合顺畅。逻辑分析能力强，善于沟通协调，负责公司内部跨部门协调工作。作为AI产品基础设施方，负责Smart Report等LLM产品基础设施，参与identity、持久化记忆、反馈与Replay、领域Agent、可视化与UI的设计与落地，熟悉在Databricks/S3上搭建AI产品后端与数据支撑能力。",
  skills: [
    "Jira", "Confluence", "Figma", "SQL", "Amplitude", "Mixpanel",
    "Python", "Databricks", "Spark", "AWS S3", "LLM APIs", "RAG", "Machine Learning",
    "HTML5", "CSS3", "JavaScript", "jQuery", "Vue.js", "Node.js",
    "Git", "Photoshop", "Axure", "Visio", "PowerPoint", "Dreamweaver"
  ]
};

const exp1 = {
  company: "深圳市天巡科技有限公司",
  position: "AI研发工程师",
  startDate: "2021.10",
  endDate: "Present",
  bullets: [
    "智能报告MVP从0到1落地：针对商业团队手动准备季度复盘（QBR）报告耗时费力的痛点，主导产品定义。通过深度访谈抽象分析框架，设计并验证核心LLM提示方案，成功推出MVP，将分析师准备基础材料的时间平均减少60%+，成为团队标准工具。",
    "构建个性化与进化的产品体系：为提升用户体验与产品自适应能力，规划并主导构建三大基础模块：统一身份层（实现用户意图）、持久化记忆系统（支持复杂会话中断续聊）、数据反馈闭环（采集-分析-调优）。该体系使核心用户留存率提升25%，并直接驱动了多个智能体的体验优化。",
    "垂直领域智能体产品化：负责“缺失展示量分析”等智能体从0到1创新。将原有繁琐的多步数据分析流程，抽象设计为单次自然语言交互产品，并定义安全调用协议。上线后，单次分析任务耗时从15分钟降至2分钟，三个月内70%的活跃分析师采用。",
    "提升AI可信度与用户体验：为消除“黑盒”疑虑并统一输出标准，主导开发“详情天图”功能以增强推理过程透明度，使相关客服咨询量下降50%。同时，制定《可视化与故事指南》并推动落地，使报告“易读性”用户评分提升40%。"
  ]
};

const exp2 = {
  company: "深圳携程网络技术有限公司",
  position: "互联网产品经理",
  startDate: "2015.06",
  endDate: "2021.09",
  bullets: [
    "负责用户需求、产品原型设计和PRD文档编写，收集来自客服、市场及运营的需求，参与需求分析、原型设计、产品开发、演示讲解、上线支持等活动。撰写详细的产品需求文档（PRD）及用Axure设计原型，跟踪产品研发进度，基于用户体验设计方法完成新产品/功能的概念设计和原型展示。",
    "负责市场及竞争对手分析，收集整理竞品信息，产出竞品分析文档，监控竞争对手动态并提出对策。",
    "负责产品整体运营跟踪，监管产品市场运作，持续优化产品业绩，制定并执行产品运营计划。",
    "负责部门协调，协同其他部门制定产品运营计划，全程跟踪运营工作，监控分析产品数据，指导产品迭代和策略调整。"
  ]
};

const expData = {
  company1: exp1.company,
  position1: exp1.position,
  startDate1: exp1.startDate,
  endDate1: exp1.endDate,
  bullets1: exp1.bullets,
  company2: exp2.company,
  position2: exp2.position,
  startDate2: exp2.startDate,
  endDate2: exp2.endDate,
  bullets2: exp2.bullets
};

const educations = [
  {
    university: "上海交通大学继续教育学院",
    degree: "本科",
    field: "工商管理",
    gradDate: "2017.01"
  },
  {
    university: "上海科学技术职业学院",
    degree: "大专",
    field: "计算机科学与技术",
    gradDate: "2011.07"
  }
];

const projects = [
  {
    projectName: "Airbnb Online & APP 产品研究分析",
    techStack: "思维脑图, Visio, Axure",
    projectBullets: [
      "运用思维脑图软件分析产品功能模块，梳理业务流程",
      "使用Visio绘制产品流程图，使用Axure输出产品分析报告",
      "产出的竞品分析报告为后续版本改善提供了重要参考"
    ]
  },
  {
    projectName: "购物商场项目",
    techStack: "HTML5, CSS3, JavaScript",
    projectBullets: [
      "负责商城首页及内部页面的前端开发，采用响应式布局",
      "实现商品展示、购物车、用户交互等核心功能",
      "优化页面加载速度，提升用户体验"
    ]
  },
  {
    projectName: "登录注册项目",
    techStack: "HTML5, CSS3, AJAX",
    projectBullets: [
      "设计并实现用户登录、注册流程，包括表单验证、错误提示",
      "与后端API对接，实现安全的用户认证机制",
      "兼容主流浏览器，确保良好的可访问性"
    ]
  }
];

const certifications = [
  {
    certName: "Database Level 3",
    issuer: "China",
    certDate: "10/2010"
  },
  {
    certName: "Shanghai Computer Level 2 (Java)",
    issuer: "Shanghai",
    certDate: "10/2010"
  }
];

const languages = ["Cantonese (Proficient)", "Mandarin (Proficient)", "English (Good)"];

// Build slides
const slides = [
  templates.R01(baseData),
  templates.R02(baseData),
  templates.R03(baseData),
  templates.R05(expData)
];

// Education slides
educations.forEach(edu => slides.push(templates.R06(edu)));

// Project slides
projects.forEach(proj => slides.push(templates.R07(proj)));

// Certification slides
certifications.forEach(cert => slides.push(templates.R08(cert)));

// Language slide
slides.push(templates.R09({ languages }));

// Closing slide
slides.push(templates.R12({}));

// Use conservative template
const templatePath = path.join(__dirname, 'assets/templates/template-conservative.html');
const template = readFileSync(templatePath, 'utf8');
const outputHtml = template.replace('<div id="deck"></div>', `<div id="deck">\n${slides.join('\n')}\n</div>`);

// Write output
const outputDir = path.join(__dirname, 'output');
mkdirSync(outputDir, { recursive: true });
const outputPath = path.join(outputDir, 'test.html');
writeFileSync(outputPath, outputHtml, 'utf8');

console.log(`✅ Generated test resume: ${outputPath}`);
console.log('Validating...');
const { execSync } = require('child_process');
try {
  execSync('node scripts/validate-resume.mjs output/test.html', { stdio: 'inherit' });
} catch (e) {
  console.error('Validation failed');
  process.exit(1);
}
console.log('All done!');
