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
