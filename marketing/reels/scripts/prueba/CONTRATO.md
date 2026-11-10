# Reels de prueba de calcular.ar: contrato entre las piezas (2026-11-10)

Copiado de @apex.stack (repo `manu-180/apex-demos`, `scripts/prueba/CONTRATO.md`) y adaptado a
calcular: todos los días un creativo nuevo del banco (temas que varían: comedia, técnico, negocio,
mitos), 12 copias casi iguales con algo distinto cada una (zoom, color, velocidad, gancho,
música…), publicadas en la cuenta de Instagram de calcular.ar como **reels de prueba** (Instagram se
los muestra sólo a quien no sigue la cuenta). Todas cierran con el mismo llamado: **"Hacé la cuenta
con tus números, gratis, en calcular.ar"**. Por qué funciona así: `docs/decisiones/reels-prueba.md`.

## Las piezas y quién escribe qué

```
marketing/reels/guiones/<clave>.json   banco de guiones (uno por creativo; se usa cada uno una vez)
marketing/reels/scripts/prueba/formatos/<formato>/  plantilla HyperFrames de cada formato + armar.mjs
marketing/reels/scripts/prueba/cta/                 el cierre "Hacé la cuenta ... calcular.ar" (clips ya renderizados, commiteados)
marketing/reels/scripts/prueba/assets/              sfx, fuentes y logo compartidos (no se tocan)
marketing/reels/scripts/prueba/*.mjs                producir, variar, publicar, medir (el pipeline)
.github/workflows/reels-prueba.yml  corre todo solo
marketing/reels/estado.json            lo que se hizo y se publicó, con métricas
```

Cuerpo (formato, HyperFrames, con voz + sfx, SIN música) → variaciones con ffmpeg (zoom, color,
velocidad, música, cierre) → se le pega el clip del cierre → mp4 final → Vercel Blob → reel de
prueba por la Graph API.

## Reglas que valen para todo

- Castellano rioplatense con voseo, natural, sin "che" ni lunfardo forzado. Nada de neutro.
- Nunca un negocio real, una persona real ni una marca existente. Marcas y nombres siempre ficticios.
- **Rigor YMYL**: cada dato laboral o fiscal sale de una norma o un organismo oficial y va en
  `fuentes`, con la fecha en que se leyó. Sin cifras inventadas.
- **Sin montos en pesos** (cambian con cada aumento y los reels quedan): artículos, plazos,
  porcentajes, fechas y ejemplos en sueldos ("4 años y 5 meses son 5 sueldos").
- Vetos de diseño de Manuel: nada de marquee, nada de caret de texto visible, nada de fondo plano
  sin carácter (grano, luz, grilla, profundidad), sombras nunca teñidas con el color de acento,
  **nunca numerar bloques** (`01`, `02 · Título`, pasos numerados, listas con número en pantalla).
- Subtítulos de la voz: skill `subtitulos-premium` (máximo 2 líneas, sin caja detrás, sólo se
  resalta la palabra que suena).
- Movimiento: skills `hyperframes`, `motion-doctrine`, `edicion-reels`. Nada se mueve por moverse.
- Video 1080×1920, 30 fps. Zona segura de Reels: nada importante en los 220 px de arriba, los 420
  de abajo ni los 120 de la derecha (botones de Instagram).

## Paletas (mismos nombres en todos los formatos y en el cierre)

| clave | fondo | superficie | tinta | tenue | acento |
|---|---|---|---|---|---|
| `papel` | #FAFAF9 | #FFFFFF | #18181B | #71717A | #059669 |
| `selva` | #022C22 | #064E3B | #ECFDF5 | #9CC9B6 | #34D399 |
| `noche` | #0B0F0E | #151B19 | #F4F4F1 | #9AA39F | #34D399 |
| `menta` | #ECFDF5 | #FFFFFF | #052E26 | #4D6E63 | #047857 |
| `pizarra` | #18181B | #232327 | #FAFAF9 | #A1A1AA | #6EE7B7 |

Salen del sitio: esmeralda #059669 a #34D399 (el isotipo), verde profundo #022C22 (la imagen OG),
papel #FAFAF9 y zinc. Fuentes (en `marketing/reels/scripts/prueba/assets/fuentes/`): Geist 400 a 800
(títulos en 800 con tracking cerrado, como el sitio) y Geist Mono 500 para números. Isotipo:
`assets/calcular-icon.svg` (copia de `src/app/icon.svg`).

## El guion (`marketing/reels/guiones/<clave>.json`)

