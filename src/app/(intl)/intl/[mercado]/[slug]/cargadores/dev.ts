// Solo `next dev`: cargadores para los mercados que no tienen mapa generado (zz, sus ediciones y los
// países en "interno"), así un país se prueba entero sin publicarlo. index.ts lo importa detrás de
// process.env.NODE_ENV === "development": en un build de producción la rama no existe y el glob de
// src/paises/cargadores-dev.ts no entra al bundle (lo que se sirve sale de los mapas generados).
import { traducida } from "@/motor/edicion";
import type { OrigenTraduccion } from "@/motor/tipos";
import { MODULOS_DEV } from "@/paises/cargadores-dev";
import type { Cargador } from "./tipos";

// La forma de las claves del glob depende del bundler: se indexan por lo que viene después del último
// "./" o "/paises/" (mercado/calculadoras/archivo.ts).
let porRuta: ReadonlyMap<string, Cargador> | null = null;
function modulo(ruta: string): Cargador | undefined {
  porRuta ??= new Map(Object.entries(MODULOS_DEV).map(([k, v]) => [k.replace(/^.*?(?:\/paises\/|\.\/)/, ""), v]));
  return porRuta.get(ruta);
}

export function cargadorDev(mercado: string, slug: string, traduccion?: OrigenTraduccion): Cargador | undefined {
  if (traduccion) {
    const def = modulo(`${traduccion.mercado}/calculadoras/${traduccion.archivo}.ts`);
    const textos = modulo(`${mercado}/textos/${traduccion.archivo}.ts`);
    return def && textos ? () => traducida(def(), textos()) : undefined;
  }
  return modulo(`${mercado}/calculadoras/${slug}.ts`);
}
