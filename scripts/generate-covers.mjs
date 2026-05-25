#!/usr/bin/env node

/**
 * generate-covers.mjs - 多平台封面图生成
 *
 * 从简历数据生成社交媒体封面（LinkedIn, 公众号, 小红书, Twitter 等）
 *
 * 用法：
 *   node generate-covers.mjs --input data.json --theme modern --output covers/
 *
 * 数据格式（JSON）:
 * {
 *   "name": "张三",
 *   "title": "Senior Frontend Engineer",
 *   "tagline": "Building user-centric products with React & TypeScript",
 *   "theme": "modern" // 主题: conservative | modern | swiss | editorial
 * }
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage, registerFont } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 平台尺寸配置
const PLATFORMS = {
  linkedin: {
    name: 'LinkedIn 个人主页封面',
    width: 1584,
    height: 396,
    ratio: '8:1'
  },
  wechat: {
    name: '微信公众号头图',
    width: 900,
    height: 383,
    ratio: '21:9'
  },
  xiaohongshu: {
    name: '小红书封面',
    width: 1125,
    height: 1500,
    ratio: '3:4'
  },
  twitter: {
    name: 'Twitter/X 头图',
    width: 1500,
    height: 500,
    ratio: '3:1'
  },
  youtube: {
    name: 'YouTube 频道 banner',
    width: 2560,
    height: 1440,
    ratio: '16:9'
  }
};

// 主题配色（与 themes.js 同步）
const THEMES = {
  conservative: {
    bg: '#f1efea',
    ink: '#0a0a0b',
    accent: '#0a0a0b'
  },
  modern: {
    bg: '#f1f3f5',
    ink: '#0a1f3d',
    accent: '#002FA7'
  },
  swiss: {
    bg: '#FFFFFF',
    ink: '#000000',
    accent: '#FF3B30'
  },
  editorial: {
    bg: '#F5F5F0',
    ink: '#2D2D2D',
    accent: '#C41E3A'
  }
};

// 字体映射（使用系统字体，或嵌入 webfont）
const FONTS = {
  sans: {
    conservative: 'Georgia',
    modern: 'IBM Plex Sans, Arial',
    swiss: 'Inter, Arial',
    editorial: 'Cormorant Garamond, Georgia'
  },
  mono: 'IBM Plex Mono, Menlo, monospace'
};

async function generateCover(data, platform, themeName = 'modern') {
  const config = PLATFORMS[platform];
  const theme = THEMES[themeName] || THEMES.modern;

  const canvas = createCanvas(config.width, config.height);
  const ctx = canvas.getContext('2d');

  // 1. 背景
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, config.width, config.height);

  // 2. 可选：添加微妙的纹理或渐变
  if (themeName === 'editorial') {
    // 添加纸张纹理噪点
    for (let i = 0; i < 5000; i++) {
      ctx.fillStyle = `rgba(45,45,45,0.03)`;
      ctx.fillRect(Math.random() * config.width, Math.random() * config.height, 1, 1);
    }
  }

  // 3. 布局：根据平台比例调整
  const paddingX = config.width * 0.08;
  const paddingY = config.height * 0.15;
  const contentWidth = config.width - 2 * paddingX;

  ctx.fillStyle = theme.ink;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // 4. 姓名 (大)
  const fontSizeName = config.height * 0.18;
  ctx.font = `bold ${fontSizeName}px ${FONTS.sans[themeName]}`;
  ctx.fillStyle = theme.ink;
  const nameY = paddingY;
  const nameLines = wrapText(ctx, data.name || 'Your Name', contentWidth);
  nameLines.forEach((line, i) => {
    ctx.fillText(line, paddingX, nameY + i * fontSizeName * 1.2);
  });

  // 5. 职位
  const fontSizeTitle = config.height * 0.055;
  ctx.font = `${fontSizeTitle}px ${FONTS.sans[themeName]}`;
  ctx.fillStyle = themeName === 'swiss' ? theme.accent : theme.ink;
  ctx.fillText(data.title || 'Professional Title', paddingX, nameY + nameLines.length * fontSizeName * 1.2 + fontSizeName * 0.5);

  // 6. tagline / 价值主张 (可选)
  if (data.tagline) {
    const fontSizeTagline = config.height * 0.04;
    ctx.font = `${fontSizeTagline}px ${FONTS.sans[themeName]}`;
    ctx.fillStyle = theme.ink;
    ctx.globalAlpha = 0.75;
    const taglineY = config.height - paddingY - fontSizeTagline * 2;
    const taglineLines = wrapText(ctx, data.tagline, contentWidth);
    taglineLines.forEach((line, i) => {
      ctx.fillText(line, paddingX, taglineY + i * fontSizeTagline * 1.3);
    });
    ctx.globalAlpha = 1.0;
  }

  // 7. 装饰元素 (主题依赖)
  if (themeName === 'swiss') {
    // Swiss: 粗边框线在底部
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(paddingX, config.height - paddingY - 20);
    ctx.lineTo(config.width - paddingX, config.height - paddingY - 20);
    ctx.stroke();
  } else if (themeName === 'editorial') {
    // Editorial: 猩红色引用标记装饰
    ctx.fillStyle = theme.accent;
    ctx.font = 'italic 4rem serif';
    ctx.fillText('"', paddingX, config.height - paddingY - 60);
  } else if (themeName === 'conservative') {
    // Conservative: 顶部细线装饰
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(config.width, 0);
    ctx.stroke();
  }

  // 8. 右下角版权/版本信息（小字）
  const fontSizeMeta = 12;
  ctx.font = `${fontSizeMeta}px ${FONTS.mono}`;
  ctx.fillStyle = theme.ink;
  ctx.globalAlpha = 0.5;
  ctx.textAlign = 'right';
  ctx.fillText(`resume-html-skill · ${themeName}`, config.width - paddingX, config.height - paddingY + 10);
  ctx.globalAlpha = 1.0;

  return canvas.toBuffer('image/png');
}

// 辅助：文本自动换行
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// CLI 入口
async function main() {
  const args = process.argv.slice(2);
  const params = new URLSearchParams();

  args.forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      params.set(key, value);
    }
  });

  const inputPath = params.get('input');
  const outputDir = params.get('output') || './covers';
  const theme = params.get('theme') || 'modern';
  const platforms = params.get('platforms')?.split(',') || Object.keys(PLATFORMS);

  if (!inputPath) {
    console.error('Usage: node generate-covers.mjs --input data.json --output covers/ --theme modern [--platforms linkedin,wechat]');
    process.exit(1);
  }

  try {
    // 读取简历数据
    const raw = await readFile(inputPath, 'utf8');
    const data = JSON.parse(raw);

    // 确保输出目录存在
    await mkdir(outputDir, { recursive: true });

    console.log(`🎨 Generating covers for theme "${theme}"...\n`);

    for (const platform of platforms) {
      if (!PLATFORMS[platform]) {
        console.warn(`⚠️  Unknown platform: ${platform}, skipping.`);
        continue;
      }

      const config = PLATFORMS[platform];
      console.log(`Generating ${platform} (${config.width}×${config.height})...`);

      const buffer = await generateCover(data, platform, theme);
      const outputPath = join(outputDir, `${platform}-${theme}.png`);
      await writeFile(outputPath, buffer);
      console.log(`  ✅ Saved: ${outputPath}`);
    }

    console.log('\n✨ All covers generated successfully!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.code === 'MODULE_NOT_FOUND') {
      console.error('  提示: canvas 库未安装？运行: npm install canvas');
    }
    process.exit(1);
  }
}

main();
