# EduCore Institute Website

A modern, SEO-friendly Next.js website for an educational institute.

## Features

- ✅ Modern Next.js 16 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ SEO optimized with metadata
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Color scheme: #003366 (primary) with white
- ✅ Image slider on homepage (placeholder - ready for your images)
- ✅ Dropdown navigation menus
- ✅ All required pages created

## Site Structure

### Navigation
- **Home** - Homepage with slider and course overview
- **About Us** - Company information and mission
- **Courses** (Dropdown)
  - Finance & Management
  - Health & Safety Training
  - AI Consultancy
  - Cloud Consultancy
  - German Language
  - Multimedia
- **Partners** - Partner organizations
- **Study Abroad** - International programs
- **Resources** (Dropdown)
  - Blog
  - Case Study
- **Contact Us** - Contact form and information

## Getting Started

### Development Server

```bash
cd educore-website
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Customization Guide

### 1. Add Your Logo

Replace the logo placeholder in `components/Header.tsx`:
- Current: Line 16-18 (placeholder div)
- Replace with: `<Image src="/logo.png" alt="EduCore" width={192} height={64} />`
- Place your logo file in the `public` folder

### 2. Update Slider Images

In `components/ImageSlider.tsx`:
- The slider currently uses gradient backgrounds
- To add images, replace the `bgColor` property with image URLs
- Place images in the `public/images` folder
- Update the slides array (lines 8-24)

Example:
```tsx
const slides = [
  {
    title: 'Welcome to EduCore Institute',
    description: 'Excellence in Education and Training',
    image: '/images/slider1.jpg'
  },
  // ... more slides
];
```

### 3. Add Content to Pages

All pages have placeholder text marked with `[Add content here]`. Search for these markers and replace with your actual content:

- `/app/about/page.tsx` - Mission, vision, company info
- `/app/partners/page.tsx` - Partner information
- `/app/study-abroad/page.tsx` - Study abroad programs
- `/app/contact/page.tsx` - Update contact details (email, phone, address)
- Course pages in `/app/courses/*/page.tsx` - Course details, curriculum
- `/app/resources/blog/page.tsx` - Blog posts
- `/app/resources/case-study/page.tsx` - Case studies

### 4. Update Footer

Edit `components/Footer.tsx` to update:
- Contact information
- Company description
- Links

### 5. SEO Optimization

Each page has metadata configured. Update as needed:
- Title
- Description
- Keywords
- Open Graph tags

### 6. Contact Form

The contact form in `/app/contact/page.tsx` is currently client-side only. To make it functional:
- Add a form submission handler
- Integrate with an email service (e.g., SendGrid, Resend)
- Or connect to your backend API

## Color Scheme

Primary colors used throughout:
- Primary: `#003366`
- Primary Dark: `#002244`
- Primary Light: `#004488`
- White: `#FFFFFF`
- Gray shades for text and backgrounds

## File Structure

```
educore-website/
├── app/
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── courses/
│   │   ├── finance-management/page.tsx
│   │   ├── health-safety/page.tsx
│   │   ├── ai-consultancy/page.tsx
│   │   ├── cloud-consultancy/page.tsx
│   │   ├── german-language/page.tsx
│   │   └── multimedia/page.tsx
│   ├── partners/page.tsx
│   ├── resources/
│   │   ├── blog/page.tsx
│   │   └── case-study/page.tsx
│   ├── study-abroad/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ImageSlider.tsx
│   └── CourseTemplate.tsx
├── public/
│   └── (place your images here)
└── package.json
```

## Next Steps

1. ✅ Add your logo to the header
2. ✅ Upload slider images
3. ✅ Fill in all content placeholders
4. ✅ Update contact information
5. ✅ Test all navigation links
6. ✅ Add actual blog posts and case studies
7. ✅ Configure form submission
8. ✅ Deploy to production

## Deployment

This Next.js app can be deployed to:
- Vercel (recommended)
- Netlify
- AWS
- Any Node.js hosting platform

## Support

For Next.js documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
