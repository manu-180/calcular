import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const MESYATSY = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"] as const;

const FORMAT_CHISLA = new Intl.NumberFormat("ru-KZ", { maximumFractionDigits: 2 });

export function chislo(n: number): string {
  return FORMAT_CHISLA.format(n);
}

export function kopeyki(x: number): number {
  return Math.sign(x) * Math.round(Math.abs(x) * 100 + 1e-7) / 100;
}

// Escala del ИПН con los límites en МРП (Налоговый кодекс, статья 363): se pasa a tenge con el МРП
// vigente al 1 de enero del año.
export function shkalaVTenge(shkala: readonly FilaEscala[], mrp: number): FilaEscala[] {
  return shkala.map((f) => ({ ...f, desde: f.desde * mrp, hasta: f.hasta === null ? null : f.hasta * mrp }));
}

export function nalogPoShkale(shkala: readonly FilaEscala[], baza: number): number {
  return baza <= 0 ? 0 : aplicarEscalaMarginal(shkala, baza);
}

export interface ParametryRabotnika {
  mzp: number;
  mrp: number;
  opv: number;
  opvMaksMzp: number;
  vosms: number;
  vosmsMaksMzp: number;
  vychetMrp: number;
  shkalaIpn: readonly FilaEscala[];
  primenyatVychet: boolean;
}

export interface MesyatsRabotnika {
  mesyats: number;
  brutto: number;
  opv: number;
  vosms: number;
  vychet: number;
  oblagaemyy: number;
  ipn: number;
  netto: number;
}

export function uderzhaniyaRabotnika(brutto: number, p: ParametryRabotnika): { opv: number; vosms: number; vychet: number } {
  const opv = kopeyki((Math.min(brutto, p.opvMaksMzp * p.mzp) * p.opv) / 100);
  const vosms = kopeyki((Math.min(brutto, p.vosmsMaksMzp * p.mzp) * p.vosms) / 100);
  // Статья 437: базовый вычет применяется у одного налогового агента и в пределах дохода работника.
  const vychet = p.primenyatVychet ? Math.max(0, Math.min(p.vychetMrp * p.mrp, brutto - opv - vosms)) : 0;
  return { opv, vosms, vychet };
}

// Статья 441: ИПН с дохода работника считается нарастающим итогом с 1 января, 10 % до 8500 МРП и
// 15 % с превышения, минус налог, исчисленный за прошлые месяцы.
export function godRabotnika(bruttoVMesyats: number, p: ParametryRabotnika): MesyatsRabotnika[] {
  const shkala = shkalaVTenge(p.shkalaIpn, p.mrp);
  const god: MesyatsRabotnika[] = [];
  let oblagaemyyNarastayushchiy = 0;
  let ipnNarastayushchiy = 0;
  for (let m = 1; m <= 12; m++) {
    const { opv, vosms, vychet } = uderzhaniyaRabotnika(bruttoVMesyats, p);
    const oblagaemyy = Math.max(0, kopeyki(bruttoVMesyats - opv - vosms - vychet));
    oblagaemyyNarastayushchiy += oblagaemyy;
    const ipnVsego = kopeyki(nalogPoShkale(shkala, oblagaemyyNarastayushchiy));
    const ipn = kopeyki(ipnVsego - ipnNarastayushchiy);
    ipnNarastayushchiy = ipnVsego;
    god.push({ mesyats: m, brutto: bruttoVMesyats, opv, vosms, vychet, oblagaemyy, ipn, netto: kopeyki(bruttoVMesyats - opv - vosms - ipn) });
  }
  return god;
}

export function summa(god: readonly MesyatsRabotnika[], pole: keyof MesyatsRabotnika): number {
  return kopeyki(god.reduce((s, m) => s + m[pole], 0));
}

export interface ParametryRabotodatelya {
  mzp: number;
  mrp: number;
  opvr: number;
  opvrMin: number;
  opvrMaks: number;
  so: number;
  soMin: number;
  soMaks: number;
  oosms: number;
  oosmsMaksMzp: number;
  sn: number;
  snMinMrp: number;
  platitOpvr: boolean;
}

export interface PlatezhiRabotodatelya {
  opvr: number;
  so: number;
  oosms: number;
  sn: number;
  vsego: number;
}

function vPredelakh(x: number, min: number, maks: number): number {
  return Math.min(Math.max(x, min), maks);
}

// Платежи работодателя за месяц: ОПВР (Социальный кодекс, статья 251), СО (статьи 244 и 245),
// ООСМС (Закон об ОСМС, статья 27) и социальный налог (Налоговый кодекс, статьи 556 до 558).
export function platezhiRabotodatelya(brutto: number, opv: number, vosms: number, p: ParametryRabotodatelya): PlatezhiRabotodatelya {
  if (brutto <= 0) return { opvr: 0, so: 0, oosms: 0, sn: 0, vsego: 0 };
  const opvr = p.platitOpvr ? kopeyki((vPredelakh(brutto, p.opvrMin * p.mzp, p.opvrMaks * p.mzp) * p.opvr) / 100) : 0;
  const so = kopeyki((vPredelakh(brutto - opv, p.soMin * p.mzp, p.soMaks * p.mzp) * p.so) / 100);
  const oosms = kopeyki((Math.min(brutto, p.oosmsMaksMzp * p.mzp) * p.oosms) / 100);
  const minSn = p.snMinMrp * p.mrp;
  const obyektSn = brutto <= minSn ? minSn : brutto - opv - vosms;
  const sn = kopeyki((obyektSn * p.sn) / 100);
  return { opvr, so, oosms, sn, vsego: kopeyki(opvr + so + oosms + sn) };
}
