import { PRODUCTOS, type ProductoSlug } from "@/lib/mp";
import { entregaConDatos } from "@/lib/prefill/entrega-con-datos";

// Lo que la oferta dentro de una calculadora necesita del catálogo. Las calculadoras son de
// cliente y mp.ts lee archivos del disco: la página (server) lo resuelve acá y se lo pasa.
export type DatosOferta = {
  slug: ProductoSlug;
  tituloCorto: string;
  precio: number;
  rutaLanding: string;
  archivo: string;
  /** ¿El comprador va a abrir el archivo con sus datos puestos? Sale del mismo dato que decide la
   *  entrega (prefill/entrega-con-datos.ts), nunca del copy de la oferta. */
  llegaConDatos: boolean;
};

export function datosOferta(slug: ProductoSlug): DatosOferta {
  const p = PRODUCTOS[slug];
  if (p.entrega !== "xlsx") throw new Error(`${slug} no es una planilla: no tiene archivo para mostrar`);
  return {
    slug: p.slug,
    tituloCorto: p.tituloCorto,
    precio: p.precio,
    rutaLanding: p.rutaLanding,
    archivo: p.archivo,
    llegaConDatos: entregaConDatos(p.slug),
  };
}
