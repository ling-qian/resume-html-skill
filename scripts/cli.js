#!/usr/bin/env node
const { Command } = require('commander');
const { generateCovers } = require('./generate-covers.cjs');
const { frameScreenshots } = require('./frame-screenshots.cjs');
const { generateHeadshot } = require('./generate-headshot.cjs');

const program = new Command();

program
  .name('resume-html-skill')
  .description('Resume HTML skill with themes, image generation, and framing')
  .version('1.3.0');

program
  .command('covers')
  .description('Generate multi-platform cover images')
  .requiredOption('-i, --input <file>', 'Resume data JSON file')
  .option('-o, --output <dir>', 'Output directory', './covers')
  .option('-t, --theme <theme>', 'Theme (conservative|modern|swiss|editorial)', 'modern')
  .option('-p, --platforms <list>', 'Comma-separated platforms', 'linkedin,wechat,xiaohongshu,twitter,youtube')
  .action(async (options) => {
    await generateCovers(options);
  });

program
  .command('frame')
  .description('Frame screenshots with theme-accented borders')
  .requiredOption('-i, --input <dir>', 'Input directory with raw screenshots')
  .requiredOption('-o, --output <dir>', 'Output directory for framed images')
  .option('-t, --theme <theme>', 'Theme for accent color', 'modern')
  .option('-s, --style <style>', 'Frame style (macos|minimal|brutalist)', 'macos')
  .option('-w, --width <px>', 'Target width', '800')
  .action(async (options) => {
    await frameScreenshots(options);
  });

program
  .command('headshot')
  .description('Generate professional headshot from description')
  .option('--prompt <text>', 'Headshot description (default: professional IT person)')
  .option('-o, --output <file>', 'Output file path', './headshot.png')
  .option('-t, --theme <theme>', 'Theme for color palette', 'modern')
  .action(async (options) => {
    await generateHeadshot(options);
  });


// 多功能图像生成命令
    program
      .command('images')
      .description('Generate various images for resume (headshot, cover, framed)')
      .option('--type <type>', 'Image type: headshot, cover, framed', 'headshot')
      .option('--input <file>', 'Input file for cover or prompt for headshot')
      .option('--output <file|dir>', 'Output path', './generated')
      .option('--theme <theme>', 'Theme for styling', 'modern')
      .option('--platforms <list>', 'For cover type: comma-separated platforms')
      .option('--style <style>', 'For framed type: macos|minimal|brutalist', 'macos')
      .option('--width <px>', 'For framed: target width', '800')
      .action(async (options) => {
        const { type } = options;
        if (type === 'headshot') {
          const { generateHeadshot } = require('./generate-headshot.cjs');
          await generateHeadshot({
            prompt: options.input,
            output: options.output,
            theme: options.theme
          });
        } else if (type === 'cover') {
          const coversMod = require('./generate-covers.cjs');
          await coversMod.runGenerate({
            input: options.input,
            output: options.output,
            theme: options.theme,
            platforms: options.platforms ? options.platforms.split(',') : Object.keys(coversMod.PLATFORMS)
          });
        } else if (type === 'framed') {
          const { frameScreenshots } = require('./frame-screenshots.cjs');
          await frameScreenshots({
            input: options.input,
            output: options.output,
            theme: options.theme,
            style: options.style || 'macos',
            width: parseInt(options.width || '800')
          });
        } else {
          console.error('❌ Unknown image type:', type);
          process.exit(1);
        }
      });

  });

program.parse();
