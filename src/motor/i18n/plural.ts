// Búlgaro (ADR 0002, D24): Intl.PluralRules("bg") tiene dos categorías, «one» (solo el 1) y «other»
// (0, 2, 21, las fracciones). Los sustantivos masculinos que no son de persona van en forma numérica
// detrás de un número («2 калкулатора», «5 часа», «3 месеца»), así que «otros» es esa forma y no el
// plural común («калкулатори»). Recibe number o string porque check_i18n llama a las funciones de los
// diccionarios con argumentos de muestra.
const REGLAS_BG = new Intl.PluralRules("bg");

export function formaBg(n: number | string, uno: string, otros: string): string {
  return REGLAS_BG.select(Math.abs(Number(n))) === "one" ? uno : otros;
}

// El número y la palabra: «1 калкулатор», «2 калкулатора», «40 държави».
export function pluralBg(n: number | string, uno: string, otros: string): string {
  return `${n} ${formaBg(n, uno, otros)}`;
}

// Polaco: 1 kalkulator, 2 a 4 kalkulatory (salvo 12 a 14), el resto kalkulatorów. Recibe number o
// string porque check_i18n llama a las funciones de los diccionarios con argumentos de muestra.
export function pluralPl(n: number | string, uno: string, pocos: string, muchos: string): string {
  const x = Math.abs(Number(n));
  if (x === 1) return `${n} ${uno}`;
  const d = x % 10;
  const c = x % 100;
  return `${n} ${d >= 2 && d <= 4 && (c < 12 || c > 14) ? pocos : muchos}`;
}
// Ucraniano (ADR 0002, D15): las categorías de Intl.PluralRules("uk"). «one» es 1, 21, 31 (salvo 11),
// «few» 2 a 4, 22 a 24 (salvo 12 a 14), «many» 0, 5 a 20, 25 a 30, y «other» las fracciones, que en
// ucraniano van en genitivo singular («1,5 року»). Si no se da la forma de fracción se usa la de
// «few», que para la mayoría de los sustantivos es la misma. Recibe number o string porque
// check_i18n llama a las funciones de los diccionarios con argumentos de muestra.
const REGLAS_UK = new Intl.PluralRules("uk");

export function formaUk(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  const categoria = REGLAS_UK.select(Math.abs(Number(n)));
  if (categoria === "one") return uno;
  if (categoria === "few") return pocos;
  if (categoria === "many") return muchos;
  return fraccion ?? pocos;
}

// El número y la palabra: «1 калькулятор», «3 калькулятори», «5 калькуляторів».
export function pluralUk(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  return `${n} ${formaUk(n, uno, pocos, muchos, fraccion)}`;
}
// Ruso (ADR 0002, D17): las categorías de Intl.PluralRules("ru"). «one» es 1, 21, 31 (salvo 11),
// «few» 2 a 4, 22 a 24 (salvo 12 a 14), «many» 0, 5 a 20, 25 a 30, y «other» las fracciones, que en
// ruso van en genitivo singular («1,5 года»). Si no se da la forma de fracción se usa la de «few»,
// que para la mayoría de los sustantivos es la misma. Recibe number o string porque check_i18n llama
// a las funciones de los diccionarios con argumentos de muestra.
const REGLAS_RU = new Intl.PluralRules("ru");

export function formaRu(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  const categoria = REGLAS_RU.select(Math.abs(Number(n)));
  if (categoria === "one") return uno;
  if (categoria === "few") return pocos;
  if (categoria === "many") return muchos;
  return fraccion ?? pocos;
}

