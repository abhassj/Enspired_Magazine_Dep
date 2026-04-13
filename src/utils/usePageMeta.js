import { useEffect } from 'react'

// Lightweight document head manager.
// Imperatively sets title + meta tags on route change so each SPA page has
// accurate SEO without adding react-helmet-async as a dependency.
//
// Defaults fall back to the site-wide values declared in index.html when a
// route-level hook unmounts (we restore the original values on cleanup so
// returning to the home page doesn't inherit a stale Contact title).

const DEFAULTS = {
  title: 'GR Enspired Magazine | Dream. Lead. Inspire.',
  description:
    'GR Enspired Magazine is a global media platform empowering women, men, and youth in business, startups, and SMEs. Discover bold stories of entrepreneurship, leadership, and economic development shaping the future.',
  canonical: 'https://www.grenspired.com/',
  ogUrl: 'https://www.grenspired.com/',
  ogTitle: 'GR Enspired Magazine | Dream. Lead. Inspire.',
  ogDescription:
    'A global media platform empowering women, men, and youth in business, startups, and SMEs — celebrating bold stories of entrepreneurship, leadership, and inspiration.',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
}

const setLink = (rel, href) => {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export const usePageMeta = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  robots,
} = {}) => {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const prevTitle = document.title
    const prevDescription = document.querySelector('meta[name="description"]')?.getAttribute('content')
    const prevCanonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href')
    const prevOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content')
    const prevOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content')
    const prevOgUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content')
    const prevRobots = document.querySelector('meta[name="robots"]')?.getAttribute('content')

    if (title) document.title = title
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
    if (canonical) setLink('canonical', canonical)
    if (ogTitle) {
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', ogTitle)
    }
    if (ogDescription) {
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', ogDescription)
    }
    if (ogUrl) {
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', ogUrl)
    }
    if (robots) {
      document.querySelector('meta[name="robots"]')?.setAttribute('content', robots)
    }

    return () => {
      if (title) document.title = prevTitle || DEFAULTS.title
      if (description && prevDescription) {
        document.querySelector('meta[name="description"]')?.setAttribute('content', prevDescription)
      }
      if (canonical && prevCanonical) setLink('canonical', prevCanonical)
      if (ogTitle && prevOgTitle) {
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', prevOgTitle)
      }
      if (ogDescription && prevOgDescription) {
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', prevOgDescription)
      }
      if (ogUrl && prevOgUrl) {
        document.querySelector('meta[property="og:url"]')?.setAttribute('content', prevOgUrl)
      }
      if (robots && prevRobots) {
        document.querySelector('meta[name="robots"]')?.setAttribute('content', prevRobots)
      }
    }
  }, [title, description, canonical, ogTitle, ogDescription, ogUrl, robots])
}

export const pageMetaDefaults = DEFAULTS
