import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import { oyVaYil } from "./kalendar";

function oyBoshi(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

function oylarOldin(fecha: FechaISO, n: number): FechaISO {
  const t = Number(fecha.slice(0, 4)) * 12 + Number(fecha.slice(5, 7)) - 1 - n;
  return `${Math.floor(t / 12)}-${String((t % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface NarxOzgarishi {
  dan: FechaISO;
  gacha: FechaISO;
  koef: number;
  jami: number;
  yillik: number | null;
  eslatmalar: string[];
}

// El motor solo entrega el último punto vigente; la historia de series.json se corta en ese punto para que
// un caso con fecha fija no vea meses publicados después.
export function narxOzgarishi(puntos: readonly PuntoSerieTupla[], oxirgi: PuntoSerie, dan: FechaISO, gacha: FechaISO, maydon: { dan: string; gacha: string }): NarxOzgarishi {
  const mavjud = puntos.filter(([f]) => f <= oxirgi.fecha);
  const indeks = new Map<string, number>(mavjud);
  const birinchi = mavjud[0]?.[0];
  if (!birinchi) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const eslatmalar: string[] = [];
  const m1 = oyBoshi(dan);
  let m2 = oyBoshi(gacha);
  if (m1 < birinchi) throw new ErrorEntrada(`Maʼlumotlar ${oyVaYil(birinchi)} oyidan boshlanadi.`, maydon.dan);
  if (m1 > oxirgi.fecha) throw new ErrorEntrada(`Bu oy uchun maʼlumot hali eʼlon qilinmagan. Oxirgisi: ${oyVaYil(oxirgi.fecha)}.`, maydon.dan);
  if (m2 > oxirgi.fecha) {
    eslatmalar.push(`Statistika agentligining oxirgi maʼlumoti: ${oyVaYil(oxirgi.fecha)}. Hisob shu oygacha qilindi.`);
    m2 = oxirgi.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Boshlangʻich oy oxirgi oydan oldin boʻlishi kerak.", maydon.dan);
  const i1 = indeks.get(m1);
  const i2 = indeks.get(m2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const yilOldin = indeks.get(oylarOldin(m2, 12));
  const koef = i2 / i1;
  return { dan: m1, gacha: m2, koef, jami: (koef - 1) * 100, yillik: yilOldin === undefined ? null : (i2 / yilOldin - 1) * 100, eslatmalar };
}
