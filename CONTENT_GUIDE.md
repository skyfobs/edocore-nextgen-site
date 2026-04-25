# Content Population Guide

This guide shows you exactly where to add your content in each file.

## Quick Reference: Files to Edit

### 1. Logo (PRIORITY)
**File:** `components/Header.tsx`
**Lines:** 16-18
**Action:** Replace the placeholder div with your logo image

```tsx
// Current (lines 16-18):
<div className="w-48 h-16 bg-white/10 rounded flex items-center justify-center">
  <span className="text-sm">Logo Placeholder</span>
</div>

// Replace with:
<Image src="/logo.png" alt="EduCore Institute" width={192} height={64} />
```

Don't forget to:
1. Place your logo in `/public/logo.png`
2. Add import at top: `import Image from 'next/image';`

---

### 2. Homepage Slider Images (PRIORITY)
**File:** `components/ImageSlider.tsx`
**Lines:** 8-24
**Action:** Add your slider images

Steps:
1. Place 3 images in `/public/images/` folder (e.g., slider1.jpg, slider2.jpg, slider3.jpg)
2. Update the component to use images instead of gradients

---

### 3. About Us Page
**File:** `app/about/page.tsx`

Replace these placeholders:
- Line 20: `[Add your mission statement here]`
- Line 26: `[Add your vision statement here]`
- Line 32: `[Add information about your institute here]`
- Lines 39-54: Add content for "Why Choose Us" sections

---

### 4. Contact Page
**File:** `app/contact/page.tsx`

Update these details:
- Line 141: Email address (currently: info@educore.com)
- Line 151: Phone number (currently: +1 234 567 8900)
- Line 161: Physical address `[Add your address here]`
- Lines 169-171: Office hours (update as needed)

---

### 5. Course Pages

Each course page needs content. Files to edit:

#### Finance & Management
**File:** `app/courses/finance-management/page.tsx`
- Line 16: Course overview
- Lines 24-41: Course highlights (duration, level, format, certification)
- Lines 48-62: Learning outcomes
- Lines 69-79: Course curriculum modules

#### Health & Safety
**File:** `app/courses/health-safety/page.tsx`
- Line 14: Course description

#### AI Consultancy
**File:** `app/courses/ai-consultancy/page.tsx`
- Line 14: Course description

#### Cloud Consultancy
**File:** `app/courses/cloud-consultancy/page.tsx`
- Line 14: Course description

#### German Language
**File:** `app/courses/german-language/page.tsx`
- Line 14: Course description

#### Multimedia
**File:** `app/courses/multimedia/page.tsx`
- Line 14: Course description

**Note:** For detailed course pages, edit `components/CourseTemplate.tsx` or create custom pages.

---

### 6. Partners Page
**File:** `app/partners/page.tsx`

- Line 16: Introduction about partnerships
- Lines 22-65: Partner information (3 partner cards)
  - Add partner logos
  - Add partner names
  - Add partner descriptions
- Line 70: Partnership opportunities text

---

### 7. Study Abroad Page
**File:** `app/study-abroad/page.tsx`

- Line 16: Introduction
- Lines 23-48: Program details (2 programs shown)
  - Program names
  - Descriptions
  - Duration, location, requirements
- Lines 54-72: "Why Study Abroad" benefits
- Line 77: Call to action text

---

### 8. Blog Page
**File:** `app/resources/blog/page.tsx`

- Lines 22-95: Three blog post cards
  - Add blog titles
  - Add excerpts
  - Add dates
  - Add links to full posts

---

### 9. Case Study Page
**File:** `app/resources/case-study/page.tsx`

- Lines 22-145: Three case study cards
  - Add case study titles
  - Add summaries
  - Add key results
  - Add links to full case studies

---

### 10. Footer
**File:** `components/Footer.tsx`

- Line 11: Company description
- Lines 35-37: Contact information (email, phone, address)

---

## Search and Replace Strategy

Use your code editor's "Find in Files" feature to search for:
- `[Add` - finds all content placeholders
- `info@educore.com` - update email
- `+1 234 567 8900` - update phone
- `Logo Placeholder` - update logo

---

## Image Folders to Create

Create these folders in `/public/`:
```
public/
├── images/
│   ├── slider1.jpg
│   ├── slider2.jpg
│   └── slider3.jpg
├── partners/
│   ├── partner1.png
│   ├── partner2.png
│   └── partner3.png
└── logo.png
```

---

## Testing Checklist

After adding content:
- [ ] Logo displays correctly
- [ ] Slider images load
- [ ] All navigation links work
- [ ] Contact form has correct info
- [ ] All course pages have content
- [ ] Footer has correct details
- [ ] Mobile menu works
- [ ] Dropdown menus work

---

## Need Help?

The website is running at: http://localhost:3000

To stop the server: Press Ctrl+C in the terminal
To restart: Run `npm run dev` in the educore-website folder
