# Enspired Magazine Website

A modern React and Vite website for Enspired Magazine, featuring immersive motion design, themed UI, and editorial-style sections.

## Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Framer Motion
- Lucide React icons

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build locally:

```bash
npm run preview
```

## Available Scripts

- `npm run dev`: Run local development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint checks
- `npm run sync-deploy`: Execute deployment sync PowerShell script

## Cloudinary Asset Delivery

Issue cover images, event gallery images, and issue PDFs are configured to be served from Cloudinary.

Cloudinary setup is currently hardcoded in `src/config/cloudinaryAssets.js`:

- Cloud name: `dyxnqe7sq`
- Issue covers: direct Cloudinary delivery URLs
- Event gallery: direct Cloudinary delivery URLs
- Issue PDFs: direct Cloudinary delivery URLs

Notes:

- If an asset URL fails, use that asset's direct delivery URL from Cloudinary and replace the mapped value in `src/config/cloudinaryAssets.js`.

## Recent UI Update

The Contact page channel cards were refined to improve logo/icon presence and professional appeal:

- Replaced flat icon blocks with layered premium badges
- Added gradient icon frames with controlled glow shadows
- Added subtle glass highlight inside icon surfaces
- Improved hover transitions for a stronger interactive feel

Updated component: `src/pages/ContactPage.jsx`
