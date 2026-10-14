// Solo `next dev`: cargadores para los mercados que no tienen mapa generado (zz, sus ediciones y los
// países en "interno"), así un país se prueba entero sin publicarlo. index.ts lo importa detrás de
// process.env.NODE_ENV === "development": en un build de producción la rama no existe y este glob no
// entra al bundle (lo que se sirve sigue saliendo de los mapas generados por check_motor).
import { traducida } from "@/motor/edicion";
import type { OrigenTraduccion } from "@/motor/tipos";
import type { Cargador } from "./tipos";

const RAIZ = "../../../../../../paises";
const CALCULADORAS = import.meta.glob(["../../../../../../paises/*/calculadoras/*.ts", "!**/*.casos.ts"]) as Readonly<Record<string, Cargador | undefined>>;
const TEXTOS = import.meta.glob("../../../../../../paises/*/textos/*.ts") as Readonly<Record<string, Cargador | undefined>>;

export function cargadorDev(mercado: string, slug: string, traduccion?: OrigenTraduccion): Cargador | undefined {
  if (traduccion) {
    const def = CALCULADORAS[`${RAIZ}/${traduccion.mercado}/calculadoras/${traduccion.archivo}.ts`];
    const textos = TEXTOS[`${RAIZ}/${mercado}/textos/${traduccion.archivo}.ts`];
    return def && textos ? () => traducida(def(), textos()) : undefined;
  }
  return CALCULADORAS[`${RAIZ}/${mercado}/calculadoras/${slug}.ts`];
}
