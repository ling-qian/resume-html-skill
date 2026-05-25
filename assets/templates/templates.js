/**
 * Resume HTML Skill - Template Library
 *
 * 12 ATS-safe layout templates
 * Each template exports a function that returns HTML string
 * All templates use semantic HTML, no tables, no multi-column
 */

const templates = {
  // R01: Header - Name, Title, Contact Info
  R01: (data) => `
<section class="slide" data-layout="R01">
  <header class="resume-header">
    <h1 class="name">${data.name || 'Your Name'}</h1>
    <p class="title">${data.title || 'Professional Title'}</p>
    <div class="contact-info">
      <span class="contact-item">${data.email || 'email@example.com'}</span>
      <span class="separator">|</span>
      <span class="contact-item">${data.phone || '+1 234 567 8900'}</span>
      <span class="separator">|</span>
      <span class="contact-item">${data.location || 'City, Country'}</span>
      ${data.linkedin ? `<span class="separator">|</span><span class="contact-item">${data.linkedin}</span>` : ''}
      ${data.github ? `<span class="separator">|</span><span class="contact-item">${data.github}</span>` : ''}
    </div>
  </header>
</section>
`,

  // R02: Professional Summary - 3-4 lines
  R02: (data) => `
<section class="slide" data-layout="R02">
  <h2 class="section-title">Professional Summary</h2>
  <div class="summary-content">
    <p>${data.summary || 'Experienced professional with expertise in relevant technologies and domains. Proven track record of delivering high-impact solutions in collaborative environments. Passionate about continuous learning and innovation.'}</p>
  </div>
</section>
`,

  // R03: Key Skills - Tag cloud style
  R03: (data) => `
<section class="slide" data-layout="R03">
  <h2 class="section-title">Key Skills</h2>
  <div class="skills-container">
    ${(data.skills || ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'TypeScript']).map(skill =>
      `<span class="skill-tag">${skill}</span>`
    ).join('\n    ')}
  </div>
</section>
`,

  // R04: Work Experience - Single entry (full width)
  R04: (data) => `
<section class="slide" data-layout="R04">
  <h2 class="section-title">Work Experience</h2>
  <div class="experience-entry">
    <div class="exp-header">
      <h3 class="company">${data.company || 'Company Name'}</h3>
      <span class="date">${data.startDate || 'MM/YYYY'} - ${data.endDate || 'Present'}</span>
    </div>
    <p class="position">${data.position || 'Job Title'}</p>
    <ul class="bullets">
      ${(data.bullets || [
        'Led development of critical infrastructure, improving system performance by 40%.',
        'Collaborated with cross-functional teams to deliver products on schedule.',
        'Mentored junior engineers and established best practices.'
      ]).map(bullet => `<li>${bullet}</li>`).join('\n      ')}
    </ul>
  </div>
</section>
`,

  // R05: Work Experience - Dual column (two roles side by side)
  R05: (data) => `
<section class="slide" data-layout="R05">
  <h2 class="section-title">Work Experience</h2>
  <div class="dual-experience">
    <div class="exp-column">
      <div class="experience-entry">
        <div class="exp-header">
          <h3 class="company">${data.company1 || 'Company A'}</h3>
          <span class="date">${data.startDate1 || 'MM/YYYY'} - ${data.endDate1 || 'MM/YYYY'}</span>
        </div>
        <p class="position">${data.position1 || 'Role A'}</p>
        <ul class="bullets">
          ${(data.bullets1 || ['Key achievement or responsibility.']).map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="exp-column">
      <div class="experience-entry">
        <div class="exp-header">
          <h3 class="company">${data.company2 || 'Company B'}</h3>
          <span class="date">${data.startDate2 || 'MM/YYYY'} - ${data.endDate2 || 'MM/YYYY'}</span>
        </div>
        <p class="position">${data.position2 || 'Role B'}</p>
        <ul class="bullets">
          ${(data.bullets2 || ['Key achievement or responsibility.']).map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
</section>
`,

  // R06: Education - Degree, University, Date, GPA
  R06: (data) => `
<section class="slide" data-layout="R06">
  <h2 class="section-title">Education</h2>
  <div class="education-entry">
    <div class="edu-header">
      <h3 class="institution">${data.university || 'University Name'}</h3>
      <span class="date">${data.gradDate || 'MM/YYYY'}</span>
    </div>
    <p class="degree">${data.degree || 'Bachelor of Science'} in ${data.field || 'Computer Science'}</p>
    ${data.gpa ? `<p class="gpa">GPA: ${data.gpa}</p>` : ''}
  </div>
</section>
`,

  // R07: Projects - Name, Tech Stack, Description
  R07: (data) => `
<section class="slide" data-layout="R07">
  <h2 class="section-title">Projects</h2>
  <div class="project-entry">
    <h3 class="project-title">${data.projectName || 'Project Name'}</h3>
    <p class="tech-stack">${data.techStack || 'React, Node.js, PostgreSQL'}</p>
    <ul class="bullets">
      ${(data.projectBullets || [
        'Brief description of the project and its goals.',
        'Technical challenges and how they were overcome.',
        'Impact: metrics or outcomes achieved.'
      ]).map(b => `<li>${b}</li>`).join('')}
    </ul>
  </div>
</section>
`,

  // R08: Certifications - Name, Issuer, Date
  R08: (data) => `
<section class="slide" data-layout="R08">
  <h2 class="section-title">Certifications</h2>
  <ul class="cert-list">
    <li>
      <strong>${data.certName || 'Certification Name'}</strong>
      <span class="cert-issuer">${data.issuer || 'Issuing Organization'}</span>
      <span class="cert-date">${data.certDate || 'MM/YYYY'}</span>
    </li>
  </ul>
</section>
`,

  // R09: Languages - Language + Proficiency
  R09: (data) => `
<section class="slide" data-layout="R09">
  <h2 class="section-title">Languages</h2>
  <div class="language-list">
    ${(data.languages || ['English (Native)', 'Mandarin (Fluent)', 'Spanish (Intermediate)']).map(lang => `
      <div class="language-item">
        <span class="lang-name">${lang.split('(')[0].trim()}</span>
        <div class="proficiency-bar"><div class="fill" style="width: ${lang.includes('Native') ? '100%' : lang.includes('Fluent') ? '85%' : '60%'}"></div></div>
        <span class="proficiency-level">${lang.includes('(') ? lang.match(/\(([^)]+)\)/)[1] : 'Intermediate'}</span>
      </div>
    `).join('')}
  </div>
</section>
`,

  // R10: Volunteer - Organization, Role, Date, Description
  R10: (data) => `
<section class="slide" data-layout="R10">
  <h2 class="section-title">Volunteer Experience</h2>
  <div class="volunteer-entry">
    <div class="exp-header">
      <h3 class="organization">${data.org || 'Organization Name'}</h3>
      <span class="date">${data.volStartDate || 'MM/YYYY'} - ${data.volEndDate || 'MM/YYYY'}</span>
    </div>
    <p class="role">${data.volRole || 'Volunteer Role'}</p>
    <ul class="bullets">
      <li>Description of contributions and impact.</li>
    </ul>
  </div>
</section>
`,

  // R11: Publications - Title, Venue, Date
  R11: (data) => `
<section class="slide" data-layout="R11">
  <h2 class="section-title">Publications</h2>
  <div class="publication-entry">
    <h3 class="pub-title">${data.pubTitle || 'Publication Title'}</h3>
    <p class="pub-venue">${data.pubVenue || 'Conference or Journal Name'}</p>
    <span class="pub-date">${data.pubDate || 'MM/YYYY'}</span>
  </div>
</section>
`,

  // R12: Closing - References or statement
  R12: (data) => `
<section class="slide" data-layout="R12">
  <div class="closing-content">
    <h2>References</h2>
    <p>Available upon request.</p>
    ${data.references ? `<div class="references-list">${data.references}</div>` : ''}
  </div>
</section>
,

  // R13: Cover - Large title slide with name, title, and tagline
  R13: (data) => `