```jsonc
{
  "version": 1,
  "clave": "001-aguinaldo-mejor-sueldo", // /^[a-z0-9]+(-[a-z0-9]+)*$/, igual al nombre del archivo; el número ordena el banco
  "titulo": "Cómo se calcula el aguinaldo", // ≤ 60, para el estado (no sale en el video)
  "categoria": "comedia",                // comedia | tecnico | negocio | mito
  "formato": "chat",                     // chat | mito | explicador
  "paleta": "papel",                     // una de las de arriba
  "hooks": ["…", "…", "…"],              // exactamente 3, ≤ 8 palabras c/u: el texto que abre el video (y se dice si hay voz)
  "voz": "…",                            // texto locutado DESPUÉS del hook y ANTES del cierre; null en chat
  "contenido": { },                      // depende del formato, abajo
  "captions": ["…", "…", "…"],           // 3 a 5 cuerpos de caption distintos, ≤ 300 caracteres, sin el CTA
  "hashtags": ["aguinaldo", "…"],        // 8 a 15, sin #, sin espacios, en minúscula
  "fuentes": [ { "nombre": "Ley de Contrato de Trabajo 20.744 (InfoLEG)", "url": "https://servicios.infoleg.gob.ar/…", "consultado": "2026-11-10" } ]  // 1 a 4, sólo .gob.ar
}
```

- `voz`: 25 a 55 palabras. Con el hook adelante y el cierre atrás el reel dura 18 a 30 s.
- El cierre (calcular.ar) NO va en `voz` ni en `captions`: lo pone el pipeline.

### `contenido` por formato

**`chat`** (comedia, sin voz: música + sfx). Una conversación en un celular.
```jsonc
{ "contacto": "Cliente nuevo",           // ≤ 24, nombre del chat (ficticio, sin apellido real)
  "mensajes": [ { "de": "ellos", "texto": "…" }, { "de": "yo", "texto": "…" } ],  // 5 a 9, ≤ 90 caracteres
  "remate": "…" }                         // ≤ 60, el golpe final en grande, o null
```

**`mito`** (con voz). Tarjetas que se dan vuelta: lo que se cree → lo que es.
```jsonc
{ "tarjetas": [ { "mito": "…", "realidad": "…" } ] }   // 2 o 3; mito ≤ 60, realidad ≤ 80
```
La voz cuenta los mitos en el mismo orden; cada tarjeta aparece cuando la voz dice su `mito`.

**`explicador`** (técnico o negocio, con voz). Bloques visuales que entran con la voz.
```jsonc
{ "bloques": [ { "frase": "…", "visual": { "tipo": "…", … } } ] }  // 3 a 5
```
`frase`: 2 a 6 palabras copiadas tal cual de `voz`; el visual entra cuando la voz las dice.
Tipos de `visual` (y nada más):
- `{ "tipo": "titulo", "texto": "…" }` (≤ 40)
- `{ "tipo": "navegador", "url": "tunegocio.com", "estado": "lento" | "rapido" }` página que carga
- `{ "tipo": "busqueda", "consulta": "…", "resultados": ["…", "…", "…"], "destacado": 0 }` Google
- `{ "tipo": "celular-vs-compu", "celular": "…", "compu": "…" }` cómo se ve en cada uno (≤ 40)
- `{ "tipo": "comparacion", "izq": { "titulo": "…", "items": ["…"] }, "der": { … } }` 2 a 3 items ≤ 32
- `{ "tipo": "codigo", "lineas": ["…"] }` 2 a 5 líneas ≤ 36, código real y correcto
- `{ "tipo": "cuenta", "filas": [ { "concepto": "…", "valor": "…" } ], "total": { "concepto": "…", "valor": "…" } }`
  la operación como un ticket: 2 a 4 filas, concepto ≤ 30, valor ≤ 12, sin \$ ni pesos; `total` sale en el acento

De APEX quedaron `navegador`, `busqueda`, `celular-vs-compu` y `codigo`; para calcular sirven `titulo`,
`cuenta` y `comparacion`.

### Cómo escribir la voz para que cada formato calce

Lo que `validar()` exige y lo que la plantilla espera (si no se cumple, el video sale igual pero peor):

- `mito`: la voz dice cada `mito` casi tal cual y en el mismo orden (lo exige `validar`).
- `explicador`: cada `frase` arranca al menos 6 palabras dichas después de la anterior (lo exige
  `validar`; con menos, el visual no llega a leerse). En `comparacion`, `der` es la opción que gana.
