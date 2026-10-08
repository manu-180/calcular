import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ProductoVenta } from "./tipos";

// Planillas que vende calcularya.com. Cada una es de un país: el id es `<mercado>/<slug>` y el
// archivo vive en private/intl/<mercado>/. Para sumar una:
//   1. dejar el .xlsx en private/intl/<mercado>/<archivo>.xlsx (o generarlo en el build),
//   2. agregar un definirProductoIntl({...}) a PRODUCTOS_INTL,
//   3. confirmar que next.config.ts incluye ./private/intl/** en /api/pagos/descarga.
// Nada más: catálogo, landing, cobro, webhook, mail y descarga leen de acá.

export type ProductoIntl = ProductoVenta & {
  mercado: string;
  slug: string;
  tituloCorto: string;
  paraQuien: string;
  descripcion: readonly string[];
  disparadorActualizacion: string;
  moneda: "USD";
  archivo: string;
};

export type DefinicionProductoIntl = Omit<ProductoIntl, "id" | "moneda"> & { moneda?: "USD" };

const RE_MERCADO = /^[a-z]{2,6}$/;
const RE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RE_ARCHIVO = /^[a-z0-9]+(?:-[a-z0-9]+)*\.xlsx$/;

export function definirProductoIntl(d: DefinicionProductoIntl): ProductoIntl {
  if (!RE_MERCADO.test(d.mercado) || d.mercado === "ar") throw new Error(`producto intl con mercado inválido: ${d.mercado}`);
  if (d.slug === "comprar" || d.slug === "gracias") throw new Error(`producto intl: «${d.slug}» es una ruta de planillas`);
  if (!RE_SLUG.test(d.slug)) throw new Error(`producto intl con slug inválido: ${d.slug}`);
  if (!RE_ARCHIVO.test(d.archivo)) throw new Error(`producto intl ${d.slug}: el archivo es un nombre .xlsx, sin carpetas`);
  if (!Number.isInteger(d.precioCentavos) || d.precioCentavos < 100 || d.precioCentavos > 100000) {
    throw new Error(`producto intl ${d.slug}: precioCentavos entero entre 100 y 100000`);
  }
  const id = `${d.mercado}/${d.slug}`;
  // ca_compras.producto y ca_checkouts.producto aceptan hasta 60 caracteres.
  if (id.length > 60) throw new Error(`producto intl ${id}: id de más de 60 caracteres`);
  return { ...d, id, moneda: "USD" };
}

export const PRODUCTOS_INTL: readonly ProductoIntl[] = [];

let catalogo: readonly ProductoIntl[] = PRODUCTOS_INTL;

// Sólo para los checks: cambia el catálogo que ven las rutas y devuelve cómo restaurarlo.
export function usarCatalogoIntl(lista: readonly ProductoIntl[]): () => void {
  const previo = catalogo;
  catalogo = lista;
  return () => {
    catalogo = previo;
  };
}

export function catalogoIntl(): readonly ProductoIntl[] {
  return catalogo;
}

export function productosDeMercado(mercado: string): ProductoIntl[] {
  return catalogo.filter((p) => p.mercado === mercado);
}

export function productoIntl(id: string | null | undefined): ProductoIntl | null {
  if (!id) return null;
  return catalogo.find((p) => p.id === id) ?? null;
}

export function productoIntlDe(mercado: string, slug: string): ProductoIntl | null {
  return productoIntl(`${mercado}/${slug}`);
}

export function rutaArchivoIntl(p: ProductoIntl): string {
  return path.join(process.cwd(), "private", "intl", p.mercado, p.archivo);
}

export async function leerArchivoIntl(p: ProductoIntl): Promise<Buffer> {
  return readFile(rutaArchivoIntl(p));
}

// Referencia propia del pedido: `<mercado>/<slug>:<uuid>`. Viaja como custom_id de PayPal (o el
// metadato que tenga el proveedor) y vuelve en el pago: de ahí sale qué se compró, nunca del
// navegador. El uuid es la PK de ca_checkouts.
export function referenciaIntl(p: ProductoIntl, uuid: string = crypto.randomUUID()): string {
  return `${p.id}:${uuid}`;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function leerReferenciaIntl(ref: string | null | undefined): { producto: ProductoIntl; checkoutId: string } | null {
  const m = /^([a-z]{2,6}\/[a-z0-9-]+):([0-9a-f-]{36})$/i.exec(ref ?? "");
  if (!m || !UUID_RE.test(m[2])) return null;
  const producto = productoIntl(m[1]);
  return producto ? { producto, checkoutId: m[2].toLowerCase() } : null;
}
