import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";

// НБУ віддає курс у форматі «ДД.ММ.РРРР».
function fechaNbu(s: unknown): FechaISO | null {
  if (typeof s !== "string") return null;
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(s);
  if (!m) return null;
  const f = `${m[3]}-${m[2]}-${m[1]}`;
  return esFechaISO(f) ? f : null;
}

async function kursNbu(http: Http, url: string, kod: string): Promise<readonly PuntoSerie[] | null> {
  const json = await http.json(url);
  if (!Array.isArray(json)) return null;
  const puntos: PuntoSerie[] = [];
  for (const r of json as { cc?: unknown; rate?: unknown; exchangedate?: unknown }[]) {
    const fecha = fechaNbu(r.exchangedate);
    if (r.cc !== kod || fecha === null || typeof r.rate !== "number" || !Number.isFinite(r.rate)) return null;
    puntos.push({ fecha, valor: r.rate });
  }
  return puntos.length ? puntos : null;
}

function detectorKursu(kod: string, banda: DetectorSerie["banda"]): Detector {
  const k = kod.toLowerCase();
  return {
    id: `ua.${k}-nbu`,
    carril: "serie",
    serie: `ua.${k}`,
    metodo: "api-json",
    url: `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${kod}&json`,
    banda,
    traer(http) {
      return kursNbu(http, this.url, kod);
    },
  };
}

// НБУ публікує індекс споживчих цін Держстату до попереднього місяця. У полі dt стоїть перше число
// місяця, наступного за звітним (dt 20220401 = березень 2022), тому зсуваємо на місяць назад. Ланцюжок
// індексу починається з грудня 2009 = 100, як у series.json.
async function ipcNbu(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const json = await http.json(url);
  if (!Array.isArray(json)) return null;
  const zminy = new Map<string, number>();
  for (const r of json as { id_api?: unknown; ku?: unknown; mcrd081?: unknown; tzep?: unknown; dt?: unknown; value?: unknown }[]) {
    if (r.id_api !== "prices_price_cpi_" || r.ku !== null || r.mcrd081 !== "Total" || r.tzep !== "PCPM_") continue;
    if (typeof r.dt !== "string" || !/^\d{8}$/.test(r.dt) || typeof r.value !== "number") return null;
    let rik = Number(r.dt.slice(0, 4));
    let mis = Number(r.dt.slice(4, 6)) - 1;
    if (mis === 0) {
      rik -= 1;
      mis = 12;
    }
    zminy.set(`${rik}-${String(mis).padStart(2, "0")}-01`, r.value);
  }
  if (!zminy.has("2010-01-01")) return null;
  const puntos: PuntoSerie[] = [{ fecha: "2009-12-01", valor: 100 }];
  let riven = 100;
  for (const fecha of [...zminy.keys()].sort()) {
    if (fecha <= "2009-12-01" || !esFechaISO(fecha)) continue;
    riven = (riven * (100 + (zminy.get(fecha) ?? 0))) / 100;
    puntos.push({ fecha, valor: Math.round(riven * 1e8) / 1e8 });
  }
  return puntos.length > 1 ? puntos : null;
}

// Нове рішення НБУ видно як зміну значення KEY_PolicyRate після останньої перевіреної дати.
async function oblikovaStavka(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const json = await http.json(url);
  if (!Array.isArray(json)) return null;
  const ryad = (json as { id_api?: unknown; dt?: unknown; value?: unknown }[])
    .filter((r) => r.id_api === "KEY_PolicyRate" && typeof r.dt === "string" && typeof r.value === "number")
    .map((r) => ({ fecha: `${String(r.dt).slice(0, 4)}-${String(r.dt).slice(4, 6)}-${String(r.dt).slice(6, 8)}`, valor: r.value as number }))
    .sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  if (!ryad.length) return null;
  const hallazgos: HallazgoNorma[] = [];
  let poperednia = ryad[0].valor;
  for (const r of ryad) {
    if (r.valor !== poperednia && r.fecha > "2026-09-18" && esFechaISO(r.fecha)) {
      hallazgos.push({ titulo: `Облікова ставка НБУ ${r.valor} % з ${r.fecha}`, url: "https://bank.gov.ua/ua/monetary/stages/archive-rish", fecha: r.fecha });
    }
    poperednia = r.valor;
  }
  return hallazgos;
}

// «Останні зміни в законодавстві» ЗІР ДПС: беремо записи після дати перевірки, в яких ідеться
// про ставки і показники, з яких рахують калькулятори.
const ZIR_ZMINY = "https://zir.tax.gov.ua/main/lastupdate/";

async function zminyZir(http: Http, slova: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(ZIR_ZMINY);
  if (!html.includes("cont-head")) return null;
  const hallazgos: HallazgoNorma[] = [];
  const re = /<span class="cont-head">(\d{2})\.(\d{2})\.(\d{4})<\/span>\s*<span class="cont-body">([^<]+)<\/span>/g;
  for (let m = re.exec(html); m; m = re.exec(html)) {
    const fecha = `${m[3]}-${m[2]}-${m[1]}`;
    if (!esFechaISO(fecha) || fecha <= VERIFICADO || !slova.test(m[4])) continue;
    hallazgos.push({ titulo: m[4].trim(), url: ZIR_ZMINY, fecha });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  detectorKursu("USD", { min: 35, max: 60, saltoRelativoMax: 0.06 }),
  detectorKursu("EUR", { min: 38, max: 68, saltoRelativoMax: 0.06 }),
  detectorKursu("PLN", { min: 8, max: 16, saltoRelativoMax: 0.06 }),
  detectorKursu("GBP", { min: 45, max: 80, saltoRelativoMax: 0.06 }),
  {
    id: "ua.ipc-nbu",
    carril: "serie",
    serie: "ua.ipc",
    metodo: "api-json",
    url: "https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?start=20100101&end=20301201&period=m&mcrd081=Total&tzep=PCPM_&json",
    banda: { min: 500, max: 900, saltoRelativoMax: 0.06 },
    traer(http) {
      return ipcNbu(http, this.url);
    },
  },
  {
    id: "ua.oblikova-stavka-nbu",
    carril: "norma",
    datos: ["ua.oblikova-stavka"],
    metodo: "api-json",
    url: "https://bank.gov.ua/NBUStatService/v1/statdirectory/key?json",
    traer(http) {
      return oblikovaStavka(http, this.url);
    },
  },
  {
    id: "ua.zir-podatky",
    carril: "norma",
    datos: ["ua.pdfo", "ua.viiskovyi-zbir", "ua.pdv", "ua.yedynyi-podatok", "ua.limity-yedynyi-podatok", "ua.vz-fop", "ua.dyvidendy", "ua.pdfo-prodazh-maina", "ua.psp", "ua.limit-psp"],
    metodo: "html",
    url: ZIR_ZMINY,
    traer(http) {
      return zminyZir(http, /доход\p{L}* фізичних|військов\p{L}* збор|єдин\p{L}* податк|додану вартість|соціальн\p{L}* пільг/iu);
    },
  },
  {
    id: "ua.zir-yesv-minimumy",
    carril: "norma",
    datos: ["ua.yesv", "ua.maks-baza-yesv", "ua.minimalna-zarplata", "ua.minimalna-zarplata-hodynna", "ua.prozhytkovyi-minimum"],
    metodo: "html",
    url: ZIR_ZMINY,
    traer(http) {
      return zminyZir(http, /єдин\p{L}* внес|мінімальн\p{L}* заробітн|прожитков\p{L}* мінімум|Державн\p{L}* бюджет/iu);
    },
  },
];
