import { enMapa } from "@/motor/calculo";
import type { Antiguedad } from "./fechas";

// Promulgación del Código de Trabajo (Ley 16-92). Los años trabajados antes se pagan con 15 días de
// cesantía por año (art. 80, último párrafo), regla que estas calculadoras no separan.
export const CODIGO_VIGENTE_DESDE = "1992-05-29";

export function hastaSeisMeses(a: Antiguedad): boolean {
  return a.meses < 6 || (a.meses === 6 && a.dias === 0);
}

export function clavePreaviso(a: Antiguedad): string | null {
  if (a.anios >= 1) return "un-anio-o-mas";
  if (a.meses < 3) return null;
  return hastaSeisMeses(a) ? "tres-a-seis-meses" : "seis-a-doce-meses";
}

// Art. 80: el primer año usa los ordinales 1 y 2 (desde 3 meses cumplidos); después, días por año más
// la fracción del último año si pasa de 3 meses, también con los ordinales 1 y 2.
export function diasCesantia(a: Antiguedad, dias: Readonly<Record<string, number>>): number {
  const fraccion = (desdeTresMeses: boolean): number => {
    if (a.meses < 3 || (!desdeTresMeses && a.meses === 3 && a.dias === 0)) return 0;
    return hastaSeisMeses(a) ? enMapa(dias, "tres-a-seis-meses") : enMapa(dias, "seis-a-doce-meses");
  };
  if (a.anios === 0) return fraccion(true);
  const porAnio = a.anios >= 5 ? enMapa(dias, "cinco-anios-o-mas") : enMapa(dias, "uno-a-cinco-anios");
  return a.anios * porAnio + fraccion(false);
}

// Art. 82: 5 días de 3 a 6 meses, 10 de 6 meses a un año y 15 por cada año después del primero. El
// artículo no paga la fracción del último año, a diferencia de la cesantía.
export function diasAsistencia(a: Antiguedad, dias: Readonly<Record<string, number>>): number {
  if (a.anios >= 1) return a.anios * enMapa(dias, "por-anio");
  if (a.meses < 3) return 0;
  return hastaSeisMeses(a) ? enMapa(dias, "tres-a-seis-meses") : enMapa(dias, "seis-a-doce-meses");
}
