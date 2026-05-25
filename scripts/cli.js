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

program.parse();
