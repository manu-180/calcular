import { clusterDeReferencia } from "../../referencia";
import type { ModoPublicacion, Registro } from "../../registro";
import { urlIntl, type Idiomas } from "../../seo";
import type { Mercado } from "../../tipos";
import { SLUG_HORAS } from "../rutas";

// El índice existe en cada edición del registro con el slug de su idioma, y cada producto tiene su
// página (/<m>/<slug>/<producto>). Todo sale de registro.mercados(): un país nuevo suma sus páginas, su
// entrada en el sitemap y su hreflang sin tocar nada acá. global (en inglés) es x-default.

export function urlHoras(m: Pick<Mercado, "codigo" | "idioma">, producto?: string): string {
  return urlIntl(m.codigo, `${SLUG_HORAS[m.idioma]}${producto ? `/${producto}` : ""}`);
}

export function hreflangHoras(registro: Registro, modo: ModoPublicacion, producto?: string): Idiomas | undefined {
  return clusterDeReferencia(registro, modo, (m) => urlHoras(m, producto));
}
