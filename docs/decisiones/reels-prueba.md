# Reels de prueba de calcular.ar (2026-11-10)

Todos los días un creativo nuevo del banco `marketing/reels/guiones/`, 12 variaciones casi iguales
hechas con ffmpeg, subidas a Vercel Blob y publicadas a lo largo del día como **reels de prueba**
de Instagram (sólo los ven quienes no siguen la cuenta), más un reel real por día. Todos cierran con
"Hacé la cuenta con tus números, gratis, en calcular.ar". Es el mismo pipeline que @apex.stack
(repo `manu-180/apex-demos`, `scripts/prueba/`, decisión `docs/decisiones/reels-prueba.md` de ese
repo), copiado y adaptado: lo que se aprendió allá vale acá, y abajo está sólo lo que cambia o lo que
hay que saber para tocarlo. El contrato entre las piezas es `marketing/reels/scripts/prueba/CONTRATO.md`.

## Estado: apagado hasta que exista la cuenta

Manuel todavía no creó el Instagram de calcular. El workflow `.github/workflows/reels-prueba.yml`
corre sus crons igual, pero el paso Planear corta en segundos mientras la variable del repo
`REELS_PRUEBA_ACTIVOS` no valga `1`: no produce (no gasta voz ni quema guiones), no publica, no mide
ni commitea. `dry_run` sí produce, para probar, y deja los mp4 como artefacto 3 días.

## Prender

Lo de Manuel (una vez, con identidad suya):

1. Crear la cuenta de Instagram de calcular.ar y pasarla a **profesional** (creador o empresa).
2. Vincularla a una página de Facebook y agregarla a la app de Meta que ya usa APEX (la del
   `META_APP_ID` del namespace `apex_demos` en envkit), o crear una app nueva de tipo empresa.
3. Generar un token de larga duración con `instagram_content_publish`, `instagram_basic` e
   **`instagram_manage_insights`** desde el arranque (en APEX faltó y la elección del mejor reel quedó
   sólo por likes y comentarios), y pedir acceso a reels de prueba (`trial_params`) si la app no lo tiene.

Lo de Claude, apenas estén el token y el id:

- Secretos de `manu-180/calcular`: `IG_ACCESS_TOKEN`, `IG_USER_ID` (y `IG_INSIGHTS_TOKEN` sólo si el
  de insights es otro token), `BLOB_READ_WRITE_TOKEN` (store de Blob del proyecto calcular-ar).
  `ELEVENLABS_API_KEY` y `GEMINI_API_KEY` ya están cargados (los del namespace `apex_demos`).
- Variable del repo `REELS_PRUEBA_ACTIVOS=1`. Desde el tic siguiente produce y publica solo.
- Primer día: `dry_run` desde main para mirar los mp4 y después dejarlo correr.

## Lo que cambia respecto de @apex.stack

- **Dónde vive**: todo bajo `marketing/` (`marketing/reels/scripts/prueba`, `marketing/reels/scripts/reel`,
  `marketing/reels/guiones`, `marketing/reels/estado.json`). `scripts/vercel-ignorar.sh` no construye
  por cambios en `marketing/`, así que ni el código ni los commits del estado (unos 10 por día)
  disparan un build de calcular, que rearma más de 10.000 páginas y se paga.
- **Sin `npm ci` del sitio**: el pipeline no usa nada de Next. El workflow instala sólo
  `@vercel/blob` al lado del pipeline (`--prefix marketing/reels/scripts/prueba`).
- **`marketing/reels/scripts/reel/`** son las piezas de `scripts/reel` de apex-demos que el pipeline
  necesita (voz, Gemini de respaldo, tiempos, ffmpeg, cliente de la Graph API, música, GSAP),
  recortadas: `graph.mjs` es sólo `ErrorGraph` y `crearGraph`, y `render.mjs` sólo la versión de
  HyperFrames y las banderas de captura que no se traban en Actions.
