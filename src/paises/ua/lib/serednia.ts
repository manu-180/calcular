import { ErrorEntrada, porcentaje } from "@/motor/calculo";

// Середньоденна зарплата: заробіток за розрахунковий період, поділений на календарні дні цього
// періоду (Порядок № 100 для відпусток, Порядок № 1266 для лікарняних і декретних).
export function serednodenna(zarobitok: number, dni: number, redondear: (x: number) => number, pola: { zarobitok: string; dni: string }): number {
  if (zarobitok <= 0) throw new ErrorEntrada("Введіть заробіток за розрахунковий період, більший за нуль.", pola.zarobitok);
  if (dni <= 0 || dni > 366) throw new ErrorEntrada("Кількість днів має бути від 1 до 366.", pola.dni);
  return redondear(zarobitok / dni);
}

export function podatkyIzSumy(suma: number, pdfo: number, vz: number, redondear: (x: number) => number) {
  const p = redondear(porcentaje(suma, pdfo));
  const z = redondear(porcentaje(suma, vz));
  return { pdfo: p, vz: z, naRuky: redondear(suma - p - z) };
}
