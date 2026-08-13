# PWA Implementation for Veritas Pericial

Transform the Veritas Pericial application into a complete, installable Progressive Web App (PWA) with offline support for the app shell, respecting high privacy standards.

## Proposed Changes

### Configuration
- Update `vite.config.ts` to include `vite-plugin-pwa` with full manifest and Workbox configuration.
- Implement a strict caching strategy that excludes all sensitive judicial and personal data.

### Metadata and Assets
- Update `src/routes/__root.tsx` with PWA-specific head tags (viewport, theme-color, apple-mobile-web-app).
- Use the generated icons (192x192, 512x512, maskable) in the manifest.
- Ensure correct localization to `pt-BR`.

### Service Worker and UX
- Create `src/pwa.ts` for Service Worker registration.
- Add a controlled update notification component to prevent silent reloads.
- Implement a connectivity hook (`use-online-status`) and a `/offline` fallback route.
- Add PWA installation instructions for Android/iOS.

### Offline Strategy
- **Precache**: Static assets, fonts, and application code.
- **Excluded**: All process-related data, transcripts, IA results, and user-uploaded documents (NetworkOnly).

## Technical Details
- Using `vite-plugin-pwa` for manifest generation and service worker compilation.
- `workbox-window` for client-side service worker lifecycle management.
- Standard PWA manifest properties for high-quality installation (standalone, portrait, themed).
- Safe area support via CSS `env()` and viewport-fit.

## Validation Plan
1. Run `npm run build` to verify PWA generation.
2. Check `manifest.webmanifest` existence and validity.
3. Verify Service Worker registration in the client.
4. Test connectivity transitions (Online/Offline) and ensure no sensitive data is cached.
