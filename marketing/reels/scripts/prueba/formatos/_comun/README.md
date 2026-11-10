# `_comun`: lo que comparten todos los formatos

Todo se importa desde `index.mjs` (Node) y, en la plantilla, desde `assets/comun/subtitulos.js`.

## Node (`armar.mjs` de un formato)

```js
import { copiarAssets, copiarVoz, escribirDatos, cssComun, fondoHtml, vozHtml, sfxHtml,
  rellenar, paleta, gruposDeVoz, buscarFrase, palabrasDe, validarBase } from '../_comun/index.mjs'

copiarAssets(salida)                       // salida/assets/{fuentes,sfx,vendor/gsap.min.js,comun/subtitulos.js,apex-icon-512.png}
copiarVoz(p.voz.wav, salida)               // salida/assets/voz.wav, con la cadena de voz de producción y a −16 LUFS (ffmpeg; sin ffmpeg, copia)
const pal = paleta(guion.paleta)           // { fondo, superficie, tinta, tenue, acento, oscura, tono, sobreAcento, resalte: { fondo, tinta } }
const { grupos } = gruposDeVoz(p.voz.palabras, { hook: guion.hooks[p.hook], hasta: dur - 0.3, excluir })  // excluir: índices de palabras que ya se leen en pantalla
const t = buscarFrase(palabrasDe(p.voz.palabras), 'la frase', { desde_s: 3 })   // { i, j, inicio, fin } | null
escribirDatos(salida, { grupos, tono: pal.tono, resalte: pal.resalte, tinta: pal.tinta, … })  // assets/datos.js → window.REEL
const html = rellenar(plantilla, { css: cssComun(guion.paleta), fondo: fondoHtml(),
  audio: vozHtml(dur) + sfxHtml([{ tipo: 'pop', t: 2.4, volumen: 0.5 }], dur), duracion: dur })
const problemas = validarBase(guion, 'mito')  // lo común del contrato; el formato suma lo de `contenido`
```

- `cssComun(clave)`: `:root` con las variables de la paleta (`--fondo --superficie --tinta --tenue
  --acento --sobre-acento --resalte --resalte-tinta --linea --linea-fuerte --sombra-1 --sombra-2 --luz
  --vineta --grano`) + `@font-face` (Bricolage Grotesque 400/600/800, Geist 400/500/600, Geist Mono 500)
  + estilos del fondo. Va **inline** en el `<style>` del `index.html` (el lint de HyperFrames busca el
  `@font-face` en el mismo archivo); las rutas son `assets/fuentes/…` desde la raíz del proyecto.
- `fondoHtml()`: el fondo con carácter (luz, contraluz, grilla con máscara, viñeta y grano; nunca
  plano). Va primero dentro del `#root`. Se puede animar `#fondo-luz` (seguir al foco) y
  `#fondo-grilla` (parallax) con GSAP; no les pongas `transform` en CSS.
- `sfxHtml(lista, tope)`: `tipo` ∈ `click-soft`, `impact-bass-1`, `notification`, `pop`,
  `whoosh-cinematic`, `whoosh-short`; `t` es el instante de la acción: el pico del sonido pega un
  cuadro después (picos medidos en `SFX`; el cinematic se recorta solo a su tramo útil con
  `data-media-start`). Los ids son `sfx-0`, `sfx-1`… (uno por llamada: juntá todos en una sola
  lista). `edicion-reels`: 3 a 5 sfx por reel; alterná dos tomas si se repite.
- El hook sale con la puntuación del guion ("Redes o web: …"), menos el punto final. Si la voz no
  arranca con el hook, `gruposDeVoz` no arma grupo de hook: mostralo vos con `resaltar: false`.
- Sombras: `--sombra-1/2` son neutras. Nunca uses el acento en una sombra o un glow.

## Plantilla (`index.html` del formato)

```html
<script src="assets/vendor/gsap.min.js"></script>
<script src="assets/datos.js"></script>
<script src="assets/comun/subtitulos.js"></script>
<style>{{css}} #subs { position: absolute; inset: 0; z-index: 50; pointer-events: none; }</style>
<div id="root" data-composition-id="main" data-start="0" data-duration="{{duracion}}" data-width="1080" data-height="1920">
  {{fondo}} … <div id="subs"></div> {{audio}}
</div>
<script>
  Subtitulos.fuentes().then(function () {
    var R = window.REEL, tl = gsap.timeline({ paused: true });
    var subs = Subtitulos.montar(tl, { contenedor: document.getElementById("subs"),
      grupos: R.grupos, tono: R.tono, resalte: R.resalte, tinta: R.tinta });
    // … el resto de la composición …
    window.__timelines["main"] = tl;   // siempre al final del callback
  });
</script>
```

`Subtitulos.montar(tl, { contenedor, grupos, tono, resalte, tinta?, prefijo? })` → `[{ el, linea, spans, resalte, grupo, tam }]`

- `grupos`: los de `gruposDeVoz` (`{ hook, inicio, fin, palabras: [{ texto, inicio, fin }] }`, en s).
  Cada grupo acepta además `arriba` (px, default 1240), `izquierda` (70), `ancho` (860), `tam`
  (72; hook 92), `piso` (tamaño mínimo al achicar), `alinear: 'izq'`, `resaltar: false` (sin
  resaltador, p. ej. un hook que la voz no dice) y `salida: 'ninguna'` (no lo saca: lo animás vos
  con el `el` que devuelve; el `visibility: hidden` final también queda a tu cargo).
- Montar dos veces está bien (p. ej. el hook dentro de la cámara y el resto en `#subs`): pasá un
  `prefijo` distinto en cada llamada para que los ids no choquen.
- `tono`: `'oscuro'` (fondo oscuro: tinta clara con trazo fino y sombra neutra) o `'claro'` (tinta
  oscura con halo blanco). `paleta(clave).tono` lo da hecho. `tinta` reemplaza el color de reposo
  (pasá `paleta.tinta`). `resalte`: `paleta(clave).resalte` (el acento si pasa contraste; si no, el neutro).
- Hace lo de la skill `subtitulos-premium`: nunca 3 líneas (achica de a 4 px), cada palabra entra 2
  cuadros antes de la voz (blur + ascenso + pop), resaltador que viaja tras la palabra activa, el
  hook entero desde el cuadro 0 (sólo corre el resaltador), salida y apagado duro de cada grupo.
- `Subtitulos.fuentes()`: carga todas las fuentes antes de medir. Construí todo dentro de su `then`.
- Zona segura de Reels: nada importante arriba de y 220, abajo de y 1500 ni a la derecha de x 960.
