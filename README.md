# Bosla Scholarship - Educational Consultancy Website

A modern, premium, fully responsive educational consultancy website built with Next.js 15, React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Bilingual (EN/AR)** - Full Arabic and English language support with RTL
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Smooth Animations** - Framer Motion powered transitions
- **SEO Optimized** - Meta tags, semantic HTML, and proper structure
- **Accessible** - ARIA labels, keyboard navigation, proper contrast
- **CMS-Ready** - Clean data architecture for easy CMS integration
- **Production Quality** - Clean code, reusable components, type-safe

## Pages

1. **Home** - Hero, stats, services, destinations, testimonials, CTA
2. **About Us** - Mission, vision, values, timeline, team
3. **Services** - 8 detailed service cards with process flow
4. **Countries** - 9 study destinations with full details
5. **Universities** - Searchable/filterable university listing
6. **Scholarships** - Featured scholarships with eligibility info
7. **Testimonials** - Student reviews and video testimonials
8. **Contact** - Form, map, WhatsApp, social media
9. **Blog** - News articles with newsletter subscription
10. **404** - Custom not found page

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **UI Components:** Custom shadcn/ui components
- **Theme:** next-themes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

The dev server runs on `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog page
│   ├── contact/           # Contact page
│   ├── countries/         # Countries page
│   ├── scholarships/      # Scholarships page
│   ├── services/          # Services page
│   ├── testimonials/      # Testimonials page
│   ├── universities/      # Universities page
│   ├── globals.css        # Global styles + CSS variables
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   ├── faq.tsx           # FAQ accordion
│   ├── footer.tsx        # Footer
│   ├── header.tsx        # Sticky navigation
│   └── whatsapp-button.tsx # Floating WhatsApp
├── contexts/             # React contexts
│   └── language-context.tsx # Bilingual state
└── lib/                  # Utilities
    ├── i18n.ts           # Translations (EN/AR)
    ├── theme-provider.tsx # Dark/light mode
    └── utils.ts          # Utility functions
```

## Customization

- **Colors:** Edit CSS variables in `src/app/globals.css`
- **Content:** Update translations in `src/lib/i18n.ts`
- **WhatsApp:** Update phone number in `src/components/whatsapp-button.tsx`
- **Contact Info:** Update in `src/components/footer.tsx` and contact page

## License

All rights reserved.
