# Resume Skill Quality Checklist

This checklist is based on real ATS parsing failures and best practices.

## 🔴 P0 - Showstopper (Must Fix Before Deployment)

- [ ] **No `<table>` elements** - Tables break reading order in PDF/HTML extraction
- [ ] **No `<textarea>` or `contenteditable`** - Treated as images, text not extracted
- [ ] **No SVG `<text>` elements** - SVG text is ignored by parsers
- [ ] **No emoji or Unicode symbols as bullets** - Causes tokenization failures
- [ ] **No multi-column layout** (`column-count` > 1) - Reading order scrambled
- [ ] **No background images behind text** - OCR fails (accuracy drops to ~85%)
- [ ] **All text must be in HTML elements** - No text inside images
- [ ] **Standard section headings only**: `Experience`, `Education`, `Skills`, `Projects`, `Certifications`, `Languages`, `Publications`, `Volunteer`
- [ ] **Data layout attribute present** - Each `<section class="slide">` must have `data-layout="Rxx"` (R01-R12)
- [ ] **Layout registered in swiss-layout-lock.md equivalent** - Only 12 allowed layouts

## 🟠 P1 - Warning (Should Fix)

- [ ] **Date format consistent** - Use `MM/YYYY` or `Month YYYY` throughout
- [ ] **Font size ≥ 10pt (12px)** for body text
- [ ] **Font size ≥ 14pt (16px)** for headings
- [ ] **Color contrast ratio ≥ 4.5:1** (WCAG AA) for normal text
- [ ] **No more than 2 levels of heading hierarchy**
- [ ] **All bullet points are semantic `<li>` elements** (no asterisks in `<p>`)
- [ ] **No inline styles that override layout** - Use classes instead
- [ ] **Print media query tested** - Page breaks are correct for A4/Letter

## 🟢 P2 - Nice to Have

- [ ] **Schema.org markup** (optional, for SEO if hosted online)
- [ ] **Responsive typography** (viewport units for fonts)
- [ ] **Keyword density analysis** - Target 3-5% for important skills from JD
- [ ] **File size < 100KB** - Single HTML should be lightweight

---

## Quick Validation

Run `node scripts/validate-resume.mjs path/to/index.html` and ensure:
- Exit code 0
- 0 errors (P0)
- Warnings (P1) should be reviewed but may be acceptable

---

## Common Pitfalls (From Real Resumes)

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| Work experience appears out of order | Multi-column layout in header or timeline | Use single-column layout only |
| Skills section empty after parse | Used icons (⚡️🚀) instead of text | Replace icons with text labels |
| Dates show as `2023` instead of `06/2023` | Inconsistent date format | Standardize to `MM/YYYY` |
| Name appears twice in ATS | Used both `<h1>` and `<header>` with name | Only put name in one place |
| PDF export cuts off content | Fixed height `100vh` without overflow handling | Use min-height + allow scrolling in print |

---

## References

- ResumeOptimizerPro: "How Resume Parsers Actually Work"
- Jobshinobi: "Workday ATS Optimization Guide"
- rendercv: YAML→PDF best practices
