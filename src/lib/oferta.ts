import { PRODUCTOS, type ProductoSlug } from "@/lib/mp";

// Lo que la oferta dentro de una calculadora necesita del catálogo. Las calculadoras son de
// cliente y mp.ts lee archivos del disco: la página (server) lo resuelve acá y se lo pasa.
export type DatosOferta = {
  slug: ProductoSlug;
  tituloCorto: string;
  precio: number;
  rutaLanding: string;
  archivo: string;
};

export function datosOferta(slug: ProductoSlug): DatosOferta {
  const p = PRODUCTOS[slug];
  if (p.entrega !== "xlsx") throw new Error(`${slug} no es una planilla: no tiene archivo para mostrar`);
  return { slug: p.slug, tituloCorto: p.tituloCorto, precio: p.precio, rutaLanding: p.rutaLanding, archivo: p.archivo };
}
