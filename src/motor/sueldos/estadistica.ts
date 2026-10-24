import { CERCA, K, MIN_DIAS, MIN_MESES } from "./catalogo";
import { dosCifras } from "./reglas";
import type { Tramo } from "./tipos";

// Espejo en TypeScript de ca_sueldos_calcular (migración 20261024150000): check_sueldos corre los dos con
// los mismos aportes y exige que publiquen lo mismo. La página nunca agrega en el navegador; esto sirve
// para probar y para el percentil aproximado de quien compara.

export interface Cifras {
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

// El IQR de las vallas nunca baja del 10 % de la mediana: con IQR puro, 30 aportes iguales (IQR 0)
// dejaban fuera a todos los sueldos reales de la celda.
export const PISO_IQR = 0.1;

// Vallas de Tukey a 3 × IQR (con el piso): un sueldo absurdo pero dentro del techo queda fuera de la
// cuenta y no mueve la mediana. Con menos de 4 aportes no se filtra.
export function sinAtipicos(valores: readonly number[]): number[] {
  const o = [...valores].sort((a, b) => a - b);
  if (o.length < 4) return o;
  const q1 = percentil(o, 0.25);
  const q2 = percentil(o, 0.5);
  const q3 = percentil(o, 0.75);
  const iqr = Math.max(q3 - q1, PISO_IQR * q2);
  return o.filter((v) => v >= q1 - 3 * iqr && v <= q3 + 3 * iqr);
}

// Paso de publicación: el 5 % de la mediana, redondeado a una cifra significativa. Más fino, un aporte
// nuevo se notaría en el número; sin redondear el paso, la grilla misma se corría con cada movimiento
// chico de la mediana y el número publicado cambiaba igual.
export const PASO_MEDIANA = 0.05;

function unaCifra(n: number): number {
  const p = Math.pow(10, Math.floor(Math.log10(n)));
  return Number((Math.round(n / p) * p).toPrecision(1));
}

// Igual que ca_sueldos_redondear: al múltiplo más cercano del paso y después a dos cifras significativas.
// mediana / 20 y no 0,05 × mediana: la división da exacto el caso del medio (1500 → 2000), como numeric.
export function redondearPublicado(x: number, mediana: number): number {
  if (!(x > 0) || !(mediana > 0)) return 0;
  const paso = unaCifra(mediana / (1 / PASO_MEDIANA));
  const veces = Math.max(1, Math.round(x / paso));
  return dosCifras(Number((veces * paso).toPrecision(15)));
}

// La cuenta publicada, en rangos: con la exacta, comparar dos fotos dice cuántos aportes entraron.
export function tramoDe(n: number, publica: boolean): Tramo {
  if (publica) return n >= 50 ? "50+" : n >= 20 ? "20-49" : "10-19";
  return n >= CERCA ? "cerca" : "lejos";
}

export interface AporteCelda {
  b: number;
  // AAAA-MM
  mes: string;
}

export interface CeldaCalculada {
  tramo: Tramo;
  cifras: Cifras | null;
}

// Una celda como la publica la base. `dias`: días distintos con aportes en la ventana (ca_sueldos_dias).
export function celdaDe(aportes: readonly AporteCelda[], dias: number, k = K): CeldaCalculada {
  const limpios = sinAtipicos(aportes.map((a) => a.b));
  // Los meses salen de los aportes que sobreviven, como en la base. Las vallas cortan por valor: un valor
  // queda entero adentro o entero afuera.
  const dentro = new Set(limpios);
  const meses = new Set(aportes.filter((a) => dentro.has(a.b)).map((a) => a.mes));
  const publica = limpios.length >= k && dias >= MIN_DIAS && meses.size >= MIN_MESES;
  if (!publica) return { tramo: tramoDe(limpios.length, false), cifras: null };
  const p50 = percentil(limpios, 0.5);
  return {
    tramo: tramoDe(limpios.length, true),
    cifras: { p25: redondearPublicado(percentil(limpios, 0.25), p50), p50: redondearPublicado(p50, p50), p75: redondearPublicado(percentil(limpios, 0.75), p50) },
  };
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
