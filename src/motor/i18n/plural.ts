// Polaco: 1 kalkulator, 2 a 4 kalkulatory (salvo 12 a 14), el resto kalkulatorów. Recibe number o
// string porque check_i18n llama a las funciones de los diccionarios con argumentos de muestra.
export function pluralPl(n: number | string, uno: string, pocos: string, muchos: string): string {
  const x = Math.abs(Number(n));
  if (x === 1) return `${n} ${uno}`;
  const d = x % 10;
  const c = x % 100;
  return `${n} ${d >= 2 && d <= 4 && (c < 12 || c > 14) ? pocos : muchos}`;
}