// El número y la palabra: «1 калькулятор», «3 калькулятора», «5 калькуляторов».
export function pluralRu(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  return `${n} ${formaRu(n, uno, pocos, muchos, fraccion)}`;
}
// Rumano (ADR 0002, D18): las categorías de Intl.PluralRules("ro"). «one» es solo el 1, «few» el 0,
// del 2 al 19, los que terminan en 01 a 19 (101, 119, 1.005) y las fracciones («1,5 ani»), y «other»
// del 20 en adelante cuando las dos últimas cifras son 00 o 20 a 99 (20, 100, 1.000). En «other» el
// rumano pone «de» entre el número y el sustantivo: «1 an», «2 ani», «20 de ani», «101 ani», «1.000
// de lei». Recibe number o string porque check_i18n llama a las funciones de los diccionarios con
// argumentos de muestra, y el número puede llegar ya formateado («1.250»): se lee sin los puntos de
// miles y con la coma decimal.
const REGLAS_RO = new Intl.PluralRules("ro");

function numeroRo(n: number | string): number {
  if (typeof n === "number") return Math.abs(n);
  const limpio = n.replace(/[\s  .]/g, "").replace(",", ".").replace(/[^\d.]/g, "");
  return Math.abs(Number(limpio || "0"));
}

// La forma que va detrás del número: «an», «ani» o «de ani».
export function formaRo(n: number | string, uno: string, varios: string): string {
  const categoria = REGLAS_RO.select(numeroRo(n));
  if (categoria === "one") return uno;
  if (categoria === "few") return varios;
  return `de ${varios}`;
}

// El número y la palabra: «1 calculator», «3 calculatoare», «20 de calculatoare».
export function pluralRo(n: number | string, uno: string, varios: string): string {
  return `${n} ${formaRo(n, uno, varios)}`;
}

// Solo «de» o nada, para cuando el sustantivo va armado aparte («20 de țări», «1.000 de lei»).
export function deRo(n: number | string): string {
  return REGLAS_RO.select(numeroRo(n)) === "other" ? "de " : "";
}
// Checo (ADR 0002, D19): las categorías de Intl.PluralRules("cs"). «one» es solo 1, «few» 2 a 4
// (también 2 a 4 sin excepción por decenas: 22 ya es «other»), «other» 0 y 5 en adelante, y «many»
// las fracciones, que en checo van en genitivo singular («1,5 roku», «2,5 hodiny»). Si no se da la
// forma de fracción se usa la de «few», que para muchos sustantivos coincide. Recibe number o string
// porque check_i18n llama a las funciones de los diccionarios con argumentos de muestra.
const REGLAS_CS = new Intl.PluralRules("cs");

export function formaCs(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  const categoria = REGLAS_CS.select(Math.abs(Number(n)));
  if (categoria === "one") return uno;
  if (categoria === "few") return pocos;
  if (categoria === "many") return fraccion ?? pocos;
  return muchos;
}

// El número y la palabra: «1 kalkulačka», «3 kalkulačky», «5 kalkulaček».
export function pluralCs(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  return `${n} ${formaCs(n, uno, pocos, muchos, fraccion)}`;
}
// Griego (ADR 0002, D20): Intl.PluralRules("el") tiene dos categorías, «one» (solo 1) y «other» (0,
// 2 en adelante y las fracciones: «1,5 ώρες»). Recibe number o string porque check_i18n llama a las
// funciones de los diccionarios con argumentos de muestra; un string que no es número cae en «other».
const REGLAS_EL = new Intl.PluralRules("el");

export function formaEl(n: number | string, uno: string, otros: string): string {
  return REGLAS_EL.select(Math.abs(Number(n))) === "one" ? uno : otros;
}

// El número y la palabra: «1 αριθμομηχανή», «5 αριθμομηχανές».
export function pluralEl(n: number | string, uno: string, otros: string): string {
  return `${n} ${formaEl(n, uno, otros)}`;
}
// Serbio (ADR 0002, D23): las categorías de Intl.PluralRules("sr"). «one» es 1, 21, 31, 101... (no
// 11), «few» 2 a 4, 22 a 24... (no 12 a 14) y «other» todo lo demás, también 0 y las fracciones
// («1,5 godina»). Recibe number o string porque check_i18n llama a las funciones de los diccionarios
// con argumentos de muestra.
const REGLAS_SR = new Intl.PluralRules("sr");

