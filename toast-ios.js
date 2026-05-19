/**
 * @file toast-ios.js
 * @description Librería de alertas y modales con estilo iOS nativo. Sin dependencias.
 * @version 1.1.0
 * @author oscarfor10 (y contribuidores)
 * @license MIT
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory();
    } else {
        // Browser globals
        const exported = factory();
        root.iosToast = exported;
        root.showConfirm = exported.showConfirm;
    }
}(typeof window !== 'undefined' ? window : this, function () {
    'use strict';

    /**
     * @constant {Object} ICONS
     */
    const ICONS = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
        error:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
        danger:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
        info:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
        close:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    };

    /**
     * MÉTODOS PARA TOAST (Notificaciones)
     */
    function getContainer() {
        let el = document.getElementById('ios-toast-container');
        if (!el) {
            el = document.createElement('div');
            el.id = 'ios-toast-container';
            el.setAttribute('aria-live', 'polite');
            el.setAttribute('aria-atomic', 'false');
            document.body.appendChild(el);
        }
        return el;
    }

    function dismissToast(toast) {
        if (!toast || toast._dismissing) return;
        toast._dismissing = true;
        clearTimeout(toast._timer);
        toast.classList.remove('show');
        toast.classList.add('hide');
        
        if (toast._closeBtn && toast._closeHandler) {
            toast._closeBtn.removeEventListener('click', toast._closeHandler);
        }

        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 350);
    }

    function iosToast(type, title, message, duration) {
        const validTypes = ['success', 'error', 'warning', 'info'];
        if (!validTypes.includes(type)) type = 'info';

        const ms = (typeof duration === 'number' && duration > 0) ? duration : 4000;
        const container = getContainer();
        const icon = ICONS[type] || ICONS.info;

        const toast = document.createElement('div');
        toast.className = `ios-toast ${type}`;
        
        toast.setAttribute('role', type === 'error' || type === 'warning' ? 'alert' : 'status');
        toast.setAttribute('aria-live', 'assertive');
        toast.style.setProperty('--toast-duration', ms + 'ms');
        
        toast.innerHTML = `
            <div class="ios-toast-icon">${icon}</div>
            <div class="ios-toast-body">
                <p class="ios-toast-title">${title}</p>
                <p class="ios-toast-msg">${message}</p>
            </div>
            <button class="ios-toast-close" type="button" aria-label="Cerrar notificación">
                ${ICONS.close}
            </button>
            <div class="ios-toast-progress"></div>
        `;

        const closeBtn = toast.querySelector('.ios-toast-close');
        toast._closeBtn = closeBtn;
        toast._closeHandler = () => dismissToast(toast);
        closeBtn.addEventListener('click', toast._closeHandler);

        container.appendChild(toast);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('show'));
        });

        toast._timer = setTimeout(() => dismissToast(toast), ms);
        return toast;
    }

    /**
     * MÉTODOS PARA MODAL DE CONFIRMACIÓN (showConfirm)
     */
    function showConfirm(options = {}) {
        return new Promise((resolve) => {
            const {
                title = 'Confirmar',
                message = '¿Estás seguro?',
                confirmText = 'Confirmar',
                cancelText = 'Cancelar',
                type = 'info',
                onConfirm,
                onCancel
            } = options;

            // Evitar múltiples modales superpuestos
            const existing = document.getElementById('ios-modal-overlay');
            if (existing) {
                existing.parentNode.removeChild(existing);
            }

            const overlay = document.createElement('div');
            overlay.id = 'ios-modal-overlay';
            overlay.className = 'ios-modal-overlay';
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-modal', 'true');
            overlay.setAttribute('aria-labelledby', 'ios-modal-title');

            const modal = document.createElement('div');
            modal.className = 'ios-modal';
            
            // Icono opcional según tipo
            const icon = ICONS[type] || ICONS.info;
            const typeClass = `ios-modal-${type}`;

            modal.innerHTML = `
                <div class="ios-modal-content">
                    <div class="ios-modal-icon ${typeClass}">${icon}</div>
                    <h3 id="ios-modal-title" class="ios-modal-title">${title}</h3>
                    <p class="ios-modal-msg">${message}</p>
                </div>
                <div class="ios-modal-buttons">
                    <button class="ios-modal-btn ios-modal-cancel">${cancelText}</button>
                    <button class="ios-modal-btn ios-modal-confirm ${typeClass}">${confirmText}</button>
                </div>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // Funciones de cierre
            const close = (confirmed) => {
                overlay.classList.remove('show');
                modal.classList.remove('show');
                
                // Animar salida
                setTimeout(() => {
                    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                }, 300); // duración en el CSS

                if (confirmed) {
                    if (onConfirm) onConfirm();
                    resolve({ confirmed: true });
                } else {
                    if (onCancel) onCancel();
                    resolve({ confirmed: false });
                }
            };

            // Eventos
            const btnCancel = modal.querySelector('.ios-modal-cancel');
            const btnConfirm = modal.querySelector('.ios-modal-confirm');

            btnCancel.addEventListener('click', () => close(false));
            btnConfirm.addEventListener('click', () => close(true));

            // Cierre al dar clic fuera del modal (overlay)
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) close(false);
            });

            // Animación de entrada
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    overlay.classList.add('show');
                    modal.classList.add('show');
                });
            });
        });
    }

    // Attach showConfirm to iosToast for NPM destructuring or global usage
    iosToast.showConfirm = showConfirm;

    // Return iosToast as the primary export
    return iosToast;
}));
