import type { CodigoMercado, FechaISO } from "../tipos";
import datos from "./podadas.json";

// Universales que salen del índice por no tener impresiones (ESTANDAR-SEO-MULTIPAIS §3). Lo escribe
// scripts/poda-universales.ts: mercado → id de la universal → fecha en que se podó. La página sigue
// viva (noindex, follow) para quien llega por un link; sale del sitemap y del clúster hreflang.
// La clave es el id de la universal y no el slug: un país que cambia el slug no la despoda.
export interface Podadas {
  actualizadoEl: FechaISO | null;
  mercados: Partial<Record<CodigoMercado, Record<string, FechaISO>>>;
}

export const PODADAS: Podadas = datos as Podadas;
