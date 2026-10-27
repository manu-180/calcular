import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-27";

// El gráfico de cada moneda del CBG se alimenta de un JSON con pares [milisegundos UTC, dalasis], del
// más nuevo al más viejo y desde el año 2000. Alcanza con los últimos días.
async function valuacion(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const json = await http.json(url, { userAgentNavegador: true });
  if (!Array.isArray(json)) return null;
  const puntos = new Map<FechaISO, number>();
  for (const par of json.slice(0, 15)) {
    if (!Array.isArray(par) || typeof par[0] !== "number" || typeof par[1] !== "number") return null;
    const fecha = new Date(par[0]).toISOString().slice(0, 10);
    if (!esFechaISO(fecha) || !Number.isFinite(par[1]) || par[1] <= 0) return null;
    if (!puntos.has(fecha)) puntos.set(fecha, par[1]);
  }
  if (puntos.size === 0) return null;
  return [...puntos].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([fecha, valor]) => ({ fecha, valor }));
}

// La GRA publica cada año una tabla de PAYE con el título "Income Tax Table <año>" en su página de
// descargas. Una tabla de un año posterior a 2025, o una Finance Act, puede cambiar las bandas.
async function descargasGra(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const tablas = [...html.matchAll(/Income Tax Table\s+(\d{4})/gi)].map((m) => Number(m[1]));
  if (tablas.length === 0) return null;
  const hallazgos: HallazgoNorma[] = [...new Set(tablas.filter((a) => a > 2025))].map((a) => ({ titulo: `Income Tax Table ${a}`, url, fecha: VERIFICADO }));
  for (const m of html.matchAll(/Finance Act[^<]{0,40}?(\d{4})/gi)) {
    hallazgos.push({ titulo: m[0].replace(/\s+/g, " ").trim(), url, fecha: VERIFICADO });
  }
  return hallazgos;
}

// La página del NPF dice la tasa total y su reparto. Si deja de decir 15% (5% el trabajador, 10% el
// empleador), la SSHFC cambió los aportes.
async function aportesNpf(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const texto = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const m = /contribution rate is (\d+(?:\.\d+)?)\s*%/i.exec(texto);
  if (!m) return null;
  const reparto = /Five \(5\) per cent/i.test(texto) && /ten \(10\) per cent/i.test(texto);
  if (Number(m[1]) === 15 && reparto) return [];
  return [{ titulo: `SSHFC National Provident Fund: contribution rate ${m[1]}%`, url, fecha: VERIFICADO }];
}

// La lista de leyes de la Asamblea Nacional muestra primero las más nuevas. Una enmienda a la Labour
// Act, 2023 puede cambiar preavisos, indemnizaciones o licencias.
async function leyesLaborales(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!/ACT,\s*\d{4}/i.test(html)) return null;
  const titulos = [...html.matchAll(/LABOUR\s*\(AMENDMENT\)\s*ACT,\s*(\d{4})/gi)].map((m) => ({ anio: Number(m[1]), titulo: m[0].replace(/\s+/g, " ") }));
  return titulos.filter((t) => t.anio >= 2023).map((t) => ({ titulo: t.titulo, url, fecha: VERIFICADO }));
}

const MONEDAS = [
  { codigo: "USD", serie: "gm.usd-gmd", banda: { min: 50, max: 110, saltoRelativoMax: 0.05 } },
  { codigo: "EUR", serie: "gm.eur-gmd", banda: { min: 55, max: 130, saltoRelativoMax: 0.05 } },
  { codigo: "GBP", serie: "gm.gbp-gmd", banda: { min: 65, max: 150, saltoRelativoMax: 0.05 } },
] as const;

export const detectores: readonly Detector[] = [
  ...MONEDAS.map(
    (m): Detector => ({
      id: `gm.cbg-${m.codigo.toLowerCase()}-gmd`,
      carril: "serie",
      serie: m.serie,
      metodo: "api-json",
      url: `https://www.cbg.gm/ajax/indicative-exchange-rates/${m.codigo}`,
      userAgentNavegador: true,
      banda: m.banda,
      traer(http) {
        return valuacion(http, this.url);
      },
    }),
  ),
  {
    id: "gm.gra-descargas",
    carril: "norma",
    datos: ["gm.paye-bands", "gm.vat-rate", "gm.corporate-tax-rate", "gm.expatriate-payroll-tax"],
    metodo: "html",
    url: "https://www.gra.gm/downloads",
    userAgentNavegador: true,
    traer(http) {
      return descargasGra(http, this.url);
    },
  },
  {
    id: "gm.sshfc-npf",
    carril: "norma",
    datos: ["gm.npf-employee-rate", "gm.npf-employer-rate"],
    metodo: "html",
    url: "https://www.sshfc.gm/national-provident-fund",
    userAgentNavegador: true,
    traer(http) {
      return aportesNpf(http, this.url);
    },
  },
  {
    id: "gm.assembly-labour",
    carril: "norma",
    datos: ["gm.notice-periods", "gm.redundancy-notice-months", "gm.severance-months-per-year", "gm.maternity-leave-months"],
    metodo: "html",
    url: "https://assembly.gm/documents/type/acts",
    userAgentNavegador: true,
    traer(http) {
      return leyesLaborales(http, this.url);
    },
  },
];
