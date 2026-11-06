// Google corta title y description por ancho en píxeles, y un carácter CJK (kanji, kana, hangul,
// signos de ancho completo) ocupa lo que dos latinos. Los límites de 60 y 160 se miden en estas
// unidades: en un texto latino da lo mismo que .length.
const ANCHO_DOBLE = /[\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}\p{sc=Hangul}　-〿＀-￯]/u;
// Las marcas que se apilan sobre o bajo la letra anterior no ocupan ancho: en tailandés las vocales
// de arriba y de abajo (ิ ี ึ ื ุ ู ั) y los tonos (่ ้ ๊ ๋ ์), que en .length cuentan como un carácter más
// (ADR 0002, D13). Vale para cualquier escritura: en un texto latino en NFC no aparecen. SIN_ANCHO,
// más abajo, las junta con las del bengalí.

// Bengalí (ADR 0002, D14), medido con los avances de Nirmala UI contra Arial: una letra o un dígito
// ocupa un latino y medio; los signos que se dibujan sobre o bajo la consonante (hasanta «্», «ু», «ূ»,
// «ৃ», «ঁ», nukta) no ocupan ancho propio; los signos vocálicos que van al costado («া», «ি», «ী», «ে»)
// y «ং», «ঃ» ocupan medio latino, salvo «ো» y «ৌ», que rodean la consonante por los dos lados. Con
// .length cada signo contaba como una letra. Los conjuntos (consonante + hasanta + consonante) quedan
// algo sobrestimados, del lado seguro. ZWJ y ZWNJ no ocupan ancho (las marcas Mn/Me del tailandés tampoco).
const BENGALI = /\p{sc=Beng}/u;
const SIN_ANCHO = /[\p{Mn}\p{Me}‌‍]/u;
const MEDIO = /\p{Mc}/u;
const BENGALI_RODEA = /[োৌ]/u;

// Georgiano (ADR 0002, D26), medido en Sylfaen, Segoe UI y Arial a 20 px: una letra ocupa 1,4 latinas
// (11,5 a 12,8 px contra 8,3 a 9,1). Con .length un título de 60 letras se cortaba en el resultado.
const GEORGIANO = /\p{sc=Geor}/u;

// Armenio (ADR 0002, D30), medido con GDI a 20 px en Sylfaen, Segoe UI, Arial y Noto Sans Armenian: una
// letra ocupa 1,3 latinas (11,5 a 12,5 px contra 8,5 a 9,7). Con .length un título de 60 letras se cortaba.
const ARMENIO = /\p{sc=Armenian}/u;

// Jemer (ADR 0002, D38), medido con GDI a 20 px en Leelawadee UI y Segoe UI, que traen la escritura, contra
// sus latinas (8,5 px). Una consonante o vocal independiente ocupa 1,6 latinas y un signo vocálico al costado
// (ា, ើ, ះ...) 1,5. El coeng (U+17D2) no ocupa, y la consonante que lo sigue se dibuja debajo de la anterior,
// por eso cuenta 0,6 (algunas asoman al costado, como ្រ). Con .length el título se cortaba mucho antes de 60.
const JEMER = /[\u1780-\u17dd]/u;
const COENG = "\u17d2";

function anchoDe(c: string): number {
  if (SIN_ANCHO.test(c)) return 0;
  if (JEMER.test(c)) return MEDIO.test(c) ? 1.5 : 1.6;
  if (GEORGIANO.test(c)) return 1.4;
  if (ARMENIO.test(c)) return 1.3;
  if (BENGALI.test(c)) {
    if (BENGALI_RODEA.test(c)) return 1.5;
    return MEDIO.test(c) ? 0.5 : 1.5;
  }
  return ANCHO_DOBLE.test(c) ? 2 : 1;
}

export function anchoVisual(texto: string): number {
  let ancho = 0;
  let anterior = "";
  for (const c of texto) {
    ancho += anterior === COENG ? 0.6 : anchoDe(c);
    anterior = c;
  }
  return ancho;
}
