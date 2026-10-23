import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const STATS = "https://www.stats.govt.nz";
const MESES: Record<string, string> = {
  january: "01", february: "02", march: "03", april: "04", may: "05", june: "06",
  july: "07", august: "08", september: "09", october: "10", november: "11", december: "12",
};

// Stats NZ cambia la URL del CSV en cada publicación trimestral: se busca la última publicación en
// la página del indicador y, dentro de ella, el CSV de números índice.
async function cpiStatsNz(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const indicador = await http.texto(url, { userAgentNavegador: true });
  let ultima: { slug: string; clave: string } | null = null;
  for (const m of indicador.matchAll(/consumers-price-index-([a-z]+)-(\d{4})-quarter/g)) {
    const mes = MESES[m[1]];
    if (!mes) continue;
    const clave = `${m[2]}-${mes}`;
    if (!ultima || clave > ultima.clave) ultima = { slug: m[0], clave };
  }
  if (!ultima) return null;
  const publicacion = await http.texto(`${STATS}/information-releases/${ultima.slug}/`, { userAgentNavegador: true });
  const enlace = publicacion.replace(/\\\//g, "/").match(/\/assets\/Uploads\/[^"&]*index-numbers\.csv/);
  if (!enlace) return null;
  const csv = await http.texto(`${STATS}${enlace[0]}`, { userAgentNavegador: true });
  const puntos: PuntoSerie[] = [];
  for (const linea of csv.split(/\r?\n/)) {
    if (!linea.startsWith('"CPIQ.SE9A"')) continue;
    const [, periodo, valor] = linea.split(",");
    const [anio, mes] = (periodo ?? "").replace(/"/g, "").split(".");
    const fecha = `${anio}-${mes}-01`;
    const numero = Number(valor);
    if (!esFechaISO(fecha) || !Number.isFinite(numero)) continue;
    if (fecha >= "2024-01-01") puntos.push({ fecha, valor: numero });
  }
  return puntos.length ? puntos : null;
}

async function ocrRbnz(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const puntos: PuntoSerie[] = [];
  const re = /<td[^>]*>\s*(\d{1,2}) ([A-Z][a-z]+) (\d{4})(?:&nbsp;)?\s*<\/td>\s*<td[^>]*>\s*([0-9.]+)(?:&nbsp;)?\s*<\/td>/g;
  for (const m of html.matchAll(re)) {
    const mes = MESES[m[2].toLowerCase()];
    const fecha = `${m[3]}-${mes}-${m[1].padStart(2, "0")}`;
    const valor = Number(m[4]);
    if (!mes || !esFechaISO(fecha) || !Number.isFinite(valor)) continue;
    if (fecha >= "2024-01-01") puntos.push({ fecha, valor });
  }
  if (!puntos.length) return null;
  return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

// Las páginas oficiales listan cada período nuevo con su fecha de inicio. Un período que empieza
// después del último ya cargado en datos.json es la señal de que cambió un valor.
async function periodosNuevos(
  http: Http,
  url: string,
  patron: RegExp,
  fecha: (m: RegExpMatchArray) => string,
  ultimoCargado: FechaISO,
  titulo: (f: string) => string,
  paginaValida: RegExp = patron,
): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!new RegExp(paginaValida.source).test(html)) return null;
  const todas = [...html.matchAll(patron)];
  const hallazgos: HallazgoNorma[] = [];
  for (const m of todas) {
    const f = fecha(m);
    if (!esFechaISO(f) || f <= ultimoCargado || hallazgos.some((h) => h.fecha === f)) continue;
    hallazgos.push({ titulo: titulo(f), url, fecha: f });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "nz.cpi-statsnz",
    carril: "serie",
    serie: "nz.cpi",
    metodo: "html",
    url: "https://www.stats.govt.nz/indicators/consumers-price-index-cpi/",
    userAgentNavegador: true,
    banda: { min: 1200, max: 1700, saltoRelativoMax: 0.04 },
    traer(http) {
      return cpiStatsNz(http, this.url);
    },
  },
  {
    id: "nz.ocr-rbnz",
    carril: "serie",
    serie: "nz.ocr",
    // Manual: el sitio del RBNZ responde con un desafío anti-bots de Cloudflare (cf-mitigated:
    // challenge) y no se saltea. El cron no lo corre; el semáforo avisa 30 días antes de que nz.ocr
    // venza y el punto se carga a mano después de cada decisión. traer() queda para probarlo a mano.
    metodo: "manual",
    url: "https://www.rbnz.govt.nz/monetary-policy/monetary-policy-decisions",
    userAgentNavegador: true,
    // Entre las decisiones de noviembre de 2019 y noviembre de 2020 el OCR pasó de 1 % a 0,25 %: un
    // salto relativo del 75 % entre dos puntos seguidos es real, no un error de lectura.
    banda: { min: 0, max: 10, saltoRelativoMax: 0.8 },
    traer(http) {
      return ocrRbnz(http, this.url);
    },
  },
  {
    id: "nz.acc-levy-ird",
    carril: "norma",
    datos: ["nz.acc-earners-levy-rate", "nz.acc-max-liable-earnings"],
    metodo: "html",
    url: "https://www.ird.govt.nz/acclevy",
    userAgentNavegador: true,
    traer(http) {
      return periodosNuevos(http, this.url, /1 April (\d{4}) to 31 March \d{4}/g, (m) => `${m[1]}-04-01`, "2027-04-01", (f) => `ACC earners' levy rate from 1 April ${f.slice(0, 4)}`);
    },
  },
  {
    id: "nz.paye-tables-ird",
    carril: "norma",
    datos: [
      "nz.income-tax-rates",
      "nz.student-loan-threshold",
      "nz.student-loan-rate",
      "nz.ietc-annual",
      "nz.ietc-lower-threshold",
      "nz.ietc-abatement-threshold",
      "nz.ietc-upper-threshold",
      "nz.ietc-abatement-rate",
      "nz.kiwisaver-employer-rate",
      "nz.kiwisaver-default-rate",
      "nz.kiwisaver-reduced-rate",
      "nz.esct-rates",
    ],
    metodo: "html",
    url: "https://www.ird.govt.nz/income-tax/income-tax-for-individuals/tax-codes-and-tax-rates-for-individuals/tax-rates-for-individuals",
    userAgentNavegador: true,
    traer(http) {
      return periodosNuevos(http, this.url, /ir340-apr-(\d{4})\.pdf/g, (m) => `${m[1]}-04-01`, "2026-04-01", (f) => `IR340 PAYE deduction tables from April ${f.slice(0, 4)}`);
    },
  },
  {
    id: "nz.minimum-wage-employment",
    carril: "norma",
    datos: ["nz.minimum-wage"],
    metodo: "html",
    url: "https://www.employment.govt.nz/news-and-updates",
    userAgentNavegador: true,
    traer(http) {
      return periodosNuevos(
        http,
        this.url,
        /\/news-and-updates\/[a-z0-9-]*minimum-wage[a-z0-9-]*?(\d{1,2})-([a-z]+)-(\d{4})/g,
        (m) => `${m[3]}-${MESES[m[2]] ?? "xx"}-${m[1].padStart(2, "0")}`,
        "2026-04-01",
        (f) => `Minimum wage change from ${f}`,
        /href="\/news-and-updates\/[a-z0-9-]+"/,
      );
    },
  },
  {
    id: "nz.parental-leave-ird",
    carril: "norma",
    datos: ["nz.parental-leave-max-weekly", "nz.parental-leave-self-employed-min"],
    metodo: "html",
    url: "https://www.ird.govt.nz/paid-parental-leave/working-out-your-entitlement/employees",
    userAgentNavegador: true,
    traer(http) {
      return periodosNuevos(http, this.url, /1 July (\d{4}) to 30 June \d{4}/g, (m) => `${m[1]}-07-01`, "2026-07-01", (f) => `Paid parental leave maximum from 1 July ${f.slice(0, 4)}`);
    },
  },
  {
    id: "nz.super-rates-workandincome",
    carril: "norma",
    datos: ["nz.nz-super-gross", "nz.nz-super-net-m"],
    metodo: "html",
    url: "https://www.workandincome.govt.nz/products/benefit-rates/index.html",
    userAgentNavegador: true,
    traer(http) {
      return periodosNuevos(http, this.url, /benefit-rates-april-(\d{4})/g, (m) => `${m[1]}-04-01`, "2026-04-01", (f) => `Benefit and NZ Super rates at 1 April ${f.slice(0, 4)}`);
    },
  },
];
