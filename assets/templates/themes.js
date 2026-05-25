// themes.js - 预设主题定义（禁止自定义 hex）
// 使用方式: document.documentElement.setAttribute('data-theme', 'modern');

const THEMES = {
  // 保守主题 - Classic Ink on Paper
  conservative: {
    '--ink': '#0a0a0b',
    '--ink-rgb': '10, 10, 11',
    '--paper': '#f1efea',
    '--paper-rgb': '241, 239, 234',
    '--accent': '#0a0a0b',
    '--accent-rgb': '10, 10, 11',
    '--font-body': 'var(--font-serif-en)',
    '--spacing-padding': '6vh 6vw',
    '--name-size': '4.6vw',
    '--section-title-size': '2rem',
    '--border-width': '2px'
  },

  // 现代主题 - Deep Blue with Klein Blue
  modern: {
    '--ink': '#0a1f3d',
    '--ink-rgb': '10, 31, 61',
    '--paper': '#f1f3f5',
    '--paper-rgb': '241, 243, 245',
    '--accent': '#002FA7',
    '--accent-rgb': '0, 47, 167',
    '--font-body': 'var(--font-sans-en)',
    '--spacing-padding': '2vh 2.5vw',
    '--name-size': '2.5rem',
    '--section-title-size': '1.2rem',
    '--border-width': '2px'
  },

  // Swiss Minimal - 新增
  // 瑞士国际主义风格：网格、无衬线、不对称、数学秩序感
  swiss: {
    '--ink': '#000000',
    '--ink-rgb': '0, 0, 0',
    '--paper': '#FFFFFF',
    '--paper-rgb': '255, 255, 255',
    '--accent': '#FF3B30', // International Orange (瑞士铁路红)
    '--accent-rgb': '255, 59, 48',
    '--font-body': 'var(--font-sans-en)',
    '--spacing-padding': '4vh 4vw',
    '--name-size': '3rem',
    '--section-title-size': '1.5rem',
    '--border-width': '3px',
    '--border-radius': '0' // 直角，无圆角
  },

  // Editorial - 新增
  // 杂志社论风格：衬线体、暖纸张、古典对比
  editorial: {
    '--ink': '#2D2D2D',
    '--ink-rgb': '45, 45, 45',
    '--paper': '#F5F5F0',
    '--paper-rgb': '245, 245, 240',
    '--accent': '#C41E3A', // Cardinal red
    '--accent-rgb': '196, 30, 58',
    '--font-body': 'var(--font-serif-en)',
    '--spacing-padding': '5vh 5vw',
    '--name-size': '3.5rem',
    '--section-title-size': '2.2rem',
    '--border-width': '1px',
    '--border-radius': '0'
  }
};

// 自动应用主题：从 localStorage 或 data-theme 属性检测
function applyTheme(themeName) {
  const theme = THEMES[themeName] || THEMES.conservative;
  const root = document.documentElement;

  // 设置 data-theme 属性（可用于 CSS 条件规则）
  root.setAttribute('data-theme', themeName);

  // 应用所有 CSS 变量
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  console.log(`Theme "${themeName}" applied.`);
}

// 检测并自动应用主题
(function initTheme() {
  const html = document.documentElement;

  // 优先级：URL 参数 > localStorage > data-default-theme > conservative
  const urlParams = new URLSearchParams(window.location.search);
  const themeParam = urlParams.get('theme');
  const savedTheme = localStorage.getItem('resume-theme');
  const defaultTheme = html.getAttribute('data-default-theme') || 'conservative';

  const themeToApply = themeParam || savedTheme || defaultTheme;

  // 检查主题是否有效
  if (!THEMES[themeToApply]) {
    console.warn(`Unknown theme "${themeToApply}", falling back to "${defaultTheme}".`);
    applyTheme(defaultTheme);
  } else {
    applyTheme(themeToApply);
  }
})();

// 手动切换主题（供 UI 控件使用）
function setTheme(themeName) {
  if (!THEMES[themeName]) {
    console.error(`Theme "${themeName}" not found. Available: ${Object.keys(THEMES).join(', ')}`);
    return;
  }
  localStorage.setItem('resume-theme', themeName);
  applyTheme(themeName);
  console.log(`Theme switched to "${themeName}". Refresh to persist.`);
}

// 暴露到全局（可选）
if (typeof window !== 'undefined') {
  window.ResumeThemes = { THEMES, applyTheme, setTheme };
}

// 导出供生成器使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { THEMES, applyTheme };
}
