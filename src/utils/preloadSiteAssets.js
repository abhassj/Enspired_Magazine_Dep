import { siteImageAssets } from '../config/cloudinaryAssets';

const IMAGE_TIMEOUT_MS = 12000;
const NETWORK_TIMEOUT_MS = 9000;

const withTimeout = (promise, timeoutMs) => (
  Promise.race([
    promise,
    new Promise((resolve) => {
      window.setTimeout(() => resolve(false), timeoutMs);
    }),
  ]).catch(() => false)
);

const preloadImage = (src) => {
  if (!src) return Promise.resolve(false);

  return withTimeout(
    new Promise((resolve) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;

      if (image.complete) {
        resolve(true);
        return;
      }

      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);

      if (typeof image.decode === 'function') {
        image.decode().then(() => resolve(true)).catch(() => {});
      }
    }),
    IMAGE_TIMEOUT_MS,
  );
};

const warmResource = (url) => {
  if (!url) return Promise.resolve(false);

  return withTimeout(
    fetch(url, {
      method: 'HEAD',
      mode: 'cors',
      cache: 'force-cache',
    })
      .then(() => true)
      .catch(() => false),
    NETWORK_TIMEOUT_MS,
  );
};

const waitForFonts = () => {
  if (typeof document === 'undefined' || !document.fonts || !document.fonts.ready) {
    return Promise.resolve(true);
  }

  return withTimeout(document.fonts.ready.then(() => true), NETWORK_TIMEOUT_MS);
};

const runWithConcurrency = async (taskFns, concurrency, onTaskComplete) => {
  const queue = [...taskFns];

  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length > 0) {
      const task = queue.shift();
      if (!task) continue;
      await task();
      onTaskComplete();
    }
  });

  await Promise.all(workers);
};

export const preloadSiteAssets = async ({ onProgress } = {}) => {
  // Only pre-load critical above-the-fold assets on initial page load
  // Gallery images, CEO photo, and PDFs load lazily as user navigates
  const imageUrls = [
    siteImageAssets.heroImageMobile,
    '/GR_branding_final.svg',
    '/gr-favicon.svg',
  ];

  const taskFns = [
    ...imageUrls.map((url) => () => preloadImage(url)),
    () => import('../pages/ContactPage').then(() => true).catch(() => false),
    () => waitForFonts(),
  ];

  const total = taskFns.length;
  let completed = 0;

  onProgress?.(0);

  await runWithConcurrency(taskFns, 4, () => {
    completed += 1;
    onProgress?.(Math.min(1, completed / total));
  });

  return { total, completed };
};
