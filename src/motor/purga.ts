import { resolverValores, type Registro } from "./registro";
import type { CodigoMercado, FechaISO, Mercado } from "./tipos";
import { hoyEn, sumarDias } from "./vigencia";
import type { modoPublicacion } from "./sitio";

// Qué mercados de calcularya cambiaron de un día al otro.
//
// Por qué existe: cada regeneración por `revalidate` es una escritura ISR que Vercel cobra, cambie o
// no el HTML. Medido con scripts/medir_dia_a_dia.ts sobre las 8.594 páginas de calculadora: de un día
// al siguiente cambian entre 3 y 37 (0,04 %-0,43 %), y siempre concentradas en unos pocos mercados.
// Con el plazo de 24 h se pagaban las 10.353 todos los días para reescribir lo mismo. Ahora el plazo
// es largo (REVALIDATE_INTL) y este selector le dice al cron de /api/cron/dia-nuevo qué purgar.
//
// Se purga por MERCADO y no por página a propósito: la ruta pública de cada página pasa por los
// rewrites por host y por slug localizado, y construir esa ruta a mano es la clase de detalle que se
// rompe en silencio. El subárbol de un mercado son ~70 páginas: purgar 6 mercados son ~420
// regeneraciones en el día contra 10.353, y no hay ningún slug que calcular mal.

type Modo = ReturnType<typeof modoPublicacion>;

/** La huella de lo que muestra una calculadora: sus valores resueltos y de qué tramo salieron. */
function huella(registro: Registro, codigo: CodigoMercado, slug: string, fecha: FechaISO, modo: Modo): string {
  const pais = registro.pais(codigo);
  if (!pais) return "sin-pais";
  const entrada = registro.calculadorasPublicables(codigo, fecha, modo).find((c) => c.definicion.slug === slug);
  if (!entrada) return "no-publicable";
  const r = resolverValores(pais, entrada.definicion, fecha);
  if (!r.ok) return `no-resuelve:${r.motivos.slice().sort().join("|")}`;
  return Object.entries(r.valores)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([id, v]) => `${id}=${JSON.stringify(v)}`)
    .join(";");
}

/**
 * Cambió algo entre `desde` y `hasta` en este mercado: una calculadora empezó o dejó de publicarse,
 * o alguno de sus valores se movió (tramo nuevo, punto de serie, dato revisado).
 */
export function mercadoCambio(registro: Registro, m: Mercado, desde: FechaISO, hasta: FechaISO, modo: Modo): boolean {
  const antes = registro.calculadorasPublicables(m.codigo, desde, modo).map((c) => c.definicion.slug);
  const despues = registro.calculadorasPublicables(m.codigo, hasta, modo).map((c) => c.definicion.slug);
  if (antes.length !== despues.length) return true;
  const setDespues = new Set(despues);
  if (antes.some((s) => !setDespues.has(s))) return true;
  return antes.some((slug) => huella(registro, m.codigo, slug, desde, modo) !== huella(registro, m.codigo, slug, hasta, modo));
}

/**
 * Los mercados que hay que purgar hoy. Cada mercado se compara en SU fecha (`hoyEn`), no en una
 * fecha global: cerca de la medianoche dos mercados están en días distintos y el que ya cambió de
 * día es justamente el que hay que mirar (misma razón que `fechasDelMismoInstante` en hreflang).
 */
export function mercadosQueCambiaron(registro: Registro, modo: Modo, ahora: Date = new Date()): CodigoMercado[] {
  const cambiaron: CodigoMercado[] = [];
  for (const m of registro.mercados(modo)) {
    const hasta = hoyEn(m, ahora);
    if (mercadoCambio(registro, m, sumarDias(hasta, -1), hasta, modo)) cambiaron.push(m.codigo);
  }
  return cambiaron;
}

/** Las rutas internas a purgar de un mercado: su subárbol del sitio y el de la calculadora embebida. */
export function rutasDelMercado(codigo: CodigoMercado): string[] {
  return [`/intl/${codigo}`, `/embebido/${codigo}`];
}
