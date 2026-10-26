import type { FechaISO } from "@/motor/tipos";

// Fechas puras en UTC: ningún cálculo depende de la zona horaria de quien corre el motor.
const MS_KUN = 86_400_000;

const OYLAR = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"] as const;

export function oyNomi(oy: number): string {
  return OYLAR[oy - 1] ?? "";
}

// «2026-yil sentabr», como en los boletines de stat.uz.
export function oyVaYil(fecha: string): string {
  return `${fecha.slice(0, 4)}-yil ${oyNomi(Number(fecha.slice(5, 7)))}`;
}

export function ms(fecha: string): number {
  return Date.parse(`${fecha}T00:00:00Z`);
}

export function iso(t: number): FechaISO {
  return new Date(t).toISOString().slice(0, 10) as FechaISO;
}

export function kunQoshish(fecha: string, n: number): FechaISO {
  return iso(ms(fecha) + n * MS_KUN);
}

export function kunlarOrasida(dan: string, gacha: string): number {
  return Math.round((ms(gacha) - ms(dan)) / MS_KUN);
}

// Mehnat kodeksi, 208-modda: feriados de fecha fija. Las dos hayit cambian cada año (calendario lunar,
// las fija un decreto), así que las calculadoras las piden aparte.
const BAYRAMLAR = ["01-01", "03-08", "03-21", "05-09", "09-01", "10-01", "12-08"] as const;

export function belgilanganBayrammi(fecha: string): boolean {
  return (BAYRAMLAR as readonly string[]).includes(fecha.slice(5, 10));
}

export function yakshanbami(fecha: string): boolean {
  return new Date(ms(fecha)).getUTCDay() === 0;
}

export interface TatilDavri {
  tugash: FechaISO;
  yakshanba: number;
  bayram: number;
  haqTolanadigan: number;
}

// Mehnat kodeksi, 221 y 233: la licencia se cuenta en días corridos sin los feriados (que la alargan) y
// el domingo no se paga.
export function tatilDavri(dan: string, kunlar: number): TatilDavri {
  let sanaldi = 0;
  let yakshanba = 0;
  let bayram = 0;
  let i = 0;
  let f = dan as FechaISO;
  while (sanaldi < kunlar) {
    f = kunQoshish(dan, i++);
    if (belgilanganBayrammi(f)) {
      bayram++;
      continue;
    }
    sanaldi++;
    if (yakshanbami(f)) yakshanba++;
  }
  return { tugash: f, yakshanba, bayram, haqTolanadigan: kunlar - yakshanba };
}

export interface DavrKunlari {
  kalendar: number;
  yakshanba: number;
  bayram: number;
}

// Cuenta días del período [dan, dan + kunlar - 1]: domingos y feriados fijos que no caen en domingo.
export function davrniSanash(dan: string, kunlar: number): DavrKunlari {
  let yakshanba = 0;
  let bayram = 0;
  for (let i = 0; i < kunlar; i++) {
    const f = kunQoshish(dan, i);
    if (yakshanbami(f)) yakshanba++;
    else if (belgilanganBayrammi(f)) bayram++;
  }
  return { kalendar: kunlar, yakshanba, bayram };
}
