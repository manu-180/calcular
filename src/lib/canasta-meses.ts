// Serie mensual de la canasta de crianza, preparada para las páginas /cuota-alimentaria/[mes].
//
// POR QUÉ EXISTE: el INDEC publica la canasta todos los meses y la prensa la repite como nota del
// día — no hay una herramienta que muestre el mes puntual, lo compare contra la inflación de ESE
// mes y permita actualizar una cuota vieja. Eso es lo que habilitan estas páginas, y todo sale
// computado de `CANASTA_CRIANZA` + `IPC_SERIE`: cuando el generador carga el mes nuevo (~día 15),
// la página del mes nace sola y las viejas siguen siendo correctas. Cero números a mano.
//
// REGLA DE URLS (mina de s63): el set de meses publicados **sólo crece**. Se corta por un período
// de inicio fijo, nunca por una ventana móvil — una ventana haría 404 a URLs ya indexadas.

import { CANASTA_CRIANZA, type MesCrianza, type TramoCrianzaId } from "@/data/canasta-crianza";
import { IPC_SERIE } from "@/data/ipc-serie";

/**
 * Desde dónde se publican páginas por mes. Fijo a propósito (ver regla de URLs arriba).
 * Enero 2025 es el corte razonable: de ahí en adelante el dato sirve para actualizar acuerdos
 * vigentes; más atrás es historia y no tiene intención de búsqueda propia.
 */
export const CUOTA_MES_DESDE = "2025-01";

/** Meses con página propia, del más viejo al más nuevo (mismo orden que la serie del INDEC). */
export const MESES_CUOTA: MesCrianza[] = CANASTA_CRIANZA.filter(
  (m) => m.periodo >= CUOTA_MES_DESDE,
);

/** "junio 2026" → "junio-2026". El slug sale de la etiqueta oficial, no de una lista a mano. */
export function slugDeMes(mes: MesCrianza): string {
  return mes.etiqueta.replace(/\s+/g, "-");
}

export function mesPorSlug(slug: string): MesCrianza | undefined {
  return MESES_CUOTA.find((m) => slugDeMes(m) === slug);
}

/** Mes inmediatamente anterior en la serie completa (puede ser anterior al corte de publicación). */
export function mesAnterior(mes: MesCrianza): MesCrianza | undefined {
  const i = CANASTA_CRIANZA.findIndex((m) => m.periodo === mes.periodo);
  return i > 0 ? CANASTA_CRIANZA[i - 1] : undefined;
}

/** Variación mensual del total de un tramo, en %. null si no hay mes previo. */
export function varMensualCanasta(mes: MesCrianza, tramo: TramoCrianzaId): number | null {
  const prev = mesAnterior(mes);
  if (!prev) return null;
  return (mes.valores[tramo].total / prev.valores[tramo].total - 1) * 100;
}

/** Variación mensual del IPC nacional para ese mismo período, en %. null si falta el índice. */
export function varMensualIPC(periodo: string): number | null {
  const i = IPC_SERIE.findIndex(([p]) => p === periodo);
  if (i <= 0) return null;
  return (IPC_SERIE[i][1] / IPC_SERIE[i - 1][1] - 1) * 100;
}

/**
 * Cuánto habría que actualizar un monto fijado en `mes` para llegar al último mes publicado,
 * siguiendo la propia canasta del tramo. Devuelve el coeficiente (1 = sin cambio) y el %.
 * Es la operación concreta que hace alguien con una cuota vieja: la razón de ser de estas páginas.
 */
export function actualizacionHastaHoy(
  mes: MesCrianza,
  tramo: TramoCrianzaId,
): { coeficiente: number; pct: number; hasta: MesCrianza } {
  const hasta = CANASTA_CRIANZA[CANASTA_CRIANZA.length - 1];
  const coeficiente = hasta.valores[tramo].total / mes.valores[tramo].total;
  return { coeficiente, pct: (coeficiente - 1) * 100, hasta };
}

/** Formatea un porcentaje ya calculado, con signo explícito. */
export function formatPct(pct: number, decimales = 1): string {
  const signo = pct > 0 ? "+" : "";
  return `${signo}${pct.toFixed(decimales).replace(".", ",")}%`;
}
