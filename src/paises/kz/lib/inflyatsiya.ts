import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import { MESYATSY } from "./zarplata";

export function mesyatsGod(fecha: string): string {
  return `${MESYATSY[Number(fecha.slice(5, 7)) - 1].toLowerCase()} ${fecha.slice(0, 4)}`;
}

function nachaloMesyatsa(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface Izmenenie {
  s: FechaISO;
  po: FechaISO;
  mnozhitel: number;
  vsego: number;
  primechaniya: string[];
}

// Движок передает только последнюю точку серии; история из series.json обрезается по ней, чтобы
// пример с фиксированной датой не видел месяцы, опубликованные позже.
export function izmenenieTsen(tochki: readonly PuntoSerieTupla[], posledniy: PuntoSerie, s: FechaISO, po: FechaISO, polya: { s: string; po: string }): Izmenenie {
  const dostupnye = tochki.filter(([f]) => f <= posledniy.fecha);
  const indeks = new Map<string, number>(dostupnye);
  const pervyy = dostupnye[0]?.[0];
  if (!pervyy) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const primechaniya: string[] = [];
  const m1 = nachaloMesyatsa(s);
  let m2 = nachaloMesyatsa(po);
  if (m1 < pervyy) throw new ErrorEntrada(`Данные начинаются с месяца: ${mesyatsGod(pervyy)}.`, polya.s);
  if (m1 > posledniy.fecha) throw new ErrorEntrada(`За этот месяц данных еще нет. Последние данные: ${mesyatsGod(posledniy.fecha)}.`, polya.s);
  if (m2 > posledniy.fecha) {
    primechaniya.push(`Последние опубликованные данные за ${mesyatsGod(posledniy.fecha)}. Расчет сделан по этот месяц.`);
    m2 = posledniy.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Начальный месяц должен быть раньше конечного.", polya.s);
  const i1 = indeks.get(m1);
  const i2 = indeks.get(m2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const mnozhitel = i2 / i1;
  return { s: m1, po: m2, mnozhitel, vsego: (mnozhitel - 1) * 100, primechaniya };
}