export function formaSr(n: number | string, uno: string, pocos: string, muchos: string): string {
  const categoria = REGLAS_SR.select(Math.abs(Number(n)));
  if (categoria === "one") return uno;
  if (categoria === "few") return pocos;
  return muchos;
}

// El número y la palabra: «1 kalkulator», «3 kalkulatora», «5 kalkulatora», «21 dan», «22 dana».
export function pluralSr(n: number | string, uno: string, pocos: string, muchos: string): string {
  return `${n} ${formaSr(n, uno, pocos, muchos)}`;
}
// Eslovaco (ADR 0002, D25): las categorías de Intl.PluralRules("sk"), las mismas que en checo. «one» es
// solo 1, «few» 2 a 4 (22 ya es «other»), «other» 0 y 5 en adelante, y «many» las fracciones, que van
// en genitivo singular («1,5 roka», «2,5 hodiny»). Si no se da la forma de fracción se usa la de «few».
// Recibe number o string porque check_i18n llama a los diccionarios con argumentos de muestra.
const REGLAS_SK = new Intl.PluralRules("sk");

export function formaSk(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  const categoria = REGLAS_SK.select(Math.abs(Number(n)));
  if (categoria === "one") return uno;
  if (categoria === "few") return pocos;
  if (categoria === "many") return fraccion ?? pocos;
  return muchos;
}

// El número y la palabra: «1 kalkulačka», «3 kalkulačky», «5 kalkulačiek».
export function pluralSk(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  return `${n} ${formaSk(n, uno, pocos, muchos, fraccion)}`;
}
// Croata (ADR 0002, D27): las categorías de Intl.PluralRules("hr"). «one» es 1, 21, 31, 101... (no
// 11), «few» 2 a 4, 22 a 24... (no 12 a 14) y «other» todo lo demás, también 0 y las fracciones
// («1,5 godina»). Recibe number o string porque check_i18n llama a las funciones de los diccionarios
// con argumentos de muestra.
const REGLAS_HR = new Intl.PluralRules("hr");

export function formaHr(n: number | string, uno: string, pocos: string, muchos: string): string {
  const categoria = REGLAS_HR.select(Math.abs(Number(n)));
  if (categoria === "one") return uno;
  if (categoria === "few") return pocos;
  return muchos;
}

// El número y la palabra: «1 kalkulator», «3 kalkulatora», «5 kalkulatora», «21 dan», «22 dana».
export function pluralHr(n: number | string, uno: string, pocos: string, muchos: string): string {
  return `${n} ${formaHr(n, uno, pocos, muchos)}`;
}
// Bosnio (ADR 0002, D39): las categorías de Intl.PluralRules("bs"), las mismas que en hr y sr: «1 godina»,
// «2 godine», «5 godina», «21 godina», «1,5 godina».
const REGLAS_BS = new Intl.PluralRules("bs");

export function formaBs(n: number | string, uno: string, pocos: string, muchos: string): string {
  const categoria = REGLAS_BS.select(Math.abs(Number(n)));
  if (categoria === "one") return uno;
  if (categoria === "few") return pocos;
  return muchos;
}

// El número y la palabra: «1 kalkulator», «3 kalkulatora», «5 kalkulatora», «21 dan», «22 dana».
export function pluralBs(n: number | string, uno: string, pocos: string, muchos: string): string {
  return `${n} ${formaBs(n, uno, pocos, muchos)}`;
}
// Mongol (ADR 0002, D28): detrás de un número el sustantivo va siempre en singular («3 өдөр», «40
// тооцоолуур»), aunque Intl.PluralRules("mn") distinga one/other. Recibe number o string porque check_i18n
// llama a las funciones de los diccionarios con argumentos de muestra.
export function conteoMn(n: number | string, palabra: string): string {
  return `${n} ${palabra}`;
}

