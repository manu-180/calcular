import type { ReactNode } from "react";
import type { Idioma } from "../tipos";

// Satori (next/og) no aplica el algoritmo bidi: dibuja el hebreo letra por letra de izquierda a derecha
// y la palabra sale al revés («שכר» como «רכש»). Para las imágenes OG de las ediciones en hebreo el texto
// se pasa a orden visual a mano: cada palabra hebrea se invierte (las cifras y las palabras latinas
// quedan como están) y las palabras van en una fila `row-reverse` que hace el salto de línea, así la
// primera palabra queda a la derecha de la primera línea, como en el navegador. Las cifras y palabras
// latinas seguidas («iPhone 17 Pro», «1,250.50») forman un solo bloque de izquierda a derecha.
// El árabe no pasa por acá: además del orden necesita unir las letras, y Satori no lo hace.

const HEBREO = /[֐-׿]/;
const FUERTE_LTR = /[A-Za-z0-9]/;
const MARCAS = /[‎‏‪-‮⁦-⁩]/g;
const ESPEJO: Readonly<Record<string, string>> = { "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{", "«": "»", "»": "«", "<": ">", ">": "<" };

const espejar = (s: string): string =>
  [...s]
    .reverse()
    .map((c) => ESPEJO[c] ?? c)
    .join("");

// Un tramo latino o numérico, con los signos de adentro («1,250.50», «30%», «US$», «CC-BY»).
const TRAMOS = /[A-Za-z0-9$€£](?:[A-Za-z0-9.,:%/'’+$€£_-]*[A-Za-z0-9%$€£])?|[^A-Za-z0-9$€£]+/g;

// Palabra con letras hebreas: los tramos van en orden inverso; el hebreo y los signos se espejan.
function palabraHebrea(p: string): string {
  const tramos = p.match(TRAMOS) ?? [p];
  return tramos
    .reverse()
    .map((t) => (FUERTE_LTR.test(t) || /^[$€£]/.test(t) ? t : espejar(t)))
    .join("");
}

// Bloque sin hebreo dentro de un párrafo rtl: el centro queda de izquierda a derecha y los signos de
// los bordes (un punto final, un paréntesis) pasan al otro lado.
function bloqueLatino(b: string): string {
  const m = /^([^A-Za-z0-9$€£]*)([\s\S]*[A-Za-z0-9%$€£])([^A-Za-z0-9%$€£]*)$/.exec(b);
  if (!m) return espejar(b);
  return `${espejar(m[3])}${m[2]}${espejar(m[1])}`;
}

export function trozosVisuales(texto: string): string[] {
  const palabras = texto.replace(MARCAS, "").split(/\s+/).filter(Boolean);
  const trozos: string[] = [];
  let latino: string[] = [];
  const cerrar = () => {
    if (latino.length) trozos.push(bloqueLatino(latino.join(" ")));
    latino = [];
  };
  for (const p of palabras) {
    if (HEBREO.test(p)) {
      cerrar();
      trozos.push(palabraHebrea(p));
    } else latino.push(p);
  }
  cerrar();
  return trozos;
}

export const esRtlOg = (idioma: Idioma): boolean => idioma === "he";

// Texto de una imagen OG. En hebreo devuelve la fila de palabras en orden visual; en los demás
// idiomas, el texto tal cual (el HTML de la imagen no cambia).
export function TextoOg({ texto, idioma }: { texto: string; idioma: Idioma }): ReactNode {
  if (!esRtlOg(idioma) || !HEBREO.test(texto)) return texto;
  const trozos = trozosVisuales(texto);
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", columnGap: "0.27em", maxWidth: "100%" }}>
      {trozos.map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </div>
  );
}
