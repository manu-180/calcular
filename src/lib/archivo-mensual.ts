// Helpers puros para las páginas de archivo mensual (/convenios/*/[mes], /canasta-basica/[mes]):
// variaciones, comparación contra IPC, acumulados y navegación entre meses. Sin JSX ni datos —
// cada página arma su propio texto con estos números, igual que ya arma el resto del contenido.

import { IPC_SERIE } from "@/data/ipc-serie";

const SITIO = "https://calcular.ar";

// Ventana de indexación del archivo mensual. El dato viejo NO se borra ni se mueve: la página
// sigue viva y enlazada desde su hub (`follow`), pero sale del índice y del sitemap.
//
// POR QUÉ (19/9/2026): AdSense rechazó el sitio dos veces por "contenido de bajo valor" y la
// medición sobre el HTML servido explicó cuál: ninguna página baja de 700 palabras (mediana
// 1.332), pero /canasta-basica y /cuota-alimentaria eran 54 URLs con 64-68% de texto idéntico
// ENTRE SÍ — dos meses consecutivos de la misma serie no pueden ser dos páginas distintas por
// más números propios que tengan. La ventana deja la demanda real de búsqueda (el dato del mes
// y los recientes) y saca del índice la cola que solo aporta repetición.
//
// Es una ventana MÓVIL y eso es deliberado, al revés que el corte fijo del sitemap (que existe
// para no 404-ear URLs ya indexadas): acá nada desaparece, solo deja de indexarse, así que puede
// moverse sola sin romper nada. Antes de subir el número, volver a medir la similitud real.
export const MESES_INDEXADOS = 12;

/** `true` si el período entra en la ventana indexable de su propia serie. `periodos` son todos
 *  los de la serie (formato ISO "2026-08", que ordena alfabéticamente). */
export function esPeriodoIndexable(periodo: string, periodos: readonly string[]): boolean {
  if (periodos.length <= MESES_INDEXADOS) return true;
  const corte = [...periodos].sort()[periodos.length - MESES_INDEXADOS];
  return periodo >= corte;
}

/** Lo que va en `robots` de un archivo mensual: fuera de la ventana, `noindex, follow`. */
export function robotsArchivoMensual(periodo: string, periodos: readonly string[]) {
  return esPeriodoIndexable(periodo, periodos) ? undefined : { index: false, follow: true };
}

/** "2026-06" a partir de mes/año numéricos, con el padding que exige ISO 8601 (usado en JSON-LD). */
export function periodoISO(anio: number, mes: number): string {
  return `${anio}-${String(mes).padStart(2, "0")}`;
}

/** Porcentaje con signo explícito ("+1,9%" / "-0,4%"): así se lee una variación de un vistazo. */
export function pctConSigno(pct: number, decimales = 1): string {
  const signo = pct > 0 ? "+" : "";
  return `${signo}${pct.toFixed(decimales).replace(".", ",")}%`;
}

// Una diferencia de puntos porcentuales (p. ej. "salario vs. IPC") ya lleva la palabra "puntos"
// al lado: repetir el símbolo "%" es redundante ("+7,1% puntos"). Este helper da solo el número.
export function puntosConSigno(pct: number, decimales = 1): string {
  const signo = pct > 0 ? "+" : "";
  return `${signo}${pct.toFixed(decimales).replace(".", ",")}`;
}

/** Variación porcentual de `actual` contra `previo`. null si falta un valor o `previo` no sirve de base. */
export function variacionPct(actual: number, previo: number): number | null {
  if (!Number.isFinite(actual) || !Number.isFinite(previo) || previo <= 0) return null;
  return (actual / previo - 1) * 100;
}

// El INDEC publica el IPC de un mes M recién ~día 10-15 del mes M+1. Comparar la escala vigente
// en M contra el IPC de ESE M (nunca contra el último IPC publicado): a la fecha en que la escala
// de M regía, nadie conocía todavía la inflación de M+1 en adelante.
export function variacionIpcPeriodo(periodo: string): number | null {
  const i = IPC_SERIE.findIndex(([p]) => p === periodo);
  if (i <= 0) return null;
  return (IPC_SERIE[i][1] / IPC_SERIE[i - 1][1] - 1) * 100;
}

export type ComparacionIpc = {
  variacionSalario: number;
  variacionIpc: number;
  diferenciaPuntos: number;
};

/** Combina la variación del salario/valor con la del IPC del mismo período. null si falta cualquiera de las dos. */
export function compararConIpc(
  variacionSalario: number | null,
  periodo: string,
): ComparacionIpc | null {
  if (variacionSalario === null) return null;
  const variacionIpc = variacionIpcPeriodo(periodo);
  if (variacionIpc === null) return null;
  return { variacionSalario, variacionIpc, diferenciaPuntos: variacionSalario - variacionIpc };
}

/** Variación acumulada de `serie[idx]` contra `serie[0]` (el primer mes publicado de esa serie). */
export function acumuladoDesdeInicio(serie: readonly number[], idx: number): number | null {
  if (idx <= 0 || idx >= serie.length) return null;
  return variacionPct(serie[idx], serie[0]);
}

/** Vecinos de `idx` en una lista ordenada de meses, para la navegación anterior/siguiente. */
export function vecinos<T>(
  lista: readonly T[],
  idx: number,
): { anterior: T | null; siguiente: T | null } {
  return {
    anterior: idx > 0 ? lista[idx - 1] : null,
    siguiente: idx < lista.length - 1 ? lista[idx + 1] : null,
  };
}

/** BreadcrumbList de JSON-LD a partir de una ruta de secciones. `url` relativa o absoluta. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITIO}${it.url}`,
    })),
  };
}
