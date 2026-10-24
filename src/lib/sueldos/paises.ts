import "server-only";
import { grillaMundo } from "@/lib/mundo/grilla";
import { edicionPrincipal } from "@/motor/mundo/rutas";
import type { PaisAportable } from "@/motor/sueldos/reglas";
import { RUTA_SUELDOS_AR, SLUG_SUELDOS } from "@/motor/sueldos/rutas";
import { urlIntl } from "@/motor/seo";
import { origenAR } from "@/motor/sitio";
import type { CodigoMercado, Idioma, Trato } from "@/motor/tipos";
import { registro } from "@/paises";

// Los países que aceptan aportes son los de la grilla del mundo (una edición principal por país, más
// "ar"): un país nuevo que entra a la grilla habilita «Sueldos reales» solo, con su moneda y su PPA.

export function paisAportable(mercado: string): PaisAportable | undefined {
  try {
    const p = grillaMundo().paises.find((x) => x.mercado === mercado);
    return p && p.ppa > 0 ? { mercado: p.mercado, moneda: p.moneda, ppa: p.ppa } : undefined;
  } catch {
    return undefined;
  }
}

export function mercadosAportables(): string[] {
  try {
    return grillaMundo().paises.map((p) => p.mercado);
  } catch {
    return [];
  }
}

export function idiomaDe(mercado: string): Idioma {
  if (mercado === "ar") return "es";
  return registro.pais(mercado as CodigoMercado)?.mercado.idioma ?? "en";
}

export function urlSueldos(mercado: string): string {
  if (mercado === "ar") return `${origenAR()}${RUTA_SUELDOS_AR}`;
  return urlIntl(edicionPrincipal(mercado) as CodigoMercado, SLUG_SUELDOS[idiomaDe(edicionPrincipal(mercado))]);
}

// El trato de la edición desde la que se pregunta (la página del mundo de /ca-fr usa «vous» aunque el
// país sea Canadá). "ar" es calcular.ar, que no está en el registro.
export function tratoDeEdicion(edicion: string | null): Trato {
  if (edicion === "ar") return "vos";
  if (!edicion || !/^[a-z]{2,6}(-[a-z]{2})?$/.test(edicion)) return "tu";
  return registro.pais(edicion as CodigoMercado)?.mercado.trato ?? "tu";
}
