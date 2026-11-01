import { esFechaISO } from "@/motor/vigencia";
import type { BandaSerie, Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";

const BOI = "https://edge.boi.org.il/FusionEdgeServer/sdmx/v2/data/dataflow/BOI.STATISTICS";

// La API SDMX de בנק ישראל devuelve CSV con una fila por observación: TIME_PERIOD es la fecha
// (AAAA-MM-DD en las diarias, AAAA-MM en las mensuales) y OBS_VALUE el valor.
async function serieBoi(http: Http, url: string, codigo: string): Promise<readonly PuntoSerie[] | null> {
  const csv = await http.texto(url);
  const lineas = csv.split(/\r?\n/).filter((l) => l.trim());
  const cabecera = lineas[0]?.split(",") ?? [];
  const iFecha = cabecera.indexOf("TIME_PERIOD");
  const iValor = cabecera.indexOf("OBS_VALUE");
  const iCodigo = cabecera.indexOf("SERIES_CODE");
  if (iFecha < 0 || iValor < 0 || iCodigo < 0) return null;
  const puntos: PuntoSerie[] = [];
  for (const linea of lineas.slice(1)) {
    const c = linea.split(",");
    if (c[iCodigo] !== codigo) return null;
    const fecha = c[iFecha]?.length === 7 ? `${c[iFecha]}-01` : c[iFecha];
    const valor = Number(c[iValor]);
    if (!esFechaISO(fecha) || !Number.isFinite(valor)) return null;
    puntos.push({ fecha, valor });
  }
  return puntos.length ? puntos : null;
}

function detectorCambio(moneda: string, banda: BandaSerie): Detector {
  const codigo = `RER_${moneda}_ILS`;
  return {
    id: `il.boi-${moneda.toLowerCase()}`,
    carril: "serie",
    serie: `il.${moneda.toLowerCase()}`,
    // CSV de texto plano: se lee con http.texto como una página.
    metodo: "html",
    url: `${BOI}/EXR/1.0/${codigo}?startperiod=2026-10-01&format=csv`,
    banda,
    traer(http) {
      return serieBoi(http, this.url, codigo);
    },
  };
}

// Las páginas del ביטוח לאומי ponen la fecha de cada cifra como «החל ב- 01.04.2026». Una fecha
// posterior a la última lectura es un aviso para releer la página y cargar el tramo nuevo.
async function fechasNuevasBtl(http: Http, url: string, valida: RegExp, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  if (!valida.test(html)) return null;
  const nuevas = new Set<FechaISO>();
  for (const m of html.matchAll(/\b(\d{2})\.(\d{2})\.(20\d{2})\b/g)) {
    const fecha = `${m[3]}-${m[2]}-${m[1]}`;
    if (esFechaISO(fecha) && fecha > VERIFICADO) nuevas.add(fecha);
  }
  return [...nuevas].sort().map((fecha) => ({ titulo: `${titulo} (${fecha.split("-").reverse().join(".")})`, url, fecha }));
}

const BTL_TASAS = "https://www.btl.gov.il/Insurance/Rates/Pages/%D7%9C%D7%A2%D7%95%D7%91%D7%93%D7%99%D7%9D%20%D7%A9%D7%9B%D7%99%D7%A8%D7%99%D7%9D.aspx";
const BTL_MINIMO = "https://www.btl.gov.il/Mediniyut/GeneralData/Pages/%D7%A9%D7%9B%D7%A8%20%D7%9E%D7%99%D7%A0%D7%99%D7%9E%D7%95%D7%9D.aspx";

export const detectores: readonly Detector[] = [
  detectorCambio("USD", { min: 2.5, max: 4.5, saltoRelativoMax: 0.05 }),
  detectorCambio("EUR", { min: 2.8, max: 5, saltoRelativoMax: 0.05 }),
  detectorCambio("GBP", { min: 3.3, max: 5.8, saltoRelativoMax: 0.05 }),
  {
    id: "il.boi-madad",
    carril: "serie",
    serie: "il.madad",
    metodo: "html",
    url: `${BOI}/PRI/1.0/CP_1951?startperiod=2026-01&format=csv`,
    banda: { min: 38000000, max: 50000000, saltoRelativoMax: 0.03 },
    traer(http) {
      return serieBoi(http, this.url, "CP_1951");
    },
  },
  {
    id: "il.btl-dmei-bituach",
    carril: "norma",
    datos: ["il.bl-tikrot", "il.bl-oved", "il.mas-briut", "il.bl-maasik"],
    metodo: "html",
    url: BTL_TASAS,
    traer(http) {
      return fechasNuevasBtl(http, this.url, /דמי ביטוח/, "שיעורי דמי ביטוח לאומי או תקרות חדשים לעובדים שכירים");
    },
  },
  {
    id: "il.btl-sachar-minimum",
    carril: "norma",
    datos: ["il.sachar-minimum"],
    metodo: "html",
    url: BTL_MINIMO,
    traer(http) {
      return fechasNuevasBtl(http, this.url, /שכר מינימום/, "שכר מינימום חדש");
    },
  },
  {
    id: "il.btl-dmei-leida",
    carril: "norma",
    datos: ["il.dmei-leida-max"],
    metodo: "html",
    url: "https://www.btl.gov.il/benefits/maternity/Childbirth_Allowance/Pages/ShiureyLeda.aspx",
    traer(http) {
      return fechasNuevasBtl(http, this.url, /דמי לידה|דמי הלידה/, "סכום מרבי חדש לדמי לידה");
    },
  },
  {
    id: "il.btl-avtala",
    carril: "norma",
    datos: ["il.avtala-schumim", "il.avtala-shiurim"],
    metodo: "html",
    url: "https://www.btl.gov.il/benefits/Unemployment/Pages/hisuv.aspx",
    traer(http) {
      return fechasNuevasBtl(http, this.url, /אבטלה/, "סכומים חדשים לדמי אבטלה");
    },
  },
  {
    id: "il.btl-miluim",
    carril: "norma",
    datos: ["il.miluim", "il.miluim-tosefet"],
    metodo: "html",
    url: "https://www.btl.gov.il/benefits/Reserve_Service/Pages/%d7%a9%d7%99%d7%a2%d7%95%d7%a8%d7%99%20%d7%94%d7%a7%d7%a6%d7%91%d7%94.aspx",
    traer(http) {
      return fechasNuevasBtl(http, this.url, /מילואים|התגמול/, "סכומים חדשים לתגמולי מילואים");
    },
  },
  {
    id: "il.btl-pgia",
    carril: "norma",
    datos: ["il.pgia", "il.pgia-shiur"],
    metodo: "html",
    url: "https://www.btl.gov.il/benefits/Work_Injury/%d7%93%d7%9e%d7%99%20%d7%a4%d7%92%d7%99%d7%a2%d7%94/Pages/%d7%a9%d7%99%d7%a2%d7%95%d7%a8%20%d7%93%d7%9e%d7%99%20%d7%94%d7%a4%d7%92%d7%99%d7%a2%d7%94%20%d7%9c%d7%99%d7%95%d7%9d.aspx",
    traer(http) {
      return fechasNuevasBtl(http, this.url, /דמי הפגיעה|דמי פגיעה/, "סכום מרבי חדש לדמי פגיעה");
    },
  },
  {
    id: "il.btl-zikna",
    carril: "norma",
    datos: ["il.zikna"],
    metodo: "html",
    url: "https://www.btl.gov.il/benefits/old_age/Pages/%d7%aa%d7%95%d7%a1%d7%a4%d7%aa%20%d7%91%d7%a2%d7%93%20%d7%91%d7%9f%20%d7%96%d7%95%d7%92%20%d7%95%d7%99%d7%9c%d7%93%d7%99%d7%9d.aspx",
    traer(http) {
      return fechasNuevasBtl(http, this.url, /אזרח ותיק/, "סכומים חדשים לקצבת אזרח ותיק");
    },
  },
  {
    id: "il.btl-atzmai",
    carril: "norma",
    datos: ["il.bl-atzmai", "il.bl-atzmai-mizarit"],
    metodo: "html",
    url: "https://www.btl.gov.il/Insurance/Rates/Pages/%d7%9c%d7%a2%d7%a6%d7%9e%d7%90%d7%99%d7%9d.aspx",
    traer(http) {
      return fechasNuevasBtl(http, this.url, /עצמאי/, "שיעורי דמי ביטוח חדשים לעצמאים");
    },
  },
  {
    id: "il.btl-maanak-leida",
    carril: "norma",
    datos: ["il.maanak-leida"],
    metodo: "html",
    url: "https://www.btl.gov.il/benefits/maternity/maanakleda/Pages/ShiurMaanakLeda.aspx",
    traer(http) {
      return fechasNuevasBtl(http, this.url, /מענק/, "סכומים חדשים למענק לידה");
    },
  },
  {
    id: "il.btl-nechut",
    carril: "norma",
    datos: ["il.nechut-kitzba", "il.nechut-yeled", "il.nechut-zug"],
    metodo: "html",
    url: "https://www.btl.gov.il/benefits/Disability/Pages/%D7%A9%D7%99%D7%A2%D7%95%D7%A8%D7%99%20%D7%94%D7%A7%D7%A6%D7%91%D7%94.aspx",
    traer(http) {
      return fechasNuevasBtl(http, this.url, /קצב/, "סכומים חדשים לקצבת נכות כללית");
    },
  },
  {
    id: "il.btl-lo-oved",
    carril: "norma",
    datos: ["il.bl-lo-oved", "il.bl-lo-oved-schumim"],
    metodo: "html",
    url: "https://www.btl.gov.il/Insurance/Rates/Pages/%D7%9E%D7%99%20%D7%A9%D7%90%D7%99%D7%A0%D7%9D%20%D7%A2%D7%95%D7%91%D7%93%D7%99%D7%9D%20%D7%95%D7%91%D7%A2%D7%9C%D7%99%20%D7%94%D7%9B%D7%A0%D7%A1%D7%94%20%D7%A9%D7%9C%D7%90%20%D7%9E%D7%A2%D7%91%D7%95%D7%93%D7%94.aspx",
    traer(http) {
      return fechasNuevasBtl(http, this.url, /דמי ביטוח/, "סכומים חדשים לדמי ביטוח של מי שלא עובד");
    },
  },
];
