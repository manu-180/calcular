import { enMapa } from "@/motor/calculo";

// La ley no fija un divisor para el día ni para la hora: se usa el mes de 30 días y el año de 52 semanas
// sobre el máximo legal de horas (art. 31). Las calculadoras lo dicen en sus observaciones.
export const DIAS_MES = 30;
export const SEMANAS_ANIO = 52;

type Mapa = Readonly<Record<string, number>>;

// Art. 50 (c): hasta 3 años inclusive un mes; más de 3 y menos de 6, dos; desde 6 y menos de 12, tres;
// desde 12, cuatro. El texto árabe deja suelto el año 6 justo: la versión francesa de la misma ley dice
// «de six à douze ans», por eso entra en el tramo de tres meses.
export function mesesDeAviso(mapa: Mapa, anios: number): number {
  if (anios <= 3) return enMapa(mapa, "up-to-3");
  if (anios < 6) return enMapa(mapa, "up-to-6");
  if (anios < 12) return enMapa(mapa, "up-to-12");
  return enMapa(mapa, "from-12");
}

export function tasaMarginal(escala: readonly { desde: number; hasta: number | null; tasa: number }[], base: number): number {
  if (base <= 0) return 0;
  const fila = escala.find((f) => f.hasta === null || base <= f.hasta);
  return fila ? fila.tasa : 0;
}

// Art. 31: una cantidad por el contribuyente; si está casado suma el cónyuge, y si los dos trabajan cada
// uno toma lo del soltero y los hijos a medias. Hasta cinco hijos.
export function tenzilFamiliar(mapa: Mapa, maxHijos: number, casado: boolean, conyugeTrabaja: boolean, hijos: number): number {
  const n = Math.min(Math.max(hijos, 0), maxHijos);
  const propio = enMapa(mapa, "self");
  const porHijos = n * enMapa(mapa, "child");
  if (casado && conyugeTrabaja) return propio + porHijos / 2;
  if (casado) return propio + enMapa(mapa, "spouse") + porHijos;
  return propio + porHijos;
}
