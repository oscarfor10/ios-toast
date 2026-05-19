/**
 * iOS Toast & Confirm Modal Definitions
 * Type definitions for perfect IDE Autocomplete
 */

declare module 'ios-toast' {
    export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'danger';

    export interface ConfirmOptions {
        title?: string;
        message?: string;
        confirmText?: string;
        cancelText?: string;
        type?: ToastType;
        onConfirm?: () => void;
        onCancel?: () => void;
    }

    export interface ConfirmResult {
        confirmed: boolean;
    }

    export interface IosToastFunction {
        (
            type: 'success' | 'error' | 'warning' | 'info' | 'danger',
            title: string,
            message: string,
            duration?: number
        ): HTMLDivElement;

        /**
         * Displays a native iOS-style confirmation modal with blur backdrop.
         * Returns a Promise that resolves when the user clicks confirm or cancel.
         * 
         * @example
         * const result = await iosToast.showConfirm({
         *   title: "Delete File",
         *   message: "Are you sure?",
         *   confirmText: "Delete",
         *   type: "danger"
         * });
         * if (result.confirmed) { ... }
         */
        showConfirm(options?: ConfirmOptions): Promise<ConfirmResult>;
    }

    const iosToast: IosToastFunction;
    export default iosToast;
    
    // For destructuring: import { showConfirm } from 'ios-toast';
    export const showConfirm: (options?: ConfirmOptions) => Promise<ConfirmResult>;
}

declare global {
    interface Window {
        iosToast: {
            (
                type: 'success' | 'error' | 'warning' | 'info' | 'danger',
                title: string,
                message: string,
                duration?: number
            ): HTMLDivElement;
            showConfirm(options?: any): Promise<{ confirmed: boolean }>;
        };
        showConfirm(options?: any): Promise<{ confirmed: boolean }>;
    }
}