- **Cierre**: "Hacé la cuenta con tus números, gratis, en calcular punto ar" (la voz dice "punto ar":
  con "calcular.ar" lo lee como una palabra rara; en pantalla se escribe calcular.ar). Dos estilos:
  `buscador` (se tipea calcular.ar en una barra, enter, llega "Tu cuenta, lista") y `tipografico`
  (isotipo, "Hacé la cuenta" y calcular.ar enorme con ".ar" en tinta). Los captions terminan con
  `CTA_CAPTION` de `lib.mjs`. No hay "Comentá WEB" ni venta por mensaje: el cierre lleva a la web.
- **Marca**: paletas `papel`, `selva`, `noche`, `menta`, `pizarra`, sacadas del sitio (esmeralda
  #059669 a #34D399, verde profundo #022C22, papel #FAFAF9, zinc); Geist de 400 a 800 en todo (el
  sitio no usa Bricolage) y el isotipo de `src/app/icon.svg`.
- **Formatos**: `chat`, `mito` y `explicador`. `antes-despues` (una web fea que se vuelve premium)
  era de APEX y se sacó. El explicador suma el visual **`cuenta`**: la operación como un ticket,
  renglón por renglón, con el resultado en el acento. Sus valores no aceptan montos en pesos.
- **Rigor YMYL**: `revisarGuion` exige `fuentes` (1 a 4, url `.gob.ar`, fecha `consultado`) en cada
  guion, y `banco.test.mjs` corre todo el banco real contra los validadores y rechaza montos en
  pesos. Los guiones hablan de reglas que no envejecen con la inflación (artículos, plazos,
  porcentajes, fechas), nunca de importes. El banco inicial (24) se verificó el 10/11/2026 contra el
  texto consolidado de la LCT en InfoLEG (ya con la Ley 27.802) y la página de recategorización de
  ARCA; las otras fuentes llevan la fecha en que las verificó calcular.
- **Cupo**: `RESERVA_CUENTA = 5` (lo que se publique a mano), no los 15 que APEX guarda para las demos.
- **`comentarios_web`** queda en el estado por compatibilidad con el esquema de APEX, pero en calcular
  no mide una venta: el puntaje del reel real se apoya en guardados, compartidos y comentarios.
- **Sin Kairo ni Sentry de APEX**: una corrida que falla avisa con el mail de GitHub Actions.

## Los límites que se heredan (no tocar sin datos de esta cuenta)

- **12 por día, de a 2 por tic** (`POR_DIA`, `MAX_POR_CORRIDA`). En @apex.stack Meta cortó con
  `9/2207078` ("User is performing too many actions") después de 8 a 11 publicaciones en pocas
  horas, con el cupo de 100 casi sin usar: el techo es el antispam de la cuenta, no el cupo. Una
  cuenta nueva es más frágil todavía. `REELS_PRUEBA_POR_DIA` (variable) lo mueve sin código; subir
  sólo después de una semana limpia.
- **Un reel real por día** desde el tic de las 19:17: la mejor prueba de un creativo anterior, sin
  `trial_params` y con `share_to_feed=false`, para que quede en la pestaña Reels y no llene la grilla.
- Reels de prueba con `graduation_strategy: MANUAL`: Instagram nunca les muestra a los seguidores
  12 copias casi iguales.
- Todo lo demás (agenda, matriz de variaciones, nunca publicar dos veces, errores de Meta, pausas,
  estado) es igual que en APEX y está explicado en su decisión.

## Probar

- `node --test "marketing/reels/scripts/prueba/*.test.mjs"` (Node 24 no acepta la carpeta sola).
- Corrida seca local, con voz:
  `envkit run -p apex_demos --only ELEVENLABS_API_KEY,GEMINI_API_KEY -- node marketing/reels/scripts/prueba/correr.mjs producir --seco <dir> --guion <clave> [--n 3]`.
- En GitHub: Actions → Reels de prueba → Run workflow desde main con `dry_run`.
- Regenerar los cierres: `node marketing/reels/scripts/prueba/cta/renderizar.mjs` (~20 s por clip).
