import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import series from "./series.json";

const VERIFICADO: FechaISO = "2026-10-24";

// Лента Нацбанка: курс, установленный на дату pubDate, за quant единиц валюты (рубль и юань идут за 1).
async function kursNbk(http: Http, url: string, kod: string): Promise<readonly PuntoSerie[] | null> {
  const xml = await http.texto(url);
  if (!/<rss/.test(xml)) return null;
  const re = new RegExp(`<title>${kod}</title>\\s*<pubDate>(\\d\\d)\\.(\\d\\d)\\.(\\d{4})</pubDate>\\s*<description>([\\d.]+)</description>\\s*<quant>(\\d+)</quant>`);
  const m = re.exec(xml);
  if (!m) return null;
  const fecha = `${m[3]}-${m[2]}-${m[1]}`;
  const valor = Number(m[4]) / Number(m[5]);
  if (!esFechaISO(fecha) || !Number.isFinite(valor) || valor <= 0) return null;
  return [{ fecha, valor: Math.round(valor * 10000) / 10000 }];
}

function detectorKursa(kod: string, banda: DetectorSerie["banda"]): Detector {
  return {
    id: `kz.${kod.toLowerCase()}-nbk`,
    carril: "serie",
    serie: `kz.${kod.toLowerCase()}`,
    metodo: "api-xml",
    url: "https://nationalbank.kz/rss/rates_all.xml",
    banda,
    traer(http) {
      return kursNbk(http, this.url, kod);
    },
  };
}

const MESYATSY = ["январ", "феврал", "март", "апрел", "ма", "июн", "июл", "август", "сентябр", "октябр", "ноябр", "декабр"];
const IPC = (series.series.find((s) => s.id === "kz.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

// На странице статистики цен Бюро публикует ИПЦ месяца к тому же месяцу прошлого года («109,3 ...
// сентябрь 2026г. к сентябрю 2025г.»). Цепной индекс серии продолжается от точки годом раньше.
async function ipcStat(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url);
  const tekst = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const m = /(\d{3},\d)\s*Индекс потребительских цен\s*в %,\s*([а-я]+)\s+(\d{4})г\. к/i.exec(tekst);
  if (!m) return null;
  const nomer = MESYATSY.findIndex((p) => m[2].toLowerCase().startsWith(p) && (p !== "ма" || m[2].toLowerCase().startsWith("май")));
  if (nomer < 0) return null;
  const god = Number(m[3]);
  const fecha = `${god}-${String(nomer + 1).padStart(2, "0")}-01`;
  const godomRaneye = `${god - 1}-${String(nomer + 1).padStart(2, "0")}-01`;
  const baza = IPC.find(([f]) => f === godomRaneye)?.[1];
  const godKGodu = Number(m[1].replace(",", "."));
  if (!esFechaISO(fecha) || baza === undefined || !Number.isFinite(godKGodu)) return null;
  return [{ fecha, valor: Math.round(((baza * godKGodu) / 100) * 10000) / 10000 }];
}

// Портал gov.kz отдает тексты нормативных актов по коду «Адилет» вместе с датой обновления. Новая
// дата после проверки значит, что в акт внесли изменения.
async function aktGovKz(http: Http, url: string, nazvanie: string): Promise<readonly HallazgoNorma[] | null> {
  const json = await http.json(url, { userAgentNavegador: true });
  if (!Array.isArray(json)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const d of json as { id?: unknown; projects?: unknown; updated_date?: unknown }[]) {
    if (typeof d.updated_date !== "string" || typeof d.id !== "number" || typeof d.projects !== "string") continue;
    const fecha = d.updated_date.slice(0, 10);
    if (!esFechaISO(fecha) || fecha <= VERIFICADO) continue;
    hallazgos.push({ titulo: `${nazvanie}: новая редакция от ${fecha}`, url: `https://www.gov.kz/memleket/entities/${d.projects}/documents/details/${d.id}?lang=ru`, fecha });
  }
  return hallazgos;
}

function detectorAkta(id: string, kod: string, nazvanie: string, datos: readonly string[]): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "api-json",
    url: `https://www.gov.kz/api/v1/public/content-manager/documents?adilet=${kod}`,
    userAgentNavegador: true,
    traer(http) {
      return aktGovKz(http, this.url, nazvanie);
    },
  };
}

