import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-17";
const CBK = "https://www.centralbank.go.ke";
const KRA = "https://www.kra.go.ke/individual/filing-paying/types-of-taxes/";
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function celdas(fila: string): string[] {
  return [...fila.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
}

function filas(html: string): string[][] {
  return [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => celdas(m[1]));
}

function fechaDma(texto: string): string | null {
  const m = /^(\d{2})[/-](\d{2})[/-](\d{4})$/.exec(texto);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : null;
}

function ordenar(puntos: PuntoSerie[]): readonly PuntoSerie[] | null {
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

// La portada del CBK publica el tipo indicativo del día ("Posted On: 15-10-2026"). La tabla histórica
// de /rates/forex-exchange-rates/ se carga por AJAX y su CSV dejó de actualizarse en 2024.
async function dolarCbk(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const valor = /US DOLLAR<\/small><\/td>\s*<td[^>]*>([\d.,]+)<\/td>/.exec(html)?.[1];
  const fecha = fechaDma(/Posted On:\s*(\d{2}-\d{2}-\d{4})/.exec(html)?.[1] ?? "");
  const n = Number(valor?.replace(/,/g, ""));
  if (!fecha || !esFechaISO(fecha) || !Number.isFinite(n)) return null;
  return [{ fecha, valor: n }];
}

async function cbrCbk(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const puntos: PuntoSerie[] = [];
  for (const c of filas(html)) {
    if (c.length !== 2) continue;
    const fecha = fechaDma(c[0]);
    const valor = Number(c[1]);
    if (fecha && esFechaISO(fecha) && fecha >= "2024-08-01" && Number.isFinite(valor)) puntos.push({ fecha, valor });
  }
  return ordenar(puntos);
}

async function inflacionCbk(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const puntos: PuntoSerie[] = [];
  for (const c of filas(html)) {
    if (c.length !== 4 || !/^\d{4}$/.test(c[0])) continue;
    const mes = MESES.indexOf(c[1]) + 1;
    const fecha = `${c[0]}-${String(mes).padStart(2, "0")}-01`;
    const valor = Number(c[3]);
    if (mes > 0 && esFechaISO(fecha) && fecha >= "2024-01-01" && Number.isFinite(valor)) puntos.push({ fecha, valor });
  }
  return ordenar(puntos);
}

// Las páginas de KRA no publican fecha de modificación, pero citan la Finance Act que fijó cada tasa
// ("as per Finance Act 2023"). Si aparece una Finance Act posterior, la tasa puede haber cambiado.
async function financeActKra(http: Http, url: string, ultima: number, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const anios = [...html.matchAll(/Finance(?:\s+Act)?,?\s+(20\d{2})/g)].map((m) => Number(m[1]));
  if (!/Kenya Revenue Authority/i.test(html)) return null;
  const nueva = Math.max(0, ...anios);
  return nueva > ultima ? [{ titulo: `${titulo}: Finance Act ${nueva}`, url, fecha: `${nueva}-07-01` }] : [];
}

// Cada ley en new.kenyalaw.org lista sus versiones consolidadas como "eng@AAAA-MM-DD". Una versión
// posterior a la que leímos quiere decir que la ley o la orden se modificó.
async function versionKenyaLaw(http: Http, url: string, leida: FechaISO, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const fechas = [...html.matchAll(/eng@(\d{4}-\d{2}-\d{2})/g)].map((m) => m[1]).filter((f) => esFechaISO(f));
  if (!fechas.length) return null;
  const ultima = fechas.sort().at(-1)!;
  return ultima > leida ? [{ titulo, url: `${url}/eng@${ultima}`, fecha: ultima as FechaISO }] : [];
}

function kenyaLaw(id: string, ruta: string, leida: FechaISO, datos: readonly string[], titulo: string): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: `https://new.kenyalaw.org/akn/ke/act/${ruta}` as `https://${string}`,
    userAgentNavegador: true,
    traer(http) {
      return versionKenyaLaw(http, this.url, leida, titulo);
    },
  };
}