<section class="slide" data-layout="R13">
  <div class="cover-container">
    <h1 class="cover-name">${data.name || 'Your Name'}</h1>
    <p class="cover-title">${data.title || 'Professional Title'}</p>
    <p class="cover-tagline">${data.tagline || 'Brief professional tagline or value proposition'}</p>
    <div class="cover-contact">
      ${data.email ? `<span class="contact-item">${data.email}</span>` : ''}
      ${data.phone ? `<span class="separator">|</span><span class="contact-item">${data.phone}</span>` : ''}
      ${data.location ? `<span class="separator">|</span><span class="contact-item">${data.location}</span>` : ''}
    </div>
  </div>
</section>
`,

  // R14: Stats - Large numbers showcasing key achievements
  R14: (data) => `
<section class="slide" data-layout="R14">
  <h2 class="section-title">Key Impacts</h2>
  <div class="stats-grid">
    ${(data.stats || [
      { label: 'Years Experience', value: '10+' },
      { label: 'Projects Delivered', value: '50+' },
      { label: 'Team Size Led', value: '15' },
      { label: 'Efficiency Gain', value: '40%' }
    ]).map(stat => `
      <div class="stat-item">
        <div class="stat-value">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('  ')}
  </div>
</section>
`,

  // R15: Project Cards - Two-column grid for showcasing multiple projects
  R15: (data) => `
<section class="slide" data-layout="R15">
  <h2 class="section-title">Featured Projects</h2>
  <div class="projects-grid">
    ${(data.projects || [
      { title: 'Project Alpha', tech: 'React, Node.js', desc: 'A cloud-based analytics platform.' },
      { title: 'Project Beta', tech: 'Python, TensorFlow', desc: 'Machine learning recommendation engine.' }
    ]).map(proj => `
      <div class="project-card">
        <h3 class="card-title">${proj.title}</h3>
        <p class="card-tech">${proj.tech}</p>
        <p class="card-desc">${proj.desc}</p>
      </div>
    `).join('  ')}
  </div>
</section>
`,

  // R16: Skills Tags - Visual tag cloud for skills
  R16: (data) => `
<section class="slide" data-layout="R16">
  <h2 class="section-title">Skills & Technologies</h2>
  <div class="skills-tags">
    ${(data.skills || [
      'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Node.js', 'Python',
      'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL'
    ]).map(skill => `<span class="skill-tag">${skill}</span>`).join(' ')}
  </div>
</section>
`,

  // R17: Timeline - Vertical timeline of career progression
  R17: (data) => `
<section class="slide" data-layout="R17">
  <h2 class="section-title">Career Timeline</h2>
  <div class="timeline">
    ${(data.timeline || [
      { year: '2020-Present', role: 'Senior Engineer', company: 'Tech Corp' },
      { year: '2018-2020', role: 'Engineer', company: 'StartupXYZ' },
      { year: '2016-2018', role: 'Junior Developer', company: 'FirstCo' }
    ]).map(item => `
      <div class="timeline-item">
        <div class="timeline-year">${item.year}</div>
        <div class="timeline-content">
          <h3 class="timeline-role">${item.role}</h3>
          <p class="timeline-company">${item.company}</p>
        </div>
      </div>
    `).join('')}
  </div>
</section>
`,

  // R18: Contact - QR code and social links
  R18: (data) => `
<section class="slide" data-layout="R18">
  <div class="contact-container">
    <h2 class="section-title">Get in Touch</h2>
    <div class="contact-grid">
      <div class="contact-item-block">
        <div class="qr-placeholder">[QR Code]</div>
        <p class="qr-label">Scan for contact</p>
        ${data.qrUrl ? `<img src="${data.qrUrl}" alt="QR Code" class="qr-image">` : ''}
      </div>
      <div class="contact-info-block">
        <h3 class="info-name">${data.name || 'Your Name'}</h3>
        <p class="info-title">${data.title || 'Professional Title'}</p>
        <div class="info-list">
          ${data.email ? `<p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>` : ''}
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          ${data.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${data.linkedin}">${data.linkedin}</a></p>` : ''}
          ${data.github ? `<p><strong>GitHub:</strong> <a href="${data.github}">${data.github}</a></p>` : ''}
          ${data.website ? `<p><strong>Website:</strong> <a href="${data.website}">${data.website}</a></p>` : ''}
        </div>
      </div>
    </div>
  </div>
</section>
`
`
};