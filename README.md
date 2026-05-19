<div align="center">
  <h1>🍏 iOS Toast</h1>
  <p><strong>A beautiful, lightweight, dependency-free iOS-style toast notification library for the web.</strong></p>

  <p>
    <a href="https://www.npmjs.com/package/ios-toast"><img src="https://img.shields.io/npm/v/ios-toast.svg?style=flat-square&color=blue" alt="NPM Version" /></a>
    <a href="https://bundlephobia.com/package/ios-toast"><img src="https://img.shields.io/bundlephobia/minzip/ios-toast?style=flat-square&color=orange" alt="Bundle Size" /></a>
    <img src="https://img.shields.io/badge/dependencies-none-brightgreen.svg?style=flat-square" alt="Dependencies: none" />
    <a href="https://github.com/oscarfor10/ios-toast/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/ios-toast.svg?style=flat-square&color=green" alt="License" /></a>
    <img src="https://img.shields.io/badge/types-included-blueviolet?style=flat-square" alt="TypeScript Support" />
  </p>

  <p>
    <i>Instantly add premium, native-feeling glassmorphism notifications to your React, Vue, Angular, Laravel or Vanilla JS project.</i>
  </p>
</div>

---

## 📑 Table of Contents
- [Why use ios-toast?](#-why-use-ios-toast)
- [Installation](#-installation)
- [Basic Usage](#-basic-usage)
- [Alert Types](#-alert-types)
- [API Reference](#-api-reference)
- [Advanced Examples (Frameworks)](#-advanced-examples-frameworks)
- [Customization & Dark Mode](#-customization--dark-mode)
- [AI Integration Guide](#-ai-integration-guide)
- [Troubleshooting & FAQ](#-troubleshooting--faq)
- [Contributing](#-contributing)

---

## ⚡ Why use ios-toast?

Unlike other heavy notification libraries (like SweetAlert2 or Toastify), `ios-toast` focuses on delivering an **Apple-like aesthetic** with zero bloat.

- 🪶 **Ultra Lightweight**: Less than 3KB (minified CSS + JS).
- 🚫 **Zero Dependencies**: No React, jQuery, or external icon fonts required (SVG icons are inline).
- 🎨 **Glassmorphism Built-in**: Perfect iOS-like backdrop blur out of the box.
- ♿ **Accessible**: ARIA attributes and screen-reader ready (`role="alert"`, `aria-live`).
- 🤖 **AI-Friendly**: Perfectly documented JSDoc and `AI_USAGE.md` so Cursor, Copilot, and ChatGPT can generate your code instantly.
- 📦 **Modern Modules**: Supports NPM, ES Modules, CommonJS, and standard CDN script tags.

---

## 📦 Installation

### Via NPM (Recommended for React/Vue/Angular)
```bash
npm install ios-toast
```

### Via CDN (For HTML/Vanilla JS/Laravel)
Add the stylesheet in your `<head>` and the script before closing `<body>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ios-toast/toast-ios.css">
<script src="https://cdn.jsdelivr.net/npm/ios-toast/toast-ios.js"></script>
```

---

## 🚀 Basic Usage

If you installed via NPM, import the library and its CSS:
```javascript
import iosToast from 'ios-toast';
import 'ios-toast/css'; // Important!

iosToast('success', 'Saved!', 'The operation was successful.');
```

If you are using the CDN, `iosToast` is globally available on the `window` object:
```html
<button onclick="iosToast('info', 'Hello', 'Welcome to ios-toast!')">
    Show Toast
</button>
```

---

## 🎨 Alert Types (Toasts)

The library includes 4 beautifully crafted default types:

| Type | Color Theme | Best for |
| :--- | :--- | :--- |
| `'success'` | Green | Form submissions, saves, checkouts. |
| `'error'` | Red | Validation errors, network failures. |
| `'warning'` | Yellow | Destructive actions warnings, limits reached. |
| `'info'` | Blue | General announcements, new messages. |

```javascript
iosToast('success', 'Success!', 'Your profile was updated.');
iosToast('error', 'Failed!', 'Invalid email or password.');
iosToast('warning', 'Warning!', 'Your storage is almost full.');
iosToast('info', 'Heads up!', 'We updated our privacy policy.');
```

---

## ⚡ Confirm Modals (NEW!)

Need a centered, beautifully blurred confirmation dialog? We've got you covered with `showConfirm`. It uses Promises so you can elegantly wait for user action with `async/await`.

### SweetAlert/Apple-style Confirm Dialog
```javascript
const result = await iosToast.showConfirm({
    title: "Delete File",
    message: "Are you sure you want to delete this file? This action cannot be undone.",
    confirmText: "Delete",
    cancelText: "Cancel",
    type: "danger"
});

if (result.confirmed) {
    // User clicked Delete
    iosToast('success', 'Deleted', 'File deleted successfully.');
} else {
    // User clicked Cancel or outside the modal
}
```

*Note: If you're using the CDN, `showConfirm()` is also available globally on the `window` object.*

---

## ⚙️ API Reference

### `iosToast(type, title, message, duration?)`

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | Yes | `'info'` | The visual style and icon of the toast. |
| `title` | `String` | Yes | - | Bold title displayed at the top. |
| `message`| `String` | Yes | - | Descriptive text below the title. |
| `duration`| `Number` | No | `4000` | Time in milliseconds before the toast auto-dismisses. |

### `iosToast.showConfirm(options)`

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `String` | `'Confirmar'` | Bold title of the modal. |
| `message` | `String` | `'¿Estás seguro?'` | Descriptive message. |
| `confirmText`| `String` | `'Confirmar'` | Text for the right action button. |
| `cancelText` | `String` | `'Cancelar'` | Text for the left action button. |
| `type` | `'success'\|'error'\|'warning'\|'info'\|'danger'` | `'info'` | Changes the color of the confirm button and top icon. |
| `onConfirm` | `Function` | `undefined` | Optional callback when confirmed. |
| `onCancel` | `Function` | `undefined` | Optional callback when cancelled. |

*Returns a `Promise<{ confirmed: boolean }>`.*

---

## 💻 Advanced Examples (Frameworks)

### ⚛️ React
```jsx
import React from 'react';
import iosToast from 'ios-toast';
import 'ios-toast/css';

const App = () => {
  const fetchUser = async () => {
    try {
      await api.getUser();
      iosToast('success', 'Welcome back', 'You are now logged in.');
    } catch (err) {
      iosToast('error', 'Connection Error', 'Please check your internet.');
    }
  };

  return <button onClick={fetchUser}>Login</button>;
};
```

### 🟩 Vue 3 (Composition API)
```vue
<script setup>
import iosToast from 'ios-toast';
import 'ios-toast/css';

const submitForm = () => {
  iosToast('success', 'Form Submitted', 'We will contact you soon.', 5000);
};
</script>
<template>
  <button @click="submitForm">Submit</button>
</template>
```

### 🐘 Laravel Blade + TailwindCSS
```html
<button 
    onclick="iosToast('success', '¡Perfecto!', 'Los datos se guardaron en la base de datos.')" 
    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl shadow-md transition-all">
    Guardar Datos
</button>

<!-- Flash Messages Auto-Trigger -->
@if(session('success'))
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            iosToast('success', 'Éxito', "{{ session('success') }}");
        });
    </script>
@endif
```

---

## 🎨 Customization & Dark Mode

### Auto Dark Mode 🌙
`ios-toast` detects the user's OS preference via `@media (prefers-color-scheme: dark)` and automatically adjusts the contrast, blur, and text colors. 

To force dark mode programmatically across your app, just add the `.dark-theme` class to your `<body>` tag:
```html
<body class="dark-theme">
```

### Custom Positioning
By default, toasts appear at the top-right. You can override this in your own CSS:
```css
/* Bottom Center Positioning */
#ios-toast-container {
    top: auto !important;
    bottom: 20px !important;
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%);
}
```

---

## 🤖 AI Integration Guide

Are you building an app using **Cursor**, **GitHub Copilot**, or **ChatGPT**? 
Tell your AI to check our [AI_USAGE.md](./AI_USAGE.md) file! This library was specifically designed with advanced JSDoc and clear patterns so AI models can confidently inject it into your code without hallucinations.

*Prompt example for Cursor:*
> "Add a success notification using ios-toast after the user submits this form. Reference AI_USAGE.md for syntax."

---

## 🛠️ Troubleshooting & FAQ

**Q: I get `iosToast is not defined`**
A: If using NPM, make sure you imported it: `import iosToast from 'ios-toast'`. If using CDN, make sure the `<script>` tag is placed correctly in your HTML.

**Q: The styles look broken / No animations.**
A: You forgot to import the CSS! 
In React/Vue: `import 'ios-toast/css';`
In HTML: `<link rel="stylesheet" href="path-to/toast-ios.css">`

**Q: Does it work on Mobile?**
A: Absolutely. `ios-toast` is mobile-first and uses native `-webkit-backdrop-filter` for smooth rendering on iOS Safari and Chrome.

---

## 🤝 Contributing

Contributions are always welcome! 
See [CONTRIBUTING.md](./CONTRIBUTING.md) for ways to get started.
Please ensure you abide by the [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## 📄 License

MIT © [oscarfor10](https://github.com/oscarfor10)