- `chat`: el cuerpo no pasa de 26 s (cada mensaje queda 0,9 s + 0,045 s por carácter).
- Antes de commitear guiones nuevos: correr `validar()` de su formato sobre cada uno.

## Un formato (`marketing/reels/scripts/prueba/formatos/<formato>/`)

Cada formato es una carpeta con su plantilla HyperFrames y un `armar.mjs` que exporta:

```js
/**
 * @param {{ guion: object, hook: 0|1|2, voz: { wav: string, duracion_s: number,
 *           palabras: { texto: string, inicio_s: number, fin_s: number }[] } | null,
 *           salida: string }} p   // salida: carpeta vacía donde queda el proyecto HyperFrames
 * @returns {Promise<{ duracion_s: number }>}
 */
export async function armar(p)
/** @param {object} guion @returns {string[]} problemas; vacío = válido */
export function validar(guion)
```

- `voz.palabras` incluye el hook (al principio) y el cuerpo, con tiempos sobre `voz.wav`. En
  `chat` llega `voz: null`.
- El proyecto que queda en `salida` se renderiza con
  `npx hyperframes@0.8.140 render <salida> -o <mp4> --fps 30 -q delivery`
  (ver `marketing/reels/scripts/reel/render.mjs` para las banderas que no se traban en Actions: cuadros en JPG,
  BeginFrame, `--no-low-memory-mode --workers 1`).
- El audio del cuerpo lleva voz y sfx, **sin música**: la música la pone la variación.
- Los últimos 0,3 s quedan quietos (ahí se pega el cierre con un corte limpio).
- Nada de red en el render: todo asset local dentro de `salida`.

## El cierre (`marketing/reels/scripts/prueba/cta/`)

Clips ya renderizados y commiteados, uno por paleta y por estilo:
`marketing/reels/scripts/prueba/cta/clips/<paleta>-<estilo>.mp4` (1080×1920, 30 fps, h264 + aac 48 kHz estéreo,
voz + sfx, sin música, 3,5 a 5 s) y `marketing/reels/scripts/prueba/cta/clips.json`:
```json
[ { "id": "papel-buscador", "paleta": "papel", "estilo": "buscador", "archivo": "clips/papel-buscador.mp4", "duracion_s": 4.9 } ]
```
La voz dice exactamente "Hacé la cuenta con tus números, gratis, en calcular punto ar." y en
pantalla se escribe calcular.ar. Estilos: `buscador` y `tipografico` (ver `cta/README.md`). Arranca
con un cuadro que corta limpio desde cualquier cuerpo.

## El estado (`marketing/reels/estado.json`, lo escribe el pipeline)

```jsonc
{
  "version": 1,
  "actualizado": "2026-11-08T22:00:00Z",
  "pausado": null,                         // o "motivo": no se publica nada mientras tenga texto
  "insights": { "disponible": false, "motivo": "el token no tiene instagram_manage_insights" },
  "creativos": {
    "2026-11-08-001-aguinaldo-mejor-sueldo": {
      "clave": "001-aguinaldo-mejor-sueldo", "fecha": "2026-11-08", "titulo": "…", "categoria": "comedia",
      "formato": "explicador", "paleta": "papel",
      "producido_at": "…" , "error": null, "intentos": 0,
      "variantes": [ {
        "id": "v01",
        "cambios": { "hook": 0, "zoom": 1.06, "encuadre": "centro", "velocidad": 1.0,
                     "color": "calido", "musica": "acustica-1", "cierre": "papel-buscador", "textura": "grano" },
        "resumen": "gancho 1 · zoom 6 % · cálido · acústica",   // ≤ 60, en criollo
        "video_url": "https://….blob.vercel-storage.com/…", "duracion_s": 23.4,
        "caption": "…", "publicar_at": "…",
        "ig_media_id": null, "permalink": null, "publicado_at": null,
        "error_publicar": null, "intentos_publicar": 0,
        "metricas": null   // o { "medido_at", "vistas", "alcance", "likes", "comentarios",
                           //      "compartidos", "guardados", "comentarios_web", "promedio_visto_s" }
                           // comentarios_web: queda del esquema de APEX; en calcular no es una venta
                           // lo que Instagram no deja leer va null, nunca 0
      } ]
    }
  }
}
```

Campos que suma el pipeline: `saltados` (guiones que no validaron, con
el motivo), `pausado_por` (`token`, `permiso`, `bloqueo`: la pausa por token se levanta sola cuando
el token vuelve a andar, las otras a mano), `ig_container_id` en cada variante (dedupe si la
publicación no llegó a guardarse) y `descartada_at` (variante de un día anterior que no salió).
