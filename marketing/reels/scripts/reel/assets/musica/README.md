# Música de fondo de los reels

Cuatro pistas instrumentales de unos 40 s cada una, sin voz y de energía media, generadas
una sola vez el 2026-10-07 con Google Lyria RealTime (`lyria-recipe.py` de la skill
`media-use`, con la `GEMINI_API_KEY` de envkit `apex_demos`). Están normalizadas a −16 LUFS
y comprimidas en AAC 128 kbps 48 kHz estéreo.

| Archivo | BPM | Escala | Prompt |
|---|---|---|---|
| `tech-house-1.m4a` | 118 | menor | Soft deep house, warm sub bass, crisp muted hi-hats, airy synth pads, minimal plucks, instrumental, modern tech product background, no vocals, steady groove |
| `tech-house-2.m4a` | 112 | mayor | Chill electronic lo-fi house, soft kick, round bass, glassy keys, light shaker, instrumental, clean and modern, no vocals |
| `acustica-1.m4a` | 104 | mayor | Warm acoustic guitar fingerpicking, soft brushed percussion, upright bass, gentle claps, optimistic, instrumental, no vocals |
| `acustica-2.m4a` | 108 | mayor | Bright acoustic pop instrumental, ukulele and acoustic guitar, light piano, soft kick and tambourine, warm and friendly, no vocals |

Prompt negativo de todas: vocals, singing, más aggressive / distortion / heavy drums según
la pista.

**Cómo las usa el render:** cuando `datos.musica` viene en null, `render.mjs` elige una con
un hash estable. Si el reel dura más que la pista, la repite (`-stream_loop`). El corte no
está trabajado para que el loop no se note, así que conviene que el reel no pase los 40 s.

**Licencia:** Google no reclama la propiedad de la música que genera Lyria. El uso está
sujeto a los términos de la Gemini API y a su política de uso prohibido, y la responsabilidad
por el uso es de quien genera. Lyria marca su audio con SynthID (marca de agua inaudible). No
hay atribución obligatoria. Antes de usarlas en anuncios pagos, conviene revisar los términos
vigentes de la Gemini API.
