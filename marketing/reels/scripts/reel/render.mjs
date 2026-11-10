// @ts-check

// La versión de HyperFrames y las banderas de captura que no se traban en los runners de Actions
// (medido en apex-demos, marketing/reels/scripts/reel/render.mjs).
export const HYPERFRAMES = 'hyperframes@0.8.140'

// En los runners de Actions (2 núcleos, 7 GB, GL por software) HyperFrames se colgaba al azar
// en un cuadro fijo de cada video ("capture stalled", 8 de 11 renders del 2026-10-08/10) y
// todos los cuelgues medidos fueron con los cuadros del scroll extraídos en PNG: en JPG, 24 de 24
// renders limpios. --no-low-memory-mode deja usar BeginFrame (el runner tiene menos de 8 GB y
// si no se fuerza screenshot), que además tarda la mitad. Los otros dos son el respaldo.
export const CAPTURAS = [
  ['--video-frame-format', 'jpg', '--no-low-memory-mode', '--workers', '1'],
  ['--video-frame-format', 'jpg'],
  ['--video-frame-format', 'png', '--no-low-memory-mode', '--workers', '1'],
]