// Albanés (ADR 0002, D31): Intl.PluralRules("sq") tiene «one» (solo el 1) y «other» (también 0 y las
// fracciones): «1 vit», «2 vjet», «1,5 vjet», «1 kalkulator», «3 kalkulatorë». Recibe number o string
// porque check_i18n llama a las funciones de los diccionarios con argumentos de muestra.
const REGLAS_SQ = new Intl.PluralRules("sq");

export function formaSq(n: number | string, uno: string, otros: string): string {
  return REGLAS_SQ.select(Math.abs(Number(n))) === "one" ? uno : otros;
}

export function pluralSq(n: number | string, uno: string, otros: string): string {
  return `${n} ${formaSq(n, uno, otros)}`;
}

// Esloveno (ADR 0002, D32): las categorías de Intl.PluralRules("sl"), con dual. «one» es 1, 101, 201 (no
// 11), «two» 2, 102, 202, «few» 3, 4, 103, 104 y las fracciones («1,5 leta»), y «other» el resto, también
// 0, 5 a 100 y 21 («21 let»). Recibe number o string porque check_i18n llama a las funciones de los
// diccionarios con argumentos de muestra.
const REGLAS_SL = new Intl.PluralRules("sl");

export function formaSl(n: number | string, uno: string, dos: string, pocos: string, otros: string): string {
  const categoria = REGLAS_SL.select(Math.abs(Number(n)));
  if (categoria === "one") return uno;
  if (categoria === "two") return dos;
  if (categoria === "few") return pocos;
  return otros;
}

// El número y la palabra: «1 leto», «2 leti», «3 leta», «5 let»; «1 dan», «2 dneva», «3 dni», «5 dni».
export function pluralSl(n: number | string, uno: string, dos: string, pocos: string, otros: string): string {
  return `${n} ${formaSl(n, uno, dos, pocos, otros)}`;
}

// Islandés (ADR 0002, D34): las categorías de Intl.PluralRules("is"). «one» es lo que termina en 1 salvo en
// 11 (1, 21, 31, 101, no 11 ni 111) y «other» el resto: «1 dagur», «2 dagar», «11 dagar», «21 dagur». Recibe
// number o string porque check_i18n llama a las funciones de los diccionarios con argumentos de muestra.
const REGLAS_IS = new Intl.PluralRules("is");

export function formaIs(n: number | string, uno: string, otros: string): string {
  return REGLAS_IS.select(Math.abs(Number(n))) === "one" ? uno : otros;
}

// El número y la palabra: «1 land», «21 land», «2 lönd»; «1 dagur», «21 dagur», «2 dagar».
export function pluralIs(n: number | string, uno: string, otros: string): string {
  return `${n} ${formaIs(n, uno, otros)}`;
}

// Letón (ADR 0002, D35): Intl.PluralRules("lv") da one (1, 21, 31; no 11), other (2 a 9, 22 a 29, fracciones)
// y zero (0, 10 a 20, 30...). Solo el cero real va en genitivo plural («0 gadu»): 10, 11 o 20 van en
// nominativo plural como el resto («10 gadi»), así que la categoría zero no decide sola. Recibe number o
// string porque check_i18n llama a las funciones de los diccionarios con argumentos de muestra.
const REGLAS_LV = new Intl.PluralRules("lv");

export function formaLv(n: number | string, uno: string, otros: string, cero: string): string {
  const v = Math.abs(Number(n));
  if (v === 0) return cero;
  return REGLAS_LV.select(v) === "one" ? uno : otros;
}

// El número y la palabra: «1 kalkulators», «3 kalkulatori», «10 kalkulatori», «21 kalkulators», «0 kalkulatoru».
export function pluralLv(n: number | string, uno: string, otros: string, cero: string): string {
  return `${n} ${formaLv(n, uno, otros, cero)}`;
}
