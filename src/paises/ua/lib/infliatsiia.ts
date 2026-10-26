import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MISIATSI = ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"];

export function misiatsRik(fecha: string): string {
  return `${MISIATSI[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

export function pochatokMisiatsia(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export function zsunuty(fecha: FechaISO, n: number): FechaISO {
  const t = Number(fecha.slice(0, 4)) * 12 + Number(fecha.slice(5, 7)) - 1 + n;
  return `${Math.floor(t / 12)}-${String((t % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

// Мотор дає лише останню точку ряду на дату розрахунку. Історію з series.json обрізаємо до неї,
// щоб випадок із фіксованою датою не бачив пізніше опублікованих місяців.
export function dostupni(punkty: readonly PuntoSerieTupla[], ostannii: PuntoSerie): Map<string, number> {
  return new Map<string, number>(punkty.filter(([f]) => f <= ostannii.fecha));
}

// Індекс інфляції за місяці від «vid» до «do» включно: рівень кінця «do», поділений на рівень кінця
// місяця перед «vid». Рівні в series.json уже накопичені (грудень 2009 = 100).
export function indeksZa(rivni: Map<string, number>, vid: FechaISO, do_: FechaISO): number | null {
  const kinets = rivni.get(do_);
  const pochatok = rivni.get(zsunuty(vid, -1));
  if (kinets === undefined || pochatok === undefined) return null;
  return kinets / pochatok;
}

export function perevirytyMezhi(rivni: Map<string, number>, ostannii: PuntoSerie, vid: FechaISO, pole: string): void {
  const pershyi = [...rivni.keys()].sort()[1];
  if (!pershyi) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  if (vid < pershyi) throw new ErrorEntrada(`Дані починаються з місяця: ${misiatsRik(pershyi)}.`, pole);
  if (vid > ostannii.fecha) throw new ErrorEntrada(`Держстат ще не опублікував індекс за цей місяць. Останній: ${misiatsRik(ostannii.fecha)}.`, pole);
}
