# Cierre "Hacé la cuenta ... en calcular.ar"

Va pegado al final de todos los reels de prueba, con un corte limpio. Un clip por paleta y por
estilo en `clips/`, listados en `clips.json` (contrato en `../CONTRATO.md` § El cierre).

| Estilo | Qué pasa |
|---|---|
| `buscador` | "Hacé la cuenta" sube con una barra de búsqueda; mientras la voz dice "calcular punto ar" se tipea calcular.ar, enter (la flecha pasa a tilde) y llega el aviso de calcular.ar: "Tu cuenta, lista y con tus números" |
| `tipografico` | El isotipo y "Hacé la cuenta"; la frase entra palabra por palabra con la voz, calcular.ar enorme cae letra por letra (".ar" en tinta) con un golpe grave y cierran tres chips: Gratis, Al instante, Datos oficiales |

- Voz: la misma de los cuerpos (ElevenLabs), `voz.wav` + `voz-palabras.json`, entra a los 0,15 s.
  Se pide "calcular punto ar" (con "calcular.ar" lo lee como una sola palabra) y se rotula calcular.ar.
- Specs: 1080x1920, 30 fps, H.264 High yuv420p, AAC 48 kHz estéreo, 4,9 s, < 2 MB, voz + sfx sin
  música, −16 LUFS integrados (el nivel de los cuerpos que salen de HyperFrames) y pico ≤ −1,5 dBTP.
- El primer cuadro ya está en movimiento: corta limpio desde cualquier cuerpo. Desde los 3,7 s queda
  quieto con todo legible.

## Regenerar

```bash
node marketing/reels/scripts/prueba/cta/renderizar.mjs [--paleta papel] [--estilo buscador]   # ~20 s por clip
envkit run -p apex_demos --only ELEVENLABS_API_KEY -- node marketing/reels/scripts/prueba/cta/generar-voz.mjs   # sólo si cambia la frase
```

La plantilla es `plantilla/index.html` (paleta, fuentes y fondo de `../formatos/_comun`).
