import { etiquetaIdioma } from "../i18n/direccion";
import { edicionPrincipal } from "../mundo/rutas";
import type { ModoPublicacion, Registro } from "../registro";
import { urlIntl, type Idiomas } from "../seo";
import type { Mercado } from "../tipos";
import { SLUG_SUELDOS } from "./rutas";

// «Sueldos reales» muestra los datos de un país, así que su clúster hreflang son solo las ediciones de
// ese país (ca y ca-fr muestran lo mismo de Canadá en dos idiomas), nunca las de otros países: la página
// de México no es la versión en español de la de Francia. calcular.ar ("ar") no tiene ediciones en el
// registro y queda sola.

export function urlSueldosIntl(m: Pick<Mercado, "codigo" | "idioma">): string {
  return urlIntl(m.codigo, SLUG_SUELDOS[m.idioma]);
}

export function hreflangSueldos(registro: Registro, modo: ModoPublicacion, principal: string): Idiomas | undefined {
  const idiomas: Idiomas = {};
  for (const m of registro.mercados(modo)) {
    if (m.codigo !== "global" && edicionPrincipal(m.codigo) === principal) idiomas[etiquetaIdioma(m.locale)] = urlSueldosIntl(m);
  }
  return Object.keys(idiomas).length < 2 ? undefined : idiomas;
}
