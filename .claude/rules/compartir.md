---
paths:
  - "src/motor/compartir/**"
  - "src/motor/i18n/redes.ts"
  - "src/app/api/e/protocolo.ts"
  - "src/components/panel/boca/**"
---

# Compartir (botón, panel de redes y medición)

- Los canales salen de `CANALES_COMPARTIR` (`ref.ts`); `/api/e` los importa y suma «link» (la barra de
  calcular.ar). Un canal nuevo va ahí, en `NOMBRE_CANAL` del panel y en check_rastreo. El SQL del panel
  agrupa por `props->>'canal'`, no hace falta migración.
- Instagram no acepta links: `compartirInstagram` manda la imagen vertical (1080 x 1920) a la hoja del
  sistema en el celular o la descarga en escritorio, y deja el link (con `?r=`) en el portapapeles para
  el sticker «Enlace». El portapapeles se escribe antes del share y sin await: si se espera, el celular
  pierde la activación del toque y `navigator.share` tira NotAllowedError. La imagen se precarga.
- Facebook usa el sharer con la URL y nada más: el texto lo ignora, la vista previa es la OG.
- `Redes.tsx` es el panel con tarjeta (horas y mundo). Las imágenes vienen de la OG de cada página con
  `formato=historia|cuadrado`; nunca llevan un monto de la persona. Sin `cuadrado` (calcular.ar) no hay
  selector de formato.
- Los nombres de marca (Instagram, Facebook, WhatsApp, X) van fijos en el componente, no en el
  diccionario: check_i18n los marca como «sin traducir».
