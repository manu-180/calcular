import "server-only";
import ExcelJS from "exceljs";
import { PREFILLS } from "./index";
import { productoDePago, type MpPayment, type Producto, type ProductoSlug } from "@/lib/mp";

// Lado servidor del prefill: lo que el navegador manda al checkout y lo que vuelve en el pago se
// re-valida SIEMPRE con el `validar` del producto. Nada de esto decide si se entrega: eso lo
// decide `habilitaDescarga` contra MercadoPago. Los datos sólo cambian QUÉ se entrega, y ante
// cualquier duda se entrega el genérico.

/** Tope del JSON de datos, en el form y en la metadata (MP corta la metadata entera en 4000). */
export const DATOS_MAX = 2048;

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
]);

function validar(slug: string, raw: unknown): unknown | null {
  const prefill = PREFILLS[slug];
  if (!prefill) return null;
  try {
    return prefill.validar(raw) ?? null;
  } catch (e) {
    console.error(`[prefill/${slug}] validar tiró con datos hostiles o rotos`, e instanceof Error ? e.message : e);
    return null;
  }
}

function parsear(texto: string): unknown {
  try {
    return JSON.parse(texto);
  } catch {
    return undefined;
  }
}

/** Checkout: el campo oculto `datos` del formulario → JSON canónico (lo que devolvió `validar`, sin
 *  campos de más) para la metadata de la preferencia. null = se cobra igual, sin datos. */
export function datosParaCheckout(slug: string, texto: unknown): string | null {
  if (typeof texto !== "string" || texto === "" || texto.length > DATOS_MAX) return null;
  const raw = parsear(texto);
  if (raw === undefined) return null;
  const valido = validar(slug, raw);
  if (valido === null) return null;
  const canonico = JSON.stringify(valido);
  return canonico.length <= DATOS_MAX ? canonico : null;
}

/** Los datos que viajaron con ESTE pago para ESTE producto, re-validados; null si no hay o no
 *  sirven. No verifica el pago: llamarla después de `habilitaDescarga`. */
export function datosDelPago(pago: MpPayment, producto: Producto): unknown | null {
  if (productoDePago(pago)?.slug !== producto.slug) return null;
  const crudo = pago.metadata?.datos;
  let raw: unknown;
  if (typeof crudo === "string") {
    if (crudo.length > DATOS_MAX) return null;
    raw = parsear(crudo);
  } else if (crudo && typeof crudo === "object") {
    // Por si MP algún día devuelve el texto JSON ya parseado.
    raw = JSON.stringify(crudo).length <= DATOS_MAX ? crudo : undefined;
  }
  if (raw === undefined) return null;
  return validar(producto.slug, raw);
}

/** ¿Este producto puede salir con los datos del comprador cargados? */
export function personalizable(producto: Producto): boolean {
  return producto.entrega === "xlsx" && ROUNDTRIP_VERIFICADO.has(producto.slug) && !!PREFILLS[producto.slug]?.aplicar;
}

/** El .xlsx con los datos cargados. Tira ante cualquier problema: quien llama sirve el genérico. */
export async function xlsxConDatos(bytes: Buffer, producto: Producto, datos: unknown): Promise<Buffer> {
  const aplicar = PREFILLS[producto.slug]?.aplicar;
  if (!personalizable(producto) || !aplicar) throw new Error(`${producto.slug} no es personalizable`);
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(bytes as unknown as ArrayBuffer);
  aplicar(wb, datos);
  const salida = Buffer.from(await wb.xlsx.writeBuffer());
  // Firma ZIP: un buffer que no lo es lo abriría Excel como «archivo dañado».
  if (salida.length < 4 || salida[0] !== 0x50 || salida[1] !== 0x4b) throw new Error("exceljs no devolvió un .xlsx");
  return salida;
}
