// Google corta title y description por ancho en píxeles, y un carácter CJK (kanji, kana, hangul,
// signos de ancho completo) ocupa lo que dos latinos. Los límites de 60 y 160 se miden en estas
// unidades: en un texto latino da lo mismo que .length.
const ANCHO_DOBLE = /[\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}\p{sc=Hangul}　-〿＀-￯]/u;

export function anchoVisual(texto: string): number {
  let ancho = 0;
  for (const c of texto) ancho += ANCHO_DOBLE.test(c) ? 2 : 1;
  return ancho;
}
