// Google corta title y description por ancho en píxeles, y un carácter CJK (kanji, kana, hangul,
// signos de ancho completo) ocupa lo que dos latinos. Los límites de 60 y 160 se miden en estas
// unidades: en un texto latino da lo mismo que .length.
const ANCHO_DOBLE = /[\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}\p{sc=Hangul}　-〿＀-￯]/u;
// Las marcas que se apilan sobre o bajo la letra anterior no ocupan ancho: en tailandés las vocales
// de arriba y de abajo (ิ ี ึ ื ุ ู ั) y los tonos (่ ้ ๊ ๋ ์), que en .length cuentan como un carácter más
// (ADR 0002, D13). Vale para cualquier escritura: en un texto latino en NFC no aparecen.
const SIN_ANCHO = /[\p{Mn}\p{Me}]/u;

export function anchoVisual(texto: string): number {
  let ancho = 0;
  for (const c of texto) ancho += SIN_ANCHO.test(c) ? 0 : ANCHO_DOBLE.test(c) ? 2 : 1;
  return ancho;
}
