// Дати як «РРРР-ММ-ДД». Рахуємо дні чистою арифметикою календаря (без обʼєкта дати), щоб
// розрахунок був чистою функцією.
export function dniURotsi(rik: number): number {
  return (rik % 4 === 0 && rik % 100 !== 0) || rik % 400 === 0 ? 366 : 365;
}

const DNI = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function dniUMisiatsi(fecha: string): number {
  const rik = Number(fecha.slice(0, 4));
  const mis = Number(fecha.slice(5, 7));
  return mis === 2 && dniURotsi(rik) === 366 ? 29 : DNI[mis - 1];
}

// Номер дня від 1970-01-01 (алгоритм days_from_civil).
export function denUtc(fecha: string): number {
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

export function zDnia(den: number): string {
  const z = den + 719468;
  const era = Math.floor(z / 146097);
  const doe = z - era * 146097;
  const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
  const mp = Math.floor((5 * doy + 2) / 153);
  const d = doy - Math.floor((153 * mp + 2) / 5) + 1;
  const m = mp + (mp < 10 ? 3 : -9);
  const y = yoe + era * 400 + (m <= 2 ? 1 : 0);
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

// Сума за днями від «vid» до «do» включно, де кожен день ділиться на кількість днів свого року.
export function sumaZaDniamy(vid: string, do_: string, zaDen: (fecha: string) => number): number {
  let suma = 0;
  for (let d = denUtc(vid); d <= denUtc(do_); d++) {
    const f = zDnia(d);
    suma += zaDen(f) / dniURotsi(Number(f.slice(0, 4)));
  }
  return suma;
}
