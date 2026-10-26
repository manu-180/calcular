import { ErrorEntrada } from "@/motor/calculo";

// Días desde 1970-01-01 sin usar Date (calcular() tiene que ser pura).
function imeres(fecha: string): number {
  let y = Number(fecha.slice(0, 4));
  const m = Number(fecha.slice(5, 7));
  const d = Number(fecha.slice(8, 10));
  y -= m <= 2 ? 1 : 0;
  const era = Math.floor(y / 400);
  const yoe = y - era * 400;
  const doy = Math.floor((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}

// Semanas completas de empleo continuo entre dos fechas (el Δεύτερος Πίνακας cuenta por semanas).
export function evdomadesApasxolisis(apo: string, eos: string, campo: string): number {
  const d = imeres(eos) - imeres(apo);
  if (!Number.isFinite(d) || d < 0) throw new ErrorEntrada("Η ημερομηνία λήξης πρέπει να είναι μετά την ημερομηνία έναρξης.", campo);
  return Math.floor((d + 1) / 7);
}

// Mapas «desde N semanas (o años) → valor»: el valor del mayor umbral alcanzado, o 0.
export function apoKlimaka(mapa: Readonly<Record<string, number>>, timi: number): number {
  let r = 0;
  let mejor = -Infinity;
  for (const [k, v] of Object.entries(mapa)) {
    const n = Number(k);
    if (timi >= n && n > mejor) {
      mejor = n;
      r = v;
    }
  }
  return r;
}
