import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-26";
const ZRA_DETALLES = "https://www.zra.org.zm/tax-information/tax-information-details/";

// Los folletos de la ZRA se suben a wp-content/uploads/AAAA/MM/<Nombre>.pdf. Un folleto con el mismo
// nombre en una carpeta posterior a la que leímos quiere decir que la ZRA lo reemplazó.
function folletoZra(id: string, archivo: string, leido: string, datos: readonly string[]): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: ZRA_DETALLES,
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/Zambia Revenue Authority/i.test(html)) return null;
      const patron = new RegExp(`wp-content/uploads/(\\d{4})/(\\d{2})/${archivo}(?:-\\d+)?\\.pdf`, "g");
      const hallazgos: HallazgoNorma[] = [];
      for (const m of html.matchAll(patron)) {
        const carpeta = `${m[1]}/${m[2]}`;
        const fecha = `${m[1]}-${m[2]}-01`;
        if (carpeta > leido && esFechaISO(fecha)) {
          hallazgos.push({ titulo: `New ZRA leaflet: ${archivo}`, url: `https://www.zra.org.zm/${m[0]}`, fecha });
        }
      }
      return hallazgos;
    },
  };
}

interface FilaBoz {
  mid_rate?: unknown;
  time?: unknown;
}

export const detectores: readonly Detector[] = [
  {
    id: "zm.usd-boz",
    carril: "serie",
    serie: "zm.usd",
    metodo: "api-json",
    url: "https://www.boz.zm/api/v1/views/boz_zmw_usd_daily_exchange_rates",
    // El certificado de boz.zm no trae la cadena intermedia.
    tlsTolerante: true,
    banda: { min: 10, max: 40, saltoRelativoMax: 0.05 },
    async traer(http) {
      const json = await http.json(this.url);
      if (!Array.isArray(json)) return null;
      // El BoZ publica varias veces por día: nos quedamos con la última publicación de cada fecha.
      const porDia = new Map<string, { hora: string; valor: number }>();
      for (const fila of json as FilaBoz[]) {
        if (typeof fila.time !== "string" || typeof fila.mid_rate !== "string") return null;
        const m = /datetime="(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(fila.time);
        const valor = Number(fila.mid_rate);
        if (!m || !esFechaISO(m[1]) || !Number.isFinite(valor)) return null;
        const previo = porDia.get(m[1]);
        if (!previo || m[2] > previo.hora) porDia.set(m[1], { hora: m[2], valor });
      }
      const puntos: PuntoSerie[] = [...porDia.entries()].map(([fecha, p]) => ({ fecha: fecha as FechaISO, valor: p.valor }));
      puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
      return puntos.length ? puntos : null;
    },
  },
  {
    id: "zm.cpi-zamstats",
    carril: "serie",
    serie: "zm.cpi",
    // Manual: ZamStats publica el índice solo dentro del PDF de «The Monthly» (Anexo 1, tabla 1.1), y
    // el Http de los detectores lee texto. El boletín sale a fin de cada mes; el semáforo avisa antes
    // de que zm.cpi venza.
    metodo: "manual",
    url: "https://www.zamstats.gov.zm/wp-json/wp/v2/media?search=monthly&per_page=5",
    tlsTolerante: true,
    banda: { min: 300, max: 1200, saltoRelativoMax: 0.05 },
    async traer() {
      return null;
    },
  },
  folletoZra("zm.zra-paye", "PAYE", "2026/06", ["zm.paye-bands"]),
  folletoZra("zm.zra-turnover", "Turnover-Tax", "2026/06", ["zm.tot-rate", "zm.tot-exempt-monthly", "zm.tot-limit"]),
  folletoZra("zm.zra-rental", "Rental-Income-Tax", "2026/06", ["zm.rental-bands-monthly", "zm.rental-bands-annual"]),
  folletoZra("zm.zra-ptt", "Property-Transfer", "2026/06", ["zm.ptt-rates"]),
  folletoZra("zm.zra-mmtl", "Mobile-Money-Transaction-Levy", "2026/06", ["zm.mmtl-bands"]),
  folletoZra("zm.zra-vat", "Introduction-to-VAT", "2026/06", ["zm.vat", "zm.vat-threshold"]),
  folletoZra("zm.zra-sdl", "Skills-Development-Levy", "2023/06", ["zm.sdl-rate"]),
  {
    id: "zm.zra-presumptive",
    carril: "norma",
    datos: ["zm.presumptive-tax"],
    metodo: "html",
    url: "https://www.zra.org.zm/tax-information/",
    userAgentNavegador: true,
    // La página no tiene fecha: si deja de mostrar la tabla que leímos, la tarifa cambió.
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/Presumptive Tax/i.test(html)) return null;
      const igual = ["K10,368.00", "K7,776.00", "K5,184.00", "K2,592.00", "K1,296.00"].every((k) => html.includes(k));
      return igual ? [] : [{ titulo: "ZRA presumptive tax table changed", url: this.url, fecha: VERIFICADO }];
    },
  },
  {
    id: "zm.nhima-faq",
    carril: "norma",
    datos: ["zm.nhima-rate"],
    metodo: "api-json",
    url: "https://nhima.co.zm/wp-json/wp/v2/pages/1783?_fields=content,modified",
    async traer(http) {
      const json = (await http.json(this.url)) as { content?: { rendered?: unknown }; modified?: unknown };
      const texto = json?.content?.rendered;
      if (typeof texto !== "string") return null;
      const igual = /1% of your declared income/i.test(texto) && /1% employer contribution/i.test(texto);
      return igual ? [] : [{ titulo: "NHIMA FAQ no longer shows 1% + 1% of basic salary", url: "https://nhima.co.zm/elementor-1783/", fecha: VERIFICADO }];
    },
  },
  {
    // El MLSS sube cada orden de salarios mínimos y cada reforma del Employment Code a su WordPress.
    id: "zm.mlss-media",
    carril: "norma",
    datos: [
      "zm.minimum-wage-monthly",
      "zm.minimum-wage-hourly",
      "zm.transport-allowance",
      "zm.lunch-allowance",
      "zm.housing-allowance-rate",
      "zm.night-differential",
      "zm.leave-days-per-month",
      "zm.leave-pay-divisor",
      "zm.weekly-hours",
      "zm.guard-weekly-hours",
      "zm.overtime-factor",
      "zm.rest-day-factor",
      "zm.hourly-divisor",
      "zm.guard-hourly-divisor",
      "zm.gratuity-rate",
      "zm.redundancy-months",
      "zm.medical-discharge-months",
      "zm.maternity-weeks",
      "zm.maternity-multiple-weeks",
      "zm.maternity-after-birth-weeks",
      "zm.paternity-days",
      "zm.notice-hours-monthly",
      "zm.notice-days-short",
      "zm.notice-days-long",
    ],
    metodo: "api-json",
    url: "https://www.mlss.gov.zm/index.php?rest_route=/wp/v2/media&per_page=50&mime_type=application/pdf&_fields=date,source_url",
    // El certificado de mlss.gov.zm no valida.
    tlsTolerante: true,
    async traer(http) {
      const json = await http.json(this.url);
      if (!Array.isArray(json)) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const m of json as { date?: unknown; source_url?: unknown }[]) {
        if (typeof m.date !== "string" || typeof m.source_url !== "string") return null;
        const fecha = m.date.slice(0, 10);
        if (esFechaISO(fecha) && fecha > VERIFICADO && /minimum|wage|employment-code|statutory|SI-No|IS-NO/i.test(m.source_url)) {
          hallazgos.push({ titulo: `New MLSS document: ${m.source_url.split("/").pop()}`, url: m.source_url, fecha });
        }
      }
      return hallazgos;
    },
  },
];
