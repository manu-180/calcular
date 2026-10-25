import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";
const BOM = "https://www.bom.mu/";
const MRA_LEYES = "https://www.mra.mu/index.php/legislations";
const MESES_CORTOS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// La portada del BOM dibuja las últimas cuatro semanas de tipos de venta con Highcharts: las fechas van
// en xAxis.categories ("23Oct 2026") y cada moneda en una serie {name: 'USDMUR', data: [...]}.
async function tipoBom(http: Http, url: string, par: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const categorias = /categories:\s*\[([^\]]+)\]/.exec(html)?.[1];
  const datos = new RegExp(`name:\\s*'${par}',\\s*data:\\s*\\[([^\\]]+)\\]`).exec(html)?.[1];
  if (!categorias || !datos) return null;
  const fechas = [...categorias.matchAll(/"(\d{2})([A-Za-z]{3}) (\d{4})"/g)].map((m) => {
    const mes = MESES_CORTOS.indexOf(m[2]) + 1;
    return mes > 0 ? `${m[3]}-${String(mes).padStart(2, "0")}-${m[1]}` : "";
  });
  const valores = datos.split(",").map((s) => Number(s.trim()));
  if (fechas.length === 0 || fechas.length !== valores.length) return null;
  const puntos: PuntoSerie[] = [];
  for (let i = 0; i < fechas.length; i++) {
    const fecha = fechas[i];
    if (!esFechaISO(fecha) || !Number.isFinite(valores[i])) return null;
    puntos.push({ fecha, valor: valores[i] });
  }
  return puntos;
}

// Statistics Mauritius publica el IPC mensual solo en PDF. La página HTML del trimestre dice
// "stood at 112.2 in June 2026 ... to reach 114.1 in September 2026": de ahí salen dos puntos por
// trimestre. Los meses del medio se cargan a mano desde los PDF mensuales.
async function cpiTrimestral(http: Http, portada: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(portada, { userAgentNavegador: true });
  const ruta = /href="(\/Pages\/Statistics\/ESI\/CPI\/CPI_\dQtr\d{2}\.aspx)"/.exec(html)?.[1];
  if (!ruta) return null;
  const pagina = await http.texto(`https://statsmauritius.govmu.org${ruta}`, { userAgentNavegador: true });
  const texto = pagina.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const puntos: PuntoSerie[] = [];
  for (const m of texto.matchAll(/(?:stood at|reach) (\d{2,3}\.\d) in ([A-Z][a-z]+) (\d{4})/g)) {
    const mes = MESES.indexOf(m[2]) + 1;
    const fecha = `${m[3]}-${String(mes).padStart(2, "0")}-01`;
    if (mes > 0 && esFechaISO(fecha)) puntos.push({ fecha, valor: Number(m[1]) });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

// La página de legislación de la MRA enlaza cada Finance Act como /download/FinanceAct<año>.pdf y
// los reglamentos nuevos por su título. Un año o un título posterior al que leímos es una norma nueva.
async function leyesMra(http: Http, patron: RegExp, ultima: number, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(MRA_LEYES, { userAgentNavegador: true });
  if (!/Mauritius Revenue Authority/i.test(html)) return null;
  const anios = [...html.matchAll(patron)].map((m) => Number(m[1])).filter((n) => Number.isFinite(n));
  if (!anios.length) return null;
  const nueva = Math.max(...anios);
  return nueva > ultima ? [{ titulo: `${titulo} ${nueva}`, url: MRA_LEYES, fecha: VERIFICADO }] : [];
}

function mra(id: string, datos: readonly string[], patron: RegExp, ultima: number, titulo: string): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: MRA_LEYES,
    userAgentNavegador: true,
    traer(http) {
      return leyesMra(http, patron, ultima, titulo);
    },
  };
}

function bom(id: string, serie: string, par: string, min: number, max: number): Detector {
  return {
    id,
    carril: "serie",
    serie,
    metodo: "html",
    url: BOM,
    userAgentNavegador: true,
    banda: { min, max, saltoRelativoMax: 0.05 },
    traer(http) {
      return tipoBom(http, this.url, par);
    },
  };
}

