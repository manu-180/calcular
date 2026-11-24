import type { ModoPublicacion, Registro } from "../../registro";
import { clusterDeReferencia } from "../../referencia";
import { urlIntl, type Idiomas } from "../../seo";
import { hreflangARActivo, origenAR } from "../../sitio";
import type { Mercado } from "../../tipos";
import { RUTA_MUNDO_AR, SLUG_MUNDO } from "../rutas";

// «Tu sueldo en el mundo» existe en cada edición del registro, con el slug de su idioma. Todo sale de
// registro.mercados(): un país nuevo suma su página, su entrada en el sitemap y su hreflang sin tocar
// nada acá. global (la home en inglés) es x-default y también la versión «en» genérica.

export function urlMundo(m: Pick<Mercado, "codigo" | "idioma">): string {
  return urlIntl(m.codigo, SLUG_MUNDO[m.idioma]);
}

export function hreflangMundo(registro: Registro, modo: ModoPublicacion): Idiomas | undefined {
  // calcular.ar entra al clúster (es-AR) recién con el flag de hreflang AR (ADR 0001, D6): apagado, ni
  // calcularya ni calcular.ar cambian un byte.
  return clusterDeReferencia(registro, modo, urlMundo, hreflangARActivo() ? { "es-AR": `${origenAR()}${RUTA_MUNDO_AR}` } : {});
}
