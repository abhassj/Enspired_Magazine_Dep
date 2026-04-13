import { siteImageAssets } from '../config/cloudinaryAssets';

const IMAGE_TIMEOUT_MS = 12000;
const NETWORK_TIMEOUT_MS = 9000;

const isConstrainedNetwork = () => {
  if (typeof navigator === 'undefined') return false;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) return false;

  return connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType);
};

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
  const constrainedNetwork = isConstrainedNetwork();

  // Only pre-load critical above-the-fold assets on initial page load
  // Avoid extra image warming on constrained networks (3G/save-data)
  const imageUrls = constrainedNetwork
    ? []
    : [
        siteImageAssets.heroImageMobile,
        '/GR_branding_final.webp',
      ];

  const taskFns = [
    ...imageUrls.map((url) => () => preloadImage(url)),
    () => waitForFonts(),
  ];

  const total = taskFns.length;
  let completed = 0;

  onProgress?.(0);

  await runWithConcurrency(taskFns, constrainedNetwork ? 1 : 3, () => {
    completed += 1;
    onProgress?.(Math.min(1, completed / total));
  });

  return { total, completed };
};
