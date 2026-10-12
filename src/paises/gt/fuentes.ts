import type { Detector, FechaISO, HallazgoNorma, PuntoSerie } from "@/motor/tipos";
import { esFechaISO } from "@/motor/vigencia";

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function sinEntidades(html: string): string {
  return html
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

// El servicio SOAP del Banguat solo responde por POST y el Http del cron hace GET: la página pública
// muestra el valor del día con su fecha en texto ("vigente para el miércoles, 7 de octubre de 2026").
export function leerTipoCambio(html: string): PuntoSerie[] | null {
  const texto = sinEntidades(html);
  const m = /vigente para el\s+[a-záéíóúñ]+,\s*(\d{1,2}) de ([a-záéíóúñ]+) de (\d{4})\s*<\/th>[\s\S]*?<td[^>]*>\s*([\d.]+)\s*<\/td>/i.exec(texto);
  if (!m) return null;
  const mes = MESES.indexOf(m[2].toLowerCase());
  if (mes < 0) return null;
  const fecha = `${m[3]}-${String(mes + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  const valor = Number(m[4]);
  if (!esFechaISO(fecha) || !Number.isFinite(valor) || valor <= 0) return null;
  return [{ fecha, valor }];
}

// Las tablas mensuales del Banguat (inflación, tasas) son hojas de Excel publicadas como HTML: una fila
// de encabezado con los años y una fila por mes. Los valores pueden venir con "%".
export function leerTablaMensual(html: string, desdeAnio: number): PuntoSerie[] | null {
  const filas = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((f) =>
    [...f[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((c) => sinEntidades(c[1].replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim()),
  );
  let anios: { col: number; anio: number }[] = [];
  let colEtiqueta = -1;
  for (const celdas of filas) {
    const cols = celdas.flatMap((c, i) => (/^(19|20)\d{2}$/.test(c) ? [{ col: i, anio: Number(c) }] : []));
    if (cols.length >= 5) {
      anios = cols;
      colEtiqueta = cols[0].col - 1;
      break;
    }
  }
  if (anios.length === 0 || colEtiqueta < 0) return null;
  const puntos: PuntoSerie[] = [];
  for (const celdas of filas) {
    // La etiqueta del mes trae espacios duros del Excel que, leídos como UTF-8, llegan como basura.
    const etiqueta = (celdas[colEtiqueta] ?? "").toLowerCase().replace(/[^a-z]/g, "");
    const mes = MESES.indexOf(etiqueta);
    if (mes < 0) continue;
    for (const { col, anio } of anios) {
      if (anio < desdeAnio) continue;
      const crudo = (celdas[col] ?? "").replace("%", "").trim();
      if (crudo === "") continue;
      const valor = Number(crudo);
      const fecha = `${anio}-${String(mes + 1).padStart(2, "0")}-01` as FechaISO;
      if (!Number.isFinite(valor) || !esFechaISO(fecha)) return null;
      puntos.push({ fecha, valor });
    }
  }
  if (puntos.length === 0) return null;
  return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

// Los acuerdos de salario mínimo se numeran con el año en que se firman (diciembre del anterior al
// que rigen): el de 2026 es el 256-2025. Solo interesan los firmados después de ese.
const ANIO_ULTIMO_ACUERDO = 2025;

export function leerAcuerdosSalario(html: string): HallazgoNorma[] | null {
  const enlaces = [...html.matchAll(/<a id="wp-block-file[^"]*" href="(https:\/\/mintrabajo\.gob\.gt\/wp-content\/uploads\/(\d{4})\/(\d{2})\/[^"]+\.pdf)">([^<]+)/g)];
  if (enlaces.length === 0) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const [, url, anioSubida, mesSubida, tituloCrudo] of enlaces) {
    const titulo = sinEntidades(tituloCrudo).replace(/\s+/g, " ").trim();
    if (!/salario\s+m[ií]n[ií][mn]o/i.test(titulo) || /comisi[oó]n/i.test(titulo)) continue;
    const numero = /(\d{1,4})-(20\d{2})/.exec(titulo);
    if (!numero || Number(numero[2]) <= ANIO_ULTIMO_ACUERDO) continue;
    const fecha = `${anioSubida}-${mesSubida}-01` as FechaISO;
    hallazgos.push({ titulo, url, fecha: esFechaISO(fecha) ? fecha : (`${anioSubida}-01-01` as FechaISO) });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "gt.tipo-cambio-banguat",
    carril: "serie",
    serie: "gt.tipo-cambio",
    metodo: "html",
    url: "https://www.banguat.gob.gt/tipo_cambio/",
    banda: { min: 7, max: 8.5, saltoRelativoMax: 0.03 },
    async traer(http) {
      return leerTipoCambio(await http.texto(this.url));
    },
  },
  {
    id: "gt.inflacion-banguat",
    carril: "serie",
    serie: "gt.inflacion-interanual",
    metodo: "html",
    url: "https://www.banguat.gob.gt/sites/default/files/banguat/imm/imm01.htm",
    // La inflación interanual puede saltar varios puntos en un mes (2008: de 8 a 14): la banda frena
    // solo lo absurdo, como una tabla corrida de columna.
    banda: { min: -5, max: 20, saltoRelativoMax: 3 },
    async traer(http) {
      const puntos = leerTablaMensual(await http.texto(this.url), 2025);
      return puntos ? puntos.slice(-12) : null;
    },
  },
  {
    id: "gt.tasa-pasiva-banguat",
    carril: "serie",
    serie: "gt.tasa-pasiva",
    metodo: "html",
    url: "https://www.banguat.gob.gt/sites/default/files/banguat/imm/imm05.htm",
    banda: { min: 2, max: 10, saltoRelativoMax: 0.1 },
    async traer(http) {
      const puntos = leerTablaMensual(await http.texto(this.url), 2025);
      return puntos ? puntos.slice(-12) : null;
    },
  },
  {
    id: "gt.mintrab-salario-minimo",
    carril: "norma",
    datos: ["gt.salario-minimo-diario", "gt.salario-minimo-mensual", "gt.isr-deduccion-gastos-personales"],
    metodo: "html",
    url: "https://mintrabajo.gob.gt/acuerdos-gubernativos/",
    async traer(http) {
      return leerAcuerdosSalario(await http.texto(this.url));
    },
  },
];
