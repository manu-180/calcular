import { rutaIntl, urlIntl } from "../seo";
import type { Mercado } from "../tipos";
import type { Variante } from "./calculo";
import { SLUG_RANKINGS, slugRanking, type IdRanking } from "./rutas";

type Edicion = Pick<Mercado, "codigo" | "idioma">;

export function urlIndice(m: Edicion): string {
  return urlIntl(m.codigo, SLUG_RANKINGS[m.idioma]);
}

export function urlRanking(m: Edicion, id: IdRanking): string {
  return urlIntl(m.codigo, slugRanking(m.idioma, id));
}

export function rutaIndice(m: Edicion): string {
  return rutaIntl(m.codigo, SLUG_RANKINGS[m.idioma]);
}

export function rutaRanking(m: Edicion, id: IdRanking): string {
  return rutaIntl(m.codigo, slugRanking(m.idioma, id));
}

// La imagen vive en /<m>/<índice>/og (no debajo de cada ranking): así cae en el trace de banderas de
// next.config.ts ("/intl/*/*/og"), que no se toca desde acá.
export function rutaOg(m: Edicion, id: IdRanking, variante: Variante, alta = false): string {
  return `${rutaIndice(m)}/og?r=${id}&v=${variante}${alta ? "&formato=alta" : ""}`;
}
