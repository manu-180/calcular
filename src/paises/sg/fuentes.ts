import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const MESES: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
  January: "01", February: "02", March: "03", April: "04", June: "06", July: "07", August: "08", September: "09", October: "10", November: "11", December: "12",
};
const VERIFICADO: FechaISO = "2026-10-14";

function fechaTexto(dia: string, mes: string, anio: string): FechaISO | null {
  const f = `${anio}-${MESES[mes] ?? "xx"}-${dia.padStart(2, "0")}`;
  return esFechaISO(f) ? f : null;
}

async function cpiSingStat(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(url)) as { Data?: { row?: { seriesNo?: unknown; columns?: unknown }[] } };
  const fila = json?.Data?.row?.find((r) => r.seriesNo === "1");
  if (!fila || !Array.isArray(fila.columns)) return null;
  const puntos: PuntoSerie[] = [];
  for (const c of fila.columns as { key?: unknown; value?: unknown }[]) {
    if (typeof c.key !== "string" || typeof c.value !== "string") return null;
    const [anio, mes] = c.key.split(" ");
    const fecha = `${anio}-${MESES[mes ?? ""] ?? "xx"}-01`;
    const valor = Number(c.value);
    if (!esFechaISO(fecha) || !Number.isFinite(valor)) return null;
    if (fecha >= "2025-01-01") puntos.push({ fecha, valor });
  }
  return puntos.length ? puntos : null;
}

// Las páginas del CPF Board anuncian cada cambio con la fecha en que empieza a regir ("Interest rate
// from 1 January 2027 to ...", "Updates on 1 Jan 2027"). Una fecha posterior a la última
// verificación es un cambio que todavía no está en datos.json.
async function fechasNuevas(http: Http, url: string, patron: RegExp, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!/CPF|IRAS/i.test(html)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(patron)) {
    const fecha = fechaTexto(m[1], m[2], m[3]);
    if (fecha && fecha > VERIFICADO && !hallazgos.some((h) => h.fecha === fecha)) hallazgos.push({ titulo: `${titulo} (${fecha})`, url, fecha });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "sg.cpi-singstat",
    carril: "serie",
    serie: "sg.cpi",
    metodo: "api-json",
    url: "https://tablebuilder.singstat.gov.sg/api/table/tabledata/M213751?seriesNoORrowNo=1&limit=2000",
    banda: { min: 80, max: 140, saltoRelativoMax: 0.03 },
    traer(http) {
      return cpiSingStat(http, this.url);
    },
  },
  {
    id: "sg.cpf-interes",
    carril: "norma",
    datos: ["sg.cpf-interes-oa", "sg.cpf-interes-sma", "sg.cpf-interes-extra", "sg.cpf-extra-55", "sg.cpf-extra-topes", "sg.hdb-tasa-concesional"],
    metodo: "html",
    url: "https://www.cpf.gov.sg/member/growing-your-savings/earning-higher-returns/earning-attractive-interest",
    userAgentNavegador: true,
    traer(http) {
      return fechasNuevas(http, this.url, /Interest rate from (\d{1,2}) ([A-Z][a-z]+) (\d{4})/g, "New CPF interest rates");
    },
  },
  {
    id: "sg.cpf-tasas",
    carril: "norma",
    datos: ["sg.cpf-tasa-empleador", "sg.cpf-tasa-empleado", "sg.cpf-factor-gradual", "sg.cpf-tope-ow", "sg.cpf-asignacion-ma", "sg.cpf-asignacion-sa-ra"],
    metodo: "html",
    url: "https://www.cpf.gov.sg/employer/employer-obligations/how-much-cpf-contributions-to-pay",
    userAgentNavegador: true,
    traer(http) {
      return fechasNuevas(http, this.url, /(?:Updates on|from) (\d{1,2}) ([A-Z][a-z]+) (\d{4})/g, "CPF contribution changes");
    },
  },
  {
    id: "sg.iras-gst",
    carril: "norma",
    datos: ["sg.gst"],
    metodo: "html",
    url: "https://www.iras.gov.sg/taxes/goods-services-tax-(gst)/basics-of-gst/current-gst-rates",
    userAgentNavegador: true,
    traer(http) {
      return fechasNuevas(http, this.url, /(\d{1,2}) ([A-Z][a-z]{2}) (\d{4}) to/g, "GST rate change");
    },
  },
];
