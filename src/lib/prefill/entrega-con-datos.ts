// ¿La entrega de este producto llega con los datos que cargó el comprador?
//
// POR QUÉ ESTE ARCHIVO (14/11/2026): la respuesta la decidía `personalizable()` en servidor.ts,
// que no se puede importar desde una página sin arrastrar exceljs, así que el copy de cada oferta
// la afirmaba por su cuenta. La Planilla de Ganancias de sociedades, que no es personalizable,
// decía «la planilla te llega con tus datos ya cargados» y «las celdas amarillas ya vienen con tus
// datos»: la persona pagaba y recibía el archivo genérico. Pasaba lint, typecheck y todos los
// checks, porque ninguna puerta comparaba la promesa contra la entrega.
//
// Ahora la promesa sale de acá, del mismo dato que decide la entrega, y viaja en `DatosOferta`
// hasta la nota de la vista previa. Un producto nuevo no puede prometer lo que no hace.
//
// Sin dependencias pesadas a propósito: lo lee `src/lib/oferta.ts`, que corre en cada página que
// vende. `servidor.ts` reexporta ROUNDTRIP_VERIFICADO desde acá para no tener dos listas.

import { PREFILLS } from "./index";
import type { ProductoSlug } from "@/lib/mp";

/** Productos cuyo .xlsx pasa intacto por exceljs load→write (scripts/check_xlsx_roundtrip.ts).
 *  Uno que no esté acá sale genérico aunque su prefill tenga `aplicar`. */
export const ROUNDTRIP_VERIFICADO: ReadonlySet<ProductoSlug> = new Set<ProductoSlug>([
  "planilla-comercio",
  "planilla-uocra",
  "planilla-casas-particulares",
  "planilla-monotributo",
  "planilla-alquileres",
  "planilla-camioneros",
  "planilla-mi-sueldo",
  "planilla-vacaciones",
  "planilla-plazo-fijo",
]);

/** `true` sólo si el comprador va a abrir el archivo con sus datos puestos. */
export function entregaConDatos(slug: ProductoSlug): boolean {
  return ROUNDTRIP_VERIFICADO.has(slug) && !!PREFILLS[slug]?.aplicar;
}
