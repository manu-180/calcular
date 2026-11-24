import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO = "2026-11-01";
const CAMBIO = "https://www.tax.gov.kh/kh/exchange-rate";
const SUB_DECRETOS = "https://www.tax.gov.kh/en/sub-decree";
const PRAKAS_MLVT = "https://www.mlvt.gov.kh/index.php/%E1%9E%AF%E1%9E%80%E1%9E%9F%E1%9E%B6%E1%9E%9A%E1%9E%95%E1%9F%92%E1%9E%9B%E1%9E%BC%E1%9E%9C%E1%9E%80%E1%9E%B6%E1%9E%9A/%E1%9E%94%E1%9F%92%E1%9E%9A%E1%9E%80%E1%9E%B6%E1%9E%9F.html";
const IPC_NIS = "https://nis.gov.kh/%e1%9e%9f%e1%9e%93%e1%9f%92%e1%9e%91%e1%9e%9f%e1%9f%92%e1%9e%9f%e1%9e%93%e1%9f%8d%e1%9e%90%e1%9f%92%e1%9e%93%e1%9e%b6%e1%9e%80%e1%9f%8b%e1%9e%87%e1%9e%b6%e1%9e%8f%e1%9e%b7/";

const MESES_KM = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
const MESES_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function cifrasLatinas(t: string): string {
  return t.replace(/[០-៩]/g, (c) => String(c.charCodeAt(0) - 0x17e0));
}

// La tabla de la GDT escribe fecha y tasa en cifras jemeres: «៣០ តុលា ២០២៦» y «៤០៨១».
export function leerCambio(html: string): readonly PuntoSerie[] | null {
  const puntos: PuntoSerie[] = [];
  const fila = /ex-title">([^<]+)<\/td>\s*<td[^>]*ex-symbol">USD\/KHR<\/td>\s*<td[^>]*ex-title">([^<]+)<\/td>/g;
  for (const m of html.matchAll(fila)) {
    const [dia, mes, anio] = cifrasLatinas(m[1].trim()).split(/\s+/);
    const n = MESES_KM.indexOf(mes);
    const fecha = `${anio}-${String(n + 1).padStart(2, "0")}-${dia.padStart(2, "0")}`;
    const valor = Number(cifrasLatinas(m[2].trim()));
    if (n >= 0 && esFechaISO(fecha) && Number.isFinite(valor)) puntos.push({ fecha: fecha as FechaISO, valor });
  }
  return puntos.length ? puntos.sort((a, b) => a.fecha.localeCompare(b.fecha)) : null;
}

// La lista de sub-decretos muestra fecha de emisión: uno sobre el sueldo posterior al 48 es un cambio de escala.
export function leerSubDecretos(html: string): readonly HallazgoNorma[] | null {
  if (!/Sub-Decree/i.test(html)) return null;
  const t = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const hallazgos: HallazgoNorma[] = [];
  for (const m of t.matchAll(/([A-Z][a-z]+) (\d{1,2}), (\d{4})[^A-Z]{0,40}Sub-Decree on ([^.]{0,120}?Taxable Salary[^.]{0,60})/g)) {
    const mes = MESES_EN.indexOf(m[1].slice(0, 3));
    const fecha = `${m[3]}-${String(mes + 1).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
    if (mes >= 0 && esFechaISO(fecha) && fecha > "2024-03-11") hallazgos.push({ titulo: ["Sub-Decree on", m[4].trim()].join(" "), url: SUB_DECRETOS, fecha });
  }
  return hallazgos;
}

// El prakas del salario mínimo se emite cada año con el año en el título: uno de 2027 o posterior hay que leerlo.
export function leerPrakas(html: string): readonly HallazgoNorma[] | null {
  if (!html.includes("ប្រកាស")) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of cifrasLatinas(html).matchAll(/ប្រាក់ឈ្នួលអប្បបរមា[^<]{0,200}ឆ្នាំ\s*(20\d{2})/g)) {
    if (Number(m[1]) > 2026) hallazgos.push({ titulo: ["ប្រាក់ឈ្នួលអប្បបរមា ឆ្នាំ", m[1]].join(" "), url: PRAKAS_MLVT, fecha: VERIFICADO });
  }
  return hallazgos.slice(0, 1);
}

// La NIS sube un .xls por mes y no se puede leer como texto: un archivo posterior al último cargado se avisa.
export function leerIpc(html: string): readonly HallazgoNorma[] | null {
  const archivos = [...html.matchAll(/https:\/\/nis\.gov\.kh\/wp-content\/uploads\/\d{4}\/\d{2}\/CPI-12-group-([A-Z][a-z]{2})-(\d{4})[^"']*/g)];
  if (archivos.length === 0) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of archivos) {
    const mes = MESES_EN.indexOf(m[1]);
    const fecha = `${m[2]}-${String(mes + 1).padStart(2, "0")}-01`;
    if (mes >= 0 && esFechaISO(fecha) && fecha > "2026-09-01") hallazgos.push({ titulo: ["CPI", m[1], m[2]].join(" "), url: m[0], fecha });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "kh.usd-gdt",
    carril: "serie",
    serie: "kh.usd",
    metodo: "html",
    url: CAMBIO,
    banda: { min: 3800, max: 4500, saltoRelativoMax: 0.03 },
    async traer(http: Http) {
      // La página filtra por mes: el primer día hábil todavía no hay filas y se lee el mes anterior.
      const hoy = new Date();
      const anterior = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth() - 1, 1));
      for (const d of [hoy, anterior]) {
        const puntos = leerCambio(await http.texto(`${CAMBIO}?for_year=${d.getUTCFullYear()}&for_month=${d.getUTCMonth() + 1}`));
        if (puntos) return puntos;
      }
      return null;
    },
  },
  {
    id: "kh.gdt-sub-decree",
    carril: "norma",
    datos: ["kh.tos-brackets", "kh.ti-brackets", "kh.dependent-allowance"],
    metodo: "html",
    url: SUB_DECRETOS,
    async traer(http: Http) {
      return leerSubDecretos(await http.texto(SUB_DECRETOS));
    },
  },
  {
    id: "kh.mlvt-min-wage",
    carril: "norma",
    datos: ["kh.min-wage", "kh.min-wage-probation"],
    metodo: "html",
    url: PRAKAS_MLVT,
    async traer(http: Http) {
      return leerPrakas(await http.texto(PRAKAS_MLVT));
    },
  },
  {
    id: "kh.nis-cpi",
    carril: "norma",
    datos: ["kh.cpi-yoy"],
    metodo: "html",
    url: IPC_NIS,
    async traer(http: Http) {
      return leerIpc(await http.texto(IPC_NIS));
    },
  },
];