export const detectores: readonly Detector[] = [
  bom("mu.usd-bom", "mu.usd", "USDMUR", 30, 80),
  bom("mu.eur-bom", "mu.eur", "EURMUR", 35, 90),
  bom("mu.gbp-bom", "mu.gbp", "GBPMUR", 40, 110),
  {
    id: "mu.cpi-statsmauritius",
    carril: "serie",
    serie: "mu.cpi",
    metodo: "html",
    url: "https://statsmauritius.govmu.org/",
    userAgentNavegador: true,
    // Es un índice: entre dos trimestres puede subir varios puntos.
    banda: { min: 90, max: 180, saltoRelativoMax: 0.06 },
    traer(http) {
      return cpiTrimestral(http, this.url);
    },
  },
  mra(
    "mu.mra-finance-act",
    [
      "mu.income-tax-bands",
      "mu.dependent-deduction",
      "mu.paye-pay-periods",
      "mu.csg-threshold",
      "mu.csg-employee-low",
      "mu.csg-employee-high",
      "mu.csg-employer-low",
      "mu.csg-employer-high",
      "mu.vat",
      "mu.registration-duty",
      "mu.land-transfer-tax",
      "mu.first-home-relief-house",
      "mu.first-home-relief-land",
      "mu.first-home-income-cap",
      "mu.state-age-pension-3a",
      "mu.state-age-pension-3b",
      "mu.pension-early-reduction",
      "mu.pension-deferral-before-65",
      "mu.pension-deferral-after-65",
      "mu.csg-income-allowance-register",
      "mu.csg-income-allowance-other",
    ],
    /FinanceAct(20\d{2})\.pdf/g,
    2026,
    "MRA lists a new Finance Act:",
  ),
  mra(
    "mu.mra-additional-remuneration",
    ["mu.salary-compensation", "mu.salary-compensation-ceiling", "mu.salary-compensation-part-time-rate", "mu.salary-compensation-part-time-threshold"],
    /Additional Remuneration\) \((20\d{2})\)/g,
    2026,
    "MRA lists new Additional Remuneration Regulations for",
  ),
  {
    id: "mu.nsf-ceilings",
    carril: "norma",
    datos: ["mu.nsf-employee", "mu.nsf-employer", "mu.nsf-minimum-wage", "mu.nsf-maximum-wage", "mu.training-levy"],
    metodo: "html",
    url: "https://www.mra.mu/index.php/employers/npf-nsf-contributions",
    userAgentNavegador: true,
    // La tabla de mínimos y máximos dice "as from 01 July 2026": cambia cada año.
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const anio = Number(/payable as from 01 July (20\d{2})/.exec(html)?.[1]);
      if (!Number.isFinite(anio) || anio < 2020) return null;
      return anio > 2026 ? [{ titulo: `New NSF minimum and maximum wages from July ${anio}`, url: this.url, fecha: VERIFICADO }] : [];
    },
  },
  {
    id: "mu.labour-minimum-wage",
    carril: "norma",
    datos: ["mu.minimum-wage"],
    metodo: "html",
    url: "https://labour.govmu.org/Pages/NWC-Legislation.aspx",
    userAgentNavegador: true,
    // El ministerio sube cada reglamento como "...Minimum Wage...Regulations <año>...pdf".
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const anios = [...html.matchAll(/Minimum[^"]*Regulations(?:%20|\s)+(20\d{2})/gi)].map((m) => Number(m[1]));
      if (!anios.length) return null;
      const nueva = Math.max(...anios);
      return nueva > 2026 ? [{ titulo: `National Minimum Wage Regulations ${nueva}`, url: this.url, fecha: VERIFICADO }] : [];
    },
  },
  {
    id: "mu.mra-workers-rights",
    carril: "norma",
    datos: [
      "mu.normal-week-hours",
      "mu.hours-per-month",
      "mu.overtime-weekday",
      "mu.overtime-holiday-normal",
      "mu.overtime-holiday-extra",
      "mu.worker-wage-ceiling",
      "mu.annual-leave-days",
      "mu.extra-leave-days",
      "mu.sick-leave-days",
      "mu.maternity-weeks",
      "mu.maternity-weeks-after-birth",
      "mu.maternity-extra-weeks",
      "mu.paternity-weeks",
      "mu.maternity-allowance",
      "mu.bonus-first-share",
      "mu.bonus-wage-ceiling",
      "mu.bonus-resign-months",
      "mu.notice-days",
      "mu.severance-months",
      "mu.gratuity-days",
      "mu.gratuity-days-in-month",
      "mu.gratuity-wage-ceiling",
      "mu.prgf-rate",
      "mu.prgf-wage-ceiling",
      "mu.basic-pension",
    ],
    metodo: "html",
    url: MRA_LEYES,
    userAgentNavegador: true,
    // Las reformas a la Workers' Rights Act y a la National Pensions Act llegan por la Finance Act o
    // por reglamentos con su año en el título ("Workers' Rights (...) Regulations 2026").
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/Mauritius Revenue Authority/i.test(html)) return null;
      const anios = [...html.matchAll(/(?:Workers.{1,8}Rights|National Pensions)[^<]{0,120}?(20\d{2})/g)].map((m) => Number(m[1]));
      if (!anios.length) return null;
      const nueva = Math.max(...anios);
      return nueva > 2026 ? [{ titulo: `New Workers' Rights or National Pensions text dated ${nueva}`, url: this.url, fecha: VERIFICADO }] : [];
    },
  },
];
