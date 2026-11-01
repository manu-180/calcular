import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";
import { AYLAR } from "./bordro";

const TUFE = (series.series.find((s) => s.id === "tr.tufe")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export function ayAdi(f: string): string {
  const [y, m] = f.split("-").map(Number);
  return `${AYLAR[m - 1]} ${y}`;
}

export function ayBasi(f: FechaISO): FechaISO {
  return `${f.slice(0, 7)}-01` as FechaISO;
}

export function oncekiAy(f: FechaISO, kac = 1): FechaISO {
  const [y, m] = f.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 - kac, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-01` as FechaISO;
}

// Endeks değerleri series.json'dan gelir; son yayımlanmış ay registro'nun verdiği noktadır (yaşı
// maxAntiguedadDias ile denetlenir). Ondan sonraki aylar yok sayılır.
export function endeksler(son: PuntoSerie): Map<string, number> {
  const m = new Map<string, number>();
  for (const [f, v] of TUFE) if (f <= son.fecha) m.set(f, v);
  if (!m.has(son.fecha)) m.set(son.fecha, son.valor);
  return m;
}

export function endeks(m: Map<string, number>, ay: FechaISO, alan: string): number {
  const v = m.get(ay);
  if (v === undefined) throw new ErrorEntrada(`${ayAdi(ay)} için TÜFE verisi yok.`, alan);
  return v;
}

// On iki aylık ortalamalara göre değişim: son on iki ayın endeks ortalamasının, ondan önceki on iki
// ayın ortalamasına oranı (TÜİK'in kira artışında kullanılan göstergesi).
export function onIkiAylikOrtalama(m: Map<string, number>, ay: FechaISO, alan: string): number {
  let son = 0;
  let once = 0;
  for (let i = 0; i < 12; i++) {
    son += endeks(m, oncekiAy(ay, i), alan);
    once += endeks(m, oncekiAy(ay, i + 12), alan);
  }
  return (son / once - 1) * 100;
}

export function yillikDegisim(m: Map<string, number>, ay: FechaISO, alan: string): number {
  return (endeks(m, ay, alan) / endeks(m, oncekiAy(ay, 12), alan) - 1) * 100;
}
