import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const LB = "https://www.lb.lt/webservices/FxRates/FxRates.asmx/getFxRatesForCurrency";
const VKI = "https://osp-rs.stat.gov.lt/rest_xml/data/S7R330_M2020121_2/";
const EUROSTAT_MMA = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/earn_mw_cur?geo=LT&currency=EUR&lastTimePeriod=2&format=JSON";

function isoDia(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// El servicio pide un rango de fechas: 20 días alcanzan para cubrir un corte largo del cron.
async function santykiaiLb(http: Http, kodas: string): Promise<readonly PuntoSerie[] | null> {
  const iki = new Date();
  const nuo = new Date(iki.getTime() - 20 * 86400000);
  const xml = await http.texto(`${LB}?tp=EU&ccy=${kodas}&dtFrom=${isoDia(nuo)}&dtTo=${isoDia(iki)}`);
  if (!/<FxRates/.test(xml)) return null;
  const puntos: PuntoSerie[] = [];
  const re = new RegExp(`<Dt>(\\d{4}-\\d{2}-\\d{2})</Dt>[\\s\\S]*?<Ccy>${kodas}</Ccy>\\s*<Amt>([\\d.]+)</Amt>`, "g");
  for (const m of xml.matchAll(re)) {
    if (!esFechaISO(m[1])) return null;
    puntos.push({ fecha: m[1], valor: Number(m[2]) });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

function detectorLb(kodas: string, banda: DetectorSerie["banda"]): Detector {
  return {
    id: `lt.${kodas.toLowerCase()}-lb`,
    carril: "serie",
    serie: `lt.${kodas.toLowerCase()}`,
    metodo: "api-xml",
    url: LB,
    banda,
    traer(http) {
      return santykiaiLb(http, kodas);
    },
  };
}

// La API de la agencia ignora la clave SDMX y devuelve todos los rubros: se acota por período y se filtra
// el índice general (CP00) para no bajar 58 MB en cada corrida.
async function vki(http: Http): Promise<readonly PuntoSerie[] | null> {
  const metai = new Date().getUTCFullYear() - 1;
  const xml = await http.texto(`${VKI}?startPeriod=${metai}-01`);
  if (!/GenericData/.test(xml)) return null;
  const puntos: PuntoSerie[] = [];
  const re = /value="CP00"><\/g:Value><g:Value id="MATVNT" value="nera"><\/g:Value><g:Value id="LAIKOTARPIS" value="(\d{4})M(\d{2})"><\/g:Value><\/g:ObsKey><g:ObsValue value="([\d.]+)"/g;
  for (const m of xml.matchAll(re)) {
    const fecha = `${m[1]}-${m[2]}-01`;
    if (!esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor: Math.round(Number(m[3]) * 10000) / 10000 });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

// Eurostat publica la MMA por semestre: un semestre posterior al último cargado o con otro monto es un hallazgo.
async function mmaEurostat(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const json = (await http.json(url)) as { value?: Record<string, unknown>; dimension?: { time?: { category?: { index?: Record<string, number> } } } };
  const laikas = json?.dimension?.time?.category?.index;
  if (!laikas || !json.value) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const [periodas, i] of Object.entries(laikas)) {
    const suma = json.value[String(i)];
    if (typeof suma !== "number") continue;
    const m = /^(\d{4})-S([12])$/.exec(periodas);
    if (!m) return null;
    if (m[1] > "2026" || suma !== 1153) {
      const fecha = `${m[1]}-${m[2] === "1" ? "01" : "07"}-01`;
      if (!esFechaISO(fecha)) return null;
      hallazgos.push({ titulo: `MMA ${periodas}: ${suma} EUR`, url, fecha });
    }
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  detectorLb("USD", { min: 0.9, max: 1.4, saltoRelativoMax: 0.05 }),
  detectorLb("GBP", { min: 0.7, max: 1.05, saltoRelativoMax: 0.05 }),
  detectorLb("CHF", { min: 0.8, max: 1.2, saltoRelativoMax: 0.05 }),
  detectorLb("PLN", { min: 3.8, max: 5, saltoRelativoMax: 0.05 }),
  {
    id: "lt.vki-vda",
    carril: "serie",
    serie: "lt.vki",
    metodo: "api-xml",
    url: VKI,
    banda: { min: 95, max: 140, saltoRelativoMax: 0.03 },
    traer(http) {
      return vki(http);
    },
  },
  {
    id: "lt.mma-eurostat",
    carril: "norma",
    datos: ["lt.mma", "lt.mma-ankstesne"],
    metodo: "api-json",
    url: EUROSTAT_MMA,
    traer(http) {
      return mmaEurostat(http, this.url);
    },
  },
];
