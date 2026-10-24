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
  const mercados = registro.mercados(modo);
  const idiomas: Idiomas = {};
  for (const m of mercados) idiomas[m.locale] = urlHoras(m, producto);
  if (Object.keys(idiomas).length < 2) return undefined;
  const global = mercados.find((m) => m.codigo === "global");
  if (global) idiomas["x-default"] = urlHoras(global, producto);
  return idiomas;
}
