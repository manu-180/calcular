import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const PCI = "https://data.stat.gov.lv/api/v1/lv/OSP_PUB/START/VEK/PC/PCI/PCI030m";
const DSV = "https://data.stat.gov.lv/api/v1/lv/OSP_PUB/START/EMP/DS/DSV/DSV010m";
const EUROSTAT_MW = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/earn_mw_cur?geo=LV&currency=EUR&lastTimePeriod=2&format=JSON";

// La API PxWeb de CSP responde al GET con metadatos: los datos salen con POST, y el Http del motor solo
// tiene GET. Por eso el formato ?query no está disponible y se usa el recurso de descarga de la tabla.
interface PxRespuesta {
  data?: { key?: string[]; values?: string[] }[];
}

function puntos(json: PxRespuesta): readonly PuntoSerie[] | null {
  if (!Array.isArray(json?.data)) return null;
  const r: PuntoSerie[] = [];
  for (const fila of json.data) {
    const t = fila.key?.at(-1);
    const v = Number(fila.values?.[0]);
    const m = t ? /^(\d{4})M(\d{2})$/.exec(t) : null;
    if (!m || !Number.isFinite(v)) return null;
    const fecha = `${m[1]}-${m[2]}-01`;
    if (!esFechaISO(fecha)) return null;
    r.push({ fecha, valor: v });
  }
  return r.length ? r : null;
}

async function serie(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  return puntos((await http.json(url)) as PxRespuesta);
}

// Eurostat publica el salario mínimo por semestre: un semestre nuevo con otro monto es un hallazgo.
async function minimalaAlga(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const json = (await http.json(url)) as { value?: Record<string, unknown>; dimension?: { time?: { category?: { index?: Record<string, number> } } } };
  const laiki = json?.dimension?.time?.category?.index;
  if (!laiki || !json.value) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const [periods, i] of Object.entries(laiki)) {
    const summa = json.value[String(i)];
    if (typeof summa !== "number") continue;
    const m = /^(\d{4})-S([12])$/.exec(periods);
    if (!m) return null;
    if (summa !== 780) {
      const fecha = `${m[1]}-${m[2] === "1" ? "01" : "07"}-01`;
      if (!esFechaISO(fecha)) return null;
      hallazgos.push({ titulo: `Minimālā alga ${periods}: ${summa} EUR`, url, fecha });
    }
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "lv.pci-csp",
    carril: "serie",
    serie: "lv.pci",
    metodo: "api-json",
    url: `${PCI}?valueCodes[TIME]=top(13)`,
    banda: { min: 25000, max: 45000, saltoRelativoMax: 0.04 },
    traer(http) {
      return serie(http, this.url);
    },
  },
  {
    id: "lv.videja-alga-csp",
    carril: "serie",
    serie: "lv.videja-alga",
    metodo: "api-json",
    url: `${DSV}?valueCodes[TIME]=top(13)&valueCodes[GRS_NET]=GRS&valueCodes[ContentsCode]=DSV010m`,
    banda: { min: 1200, max: 3500, saltoRelativoMax: 0.15 },
    traer(http) {
      return serie(http, this.url);
    },
  },
  {
    id: "lv.minimala-alga-eurostat",
    carril: "norma",
    datos: ["lv.minimala-alga", "lv.pasnodarbinata-objekts"],
    metodo: "api-json",
    url: EUROSTAT_MW,
    traer(http) {
      return minimalaAlga(http, this.url);
    },
  },
];
