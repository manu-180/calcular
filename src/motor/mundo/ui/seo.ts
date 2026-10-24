import type { ModoPublicacion, Registro } from "../../registro";
import { etiquetaIdioma } from "../../i18n/direccion";
import { urlIntl, type Idiomas } from "../../seo";
import type { Mercado } from "../../tipos";
import { SLUG_MUNDO } from "../rutas";

// «Tu sueldo en el mundo» existe en cada edición del registro, con el slug de su idioma. Todo sale de
// registro.mercados(): un país nuevo suma su página, su entrada en el sitemap y su hreflang sin tocar
// nada acá. global (la home en inglés) es x-default y también la versión «en» genérica.

export function urlMundo(m: Pick<Mercado, "codigo" | "idioma">): string {
  return urlIntl(m.codigo, SLUG_MUNDO[m.idioma]);
}

export function hreflangMundo(registro: Registro, modo: ModoPublicacion): Idiomas | undefined {
  const mercados = registro.mercados(modo);
  const idiomas: Idiomas = {};
  for (const m of mercados) idiomas[etiquetaIdioma(m.locale)] = urlMundo(m);
  if (Object.keys(idiomas).length < 2) return undefined;
  const global = mercados.find((m) => m.codigo === "global");
  if (global) idiomas["x-default"] = urlMundo(global);
  return idiomas;
}
