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
