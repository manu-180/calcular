import { K } from "./catalogo";
import { dosCifras } from "./reglas";

// Espejo en TypeScript de ca_sueldos_agregados (la migración): check_sueldos corre los dos con los
// mismos aportes y exige que publiquen lo mismo. La página nunca agrega en el navegador; esto sirve
// para probar y para el percentil aproximado de quien compara.

export interface Cifras {
  n: number;
  p25: number;
  p50: number;
  p75: number;
}

// Igual que percentile_cont de Postgres: interpolación lineal en la posición p × (n - 1).
export function percentil(ordenados: readonly number[], p: number): number {
  if (!ordenados.length) return NaN;
  const pos = p * (ordenados.length - 1);
  const i = Math.floor(pos);
  const resto = pos - i;
  return i + 1 < ordenados.length ? ordenados[i] + resto * (ordenados[i + 1] - ordenados[i]) : ordenados[i];
}

// Vallas de Tukey a 3 × IQR: un troll que carga un sueldo absurdo (pero dentro del techo) queda fuera
// de la cuenta y no mueve la mediana. Con IQR 0 (todos iguales) solo sobrevive ese valor.
export function sinAtipicos(valores: readonly number[]): number[] {
  const o = [...valores].sort((a, b) => a - b);
  if (o.length < 4) return o;
  const q1 = percentil(o, 0.25);
  const q3 = percentil(o, 0.75);
  const iqr = q3 - q1;
  return o.filter((v) => v >= q1 - 3 * iqr && v <= q3 + 3 * iqr);
}

// null = no se publica: menos de K aportes después de sacar los atípicos.
export function cifrasDe(valores: readonly number[], k = K): Cifras | null {
  const o = sinAtipicos(valores);
  if (o.length < k) return null;
  return { n: o.length, p25: dosCifras(percentil(o, 0.25)), p50: dosCifras(percentil(o, 0.5)), p75: dosCifras(percentil(o, 0.75)) };
}

// Distribución normal acumulada (Abramowitz y Stegun 7.1.26, error < 1,5e-7).
function normal(z: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(z * z) / 2);
  return z >= 0 ? (1 + y) / 2 : (1 - y) / 2;
}

const Z75 = 0.6744897501960817;

// Cuánta gente de la celda gana menos que `bruto`, aproximado: los sueldos se reparten parecido a una
// lognormal, así que con la mediana y el rango intercuartil alcanza para estimarlo sin publicar más que
// esas tres cifras. Redondeado a 5 y entre 5 y 95: más fino sería precisión que no tenemos.
export function percentilAproximado(bruto: number, c: Pick<Cifras, "p25" | "p50" | "p75">): number {
  if (!(bruto > 0) || !(c.p50 > 0)) return 50;
  const sigma = c.p25 > 0 && c.p75 > c.p25 ? (Math.log(c.p75) - Math.log(c.p25)) / (2 * Z75) : 0;
  let p: number;
  if (sigma <= 0) p = bruto < c.p50 ? 0.1 : bruto > c.p50 ? 0.9 : 0.5;
  else p = normal((Math.log(bruto) - Math.log(c.p50)) / sigma);
  return Math.min(95, Math.max(5, Math.round((p * 100) / 5) * 5));
}
