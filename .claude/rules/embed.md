---
paths:
  - "src/motor/embed/**"
  - "src/app/(embed)/**"
  - "src/app/(intl)/intl/[[]mercado]/embed/**"
  - "src/motor/i18n/embed.ts"
  - "public/embed.js"
  - "next.config.ts"
---

# Calculadora embebible (/<m>/embed/<slug>)

Canal de backlinks: cualquier calculadora publicada, de cualquier país (presente o futuro), se
inserta con un iframe. Todo sale del registro; nada de listas a mano por país.

- **Dos rutas, dos layouts.** `/<m>/embed` es el generador y vive en el sitio normal
  (`src/app/(intl)/intl/[mercado]/embed`). `/<m>/embed/<slug>` es la calculadora embebida y vive en su
  propio layout raíz, `src/app/(embed)/embebido/[mercado]/[slug]`, porque el layout intl lleva header y
  footer. La URL pública llega ahí por los rewrites de `src/motor/embed/rutas.ts`, que `next.config.ts`
  pone ANTES de los de `hosts.ts`. El slug `embed` no puede ser de una calculadora (lo mira
  `scripts/check_embed.ts`).
- **`frame-ancestors *` solo en `/<m>/embed/<slug>`** (y en su ruta interna). Todo lo demás sigue en
  `'self'` o `'none'`. Sin cookies de cuenta, sin login, sin scripts de terceros en el embed.
- **`?tema` y `?acento` no pasan por el servidor**: los aplica `SCRIPT_OPCIONES` en el `<head>` antes del
  primer pintado, así la página es una sola, cacheada, para todos. Esa regla repite a mano la de
  `temaDe` y `acentoDe` (`src/motor/embed/opciones.ts`); `check_embed` las compara. Si se toca una, la
  otra. El `<html>` lleva `suppressHydrationWarning` por esto.
- **Sin ofertas de pago dentro del embed**: `OfertaResultado` (`src/motor/ui/Oferta.tsx`) lee
  `ContextoEmbed` y no monta nada. `PielCalculadora` no se toca: el embed le cambia la tarjeta y el tema
  por CSS (`src/motor/embed/estilos-embed.css`).
- **Alto automático**: el embed manda `postMessage` con su alto; `public/embed.js` lo aplica solo si el
  mensaje viene del origen del script Y de uno de los iframes de la página. Los nombres de mensaje y los
  topes están repetidos en `public/embed.js` (no pasa por el bundler): se cambian en los dos lados.
- **Medición**: el rastreador del layout registra la vista con el path real (`/<m>/embed/<slug>`), que
  ya la separa de las vistas normales sin tocar `src/app/api/e`. El link de marca del pie lleva
  `utm_source=embed`. El host de la página que enmarca llega como `ref_host`.
- **Link de marca**: siempre el nombre («Calculadora de CalcularYa», por idioma), `target=_blank`,
  `rel=noopener`. Nunca una palabra clave: es lo que pide Google para widgets.
