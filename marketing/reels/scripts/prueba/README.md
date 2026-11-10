# Reels de prueba: el pipeline

Contrato entre las piezas: `CONTRATO.md`. Por qué está hecho así: `docs/decisiones/reels-prueba.md`.
Lo corre solo `.github/workflows/reels-prueba.yml`.

| Archivo | Qué hace |
|---|---|
| `lib.mjs` | Lo puro: estado, elección del guion, matriz de variaciones, captions, agenda, cupo, errores de Meta, métricas |
| `producir.mjs` | Guion → voz → 3 cuerpos (formato + HyperFrames) → variaciones → Blob → agenda en el estado |
| `variar.mjs` | Una variante con ffmpeg: zoom, encuadre, velocidad, color, textura, cierre, música, −14 LUFS, revisión de specs |
| `publicar.mjs` | Lo vencido como reel de prueba MANUAL, con cupo, deduplicación y pausas |
| `medir.mjs` | Likes, comentarios, e insights si hay permiso, de lo publicado en 14 días |
| `correr.mjs` | El punto de entrada del workflow |

## Comandos

```bash
node --test "marketing/reels/scripts/prueba/*.test.mjs"

# qué toca ahora (sólo lee; en Actions deja producir/publicar/medir en GITHUB_OUTPUT)
node marketing/reels/scripts/prueba/correr.mjs planear

# un creativo en seco: nada de Blob, Instagram ni estado del repo; todo queda en <dir>
envkit run -p apex_demos --only ELEVENLABS_API_KEY,GEMINI_API_KEY -- node marketing/reels/scripts/prueba/correr.mjs producir --seco <dir> --guion <clave> [--n 6]

# con dobles (formato, cierre o banco de otra carpeta)
node marketing/reels/scripts/prueba/correr.mjs producir --seco <dir> --formatos <dir> --cta <dir> --guiones <dir>

# de verdad (lo que hace el workflow). Nunca con los tokens de apex_demos: publicarían en @apex.stack
envkit run -p calcular-ar --only ELEVENLABS_API_KEY,GEMINI_API_KEY,BLOB_READ_WRITE_TOKEN -- node marketing/reels/scripts/prueba/correr.mjs producir [--guion <clave>]
envkit run -p calcular-ar --only IG_ACCESS_TOKEN,IG_USER_ID -- node marketing/reels/scripts/prueba/correr.mjs publicar [--ahora]
envkit run -p calcular-ar --only IG_ACCESS_TOKEN,IG_USER_ID -- node marketing/reels/scripts/prueba/correr.mjs medir
```

`--ahora` publica la próxima variante de hoy aunque no haya vencido. Variables: `REELS_PRUEBA_POR_DIA`
(12), `REELS_PRUEBA_ACTIVOS=1` (sin esto, todo apagado salvo `dry_run`), `REELS_PRUEBA_PAUSADOS=1` (frena producir y publicar), `REELS_PRUEBA_PRESET` (x264, `veryfast`),
`REELS_PRUEBA_PARALELO` (variantes a la vez; por defecto un cuarto de los núcleos).

Despausar después de un bloqueo o de un permiso: `"pausado": null` en `marketing/reels/estado.json`
(la pausa por token se levanta sola cuando el token vuelve a andar).
