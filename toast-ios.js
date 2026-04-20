/* ─────────────────────────────────────────
   toast-ios.js  –  iOS-style toast library
   No framework dependencies.
   Usage: iosToast('success' | 'error' | 'warning' | 'info', 'Title', 'Message', duration?)
───────────────────────────────────────── */

(function () {
    'use strict';

    /* ── SVG icons (inline, no external deps) ── */
    const ICONS = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>`,
        error:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>`,
        info:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>`,
        close:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>`,
    };

    /* ── Ensure container exists in DOM ── */
    function getContainer() {
        let el = document.getElementById('ios-toast-container');
        if (!el) {
            el = document.createElement('div');
            el.id = 'ios-toast-container';
            document.body.appendChild(el);
        }
        return el;
    }

    /* ── Dismiss a single toast ── */
    function dismissToast(toast) {
        if (!toast || toast._dismissing) return;
        toast._dismissing = true;
        clearTimeout(toast._timer);
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 350);
    }

    /* ── Public API ── */
    function iosToast(type, title, message, duration) {
        const validTypes = ['success', 'error', 'warning', 'info'];
        if (!validTypes.includes(type)) type = 'info';

        const ms = typeof duration === 'number' ? duration : 4000;

        const container = getContainer();
        const icon = ICONS[type] || ICONS.info;

        const toast = document.createElement('div');
        toast.className = `ios-toast ${type}`;
        toast.style.setProperty('--toast-duration', ms + 'ms');
        toast.innerHTML = `
            <div class="ios-toast-icon">${icon}</div>
            <div class="ios-toast-body">
                <p class="ios-toast-title">${title}</p>
                <p class="ios-toast-msg">${message}</p>
            </div>
            <button class="ios-toast-close" type="button" aria-label="Cerrar">
                ${ICONS.close}
            </button>
            <div class="ios-toast-progress"></div>
        `;

        toast.querySelector('.ios-toast-close')
             .addEventListener('click', () => dismissToast(toast));

        container.appendChild(toast);

        /* Trigger enter animation (double rAF ensures transition fires) */
        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('show'));
        });

        /* Auto dismiss */
        toast._timer = setTimeout(() => dismissToast(toast), ms);
    }

    /* ── Expose globally ── */
    window.iosToast = iosToast;

})();
