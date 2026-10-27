import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import series from "./series.json";

const VERIFICADO: FechaISO = "2026-10-27";

// Лента Нацбанка (windows-1251) отдает курсы, которые действуют с даты Date, за Nominal единиц валюты.
async function kursNbkr(http: Http, url: string, kod: string): Promise<readonly PuntoSerie[] | null> {
  const xml = await http.texto(url);
  const data = /<CurrencyRates[^>]*Date="(\d\d)\.(\d\d)\.(\d{4})"/.exec(xml);
  const m = new RegExp(`<Currency ISOCode="${kod}">\\s*<Nominal>(\\d+)</Nominal>\\s*<Value>([\\d]+,[\\d]+)</Value>`).exec(xml);
  if (!data || !m) return null;
  const fecha = `${data[3]}-${data[2]}-${data[1]}`;
  const valor = Number(m[2].replace(",", ".")) / Number(m[1]);
  if (!esFechaISO(fecha) || !Number.isFinite(valor) || valor <= 0) return null;
  return [{ fecha, valor: Math.round(valor * 10000) / 10000 }];
}

function detectorKursa(kod: string, banda: DetectorSerie["banda"]): Detector {
  return {
    id: `kg.${kod.toLowerCase()}-nbkr`,
    carril: "serie",
    serie: `kg.${kod.toLowerCase()}`,
    metodo: "api-xml",
    url: "https://www.nbkr.kg/XML/daily.xml",
    banda,
    traer(http) {
      return kursNbkr(http, this.url, kod);
    },
  };
}

