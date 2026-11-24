import { clusterDeReferencia } from "../referencia";
import type { ModoPublicacion, Registro } from "../registro";
import type { Idiomas } from "../seo";
import type { Mercado } from "../tipos";
import { IDS_RANKING, type IdRanking } from "./rutas";
import { urlIndice, urlRanking } from "./urls";

// Los rankings existen en cada edición del registro, con los slugs de su idioma. Todo sale de
// registro.mercados(): un país nuevo suma sus páginas, su entrada en el sitemap y su hreflang sin tocar
// nada acá. global (en inglés) es x-default. El clúster pasa de MAX_HREFLANG_HEAD, así que va al sitemap.

export function hreflangIndice(registro: Registro, modo: ModoPublicacion): Idiomas | undefined {
  return clusterDeReferencia(registro, modo, urlIndice);
}

export function hreflangRanking(registro: Registro, modo: ModoPublicacion, id: IdRanking): Idiomas | undefined {
  return clusterDeReferencia(registro, modo, (m) => urlRanking(m, id));
}

// Las URLs de rankings de una edición, en el orden del sitemap: índice y después cada ranking.
export function urlsRankings(m: Pick<Mercado, "codigo" | "idioma">): { url: string; id: IdRanking | null }[] {
  return [{ url: urlIndice(m), id: null }, ...IDS_RANKING.map((id) => ({ url: urlRanking(m, id), id }))];
}
