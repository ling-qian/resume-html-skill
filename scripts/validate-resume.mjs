#!/usr/bin/env node
/**
 * Resume HTML Validation Script
 * Checks for ATS safety and layout compliance
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = new URL('.', import.meta.url).pathname;

const file = process.argv[2];

if (!file) {
  console.error('Usage: node validate-resume.mjs <index.html>');
  process.exit(2);
}

const html = readFileSync(file, 'utf8');
const errors = [];
const warnings = [];

// Allowed layouts
const allowedLayouts = new Set([
  'R01', 'R02', 'R03', 'R04', 'R05', 'R06',
  'R07', 'R08', 'R09', 'R10', 'R11', 'R12'
]);

// Extract all <section class="slide"...> elements
const slideRe = /<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>[\s\S]*?<\/section>/g;
const slides = [...html.matchAll(slideRe)].map(m => ({
  idx: m.index,
  html: m[0],
  layout: (m[0].match(/\bdata-layout="([^"]+)"/) || [])[1]
}));

// Overall checks
if (!slides.length) {
  errors.push('No <section class="slide"> pages found.');
}

// P0 - Showstopper checks (per slide)
slides.forEach((slide, i) => {
  const slideNum = i + 1;
  const content = slide.html;

  // Layout must be registered
  if (!slide.layout) {
    errors.push(`Slide ${slideNum}: missing data-layout attribute.`);
  } else if (!allowedLayouts.has(slide.layout)) {
    errors.push(`Slide ${slideNum}: data-layout="${slide.layout}" is not registered (allowed: R01-R12).`);
  }

  // Forbidden elements
  if (/<table\b/i.test(content)) {
    errors.push(`Slide ${slideNum}: contains <table> element (forbidden for ATS).`);
  }

  if (/<textarea\b/i.test(content) || /contenteditable/i.test(content)) {
    errors.push(`Slide ${slideNum}: contains textarea or contenteditable (forbidden).`);
  }

  // SVG with text
  if (/<svg[\s\S]*?<text\b/i.test(content)) {
    errors.push(`Slide ${slideNum}: SVG contains <text> elements (forbidden).`);
  }

  // Emoji detection (basic range: U+1F300-U+1FAFF)
  if (/[\u{1F300}-\u{1FAFF}]/u.test(content)) {
    errors.push(`Slide ${slideNum}: contains emoji/unicode symbols (forbidden).`);
  }

  // Multi-column layout (CSS)
  if (/column-count:\s*(2|3|4|5)/i.test(content)) {
    errors.push(`Slide ${slideNum}: multi-column layout detected (forbidden).`);
  }

  // Background image behind text (simple check)
  if (/background(?:-image)?:\s*url\(/i.test(content) && /position:\s*(absolute|relative)/i.test(content)) {
    warnings.push(`Slide ${slideNum}: background image may interfere with text extraction.`);
  }

  // Section heading validation (R02-R12 should have matching heading)
  const layout = slide.layout;
  if (['R02','R03','R04','R05','R06','R07','R08','R09','R10','R11','R12'].includes(layout)) {
    const expectedTitle = {
      'R02': 'Professional Summary',
      'R03': 'Key Skills',
      'R04': 'Work Experience',
      'R05': 'Work Experience',
      'R06': 'Education',
      'R07': 'Projects',
      'R08': 'Certifications',
      'R09': 'Languages',
      'R10': 'Volunteer Experience',
      'R11': 'Publications',
      'R12': 'References'
    }[layout];

    if (!new RegExp(`<h2[^>]*>\\s*${expectedTitle}\\s*</h2>`, 'i').test(content)) {
      warnings.push(`Slide ${slideNum}: expected heading "${expectedTitle}" for layout ${layout}.`);
    }
  }
});

// P1 - Warnings (heuristic checks)

// Check for date format consistency (very simple heuristic)
const datePatterns = [
  /(?:0[1-9]|1[0-2])\/\d{4}/g,  // MM/YYYY
  /(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}/gi // Month YYYY
];
let hasValidDate = false;
html.replace(/\b(?:\d{1,2}[-\/]\d{4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})\b/gi, (m) => {
  if (/^\d{1,2}\/\d{4}$/.test(m) || /^(?:January|February|March|April|May|June|July|August|September|October|November|December)$/i.test(m.split(' ')[0])) {
    hasValidDate = true;
  }
  return m;
});
if (!hasValidDate && slides.length > 0) {
  warnings.push('No standard date format (MM/YYYY or Month YYYY) detected.');
}

// Font size check (very rough by measuring style attribute or CSS classes)
const smallFontRegex = /font-size:\s*(9|10|11)pt|font-size:\s*(9|10|11)px/gi;
if (smallFontRegex.test(html)) {
  warnings.push('Some text may be smaller than 12px (10pt). Ensure readability.');
}

// Print section count
console.log(`✓ Parsed ${slides.length} slide(s)`);

// Report errors/warnings
if (errors.length > 0) {
  console.error('\n❌ ERRORS:');
  errors.forEach(e => console.error(`  - ${e}`));
}

if (warnings.length > 0) {
  console.warn('\n⚠️  WARNINGS:');
  warnings.forEach(w => console.warn(`  - ${w}`));
}

if (errors.length === 0) {
  console.log('\n✅ Validation passed (no P0 errors)');
  if (warnings.length > 0) {
    console.log(`   with ${warnings.length} warning(s) to review`);
  }
  process.exit(0);
} else {
  console.error(`\n⛔ Validation failed: ${errors.length} error(s)`);
  process.exit(1);
}