const IPC = (series.series.find((s) => s.id === "kg.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MESYATSY = ["январ", "феврал", "март", "апрел", "ма", "июн", "июл", "август", "сентябр", "октябр", "ноябр", "декабр"];

// На главной странице Нацстаткома есть блок «Основные социально-экономические показатели в январе-
// сентябре 2026 года» с ИПЦ к декабрю прошлого года («108.1 %»). Индекс месяца (2005 = 100) получается из
// декабрьской точки серии; принимаем только месяц, который идет сразу за последним в серии (пропуск
// месяца значит, что точку надо внести вручную из таблицы Нацстаткома).
async function ipcStat(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const tekst = (await http.texto(url)).replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
  const period = /показатели в январе(?:-([а-яё]+))? (\d{4}) года/i.exec(tekst);
  const ipc = /Индекс потребительских цен к декабрю (\d{4})\s*г\.\s*([\d]+[.,]\d)\s*%/i.exec(tekst);
  if (!period || !ipc) return null;
  const god = Number(period[2]);
  const mesyats = (period[1] ?? "январе").toLowerCase();
  const nomer = MESYATSY.findIndex((p) => mesyats.startsWith(p));
  const dekabr = IPC.find(([f]) => f === `${god - 1}-12-01`)?.[1];
  const posledniy = IPC.at(-1);
  if (nomer < 0 || Number(ipc[1]) !== god - 1 || dekabr === undefined || !posledniy) return null;
  const fecha = `${god}-${String(nomer + 1).padStart(2, "0")}-01`;
  const [g, mes] = posledniy[0].split("-").map(Number);
  const sleduyushchiy = `${mes === 12 ? g + 1 : g}-${String(mes === 12 ? 1 : mes + 1).padStart(2, "0")}-01`;
  const kDekabryu = Number(ipc[2].replace(",", "."));
  if (!esFechaISO(fecha) || !Number.isFinite(kDekabryu)) return null;
  if (fecha <= posledniy[0]) return [];
  if (fecha !== sleduyushchiy) return null;
  return [{ fecha, valor: Math.round(((dekabr * kDekabryu) / 100) * 10000) / 10000 }];
}

// ЦБД Минюста отдает по коду документа список редакций. Новая редакция после проверки значит, что в
// акт внесли изменения.
async function redaktsiiMinyusta(http: Http, url: string, kod: string, nazvanie: string): Promise<readonly HallazgoNorma[] | null> {
  const json = (await http.json(url, { userAgentNavegador: true })) as { editions?: unknown } | null;
  if (!json || !Array.isArray(json.editions)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const e of json.editions as { id?: unknown; nameRus?: unknown }[]) {
    if (typeof e.id !== "number" || typeof e.nameRus !== "string") continue;
    const p = /^(\d\d)\.(\d\d)\.(\d{4})$/.exec(e.nameRus);
    if (!p) continue;
    const fecha = `${p[3]}-${p[2]}-${p[1]}`;
    if (!esFechaISO(fecha) || fecha <= VERIFICADO) continue;
    hallazgos.push({ titulo: `${nazvanie}: новая редакция от ${e.nameRus}`, url: `https://cbd.minjust.gov.kg/${kod}/edition/${e.id}/ru`, fecha });
  }
  return hallazgos;
}

function detectorAkta(id: string, kod: string, nazvanie: string, datos: readonly string[]): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "api-json",
    url: `https://cbd.minjust.gov.kg/api/v1/GetDocument?DocumentCode=${kod}`,
    userAgentNavegador: true,
    traer(http) {
      return redaktsiiMinyusta(http, this.url, kod, nazvanie);
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorKursa("USD", { min: 70, max: 110, saltoRelativoMax: 0.05 }),
  detectorKursa("EUR", { min: 75, max: 125, saltoRelativoMax: 0.06 }),
  detectorKursa("RUB", { min: 0.7, max: 1.6, saltoRelativoMax: 0.08 }),
  detectorKursa("KZT", { min: 0.12, max: 0.26, saltoRelativoMax: 0.06 }),
  detectorKursa("CNY", { min: 9, max: 17, saltoRelativoMax: 0.06 }),
  {
    id: "kg.ipc-stat",
    carril: "serie",
    serie: "kg.ipc",
    metodo: "html",
    url: "https://www.stat.gov.kg/ru/",
    banda: { min: 450, max: 700, saltoRelativoMax: 0.04 },
    traer(http) {
      return ipcStat(http, this.url);
    },
  },
  detectorAkta("kg.nalogovyy-kodeks", "112340", "Налоговый кодекс", [
    "kg.podokhodnyy-nalog",
    "kg.personalnyy-vychet-rp",
    "kg.vychet-izhdivenets-rp",
    "kg.nds",
    "kg.nalog-s-prodazh",
    "kg.edinyy-nalog",
    "kg.nalog-na-pribyl",
    "kg.penya-nalog",
    "kg.penya-nalog-maks",
  ]),
  detectorAkta("kg.zakon-o-tarifakh", "4-1330", "Закон о тарифах страховых взносов", ["kg.sf-rabotnik", "kg.sf-rabotodatel", "kg.sf-predelnaya-baza", "kg.sf-minimum-dolya"]),
  detectorAkta("kg.trudovoy-kodeks", "3-45", "Трудовой кодекс", [
    "kg.otpusk-dney",
    "kg.dney-v-mesyatse",
    "kg.sverkhurochnye",
    "kg.sverkhurochnye-polutornye-chasy",
    "kg.vykhodnoe-posobie",
    "kg.zaderzhka-zarplaty",
    "kg.dekret-dni",
  ]),
  detectorAkta("kg.byudzhet-2026", "4-5709", "Закон о республиканском бюджете на 2026-2028 годы", ["kg.mzp"]),
  detectorAkta("kg.posobiya", "12601", "Положение о пособиях по временной нетрудоспособности и по беременности и родам", [
    "kg.bolnichnye-stazh",
    "kg.bolnichnye-dney-rabotodatel",
    "kg.bolnichnye-rp",
    "kg.bolnichnye-porog-rp",
    "kg.dekretnye-rp",
  ]),
  detectorAkta("kg.semeynyy-kodeks", "3-21", "Семейный кодекс", ["kg.alimenty-dolya", "kg.alimenty-minimum-mzp"]),
  detectorAkta("kg.raschetnyy-pokazatel", "6-2385", "Постановление Жогорку Кенеша о размере расчетного показателя", ["kg.rp"]),
];
