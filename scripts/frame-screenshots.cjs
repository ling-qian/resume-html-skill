#!/usr/bin/env node
/**
 * frame-screenshots.cjs - 批量截图美化
 *
 * 将原始截图套入主题匹配的边框/背景，生成专业展示图。
 *
 * 用法:
 *   node frame-screenshots.cjs --input tmp/raw --output assets/framed --theme modern --style macos --width 800
 *
 * 依赖: canvas
 */

const { createCanvas, loadImage } = require('canvas');
const path = require('path');

// 主题配色（与 themes.js 同步）
const THEMES = {
  conservative: { accent: '#0a0a0b', paper: '#f1efea', ink: '#0a0a0b' },
  modern: { accent: '#002FA7', paper: '#f1f3f5', ink: '#0a1f3d' },
  swiss: { accent: '#FF3B30', paper: '#FFFFFF', ink: '#000000' },
  editorial: { accent: '#C41E3A', paper: '#F5F5F0', ink: '#2D2D2D' }
};

// 风格配置
const STYLES = {
  macos: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    titleBarHeight: 28,
    titleBarBg: 'rgba(0,0,0,0.04)',
    buttons: [
      { x: 12, color: '#FF5F56' },
      { x: 38, color: '#FFBD2E' },
      { x: 64, color: '#27C93F' }
    ]
  },
  minimal: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
    padding: 8
  },
  brutalist: {
    borderRadius: 0,
    borderWidth: 3,
    borderColor: '#000000',
    padding: 12
  }
};

function parseArgs() {
  const args = process.argv.slice(2);
  const params = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : 'true';
      params[key] = val === 'true' ? true : val;
    }
  }
  return params;
}

function frameScreenshot(inputPath, outputPath, opts) {
  const { theme = 'modern', style = 'macos', width = 800 } = opts;
  const themeColors = THEMES[theme] || THEMES.modern;
  const styleConfig = STYLES[style] || STYLES.macos;

  return loadImage(inputPath).then(img => {
    const aspectRatio = img.height / img.width;
    const height = Math.round(width * aspectRatio);

    const padding = style === 'macos' ? 0 : (styleConfig.padding || 0);
    const titleBarHeight = styleConfig.titleBarHeight || 0;
    const borderWidth = styleConfig.borderWidth || 0;

    const canvasWidth = width + 2 * padding + 2 * borderWidth;
    const canvasHeight = height + 2 * padding + titleBarHeight + 2 * borderWidth;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // 1. 背景（主题 paper 色）
    ctx.fillStyle = themeColors.paper;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 2. 边框
    if (borderWidth > 0) {
      ctx.strokeStyle = style === 'brutalist' ? styleConfig.borderColor : themeColors.accent;
      ctx.lineWidth = borderWidth;
      ctx.strokeRect(
        borderWidth / 2 + padding,
        borderWidth / 2 + padding + titleBarHeight,
        width + borderWidth,
        height + borderWidth
      );
    }

    // 3. 标题栏 (macOS)
    if (titleBarHeight > 0) {
      ctx.fillStyle = styleConfig.titleBarBg;
      ctx.fillRect(borderWidth + padding, borderWidth + padding, width, titleBarHeight);

      const buttons = styleConfig.buttons;
      const buttonY = borderWidth + padding + (titleBarHeight - 8) / 2;
      buttons.forEach(btn => {
        ctx.beginPath();
        ctx.arc(borderWidth + padding + btn.x, buttonY + 4, 4, 0, Math.PI * 2);
        ctx.fillStyle = btn.color;
        ctx.fill();
      });
    }

    // 4. 截图内容
    ctx.drawImage(img, borderWidth + padding, borderWidth + padding + titleBarHeight, width, height);

    // 5. 保存
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Framed: ${outputPath} (${canvasWidth}×${canvasHeight})`);
    return buffer;
  });
}

function frameScreenshots(options = {}) {
  const opts = {
    input: options.input || './tmp/screenshots',
    output: options.output || './assets/framed',
    theme: options.theme || 'modern',
    style: options.style || 'macos',
    width: parseInt(options.width || '800')
  };

  console.log('🎨 frame-screenshots.cjs');
  console.log('📥 输入:', opts.input);
  console.log('📤 输出:', opts.output);
  console.log('🎨 主题:', opts.theme, '| 风格:', opts.style, '| 宽度:', opts.width + 'px\n');

  fs.mkdirSync(opts.output, { recursive: true });

  let files = [];
  const inputStat = fs.statSync(opts.input);
  if (inputStat.isDirectory()) {
    files = fs.readdirSync(opts.input)
      .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .map(f => path.join(opts.input, f));
  } else if (inputStat.isFile()) {
    files = [opts.input];
  } else {
    console.error('❌ 输入路径无效');
    process.exit(1);
  }

  let completed = 0;
  files.forEach(file => {
    try {
      const basename = path.basename(file, path.extname(file));
      const outPath = path.join(opts.output, `${basename}-framed.png`);
      frameScreenshot(file, outPath, opts).catch(err => {
        console.error(`❌ ${file}: ${err.message}`);
      });
    } catch (err) {
      console.error(`❌ 处理失败: ${file}`, err.message);
    }
  });

  console.log(`\n✨ 批量处理完成 (${files.length} 张)`);
}

// Direct execution
if (require.main === module) {
  const args = parseArgs();
  frameScreenshots(args);
}

// Export for CLI
module.exports = { frameScreenshot, frameScreenshots };
