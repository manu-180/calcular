import { esFechaISO } from "@/motor/vigencia";
import type { Detector, Http, PuntoSerie } from "@/motor/tipos";

const PORTADA_BCV = "https://www.bcv.org.ve/";

// La portada del BCV publica cada día hábil la tasa con la fecha valor del día hábil siguiente. Se
// toma el bloque de la moneda (id="dolar" o id="euro") y la fecha del atributo content, que trae ISO.
async function tasaDePortada(http: Http, bloque: "dolar" | "euro"): Promise<PuntoSerie[] | null> {
  // bcv.org.ve sirve la cadena de certificados incompleta y Node la rechaza sin tlsTolerante.
  const html = await http.texto(PORTADA_BCV, { tlsTolerante: true, userAgentNavegador: true });
  const inicio = html.indexOf(`id="${bloque}"`);
  if (inicio < 0) return null;
  const m = /<strong[^>]*>\s*([\d.]+,\d+)\s*<\/strong>/.exec(html.slice(inicio, inicio + 1500));
  const f = /Fecha Valor:\s*<span[^>]*content="(\d{4}-\d{2}-\d{2})T/.exec(html);
  if (!m || !f) return null;
  const valor = Number(m[1].replace(/\./g, "").replace(",", "."));
  const fecha = f[1];
  if (!Number.isFinite(valor) || !esFechaISO(fecha)) return null;
  return [{ fecha, valor }];
}

// La portada también trae el bloque del INPC (view-ind-home-inpc): el mes en el atributo content y el
// índice con punto de miles y coma decimal, el mismo valor que el archivo 4_5_7 del BCV.
export function inpcDePortada(html: string): PuntoSerie[] | null {
  const inicio = html.indexOf("view-ind-home-inpc");
  if (inicio < 0) return null;
  const bloque = html.slice(inicio, inicio + 3000);
  const f = /content="(\d{4}-\d{2})-\d{2}T/.exec(bloque);
  const m = /Indice:\s*<\/span>\s*<div[^>]*>\s*([\d.]+,\d+)\s*</.exec(bloque);
  if (!f || !m) return null;
  const fecha = `${f[1]}-01`;
  const valor = Number(m[1].replace(/\./g, "").replace(",", "."));
  if (!esFechaISO(fecha) || !Number.isFinite(valor) || valor <= 0) return null;
  return [{ fecha, valor }];
}

// Bloques de tasas de la portada: el mes en el atributo content y la tasa anual con coma decimal.
// «Prestaciones Sociales» trae el promedio entre activa y pasiva; «Tasas activas y pasivas», la activa.
export function tasaMensualDePortada(html: string, bloque: string, etiqueta: string): PuntoSerie[] | null {
  const inicio = html.indexOf(bloque);
  if (inicio < 0) return null;
  const trozo = html.slice(inicio, inicio + 2500);
  const f = /content="(\d{4}-\d{2})-\d{2}T/.exec(trozo);
  const desde = trozo.indexOf(etiqueta);
  const m = desde < 0 ? null : /<span[^>]*>\s*([\d.]+,\d+)\s*</.exec(trozo.slice(desde));
  if (!f || !m) return null;
  const fecha = `${f[1]}-01`;
  const valor = Number(m[1].replace(/\./g, "").replace(",", "."));
  if (!esFechaISO(fecha) || !Number.isFinite(valor) || valor <= 0) return null;
  return [{ fecha, valor }];
}

// Bandas: el bolívar se devaluó 193 % en 2026 y el mayor salto diario del año fue 2,93 %. min y max
// cubren dos o tres años a ese ritmo; un 10 % de salto deja pasar un fin de semana largo de
// devaluación fuerte y frena una reconversión monetaria (que corre la coma) o un número mal leído.
export const detectores: readonly Detector[] = [
  {
    id: "ve.bcv-dolar",
    carril: "serie",
    serie: "ve.tasa-bcv-usd",
    metodo: "html",
    url: PORTADA_BCV,
    tlsTolerante: true,
    userAgentNavegador: true,
    banda: { min: 300, max: 30000, saltoRelativoMax: 0.1 },
    traer: (http) => tasaDePortada(http, "dolar"),
  },
  {
    id: "ve.bcv-euro",
    carril: "serie",
    serie: "ve.tasa-bcv-eur",
    metodo: "html",
    url: PORTADA_BCV,
    tlsTolerante: true,
    userAgentNavegador: true,
    banda: { min: 300, max: 35000, saltoRelativoMax: 0.1 },
    traer: (http) => tasaDePortada(http, "euro"),
  },
  {
    id: "ve.bcv-inpc",
    carril: "serie",
    serie: "ve.inpc",
    metodo: "html",
    url: PORTADA_BCV,
    tlsTolerante: true,
    userAgentNavegador: true,
    // El INPC subió 465 % en el último año y el peor mes desde 2025 fue +32,6 % (enero 2026). El
    // máximo cubre unos tres años a ese ritmo; 60 % de salto mensual frena un índice mal leído.
    banda: { min: 1e14, max: 1e18, saltoRelativoMax: 0.6 },
    async traer(http) {
      return inpcDePortada(await http.texto(PORTADA_BCV, { tlsTolerante: true, userAgentNavegador: true }));
    },
  },
  {
    id: "ve.bcv-tasa-prestaciones",
    carril: "serie",
    serie: "ve.tasa-prestaciones",
    metodo: "html",
    url: PORTADA_BCV,
    tlsTolerante: true,
    userAgentNavegador: true,
    // Entre 2024 y 2026 la tasa se movió entre 47 % y 48 %; la banda deja pasar un cambio de política
    // monetaria fuerte y frena una coma corrida o el número de Gaceta leído como tasa.
    banda: { min: 5, max: 150, saltoRelativoMax: 0.3 },
    async traer(http) {
      const html = await http.texto(PORTADA_BCV, { tlsTolerante: true, userAgentNavegador: true });
      return tasaMensualDePortada(html, "view-ind-home-prestaciones-sociales", "Tasa:");
    },
  },
  {
    id: "ve.bcv-tasa-activa",
    carril: "serie",
    serie: "ve.tasa-activa",
    metodo: "html",
    url: PORTADA_BCV,
    tlsTolerante: true,
    userAgentNavegador: true,
    banda: { min: 5, max: 200, saltoRelativoMax: 0.3 },
    async traer(http) {
      const html = await http.texto(PORTADA_BCV, { tlsTolerante: true, userAgentNavegador: true });
      return tasaMensualDePortada(html, "view-ind-home-tasas-activas-y-pasivas", "Activa:");
    },
  },
];
