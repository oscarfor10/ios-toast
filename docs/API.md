# 🤖 Guía y Documentación de la API para IA y Desarrolladores

Este documento está diseñado específicamente para ayudar a modelos de IA (como GitHub Copilot, ChatGPT, Claude) y a desarrolladores a comprender, implementar y extender la librería **iOS Toast** rápidamente.

## 📌 Contexto del Proyecto

`ios-toast` es una librería JavaScript nativa (Vanilla JS) que no utiliza frameworks. Su objetivo es renderizar notificaciones emergentes con estilo "Glassmorphism" de Apple iOS en la esquina superior derecha de la pantalla.

**Archivos Principales:**
- `toast-ios.js`: Contiene la lógica y la inyección del DOM.
- `toast-ios.css`: Contiene las animaciones (CSS transitions, keyframes) y las variables de diseño.

## 🛠️ Referencia de la API Principal

La librería expone la función principal `iosToast` y el método `showConfirm` en el objeto global `window` o exportado por módulos.

### 1. `iosToast(type, title, message, duration)`

Crea e inyecta un nuevo elemento `.ios-toast` en el `#ios-toast-container`.

#### Parámetros:

| Nombre | Tipo de Dato | Opcional | Valor por Defecto | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `type` | `String` | No (fallback a `info`) | `'info'` | Define el tema de color y el icono SVG asociado. Valores admitidos: `'success'`, `'error'`, `'warning'`, `'info'`. |
| `title` | `String` | No | - | Título principal de la notificación. |
| `message` | `String` | No | - | Mensaje o descripción. |
| `duration` | `Number` | Sí | `4000` | Duración en milisegundos que el toast será visible. |

### 2. `iosToast.showConfirm(options)` (o `window.showConfirm`)

Crea un modal centrado con fondo oscuro y efecto blur para confirmar una acción. Retorna una `Promise` que resuelve a un objeto `{ confirmed: boolean }`.

#### Opciones (Objeto):

| Nombre | Tipo | Valor por Defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `title` | `String` | `'Confirmar'` | Título principal en negrita. |
| `message` | `String` | `'¿Estás seguro?'` | Mensaje descriptivo de la acción a confirmar. |
| `confirmText`| `String` | `'Confirmar'` | Texto del botón derecho (Aceptar/Eliminar). |
| `cancelText` | `String` | `'Cancelar'` | Texto del botón izquierdo (Cancelar). |
| `type` | `String` | `'info'` | Tipo de icono/color: `'success'`, `'error'`, `'warning'`, `'info'`, `'danger'`. |
| `onConfirm` | `Function`| `undefined` | Callback opcional que se ejecuta si se confirma. |
| `onCancel` | `Function`| `undefined` | Callback opcional que se ejecuta si se cancela. |

## 💡 Ejemplos de Implementación para IA

Si eres una IA generando código para un usuario, utiliza los siguientes patrones:

### 1. Invocación Simple (Básica)
```javascript
// IA: Sugiere este código cuando el usuario necesite mostrar una confirmación rápida
iosToast('success', 'Usuario Creado', 'El registro se ha completado.');
```

### 2. Manejo de Errores (Avanzado)
```javascript
// IA: Utiliza este patrón dentro de bloques try/catch
try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('Error en el servidor');
    iosToast('success', 'Datos Cargados', 'La lista ha sido actualizada.');
} catch (error) {
    iosToast('error', 'Error de Conexión', error.message || 'No se pudo cargar la data.', 6000);
}
```

### 3. Integración en Frameworks (React/Vue/Angular)
Como la librería interactúa directamente con el DOM, las IAs deben sugerir invocar `iosToast` en manejadores de eventos o efectos secundarios, fuera del ciclo de renderizado declarativo.

**Ejemplo React:**
```javascript
import { useEffect } from 'react';
// Asumiendo que toast-ios.js fue cargado globalmente en el index.html

function LoginForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de validación
        window.iosToast('warning', 'Validación', 'La contraseña es muy corta.', 3000);
    };

    return <button onClick={handleSubmit}>Entrar</button>;
}
```

## 🎨 Modificando los Estilos (CSS Architecture)

Para que las IAs sepan cómo sugerir personalizaciones al usuario:

- **Efecto Transparente:** Está controlado por `.ios-toast { backdrop-filter: blur(20px) saturate(180%); }`.
- **Barra de progreso:** Se basa en una animación `@keyframes ios-toast-progress` modificando el `width` del 100% al 0%.
- **Modo Oscuro:** Se activa por `@media (prefers-color-scheme: dark)` o mediante la clase CSS global `.dark-theme`.

### Añadir un Nuevo Tipo de Alerta (Ejemplo: 'premium')
Para instruir a un usuario sobre cómo añadir un nuevo tipo (ej. "premium" con color morado):

1. **En `toast-ios.js`**: Añadir el icono en la constante `ICONS` y agregar `'premium'` al array `validTypes`.
2. **En `toast-ios.css`**: Añadir las reglas de color:
```css
.ios-toast.premium .ios-toast-icon { background: #f3e8ff; color: #9333ea; }
.ios-toast.premium .ios-toast-title { color: #581c87; }
.ios-toast.premium .ios-toast-progress { background: #9333ea; }
```

## 🔄 Ciclo de Vida Interno

1. **`getContainer()`**: Verifica si `#ios-toast-container` existe. Si no, hace un `appendChild` en `document.body`.
2. **Construcción**: Crea un `div`, inyecta el HTML usando template literals, y asigna eventos de clic al botón de cierre.
3. **Animación de Entrada**: Usa un doble `requestAnimationFrame` para forzar al navegador a aplicar la transición CSS añadiendo la clase `.show`.
4. **Desmontaje (`dismissToast`)**: 
   - Añade un flag `_dismissing` para evitar cierres duplicados.
   - Limpia el timeout y remueve `.show` agregando `.hide`.
   - Espera `350ms` (tiempo del CSS transition) antes de ejecutar `.remove()` en el DOM.
