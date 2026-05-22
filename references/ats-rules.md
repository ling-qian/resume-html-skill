# ATS Parsing Rules Reference

Based on ResumeOptimizerPro's technical analysis of Workday, Greenhouse, Lever, iCIMS, Taleo.

## The Five-Stage Pipeline

1. **Text Extraction** - Raw bytes → linear text stream
2. **Tokenization** - Split text into words, numbers, punctuation
3. **Sectioning** - Classify lines into sections
4. **Named Entity Recognition** - Tag entities (PERSON, ORG, DATE, TITLE, SKILL)
5. **Structuring** - Assemble into JSON candidate record

**Accuracy:** Each stage ~95% → end-to-end ~77% without optimization. With ATS-safe format, can reach 87%.

---

## Stage-by-Stage Failure Modes

### 1. Text Extraction

**✅ Safe formats:**
- Native PDF with text layer
- DOCX (XML, lossless)
- **Single-file HTML (our output)** - Perfect

**❌ Problematic:**
- Multi-column PDF - reading order scrambled
- Image-based PDF - OCR ~85% field accuracy
- Scanned documents - avoid completely

**Our solution:** Output pure HTML, all text in tags, no columns.

---

### 2. Tokenization

**✅ Safe:**
- Standard ASCII punctuation (`-`, `•`, `*`)
- Normal spacing
- Language-appropriate characters (CJK supported)

**❌ Problematic:**
- Unicode icons as bullets (⚡️, 🚀)
- Em dash (`—`) as bullet
- Mixed encodings in same document

**Our solution:** Use `•` or `-` for bullets; no emoji.

---

### 3. Sectioning

**✅ Safe headings (exact match preferred):**
```
Experience
Work Experience
Professional Experience
Employment

Education
Academic Background

Skills
Technical Skills
Core Competencies

Projects
Project Experience

Certifications
Licenses

Languages

Publications
Papers

Volunteer
Community
```

**❌ Problematic:**
- "My Journey"
- "What I've Done"
- "The Stuff I'm Good At"
- Non-standard phrasing

**Our solution:** Enforce standard section titles only (R02-R12).

---

### 4. Named Entity Recognition

**✅ High accuracy (>99%):**
- Email, phone (regex-based)
- Dates in `MM/YYYY` or `Month YYYY`

**✅ Medium accuracy (70-90%):**
- Person name
- Organization
- Job title
- Skills

**❌ Low accuracy triggers:**
- Mixed case titles (`senior software engineer` vs `Senior Software Engineer`)
- Unusual date formats (`2023-06` vs `06/2023` vs `June 2023`)
- Skills listed as icons

**Our solution:**
- Title Case for all headings
- Standardize dates to `MM/YYYY`
- Skill tags as plain text

---

### 5. Structuring

**✅ Well-structured:**
```
<experience-entry>
  <company>Google</company>
  <date>06/2020 - Present</date>
  <position>Senior Engineer</position>
  <bullets>
    <bullet>Led...</bullet>
    <bullet>Built...</bullet>
  </bullets>
</experience-entry>
```

**❌ Ambiguous:**
- Nested tables
- `<div>` soup without semantic classes
- Dates mixed into same line as company name

**Our solution:** Strict HTML templates with semantic classes.

---

## Vendor-Specific Rules

### Workday

- **File types accepted:** DOCX, PDF, TXT, HTML
- **Autofill preference:** DOCX > HTML > PDF
- **Section headings:** Case-insensitive but exact match improves recall
- **Date format:** `MM/YYYY` works best; `Month YYYY` also acceptable
- **Common issue:** Workday often forces manual retype if resume has complex formatting

**Optimization:** Keep formatting simple; let autofill do its job.

---

### Greenhouse

- **File types:** PDF, DOCX (prefers PDF for preservation)
- **Section detection:** Regex-based; "Experience" and "Education" are keywords
- **Custom sections:** Some companies add custom fields that may not map
- **Parsing depth:** Less aggressive than Workday; more tolerant of formatting

**Optimization:** Use standard headers; avoid creative names.

---

### Lever

- **API-first:** Parsing happens via third-party parser (often Sovren)
- **Accuracy:** High for well-structured resumes
- **Custom fields:** Can be problematic if company adds many

---

## Field-Level Accuracy Estimates

| Field | Accuracy | Notes |
|-------|----------|-------|
| Email | >99% | Regex, very reliable |
| Phone | >99% | Regex |
| Dates | 95-97% | Needs consistent format |
| Job Title | 85-90% | Title Case helps |
| Company | 70-85% | Ambiguity with subsidiaries |
| Skills | 60-80% | Depends on list format; tags vs paragraphs |

**Implication:** We cannot guarantee 100% parse success, but following these rules puts success rate at ~87% (industry average for optimized resumes).

---

## Practical Testing

To validate our skill:

1. Generate resume HTML
2. Use Workday demo: https://www.workday.com/en-us/products/human-capital-management/recruiting.html (search "resume parsing demo")
3. Or Greenhouse sample: https://developer.greenhouse.io/recruiting-docs.html
4. Upload HTML file (or print to PDF first if Workday doesn't accept HTML)
5. Verify autofill fields populate correctly
6. Check for missing/broken fields

---

## References

- ResumeOptimizerPro: https://resumeoptimizerpro.com/blog/how-resume-parsers-actually-work
- Jobshinobi Workday Guide: https://www.jobshinobi.com/blog/how-to-optimize-resume-for-workday-ats
- Workday FY25 disclosures: 10,500+ orgs, 50%+ Fortune 500
