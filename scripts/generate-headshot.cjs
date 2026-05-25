#!/usr/bin/env node
/**
 * generate-headshot.mjs - 职业照生成（Phase 3）
 *
 * 对接 OpenAI DALL-E API，根据主题自动生成专业头照
 *
 * 用法:
 *   node generate-headshot.mjs --prompt "..." --output ./headshot.png --theme modern
 *
 * 环境变量:
 *   OPENAI_API_KEY - OpenAI API Key (必填)
 */

const { OpenAI } = require('openai');
const fsPromises = require('fs').promises;

const THEMES = {
  conservative: { accent: '#0a0a0b' },
  modern: { accent: '#002FA7' },
  swiss: { accent: '#FF3B30' },
  editorial: { accent: '#C41E3A' }
};

function generateHeadshotPrompt(userDescription = '', theme = 'modern') {
  const base = 'professional high-quality headshot, studio lighting, sharp focus, neutral background, 8k, photorealistic';
  const themeMoods = {
    conservative: 'formal business attire, conservative suit, traditional, serious expression',
    modern: 'modern business casual, confident smile, contemporary, approachable',
    swiss: 'clean lines, bold colors, international style portrait, minimal',
    editorial: 'artistic, magazine style, dramatic lighting, elegant'
  };
  const mood = themeMoods[theme] || themeMoods.modern;
  const desc = userDescription ? `, ${userDescription}` : '';
  return `${base}, ${mood}${desc}`;
}

async function generateHeadshot(options = {}) {
  const { prompt, output = './headshot.png', theme = 'modern', apiKey, model = 'dall-e-3', size = '1024x1024' } = options;

  const key = apiKey || process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error('Missing OPENAI_API_KEY');
  }

  const fullPrompt = prompt || generateHeadshotPrompt('software engineer', theme);
  console.log('🎨 Prompt:', fullPrompt);
  console.log('🎨 使用模型:', model);

  const openai = new OpenAI({ apiKey: key });
  console.log('⏳ 正在生成...');

  const response = await openai.images.generate({
    model,
    prompt: fullPrompt,
    n: 1,
    size,
    response_format: 'b64_json'
  });

  const b64 = response.data[0].b64_json;
  const buffer = Buffer.from(b64, 'base64');
  await fsPromises.writeFile(output, buffer);
  console.log(`✅ 已保存: ${output} (${buffer.length} bytes)`);
  return buffer;
}

// CLI 参数解析（直接运行时）
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2).replace(/^-/, '');
      const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : 'true';
      opts[key] = val === 'true' ? true : val;
    }
  }
  return opts;
}

// 作为脚本直接运行
if (require.main === module) {
  generateHeadshot(parseArgs()).catch(err => {
    console.error('❌ 生成失败:', err.message);
    process.exit(1);
  });
}

// 导出供 CLI 使用
module.exports = { generateHeadshot, generateHeadshotPrompt };
