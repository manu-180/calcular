import type { ResultadoRanking } from "./calculo";
import { FOTOS } from "./historial/indice";
import type { IdRanking } from "./rutas";

// Foto mensual de los puestos: la saca scripts/rankings/foto_mensual.ts y queda versionada en
// historial/AAAA-MM.json (más historial/indice.ts, que el mismo script reescribe). La página compara
// el puesto de hoy con el de la foto más nueva de un mes ANTERIOR al de la grilla; sin foto previa no
// muestra variación. Solo puestos por ISO: nada que no esté ya en la página.
export interface FotoMensual {
  version: 1;
  mes: string;
  tomadaEl: string;
  paises: number;
  puestos: Partial<Record<IdRanking, Record<string, Record<string, number>>>>;
}

export const RE_MES = /^\d{4}-(0[1-9]|1[0-2])$/;

export function fotoDe(resultados: Record<IdRanking, Record<string, ResultadoRanking>>, mes: string, tomadaEl: string, paises: number): FotoMensual {
  const puestos: FotoMensual["puestos"] = {};
  for (const [id, variantes] of Object.entries(resultados) as [IdRanking, Record<string, ResultadoRanking>][]) {
    puestos[id] = {};
    for (const [v, r] of Object.entries(variantes)) puestos[id]![v] = Object.fromEntries(r.filas.map((f) => [f.iso, f.puesto]));
  }
  return { version: 1, mes, tomadaEl, paises, puestos };
}

export function fotoAnterior(mesActual: string, fotos: readonly FotoMensual[] = FOTOS): FotoMensual | null {
  return [...fotos].filter((f) => f.mes < mesActual).sort((a, b) => (a.mes < b.mes ? 1 : -1))[0] ?? null;
}

export type Cambio = { tipo: "sube" | "baja"; puestos: number } | { tipo: "igual" } | { tipo: "nuevo" };

// Subir es mejorar: pasar del puesto 30 al 27 es «sube 3».
export function cambioDe(foto: FotoMensual | null, id: IdRanking, variante: string, iso: string, puesto: number): Cambio | null {
  if (!foto) return null;
  const antes = foto.puestos[id]?.[variante]?.[iso];
  if (antes === undefined) return { tipo: "nuevo" };
  if (antes === puesto) return { tipo: "igual" };
  return antes > puesto ? { tipo: "sube", puestos: antes - puesto } : { tipo: "baja", puestos: puesto - antes };
}
