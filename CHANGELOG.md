# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-19

### Added
- **NPM Support**: Added UMD wrapper to support ES Modules (`import`), CommonJS (`require`), and global scope (`window`).
- **TypeScript Support**: Added `toast-ios.d.ts` for perfect IDE autocomplete.
- **Accessibility (a11y)**: Added ARIA roles (`role="alert"`, `aria-live`) so screen readers announce notifications properly.
- **Package.json**: Fully configured for NPM publishing.
- **AI Docs**: Added `AI_USAGE.md` for seamless integration via GitHub Copilot, Cursor, and ChatGPT.

### Changed
- Refactored `toast-ios.js` to ensure zero memory leaks by actively removing event listeners on dismissal.
- Responsive styles improved in `toast-ios.css`.

### Fixed
- Backward compatibility maintained for users relying on direct CDN scripts.
