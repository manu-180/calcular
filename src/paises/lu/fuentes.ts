import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const LUSTAT = "https://lustat.statec.lu/rest/data/LU1,";
const IPCN = `${LUSTAT}DSD_PRIX_CONSO@DF_E5100,1.0/all?startPeriod=2025-01`;
const IPCN_MOYENNE = `${LUSTAT}DSD_PRIX_CONSO@DF_E5101,1.0/all?startPeriod=2025-01`;
const ACD_BAREMES = "https://impotsdirects.public.lu/fr/baremes.html";
const CCSS_PARAMETRES = "https://ccss.public.lu/fr/parametres-sociaux.html";

// LUSTAT responde CSV SDMX solo con este Accept; sin él devuelve XML. Sin la columna TIME_PERIOD el
// formato cambió: null en vez de una lista vacía.
async function serieLustat(http: Http, url: string): Promise<PuntoSerie[] | null> {
  const csv = await http.texto(url, { encabezados: { Accept: "application/vnd.sdmx.data+csv;version=1.0.0" } });
  const [cabecera, ...lineas] = csv.split(/\r?\n/);
  const columnas = cabecera?.split(",") ?? [];
  const iFreq = columnas.indexOf("FREQ");
  const iPeriodo = columnas.indexOf("TIME_PERIOD");
  const iValor = columnas.indexOf("OBS_VALUE");
  if (iFreq < 0 || iPeriodo < 0 || iValor < 0) return null;
  const puntos: PuntoSerie[] = [];
  for (const linea of lineas) {
    const c = linea.split(",");
    if (c[iFreq] !== "M" || !c[iValor]) continue;
    const fecha = `${c[iPeriodo]}-01`;
    if (!esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor: Number(c[iValor]) });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

function hoy(): FechaISO {
  return new Date().toISOString().slice(0, 10) as FechaISO;
}

export const detectores: readonly Detector[] = [
  {
    id: "lu.ipcn-statec",
    carril: "serie",
    serie: "lu.ipcn",
    metodo: "api-json",
    url: IPCN,
    banda: { min: 900, max: 1400, saltoRelativoMax: 0.03 },
    async traer(http) {
      return serieLustat(http, this.url);
    },
  },
  {
    id: "lu.ipcn-moyenne-statec",
    carril: "serie",
    serie: "lu.ipcn-moyenne",
    metodo: "api-json",
    url: IPCN_MOYENNE,
    banda: { min: 900, max: 1400, saltoRelativoMax: 0.02 },
    async traer(http) {
      return serieLustat(http, this.url);
    },
  },
  {
    id: "lu.acd-baremes",
    carril: "norma",
    datos: ["lu.retenue-classe-1", "lu.retenue-classe-1a", "lu.retenue-classe-2", "lu.impot-classe-1", "lu.impot-classe-1a", "lu.impot-classe-2", "lu.fonds-emploi-retenue", "lu.fonds-emploi-impot"],
    metodo: "html",
    url: ACD_BAREMES,
    async traer(http): Promise<HallazgoNorma[] | null> {
      const html = await http.texto(this.url);
      const anios = [...html.matchAll(/bareme-(\d{4})-format-excel\.xlsx/g)].map((m) => Number(m[1]));
      if (anios.length === 0) return null;
      const ultimo = Math.max(...anios);
      return ultimo > 2025 ? [{ titulo: `Barème ${ultimo} publié par l'ACD`, url: this.url, fecha: hoy() }] : [];
    },
  },
  {
    id: "lu.ccss-parametres",
    carril: "norma",
    datos: ["lu.ssm-non-qualifie", "lu.plafond-cotisable", "lu.nombre-indice", "lu.cotisation-pension", "lu.cotisation-maladie-soins", "lu.cotisation-accident", "lu.cotisation-mutualite"],
    metodo: "html",
    url: CCSS_PARAMETRES,
    async traer(http): Promise<HallazgoNorma[] | null> {
      const html = await http.texto(this.url);
      const m = /Nombre indice[\s\S]{0,4000}?(\d{2}\.\d{2}\.\d{4})\s*<\/td>\s*<td[^>]*>\s*([\d.,]+)/.exec(html);
      if (!m) return null;
      return m[2] === "992,24" ? [] : [{ titulo: `Nouveau nombre indice ${m[2]} au ${m[1]}`, url: this.url, fecha: hoy() }];
    },
  },
];
