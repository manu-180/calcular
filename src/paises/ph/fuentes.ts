import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-16";
const MESES = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function fechaLarga(dia: string, mes: string, anio: string): FechaISO | null {
  const m = MESES.indexOf(mes.toLowerCase());
  if (m < 0) return null;
  const f = `${anio}-${String(m + 1).padStart(2, "0")}-${dia.padStart(2, "0")}`;
  return esFechaISO(f) ? f : null;
}

// La home de la NWPC lista, por región, el número de cada Wage Order vigente seguido de "Effective
// DD Month YYYY". Un número o una fecha nueva después de la última verificación es una orden nueva.
async function ordenesNwpc(http: Http, url: string, filtro: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const re = /WO\s*No\.?\s*([^<|]{2,60}?)\s*<[\s\S]{0,400}?Effective\s+(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/g;
  let vistos = 0;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(re)) {
    vistos++;
    const fecha = fechaLarga(m[2], m[3], m[4]);
    const numero = m[1].replace(/\s+/g, " ").trim();
    if (!fecha || fecha <= VERIFICADO || !filtro.test(numero)) continue;
    hallazgos.push({ titulo: `Wage Order No. ${numero}`, url, fecha });
  }
  return vistos === 0 ? null : hallazgos;
}

// La tabla de la SSS se publica como imagen con el número de circular en el nombre del archivo
// (Cir-2024-006-Employers). Una circular de empleadores con otro número es un esquema nuevo.
async function circularSss(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const nombres = [...html.matchAll(/Cir-(\d{4})-(\d{3})-Employers/g)];
  if (nombres.length === 0) return null;
  const nuevas = nombres.filter((m) => `${m[1]}-${m[2]}` !== "2024-006");
  return [...new Set(nuevas.map((m) => `${m[1]}-${m[2]}`))].map((n) => ({ titulo: `SSS Circular No. ${n} (employers and employees)`, url, fecha: VERIFICADO }));
}

// El listado de circulares de PhilHealth trae el título y "Publication Date: MM-DD-YYYY". Solo
// interesan las que hablan de primas o contribuciones.
async function circularesPhilhealth(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const re = /href="(PC\d{4}-\d{4}[^"]*\.pdf)"[^>]*>([\s\S]*?)<\/a>[\s\S]{0,600}?Publication Date:\s*(\d{2})-(\d{2})-(\d{4})/g;
  let vistos = 0;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(re)) {
    vistos++;
    const fecha = `${m[5]}-${m[3]}-${m[4]}`;
    const titulo = m[2].replace(/\s+/g, " ").trim();
    if (!esFechaISO(fecha) || fecha <= VERIFICADO || !/premium|contribution/i.test(titulo)) continue;
    hallazgos.push({ titulo, url: new URL(m[1], url).toString(), fecha });
  }
  return vistos === 0 ? null : hallazgos;
}

const MESES_CORTOS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// PXWeb de la PSA solo devuelve datos a un POST con la consulta. Se piden todos los años y meses de
// Philippines (Geolocation 0) y All items (Commodity 0); la respuesta json-stat trae los valores en
// el orden de las dimensiones, con Year y Period variando más rápido al final.
async function ipcPsa(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  if (!http.postJson) return null;
  const consulta = {
    query: [
      { code: "Geolocation", selection: { filter: "item", values: ["0"] } },
      { code: "Commodity Description", selection: { filter: "item", values: ["0"] } },
      { code: "Year", selection: { filter: "all", values: ["*"] } },
      { code: "Period", selection: { filter: "all", values: ["*"] } },
    ],
    response: { format: "json-stat" },
  };
  const r = (await http.postJson(url, consulta)) as {
    dataset?: { dimension?: Record<string, { category?: { index?: Record<string, number>; label?: Record<string, string> } }>; value?: (number | null)[] };
  };
  const anios = r.dataset?.dimension?.Year?.category;
  const periodos = r.dataset?.dimension?.Period?.category;
  const valores = r.dataset?.value;
  if (!anios?.index || !anios.label || !periodos?.index || !periodos.label || !Array.isArray(valores)) return null;
  const nPeriodos = Object.keys(periodos.index).length;
  const puntos: PuntoSerie[] = [];
  for (const [ka, ia] of Object.entries(anios.index)) {
    for (const [kp, ip] of Object.entries(periodos.index)) {
      const mes = MESES_CORTOS.indexOf(periodos.label[kp]);
      const valor = valores[ia * nPeriodos + ip];
      if (mes < 0 || typeof valor !== "number") continue;
      const fecha = `${anios.label[ka]}-${String(mes + 1).padStart(2, "0")}-01`;
      if (esFechaISO(fecha)) puntos.push({ fecha, valor });
    }
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

export const detectores: readonly Detector[] = [
  {
    id: "ph.psa-cpi",
    carril: "serie",
    serie: "ph.cpi",
    metodo: "api-json",
    url: "https://openstat.psa.gov.ph/PXWeb/api/v1/en/DB/2M/PI/CPI/2018NEW/0012M4ACP22.px",
    banda: { min: 90, max: 250, saltoRelativoMax: 0.03 },
    traer(http) {
      return ipcPsa(http, this.url);
    },
  },
  {
    id: "ph.nwpc-wage-orders",
    carril: "norma",
    datos: ["ph.minimum-wage-low", "ph.minimum-wage-high"],
    metodo: "html",
    url: "https://nwpc.dole.gov.ph/",
    userAgentNavegador: true,
    traer(http) {
      return ordenesNwpc(http, this.url, /^(?!.*DW)/);
    },
  },
  {
    id: "ph.nwpc-kasambahay-orders",
    carril: "norma",
    datos: ["ph.kasambahay-wage-low", "ph.kasambahay-wage-high"],
    metodo: "html",
    url: "https://nwpc.dole.gov.ph/",
    userAgentNavegador: true,
    traer(http) {
      return ordenesNwpc(http, this.url, /DW/);
    },
  },
  {
    id: "ph.sss-contribution-table",
    carril: "norma",
    datos: ["ph.sss-employee-rate", "ph.sss-employer-rate", "ph.sss-msc-minimum", "ph.sss-msc-maximum", "ph.sss-regular-msc-maximum", "ph.sss-ec"],
    metodo: "html",
    url: "https://www.sss.gov.ph/sss-contribution-table/",
    userAgentNavegador: true,
    traer(http) {
      return circularSss(http, this.url);
    },
  },
  {
    id: "ph.philhealth-circulars",
    carril: "norma",
    datos: ["ph.philhealth-rate", "ph.philhealth-floor", "ph.philhealth-ceiling", "ph.philhealth-employee-share"],
    metodo: "html",
    url: "https://www.philhealth.gov.ph/circulars/2026/",
    userAgentNavegador: true,
    traer(http) {
      return circularesPhilhealth(http, this.url);
    },
  },
];
