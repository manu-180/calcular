// Serie mensual de la canasta básica, preparada para las páginas /canasta-basica/[mes].
//
// POR QUÉ EXISTE: el INDEC publica la CBA y la CBT todos los meses y la prensa la repite como nota
// del día — siempre con el mismo número, el de la «familia tipo». Lo que ninguna nota trae es el
// mes puntual abierto por composición de hogar, comparado contra la inflación de ESE mes, y con el
// coeficiente para traer un ingreso viejo a valores de hoy. Eso es lo que habilitan estas páginas,
// y todo sale computado de `CANASTA_BASICA` + `IPC_SERIE` con el mismo motor que la calculadora:
// cuando el generador carga el mes nuevo (~día 14), la página del mes nace sola y las viejas siguen
// siendo correctas. Cero números a mano.
//
// REGLA DE URLS (mina de s63, heredada de /cuota-alimentaria/[mes]): el set de meses publicados
// **sólo crece**. Se corta por un período de inicio FIJO, nunca por una ventana móvil — una ventana
// haría 404 a URLs ya indexadas, que es exactamente lo que le pasó al sitio entero el 2/8.

import { CANASTA_BASICA, type MesCanastaBasica } from "@/data/canasta-basica";
import { IPC_SERIE } from "@/data/ipc-serie";
import { calcularCanastaBasica, etiquetaPeriodo } from "@/lib/canasta-basica";

/**
 * Desde dónde se publican páginas por mes. Fijo a propósito (ver regla de URLs arriba).
 * Enero 2024 es el corte: de ahí en adelante el dato todavía se usa para comparar ingresos y
 * actualizar montos; más atrás la serie es historia y no tiene intención de búsqueda propia.
 */
export const CANASTA_MES_DESDE = "2024-01";

/** Meses con página propia, del más viejo al más nuevo (mismo orden que la serie del INDEC). */
export const MESES_CANASTA: MesCanastaBasica[] = CANASTA_BASICA.filter(
  (m) => m.periodo >= CANASTA_MES_DESDE,
);

/** "2026-06" → "junio-2026". El slug se deriva del período, no de una lista a mano. */
export function slugDeMesCanasta(mes: MesCanastaBasica): string {
  return etiquetaPeriodo(mes.periodo).replace(/\s+/g, "-");
}

export function mesCanastaPorSlug(slug: string): MesCanastaBasica | undefined {
  return MESES_CANASTA.find((m) => slugDeMesCanasta(m) === slug);
}

/** Mes inmediatamente anterior en la serie COMPLETA (puede ser anterior al corte de publicación). */
export function mesCanastaAnterior(mes: MesCanastaBasica): MesCanastaBasica | undefined {
  const i = CANASTA_BASICA.findIndex((m) => m.periodo === mes.periodo);
  return i > 0 ? CANASTA_BASICA[i - 1] : undefined;
}

/** Variación mensual del IPC nacional para ese mismo período, en %. null si falta el índice. */
export function varMensualIPC(periodo: string): number | null {
  const i = IPC_SERIE.findIndex(([p]) => p === periodo);
  if (i <= 0) return null;
  return (IPC_SERIE[i][1] / IPC_SERIE[i - 1][1] - 1) * 100;
}

/**
 * Cuánto habría que actualizar un monto de `mes` para llegar al último mes publicado, siguiendo la
 * propia CBT. Es la operación concreta de alguien que mira un ingreso viejo: la razón de estas
 * páginas. Devuelve el coeficiente (1 = sin cambio), el % y el mes de llegada.
 */
export function actualizacionCanastaHastaHoy(mes: MesCanastaBasica): {
  coeficiente: number;
  pct: number;
  hasta: MesCanastaBasica;
} {
  const hasta = CANASTA_BASICA[CANASTA_BASICA.length - 1];
  const coeficiente = hasta.cbt / mes.cbt;
  return { coeficiente, pct: (coeficiente - 1) * 100, hasta };
}

/**
 * Los tres hogares que el propio INDEC publica cada mes como ejemplo en su informe.
 * Viven acá (y no en la página) porque los usan la calculadora y las 30+ páginas por mes:
 * una sola definición ⇒ imposible que la tabla del mes y la de la calculadora difieran.
 */
export const HOGARES_INDEC = [
  {
    titulo: "Hogar de 3 integrantes",
    descripcion: "Una mujer de 35 años, su hijo de 18 y su madre de 61",
    integrantes: [
      { edad: 35, sexo: "mujer" as const },
      { edad: 18, sexo: "varon" as const },
      { edad: 61, sexo: "mujer" as const },
    ],
  },
  {
    titulo: "Hogar de 4 integrantes (la «familia tipo»)",
    descripcion: "Un varón de 35, una mujer de 31, un hijo de 6 y una hija de 8",
    integrantes: [
      { edad: 35, sexo: "varon" as const },
      { edad: 31, sexo: "mujer" as const },
      { edad: 6, sexo: "varon" as const },
      { edad: 8, sexo: "mujer" as const },
    ],
  },
  {
    titulo: "Hogar de 5 integrantes",
    descripcion: "Un varón y una mujer de 30, y tres hijos de 1, 3 y 5 años",
    integrantes: [
      { edad: 30, sexo: "varon" as const },
      { edad: 30, sexo: "mujer" as const },
      { edad: 1, sexo: "mujer" as const },
      { edad: 3, sexo: "varon" as const },
      { edad: 5, sexo: "mujer" as const },
    ],
  },
] as const;

/** Los tres hogares del INDEC resueltos para un mes puntual. El `!` es seguro: las edades son fijas y válidas. */
export function hogaresDelMes(mes: MesCanastaBasica) {
  return HOGARES_INDEC.map((h) => ({
    ...h,
    r: calcularCanastaBasica({ integrantes: [...h.integrantes], ingresoHogar: null, mes })!,
  }));
}
