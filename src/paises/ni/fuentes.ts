import type { Detector, FechaISO, HallazgoNorma, PuntoSerie } from "@/motor/tipos";
import { esFechaISO } from "@/motor/vigencia";

const GACETA = "https://www.lagaceta.gob.ni";
const MESES: Record<string, number> = {
  enero: 1,
  febrero: 2,
  marzo: 3,
  abril: 4,
  mayo: 5,
  junio: 6,
  julio: 7,
  agosto: 8,
  septiembre: 9,
  setiembre: 9,
  octubre: 10,
  noviembre: 11,
  diciembre: 12,
};
// Cada edición pesa más de 1 MB y el cron le da 90 s al detector: nueve tardaron 82 s el 8/10/2026.
// Cinco cubren una semana y el cron corre todos los días.
const EDICIONES_A_REVISAR = 5;

export interface Edicion {
  url: string;
  numero: string;
  fecha: FechaISO;
}

export function leerEdiciones(html: string): Edicion[] | null {
  const vistas = new Set<string>();
  const ediciones: Edicion[] = [];
  for (const [, ruta] of html.matchAll(/href="(\/la-gaceta-no-[a-z0-9-]+\/)"/g)) {
    if (vistas.has(ruta)) continue;
    vistas.add(ruta);
    const numero = /^\/la-gaceta-no-(\d+)-/.exec(ruta)?.[1];
    const f = /-(\d{1,2})-de-([a-z]+)-de-(\d{4})\/$/.exec(ruta);
    const mes = f ? MESES[f[2]] : undefined;
    if (!numero || !f || !mes) continue;
    const fecha = `${f[3]}-${String(mes).padStart(2, "0")}-${f[1].padStart(2, "0")}`;
    if (esFechaISO(fecha)) ediciones.push({ url: `${GACETA}${ruta}`, numero, fecha });
  }
  return ediciones.length ? ediciones : null;
}

// Cada edición trae el PDF entero en base64 dentro de la página (lo abre un visor pdf.js con atob).
export function pdfDeEdicion(html: string): string | null {
  const m = /atob\('([A-Za-z0-9+/=]+)'\)/.exec(html);
  if (!m) return null;
  try {
    return atob(m[1]);
  } catch {
    return null;
  }
}

function desdeUtf16(hex: string): string {
  let s = "";
  for (let i = 4; i + 4 <= hex.length; i += 4) s += String.fromCharCode(parseInt(hex.slice(i, i + 4), 16));
  return s.replace(/\s+/g, " ").trim();
}

export interface EntradaSumario {
  titulo: string;
  seccion: string | null;
}

// El texto del PDF está comprimido, pero los marcadores del sumario (secciones y normas, por ejemplo
// "MINISTERIO DEL TRABAJO" > "ACUERDO MINISTERIAL No. 02-2026") quedan sin comprimir, en UTF-16.
// Algunas ediciones salen sin marcadores: de esas no se puede saber qué publicaron.
export function leerSumario(pdf: string): EntradaSumario[] {
  const items = new Map<string, { titulo: string; padre: string | null }>();
  for (const m of pdf.matchAll(/(\d+) 0 obj\s*<<([^<>]*?)\/Title\s*<(FEFF[0-9A-Fa-f]+)>/g)) {
    const padre = /\/Parent (\d+) 0 R/.exec(m[2])?.[1] ?? null;
    items.set(m[1], { titulo: desdeUtf16(m[3]), padre });
  }
  return [...items.values()].map((it) => ({ titulo: it.titulo, seccion: it.padre ? (items.get(it.padre)?.titulo ?? null) : null }));
}

export function esRelevante(e: EntradaSumario): boolean {
  const t = e.titulo;
  if (/salario\s+m[ií]nimo/i.test(t)) return true;
  if (e.seccion && /ministerio del trabajo/i.test(e.seccion) && /acuerdo\s+ministerial/i.test(t)) return true;
  if (/concertaci[oó]n\s+tributaria|c[oó]digo\s+del\s+trabajo/i.test(t)) return true;
  return /seguridad\s+social/i.test(t) && /\b(ley|decreto|reglamento)\b/i.test(t);
}

export function hallazgosDeEdicion(edicion: Edicion, sumario: readonly EntradaSumario[]): HallazgoNorma[] {
  return sumario.filter(esRelevante).map((e, i) => ({
    titulo: `La Gaceta No. ${edicion.numero}: ${e.seccion ? `${e.seccion}, ` : ""}${e.titulo}`,
    url: `${edicion.url}#norma-${i + 1}`,
    fecha: edicion.fecha,
  }));
}

// El servicio SOAP del BCN solo acepta POST y TLS 1.0 o 1.1, y el sitio www.bcn.gob.ni tiene un
// antibots con captcha: el Http del cron no puede leer ninguno de los dos. Por eso no hay detector de
// serie; la serie se carga con scripts/paises/ni/tipo_cambio_bcn.ts, que usa este lector.
export function leerTipoCambioBcn(xml: string): PuntoSerie[] | null {
  const puntos: PuntoSerie[] = [];
  for (const [, fecha, valor] of xml.matchAll(/<Fecha>(\d{4}-\d{2}-\d{2})<\/Fecha>\s*<Valor>([\d.]+)<\/Valor>/g)) {
    const v = Number(valor);
    if (!esFechaISO(fecha) || !Number.isFinite(v) || v <= 0) return null;
    puntos.push({ fecha, valor: v });
  }
  return puntos.length ? puntos : null;
}

export const detectores: readonly Detector[] = [
  {
    id: "ni.gaceta-normas",
    carril: "norma",
    datos: ["ni.salario-minimo", "ni.salario-minimo-zona-franca", "ni.ir-rentas-trabajo", "ni.iva", "ni.inss-laboral"],
    metodo: "html",
    url: "https://www.lagaceta.gob.ni/ediciones",
    async traer(http) {
      const ediciones = leerEdiciones(await http.texto(this.url));
      if (!ediciones) return null;
      const hallazgos: HallazgoNorma[] = [];
      let conPdf = 0;
      for (const ed of ediciones.slice(0, EDICIONES_A_REVISAR)) {
        const pdf = pdfDeEdicion(await http.texto(ed.url));
        if (!pdf) continue;
        conPdf++;
        hallazgos.push(...hallazgosDeEdicion(ed, leerSumario(pdf)));
      }
      return conPdf ? hallazgos : null;
    },
  },
];