function kra(id: string, pagina: string, datos: readonly string[], ultima: number, titulo: string): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: `${KRA}${pagina}` as `https://${string}`,
    userAgentNavegador: true,
    traer(http) {
      return financeActKra(http, this.url, ultima, titulo);
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "ke.usd-cbk",
    carril: "serie",
    serie: "ke.usd",
    metodo: "html",
    url: `${CBK}/`,
    userAgentNavegador: true,
    banda: { min: 80, max: 260, saltoRelativoMax: 0.05 },
    traer(http) {
      return dolarCbk(http, this.url);
    },
  },
  {
    id: "ke.cbr-cbk",
    carril: "serie",
    serie: "ke.cbr",
    metodo: "html",
    url: `${CBK}/rates/central-bank-rate/`,
    userAgentNavegador: true,
    banda: { min: 3, max: 20, saltoRelativoMax: 0.2 },
    traer(http) {
      return cbrCbk(http, this.url);
    },
  },
  {
    id: "ke.inflation-cbk",
    carril: "serie",
    serie: "ke.inflation",
    metodo: "html",
    url: `${CBK}/inflation-rates/`,
    userAgentNavegador: true,
    // Es una variación de 12 meses en puntos: puede moverse más de un punto de un mes a otro.
    banda: { min: -5, max: 30, saltoRelativoMax: 0.6 },
    traer(http) {
      return inflacionCbk(http, this.url);
    },
  },
  kra(
    "ke.kra-paye",
    "paye",
    [
      "ke.paye-bands",
      "ke.personal-relief",
      "ke.insurance-relief-rate",
      "ke.insurance-relief-cap",
      "ke.pension-deduction-cap",
      "ke.mortgage-interest-cap",
      "ke.medical-fund-cap",
      "ke.housing-levy-rate",
    ],
    2023,
    "KRA PAYE page cites a newer Finance Act",
  ),
  kra("ke.kra-vat", "value-added-tax", ["ke.vat", "ke.vat-threshold"], 2023, "KRA VAT page cites a newer Finance Act"),
  kra("ke.kra-tot", "turnover-tax-tot", ["ke.tot-rate", "ke.tot-lower", "ke.tot-upper"], 2023, "KRA turnover tax page cites a newer Finance Act"),
  kra("ke.kra-mri", "residential-rental-income", ["ke.mri-rate", "ke.mri-lower", "ke.mri-upper"], 2023, "KRA rental income page cites a newer Finance Act"),
  kra("ke.kra-wht", "individual-withholding-tax", ["ke.wht-resident", "ke.wht-non-resident", "ke.tbill-wht"], 2023, "KRA withholding tax page cites a newer Finance Act"),
  kra("ke.kra-cgt", "capital-gains-tax", ["ke.cgt-rate"], 2023, "KRA capital gains tax page cites a newer Finance Act"),
  kenyaLaw(
    "ke.kenyalaw-wages-order",
    "ln/1982/120",
    "2026-06-26",
    ["ke.minimum-wage-monthly", "ke.minimum-wage-hourly", "ke.normal-week-hours", "ke.night-week-hours", "ke.overtime-normal-factor", "ke.overtime-rest-day-factor", "ke.overtime-hourly-divisor"],
    "New version of the Regulation of Wages (General) Order",
  ),
  kenyaLaw(
    "ke.kenyalaw-employment-act",
    "2007/11",
    "2024-04-26",
    [
      "ke.annual-leave-days",
      "ke.leave-days-per-month",
      "ke.sick-full-pay-days",
      "ke.sick-half-pay-days",
      "ke.sick-qualifying-months",
      "ke.maternity-months",
      "ke.paternity-weeks",
      "ke.notice-days-monthly",
      "ke.redundancy-severance-days",
    ],
    "New version of the Employment Act",
  ),
  kenyaLaw("ke.kenyalaw-stamp-duty", "1958/31", "2026-07-01", ["ke.stamp-duty-per-1000", "ke.stamp-duty-first-2000"], "New version of the Stamp Duty Act"),
  kenyaLaw("ke.kenyalaw-income-tax", "1973/16", "2026-07-01", ["ke.mri-lower"], "New version of the Income Tax Act"),
  {
    // El NSSF publica cada cambio de tasas como entrada de WordPress (así salió el aviso del Year 4).
    id: "ke.nssf-posts",
    carril: "norma",
    datos: ["ke.nssf-rate", "ke.nssf-lel", "ke.nssf-uel"],
    metodo: "api-json",
    url: "https://www.nssf.or.ke/wp-json/wp/v2/posts?per_page=20&_fields=date,link,title",
    async traer(http) {
      const json = await http.json(this.url);
      if (!Array.isArray(json)) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const p of json as { date?: unknown; link?: unknown; title?: { rendered?: unknown } }[]) {
        const titulo = p.title?.rendered;
        if (typeof p.date !== "string" || typeof p.link !== "string" || typeof titulo !== "string") return null;
        const fecha = p.date.slice(0, 10);
        if (esFechaISO(fecha) && fecha > VERIFICADO && /contribution|rate|tier|earnings limit/i.test(titulo)) {
          hallazgos.push({ titulo, url: p.link, fecha });
        }
      }
      return hallazgos;
    },
  },
  {
    id: "ke.sha-premium",
    carril: "norma",
    datos: ["ke.shif-rate", "ke.shif-minimum"],
    metodo: "html",
    url: "https://www.sha.go.ke/premium-rates/",
    userAgentNavegador: true,
    // La página no tiene fecha: si deja de decir 2.75 % con mínimo de Ksh 300, la tasa cambió.
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/Social Health/i.test(html)) return null;
      const igual = /2\.75%/.test(html) && /minimum of Ksh\.?\s*300/i.test(html);
      return igual ? [] : [{ titulo: "SHA premium rates page no longer shows 2.75% with a KSh 300 minimum", url: this.url, fecha: VERIFICADO }];
    },
  },
];
