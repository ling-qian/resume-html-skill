#!/usr/bin/env node
/**
 * Example Resume Generator
 * Demonstrates how to generate a valid HTML resume from templates
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = new URL('.', import.meta.url).pathname;
const require = createRequire(import.meta.url);
const templates = require('../assets/templates/templates.js');

// Sample data (in production, this comes from user input)
const candidateData = {
  name: "Zhang San",
  title: "Senior Software Engineer",
  email: "zhangsan@example.com",
  phone: "+86 138 0000 8888",
  location: "Beijing, China",
  linkedin: "linkedin.com/in/zhangsan",
  github: "github.com/zhangsan",

  summary: "Experienced software engineer with 8+ years in full-stack development. " +
    "Proven track record of leading high-performance teams and delivering scalable " +
    "solutions in cloud-native environments. Passionate about developer experience " +
    and open source contributions.",

  skills: [
    "JavaScript", "TypeScript", "Python", "React", "Node.js", "AWS",
    "Kubernetes", "PostgreSQL", "GraphQL", "Docker", "CI/CD", "Git"
  ],

  experiences: [
    {
      company: "Tech Giant Co.",
      position: "Senior Software Engineer",
      startDate: "06/2020",
      endDate: "Present",
      bullets: [
        "Led a team of 6 engineers to migrate legacy monolith to microservices, improving system reliability by 40%.",
        "Architected a real-time data pipeline processing 1M+ events/day using Kafka and Flink.",
        "Mentored junior engineers and established code review standards adopted org-wide."
      ]
    },
    {
      company: "Startup Inc.",
      position: "Software Engineer",
      startDate: "08/2016",
      endDate: "05/2020",
      bullets: [
        "Built the core product from 0 to 1 using React + Node.js, serving 50K+ monthly active users.",
        "Implemented automated testing infrastructure, increasing test coverage from 20% to 85%.",
        "Reduced deployment time from 2 hours to 15 minutes through CI/CD automation."
      ]
    }
  ],

  education: {
    university: "Peking University",
    degree: "Bachelor of Science",
    field: "Computer Science",
    gradDate: "07/2016",
    gpa: "3.8/4.0"
  },

  projects: [
    {
      name: "Open Source CLI Tool",
      techStack: "Go, Cobra, GitHub Actions",
      bullets: [
        "Developed a popular CLI tool with 2K+ GitHub stars, downloaded 50K+ times.",
        "Implemented cross-platform support and automated releases using GitHub Actions."
      ]
    }
  ],

  certifications: [
    {
      name: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      date: "12/2023"
    }
  ],

  languages: [
    "Chinese (Native)",
    "English (Fluent)",
    "Japanese (Intermediate)"
  ],

  volunteer: {
    org: "Code for Good",
    role: "Tech Mentor",
    startDate: "01/2022",
    endDate: "Present",
    bullets: [
      "Mentor high school students in software development for community projects."
    ]
  }
};

// Generate slides based on data
function generateSlides(data) {
  const slides = [];

  // R01 Header
  slides.push(templates.R01({
    name: data.name,
    title: data.title,
    email: data.email,
    phone: data.phone,
    location: data.location,
    linkedin: data.linkedin,
    github: data.github
  }));

  // R02 Summary
  slides.push(templates.R02({ summary: data.summary }));

  // R03 Skills
  slides.push(templates.R03({ skills: data.skills }));

  // R05 Dual Experience (using two most recent)
  slides.push(templates.R05({
    company1: data.experiences[0].company,
    position1: data.experiences[0].position,
    startDate1: data.experiences[0].startDate,
    endDate1: data.experiences[0].endDate,
    bullets1: data.experiences[0].bullets,
    company2: data.experiences[1].company,
    position2: data.experiences[1].position,
    startDate2: data.experiences[1].startDate,
    endDate2: data.experiences[1].endDate,
    bullets2: data.experiences[1].bullets
  }));

  // R06 Education
  slides.push(templates.R06({
    university: data.education.university,
    degree: data.education.degree,
    field: data.education.field,
    gradDate: data.education.gradDate,
    gpa: data.education.gpa
  }));

  // R07 Projects
  slides.push(templates.R07({
    projectName: data.projects[0].name,
    techStack: data.projects[0].techStack,
    projectBullets: data.projects[0].bullets
  }));

  // R08 Certifications
  slides.push(templates.R08({
    certName: data.certifications[0].name,
    issuer: data.certifications[0].issuer,
    certDate: data.certifications[0].date
  }));

  // R09 Languages
  slides.push(templates.R09({ languages: data.languages }));

  // R10 Volunteer
  slides.push(templates.R10({
    org: data.volunteer.org,
    volRole: data.volunteer.role,
    volStartDate: data.volunteer.startDate,
    volEndDate: data.volunteer.endDate,
    bullets: data.volunteer.bullets
  }));

  // R12 Closing
  slides.push(templates.R12({}));

  return slides.join('\n');
}

// Main execution
function main() {
  // Read template
  const templatePath = join(__dirname, '../assets/templates/template-conservative.html');
  const template = readFileSync(templatePath, 'utf8');

  // Insert slides into deck container
  const slidesHtml = generateSlides(candidateData);
  const outputHtml = template.replace('<div id="deck"></div>', `<div id="deck">\n${slidesHtml}\n</div>`);

  // Ensure output directory exists
  const outputDir = join(__dirname, '../output');
  mkdirSync(outputDir, { recursive: true });

  // Write file
  const outputPath = join(outputDir, 'index.html');
  writeFileSync(outputPath, outputHtml, 'utf8');

  console.log(`✅ Example resume generated: ${outputPath}`);
  console.log('   Run validation: npm run validate -- --path output/index.html');
  console.log('   Or: node scripts/validate-resume.mjs output/index.html');
}

main();
