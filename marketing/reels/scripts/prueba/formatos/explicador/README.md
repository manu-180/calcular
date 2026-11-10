# Formato `explicador`

Bloques visuales que entran empujando hacia la izquierda cuando la voz dice su `frase`.
`armar.mjs` exporta `armar` y `validar` (contrato en `marketing/reels/scripts/prueba/CONTRATO.md`); la plantilla es
`plantilla.html` y usa `_comun`.

| Tipo | Qué se ve |
|---|---|
| `titulo` | Frase grande (hasta 3 renglones) y una raya del acento que se dibuja bajo el último |
| `navegador` `lento` | Ventana con la URL, ícono de carga que gira, barra que avanza a tirones y se clava; la página aparece en gris y nunca termina. Punch-in si dura ≥ 3,2 s |
| `navegador` `rapido` | Barra que llega al toque y la página entera, a color, en una ráfaga. Pop + punch-in |
| `busqueda` | Buscador genérico (sin marca): la consulta se escribe sin cursor, entran 3 resultados y el `destacado` sube al primer lugar ya marcado. Pop |
| `celular-vs-compu` | La misma web en compu y en celular (el celular entra y se apoya delante), cada uno con su rótulo |
| `comparacion` | `izq` arriba en neutro con guiones; `der` sube desde abajo en el acento, con checks que se dibujan. **`der` es la opción que gana** |
| `codigo` | Editor oscuro con resaltado de HTML/CSS/JS, sin números de línea; se tipea línea por línea y se marca la que hace el trabajo |

- `frase`: 2 a 6 palabras tal cual de la voz, en orden, y cada una arranca 6 palabras dichas o
  más después de la anterior (si no, el visual no llega a leerse): `validar` lo exige. Igual, ningún
  visual queda menos de 1,8 s.
- Las webs de muestra son barras abstractas: nunca copy, marcas ni números inventados.
