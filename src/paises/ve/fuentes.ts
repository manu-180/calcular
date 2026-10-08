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
];
