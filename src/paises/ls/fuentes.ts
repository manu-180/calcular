import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma } from "@/motor/tipos";

const RSL = "https://www.rsl.org.ls";
// Año fiscal que empieza el 1 de abril y ya está cargado en datos.json.
const ULTIMO_ANIO_FISCAL = 2026;
// Reglamento de montos (Income Tax (Amendment of Monetary Amounts) Regulations) ya cargado.
const ULTIMO_AMA = { numero: 24, anio: 2026 };

function hoy(): FechaISO | null {
  const f = new Date().toISOString().slice(0, 10);
  return esFechaISO(f) ? f : null;
}

// Drupal guarda cada archivo en /sites/default/files/AAAA-MM/: esa carpeta da la fecha aproximada.
function fechaDeCarpeta(ruta: string): FechaISO | null {
  const m = /\/files\/(\d{4})-(\d{2})\//.exec(ruta);
  const f = m ? `${m[1]}-${m[2]}-01` : null;
  return f && esFechaISO(f) ? f : null;
}

export const detectores: readonly Detector[] = [
  {
    // La página lista un PDF por año fiscal («2026 -2027 Income Tax structure»). Uno de un año
    // posterior trae bandas y crédito nuevos.
    id: "ls.rsl-income-tax-structures",
    carril: "norma",
    datos: ["ls.income-tax-bands", "ls.tax-credit"],
    metodo: "html",
    url: `${RSL}/income-tax-structures`,
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const enlaces = [...html.matchAll(/href="([^"]*?(\d{4})(?:%20|\s|-)*-?(?:%20)*(\d{4})[^"]*Income%20Tax%20structure[^"]*\.pdf)"/gi)];
      if (enlaces.length === 0) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const m of enlaces) {
        const inicio = Number(m[2]);
        if (inicio <= ULTIMO_ANIO_FISCAL) continue;
        const fecha = fechaDeCarpeta(m[1]) ?? hoy();
        if (!fecha) return null;
        hallazgos.push({ titulo: `RSL income tax structure ${m[2]}/${m[3]}`, url: new URL(m[1], RSL).toString(), fecha });
      }
      return hallazgos;
    },
  },
  {
    // Cada año un Legal Notice «Income Tax (AMA) Regulations» sube la banda y el crédito; RSL lo
    // publica en la página de Income Tax.
    id: "ls.rsl-ama-regulations",
    carril: "norma",
    datos: ["ls.income-tax-bands", "ls.tax-credit"],
    metodo: "html",
    url: `${RSL}/income-tax`,
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const enlaces = [...html.matchAll(/href="([^"]*%28AMA%29%20REGULATIONS%20No\.?(\d+)%20of%20(?:%20)*(\d{4})[^"]*\.pdf)"/gi)];
      if (enlaces.length === 0) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const m of enlaces) {
        const numero = Number(m[2]);
        const anio = Number(m[3]);
        if (anio < ULTIMO_AMA.anio || (anio === ULTIMO_AMA.anio && numero <= ULTIMO_AMA.numero)) continue;
        const fecha = fechaDeCarpeta(m[1]) ?? hoy();
        if (!fecha) return null;
        hallazgos.push({ titulo: `Income Tax (AMA) Regulations No. ${numero} of ${anio}`, url: new URL(m[1], RSL).toString(), fecha });
      }
      return hallazgos;
    },
  },
  {
    // La página de tasas no tiene fecha de modificación: se compara su texto con las tasas cargadas.
    // Si alguna frase ya no aparece, la tabla cambió y hay que volver a leerla.
    id: "ls.rsl-tax-rates",
    carril: "norma",
    datos: ["ls.vat-rates", "ls.company-tax-rates", "ls.withholding-rates", "ls.fbt-rate"],
    metodo: "html",
    url: `${RSL}/tax-rates`,
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const texto = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
      if (!/VALUE ADDED TAX/i.test(texto) || !/Withholding Tax/i.test(texto)) return null;
      const esperadas = [
        /manufacturing companies and commercial farming 10%/i,
        /Other companies 25%/i,
        /Resident contractors 5%/i,
        /Non-Resident Contractors 10%/i,
        /Technical services\) 7\.5%/i,
        /rate of 40%/i,
        /15% - Other goods and services/i,
        /10% - Electricity/i,
      ];
      const faltan = esperadas.filter((r) => !r.test(texto));
      if (faltan.length === 0) return [];
      const fecha = hoy();
      return fecha ? [{ titulo: `RSL tax rates page changed (${faltan.length} rate lines differ)`, url: this.url, fecha }] : null;
    },
  },
];