// Страница фонда перечисляет пределы «не более N млн» по видам вкладов: другой набор чисел значит,
// что пределы изменились.
async function limityKfgd(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  const chisla = [...html.replace(/<[^>]+>/g, " ").matchAll(/не более\s+(\d+)\s*млн/g)].map((m) => Number(m[1]));
  if (chisla.length === 0) return null;
  const izvestnye = new Set([20, 10, 5]);
  if (chisla.every((n) => izvestnye.has(n))) return [];
  return [{ titulo: `Пределы гарантии КФГД изменились: ${chisla.join(", ")} млн тенге`, url, fecha: VERIFICADO }];
}

export const detectores: readonly Detector[] = [
  {
    id: "kz.kfgd-limity",
    carril: "norma",
    datos: ["kz.kdif-limity"],
    metodo: "html",
    url: "https://kdif.kz/ru/what-we-guarantee",
    traer(http) {
      return limityKfgd(http, this.url);
    },
  },
  detectorKursa("USD", { min: 350, max: 650, saltoRelativoMax: 0.06 }),
  detectorKursa("EUR", { min: 400, max: 750, saltoRelativoMax: 0.06 }),
  detectorKursa("RUB", { min: 3.5, max: 9, saltoRelativoMax: 0.08 }),
  detectorKursa("CNY", { min: 45, max: 95, saltoRelativoMax: 0.06 }),
  {
    id: "kz.ipc-stat",
    carril: "serie",
    serie: "kz.ipc",
    metodo: "html",
    url: "https://stat.gov.kz/ru/industries/economy/prices/",
    banda: { min: 400, max: 700, saltoRelativoMax: 0.04 },
    traer(http) {
      return ipcStat(http, this.url);
    },
  },
  detectorAkta("kz.byudzhet-2026", "Z2500000239", "Закон о республиканском бюджете на 2026-2028 годы", [
    "kz.mrp",
    "kz.mzp",
    "kz.prozhitochnyy-minimum",
    "kz.minimalnaya-pensiya",
    "kz.bazovaya-pensiya-min",
  ]),
  detectorAkta("kz.nalogovyy-kodeks", "K2500000214", "Налоговый кодекс", [
    "kz.ipn-shkala",
    "kz.ipn-shkala-ip",
    "kz.ipn-shkala-dividendy",
    "kz.ipn-chastnaya-praktika",
    "kz.bazovyy-vychet-mrp",
    "kz.sotsialnyy-nalog",
    "kz.sotsialnyy-nalog-min-mrp",
    "kz.sotsialnyy-nalog-ip",
    "kz.nds",
    "kz.nds-osnovnaya",
    "kz.uproshchenka-stavka",
    "kz.uproshchenka-korrektirovka",
    "kz.uproshchenka-predel-mrp",
    "kz.nalog-na-imushchestvo",
    "kz.transportnyy-nalog-legkovye",
    "kz.transportnyy-nalog-nadbavka",
    "kz.transportnyy-nalog-vozrast",
  ]),
  detectorAkta("kz.sotsialnyy-kodeks", "K2300000224", "Социальный кодекс", [
    "kz.opv",
    "kz.opv-maks-mzp",
    "kz.opvr",
    "kz.opvr-predely",
    "kz.so",
    "kz.so-predely",
    "kz.opv-s-sotsvyplat",
    "kz.ukhod-koeffitsient",
    "kz.ukhod-maks-mzp",
    "kz.posobie-po-ukhodu-mrp",
    "kz.posobie-na-rozhdenie-mrp",
  ]),
  detectorAkta("kz.zakon-osms", "Z1500000405", "Закон об обязательном социальном медицинском страховании", [
    "kz.vosms",
    "kz.vosms-maks-mzp",
    "kz.oosms",
    "kz.oosms-maks-mzp",
    "kz.vosms-ip",
  ]),
  detectorAkta("kz.trudovoy-kodeks", "K1500000414", "Трудовой кодекс", [
    "kz.otpusk-dney",
    "kz.sverkhurochnye-koeffitsient",
    "kz.sverkhurochnye-limity",
    "kz.bolnichnye-limit-mrp",
    "kz.dekret-dni",
    "kz.kompensatsiya-poterya-raboty",
  ]),
];
