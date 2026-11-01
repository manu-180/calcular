import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-11-01";
const FX = "https://www.mongolbank.mn/mn/currency-rates/data";
const PX = "https://data.1212.mn/api/v1/mn/NSO/Economy,%20environment/Consumer%20Price%20Index/";

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// El endpoint solo responde a POST con el rango en la query; la portada del banco lo llama igual.
async function ultimaSemana(http: Http, codigo: string): Promise<readonly PuntoSerie[] | null> {
  if (!http.postJson) return null;
  const hoy = new Date();
  const desde = new Date(hoy.getTime() - 14 * 86400000);
  const json = (await http.postJson(`${FX}?startDate=${iso(desde)}&endDate=${iso(hoy)}`, {}, { userAgentNavegador: true })) as { success?: unknown; data?: Record<string, string>[] } | null;
  if (!json || json.success !== true || !Array.isArray(json.data)) return null;
  const puntos: PuntoSerie[] = [];
  for (const fila of json.data) {
    const valor = Number(String(fila[codigo]).replace(/,/g, ""));
    if (esFechaISO(fila.RATE_DATE) && Number.isFinite(valor) && valor > 0) puntos.push({ fecha: fila.RATE_DATE, valor });
  }
  return puntos.length ? puntos : null;
}

function detectorFx(codigo: string, min: number, max: number): Detector {
  return {
    id: `mn.fx-${codigo.toLowerCase()}`,
    carril: "serie",
    serie: `mn.${codigo.toLowerCase()}`,
    metodo: "api-json",
    url: FX,
    banda: { min, max, saltoRelativoMax: 0.06 },
    traer: (http) => ultimaSemana(http, codigo),
  };
}

// PXWeb del instituto: base 2 es 2023=100, grupo 0 es el índice general y el mes va con su texto AAAA-MM.
async function pxMensual(http: Http, tabla: string): Promise<readonly PuntoSerie[] | null> {
  if (!http.postJson) return null;
  const url = PX + tabla;
  const meta = (await http.json(url)) as { variables?: { code: string; values: string[]; valueTexts: string[] }[] } | null;
  const v = meta?.variables;
  if (!v || v.length !== 3) return null;
  const cuerpo = {
    query: [
      { code: v[0].code, selection: { filter: "item", values: ["2"] } },
      { code: v[1].code, selection: { filter: "item", values: ["0"] } },
      { code: v[2].code, selection: { filter: "item", values: v[2].values.slice(0, 24) } },
    ],
    response: { format: "json" },
  };
  const json = (await http.postJson(url, cuerpo)) as { data?: { key: string[]; values: string[] }[] } | null;
  if (!Array.isArray(json?.data)) return null;
  const nombres = new Map(v[2].values.map((c, i) => [c, v[2].valueTexts[i]]));
  const puntos: PuntoSerie[] = [];
  for (const f of json.data) {
    const fecha = `${nombres.get(f.key[f.key.length - 1]) ?? ""}-01`;
    const valor = Number(f.values[0]);
    if (esFechaISO(fecha) && Number.isFinite(valor)) puntos.push({ fecha, valor });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

export const detectores: readonly Detector[] = [
  detectorFx("USD", 2800, 5000),
  detectorFx("CNY", 400, 750),
  detectorFx("RUB", 25, 70),
  detectorFx("EUR", 3000, 5800),
  {
    id: "mn.ipc-1212",
    carril: "serie",
    serie: "mn.ipc",
    metodo: "api-json",
    url: `${PX}DT_NSO_0600_001V3.px`,
    banda: { min: 110, max: 220, saltoRelativoMax: 0.05 },
    traer: (http) => pxMensual(http, "DT_NSO_0600_001V3.px"),
  },
  {
    id: "mn.inflyatsi-1212",
    carril: "serie",
    serie: "mn.inflyatsi",
    metodo: "api-json",
    url: `${PX}DT_NSO_0600_010V1.px`,
    banda: { min: -3, max: 40, saltoRelativoMax: 0.6 },
    traer: (http) => pxMensual(http, "DT_NSO_0600_010V1.px"),
  },
  {
    // El seguro social publica cada ley, decreto y mínimo como entrada de WordPress con fecha.
    id: "mn.ndaatgal-laws",
    carril: "norma",
    datos: ["mn.ndsh-ajiltan", "mn.ndsh-ajil-olgogch", "mn.uomsho", "mn.ndsh-dahin", "mn.hhdh-sar", "mn.hhdh-tsag", "mn.ovchnii-khuvi", "mn.jiremsnii-khuvi", "mn.tetgever-suuri"],
    metodo: "api-json",
    url: "https://www.ndaatgal.mn/wp-json/wp/v2/laws?per_page=20&_fields=date,link,title",
    async traer(http) {
      const json = await http.json(this.url);
      if (!Array.isArray(json)) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const p of json as { date?: unknown; link?: unknown; title?: { rendered?: unknown } }[]) {
        const titulo = p.title?.rendered;
        if (typeof p.date !== "string" || typeof p.link !== "string" || typeof titulo !== "string") return null;
        const fecha = p.date.slice(0, 10);
        if (esFechaISO(fecha) && fecha > VERIFICADO) hallazgos.push({ titulo, url: p.link, fecha });
      }
      return hallazgos;
    },
  },
  {
    // El decreto del seguro de salud sale cada enero. Aparecerá un título con el año nuevo en esta lista.
    id: "mn.emd-tolgool",
    carril: "norma",
    datos: ["mn.emd-ajiltan", "mn.emd-ajil-olgogch"],
    metodo: "html",
    url: "https://emd.gov.mn/legals/category/3",
    async traer(http) {
      const html = await http.texto(this.url);
      if (!/шимтгэлийн 2026 оны хувь/.test(html)) return null;
      const anio = /шимтгэлийн (20\d{2}) оны хувь/g;
      const hallazgos: HallazgoNorma[] = [];
      for (const m of html.matchAll(anio)) {
        if (Number(m[1]) > 2026) hallazgos.push({ titulo: `Эрүүл мэндийн даатгалын шимтгэлийн ${m[1]} оны хувь хэмжээ`, url: this.url, fecha: `${m[1]}-01-01` as FechaISO });
      }
      return hallazgos;
    },
  },
];
