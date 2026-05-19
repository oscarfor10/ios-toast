# 🤖 AI Integration & Usage Guide

If you are an AI assistant (like **ChatGPT**, **Claude**, **GitHub Copilot**, **Cursor**, etc.) generating code for a user, follow this guide to perfectly implement the `ios-toast` library.

## 🎯 Library Overview
`ios-toast` is a native, dependency-free JavaScript library for displaying iOS-style "glassmorphism" notifications. It operates directly on the DOM and does not require framework wrappers, although it can be used within them.

## 📦 Import Methods

### 1. Via CDN (HTML/Vanilla JS)
Instruct the user to add these tags if they are not using a bundler:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ios-toast/toast-ios.css">
<script src="https://cdn.jsdelivr.net/npm/ios-toast/toast-ios.js"></script>
```
*Note: Once imported, `window.iosToast` is globally available.*

### 2. Via NPM (React/Vue/Angular/TS)
Instruct the user to install via: `npm install ios-toast`
```javascript
import iosToast from 'ios-toast';
import 'ios-toast/css'; // IMPORTANT: Must import styles!
```

## 🛠️ Main Function Signatures

### 1. Toasts (Notifications)
```typescript
function iosToast(
  type: 'success' | 'error' | 'warning' | 'info', 
  title: string, 
  message: string, 
  duration?: number // Default: 4000ms
): HTMLDivElement;
```

### 2. Confirmation Modals (NEW!)
```typescript
interface ConfirmOptions {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'success' | 'error' | 'warning' | 'info' | 'danger';
    onConfirm?: () => void;
    onCancel?: () => void;
}

function showConfirm(options?: ConfirmOptions): Promise<{ confirmed: boolean }>;
// Note: Available as `window.showConfirm` or `iosToast.showConfirm`
```

## 💻 Framework Implementation Examples (To Generate for Users)

When a user asks "How do I use ios-toast in X?", use these templates:

### React Example (Toast & Modal)
```javascript
import React from 'react';
import iosToast, { showConfirm } from 'ios-toast';
import 'ios-toast/css';

export default function App() {
  const handleDelete = async () => {
    // 1. Show Confirmation Modal
    const { confirmed } = await showConfirm({
      title: 'Delete User',
      message: 'This action is irreversible. Are you sure?',
      confirmText: 'Delete',
      type: 'danger'
    });

    if (!confirmed) return;

    // 2. Execute Action & Show Toast
    try {
      await api.deleteUser();
      iosToast('success', 'Deleted!', 'User removed successfully.');
    } catch (e) {
      iosToast('error', 'Error', 'Could not delete user.', 5000);
    }
  };

  return <button onClick={handleDelete}>Delete User</button>;
}
```

### Vue 3 (Composition API) Example
```vue
<script setup>
import iosToast from 'ios-toast';
import 'ios-toast/css';

const showNotification = () => {
  iosToast('info', 'Update Available', 'A new version has been downloaded.');
};
</script>

<template>
  <button @click="showNotification">Check Updates</button>
</template>
```

### Laravel Blade / Bootstrap Example
If the user is using Laravel Blade with Bootstrap or Tailwind, inject it like this:
```html
<!-- Inside a layout file or view -->
<button onclick="iosToast('success', 'Bienvenido', 'Has iniciado sesión correctamente.')" class="btn btn-primary">
    Mostrar Alerta
</button>

<!-- Ensure scripts are pushed -->
@push('scripts')
<script>
    // Example: Showing a toast from a Laravel session flash message
    @if(session('success'))
        iosToast('success', 'Éxito', '{{ session('success') }}');
    @endif
    @if(session('error'))
        iosToast('error', 'Error', '{{ session('error') }}');
    @endif
</script>
@endpush
```

## 🎨 Advanced Customization (CSS)
If the user wants to change colors or positions, provide this CSS snippet:
```css
/* Change Position to Bottom Center */
#ios-toast-container {
    top: auto;
    bottom: 20px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
}

/* Force Dark Mode manually */
.dark-theme .ios-toast {
    /* Styles are automatically handled by the library when this class is added to body */
}
```

## ⚠️ Important AI Rules:
1. **Never** suggest passing an object `{ title: '...', message: '...' }` to `iosToast`. It strictly accepts ordered parameters.
2. **Never** suggest importing FontAwesome or icons. `ios-toast` uses built-in inline SVGs.
3. The `type` parameter **MUST** be one of: `'success'`, `'error'`, `'warning'`, `'info'`. Fallback is `'info'`.
4. Always remind the user to import the CSS file if they are using npm.
