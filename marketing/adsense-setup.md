# AdSense — setup de CalculAR (estado y pasos)

> Fuente de verdad para inyectar y verificar AdSense. El publisher ID y el snippet
> son **públicos por diseño** (van en el HTML de todas las páginas) — no son secretos.

## Estado al 2026-06-13 (sesión 18/19)

- **Cuenta AdSense creada** por Manuel el 13/6/2026 con `manunv97@gmail.com`.
- **Publisher ID:** `ca-pub-1118110129260994`
- **País de pago:** Argentina (no se puede cambiar).
- **Sitio cargado:** `calcular.ar` → estado **"Requiere revisión"**.
- **Método de verificación elegido:** "Fragmento de código de AdSense" (script en el `<head>`).
- **Manuel NO tildó "Verificar" todavía** — hay que poner el código en el sitio PRIMERO.

## El snippet a inyectar (exacto)

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1118110129260994"
     crossorigin="anonymous"></script>
```

## Dónde y cómo va (en CalculAR)

- Archivo: `calcular-ar/src/app/layout.tsx` (root layout — lo hereda todo el sitio).
- Forma idiomática en Next.js App Router: usar `next/script` dentro de un `<head>` en el `<html>`:

```tsx
import Script from "next/script";
// ...
<html lang="es-AR" className={...}>
  <head>
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1118110129260994"
      crossOrigin="anonymous"
    />
  </head>
  <body ...>
```

- Verificar antes de commitear con la doc oficial de `next/script` (puede haber cambiado): el objetivo es que el `<script ... adsbygoogle.js?client=ca-pub-1118110129260994>` aparezca en el HTML servido de **todas** las páginas.

## Orden de ejecución (próxima sesión)

1. Inyectar el snippet en `layout.tsx`.
2. **Commit por path EXPLÍCITO** (`git commit calcular-ar/src/app/layout.tsx ...`) — NUNCA `git add -A`:
   el working tree tiene cambios sin commitear de Manuel en `robots.ts`/`sitemap.ts`/`BingSiteAuth.xml`
   (con BOM) que **no** deben entrar al commit ni al deploy. Vercel deploya el commit pusheado, así que
   commitear solo el layout deja esos cambios fuera del deploy. (AdSense NO está bloqueado por robots/sitemap.)
3. Push → deploy automático en Vercel. Verificar el deploy y que el script aparezca en el HTML de
   `https://calcular.ar` (ej. `curl -s https://calcular.ar | findstr adsbygoogle`).
4. Avisar a Manuel: "el código ya está en el sitio".
5. **Manuel** vuelve a AdSense → sitio `calcular.ar` → tilda **"Coloqué el código"** → **"Verificar"** →
   cuando verifica, **"Solicitar revisión"**.
6. Google revisa (unos días, a veces 2-4 semanas; ahora es revisión manual). Mientras tanto no hay nada que hacer.

## Recomendado además (mismo deploy o el siguiente)

- **`ads.txt`** en `calcular-ar/public/ads.txt` con la línea:
  `google.com, pub-1118110129260994, DIRECT, f08c47fec0942fa0`
  (formato estándar de AdSense; mejora la confianza/llenado. Confirmar la línea exacta en el panel
  de AdSense → "Sitios" → ads.txt cuando esté disponible.)

## Post-aprobación (Manuel, más adelante — ya en INBOX)

- **PIN postal:** Google manda un PIN por correo al juntar ~USD 10 → cargarlo en el panel.
- **CBU/cobro:** al llegar a ~USD 100 (umbral de pago) cargar datos bancarios.
- **Info tributaria:** completar el formulario tributario de EE.UU. dentro de AdSense (reduce retención).
- El sitio ya cumple los requisitos de aprobación (dominio propio + /sobre + /contacto + /privacidad + contenido original).
