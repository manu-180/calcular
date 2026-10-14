import { createHmac } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { emailValido } from "@/lib/mp";
import { asentarUnaVez, idsConLaMarca, marcarEntrega, type DepsVenta } from "@/lib/mp-webhook";
import { leerReferenciaIntl, type ProductoIntl } from "./catalogo-intl";
import type { DatosIntl } from "@/lib/prefill/intl";
import { decimal, pagoCubre, type NombreProveedor, type PagoVerificado } from "./tipos";

// Asiento de las ventas de calcularya.com. revenue_events es lo que cuenta (idempotente por la
// marca `[<proveedor>:<id>]`, la misma técnica que las ventas de MP); ca_checkouts y ca_compras son
// el embudo y la biblioteca de la cuenta, y nunca frenan una venta.

export const PROYECTO_INTL = "planillas-intl";

// revenue_events.note se lee con la anon key: la marca de deduplicación no puede ser el id de la
// captura, que es la llave que abre el informe y la planilla. Va una huella con clave secreta.
function huella(id: string): string {
  const clave = process.env.PAYPAL_WEBHOOK_ID || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return createHmac("sha256", clave).update(id).digest("hex").slice(0, 24).toUpperCase();
}

export function marcaVentaIntl(proveedor: NombreProveedor, id: string): string {
  return `[${proveedor}:${huella(id)}]`;
}

export function marcaDevolucionIntl(proveedor: NombreProveedor, id: string): string {
  return `[${proveedor}-devuelto:${huella(id)}]`;
}

// ca_compras.mp_payment_id es NOT NULL UNIQUE desde antes de esta capa: el id de otro proveedor
// entra con prefijo, así nunca choca con un id numérico de MP y funciona sin la migración nueva.
export function idCompraUnico(proveedor: NombreProveedor, id: string): string {
  return proveedor === "mercadopago" ? id : `${proveedor}:${id}`;
}

export async function registrarVentaIntl(deps: DepsVenta, pago: PagoVerificado, producto: ProductoIntl) {
  const marca = marcaVentaIntl(pago.proveedor, pago.id);
  return asentarUnaVez(deps, marca, {
    project_slug: PROYECTO_INTL,
    source: pago.proveedor,
    amount: Number(decimal(pago.montoCentavos ?? producto.precioCentavos)),
    currency: pago.moneda ?? producto.moneda,
    note:
      `Venta automática de ${producto.titulo} ${marca} · producto ${producto.id} · mercado ${producto.mercado}` +
      `. Registrada por el webhook de ${pago.proveedor}. Monto bruto, sin descontar comisión.`,
  });
}

export async function registrarDevolucionIntl(deps: DepsVenta, pago: PagoVerificado, producto: ProductoIntl) {
  if ((await idsConLaMarca(deps, marcaVentaIntl(pago.proveedor, pago.id))).length === 0) return { duplicado: false, sinVenta: true };
  const marca = marcaDevolucionIntl(pago.proveedor, pago.id);
  return asentarUnaVez(deps, marca, {
    project_slug: PROYECTO_INTL,
    source: pago.proveedor,
    amount: -Number(decimal(producto.precioCentavos)),
    currency: producto.moneda,
    note:
      `${pago.estado === "contracargo" ? "Contracargo" : "Reembolso"} de ${producto.titulo} ${marca}` +
      ` · producto ${producto.id} · descuenta la venta ${marcaVentaIntl(pago.proveedor, pago.id)}. Registrado por el webhook de ${pago.proveedor}.`,
  });
}

export { marcarEntrega };

// ─── ca_checkouts / ca_compras con degradación ───────────────────────────────────────────────

const SIN_COLUMNA = new Set(["PGRST204", "42703"]);
const tope = () => AbortSignal.timeout(4000);
type Resultado = { error: { code?: string; message?: string } | null };

// Sin la migración 20261009120000 no existen proveedor/pago_id: se reintenta sin ellas. Sin la de
// fase 2 (sitio/mercado) la fila intl quedaría contada como Argentina: se descarta y se avisa. Sin la
// de ofertas (docs/paises/SQL-OFERTAS.md) no existe ca_checkouts.datos: la fila se guarda sin los
// datos y la persona los vuelve a ver en su navegador (localStorage) o los carga en el informe.
async function conDegradacion(
  tabla: string,
  fila: Record<string, unknown>,
  escribir: (f: Record<string, unknown>) => PromiseLike<Resultado>,
): Promise<boolean> {
  let r = await escribir(fila);
  if (r.error && SIN_COLUMNA.has(r.error.code ?? "") && "datos" in fila) {
    console.warn(`[pagos] ${tabla}: falta la columna datos (docs/paises/SQL-OFERTAS.md), se guarda sin los datos de la calculadora`);
    const { datos: _d, ...sinDatos } = fila;
    fila = sinDatos;
    r = await escribir(fila);
  }
  // Sin 20261014120000 no hay columna pais: se guarda sin el país.
  if (r.error && SIN_COLUMNA.has(r.error.code ?? "") && "pais" in fila) {
    const { pais: _pa, ...sinPais } = fila;
    fila = sinPais;
    r = await escribir(fila);
  }
  if (r.error && SIN_COLUMNA.has(r.error.code ?? "")) {
    const { proveedor: _p, pago_id: _i, ...sinPagos } = fila;
    r = await escribir(sinPagos);
    if (r.error && SIN_COLUMNA.has(r.error.code ?? "")) {
      console.warn(`[pagos] ${tabla}: falta la migración de sitio/mercado, la fila intl no se guarda`);
      return false;
    }
  }
  if (r.error) {
    console.error(`[pagos] ${tabla}:`, r.error.code, r.error.message);
    return false;
  }
  return true;
}

export type FilaCheckoutIntl = {
  id: string;
  producto: string;
  email: string | null;
  vid: string | null;
  user_id: string | null;
  desde: string | null;
  estado: "iniciado";
  monto: number;
  sitio: "intl";
  mercado: string;
  proveedor: NombreProveedor;
  pais?: string;
  datos?: DatosIntl;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function filaCheckoutIntl(p: {
  checkoutId: string;
  producto: ProductoIntl;
  proveedor: NombreProveedor;
  email?: string | null;
  vid?: string | null;
  userId?: string | null;
  ruta?: string | null;
  pais?: string | null;
  datos?: DatosIntl | null;
}): FilaCheckoutIntl {
  const ruta = p.ruta && /^\/[a-z0-9/_-]{0,119}$/i.test(p.ruta) && !/^\/[/\\]/.test(p.ruta) ? p.ruta : null;
  return {
    id: p.checkoutId,
    producto: p.producto.id,
    email: emailValido(p.email),
    vid: p.vid && UUID_RE.test(p.vid) ? p.vid.toLowerCase() : null,
    user_id: p.userId && UUID_RE.test(p.userId) ? p.userId : null,
    desde: ruta,
    estado: "iniciado",
    monto: Number(decimal(p.producto.precioCentavos)),
    sitio: "intl",
    mercado: p.producto.mercado,
    proveedor: p.proveedor,
    ...(p.pais && /^[A-Z]{2}$/.test(p.pais) && p.pais !== "XX" ? { pais: p.pais } : {}),
    ...(p.datos ? { datos: p.datos } : {}),
  };
}

export async function registrarCheckoutIntl(db: SupabaseClient, fila: FilaCheckoutIntl): Promise<boolean> {
  try {
    return await conDegradacion("ca_checkouts", fila, (f) =>
      db.from("ca_checkouts").upsert(f, { onConflict: "id", ignoreDuplicates: true }).abortSignal(tope()),
    );
  } catch (e) {
    console.error("[pagos] ca_checkouts:", e instanceof Error ? e.message : e);
    return false;
  }
}

function estadoDeCheckout(estado: PagoVerificado["estado"]) {
  switch (estado) {
    case "aprobado":
      return "pagado";
    case "pendiente":
      return "pendiente";
    case "rechazado":
      return "rechazado";
    case "reembolsado":
    case "contracargo":
      return "reembolsado";
    default:
      return null;
  }
}

export function filaCompraIntl(pago: PagoVerificado, producto: ProductoIntl, checkoutId: string, extra: { email?: string | null; userId?: string | null }) {
  const estado = pago.estado === "aprobado" ? "aprobado" : pago.estado === "contracargo" ? "contracargo" : "reembolsado";
  return {
    mp_payment_id: idCompraUnico(pago.proveedor, pago.id),
    producto: producto.id,
    email: emailValido(pago.email) ?? emailValido(extra.email),
    ...(extra.userId && UUID_RE.test(extra.userId) ? { user_id: extra.userId } : {}),
    monto: Number(decimal(pago.montoCentavos ?? producto.precioCentavos)),
    moneda: pago.moneda ?? producto.moneda,
    estado,
    legado: false,
    checkout_id: checkoutId,
    pagado_at: pago.fecha ?? new Date().toISOString(),
    sitio: "intl",
    mercado: producto.mercado,
    proveedor: pago.proveedor,
    pago_id: pago.id,
  };
}

// Embudo y biblioteca. Corre después de responder; nunca tira.
export async function sincronizarPagoIntl(db: SupabaseClient, pago: PagoVerificado): Promise<void> {
  try {
    const ref = leerReferenciaIntl(pago.referencia);
    if (!ref) return;
    const { producto, checkoutId } = ref;
    const estado = estadoDeCheckout(pago.estado);
    if (!estado) return;

    let delCheckout: { email: string | null; user_id: string | null } | null = null;
    const idUnico = idCompraUnico(pago.proveedor, pago.id);
    try {
      const { data, error } = await db
        .from("ca_checkouts")
        .update({ estado, mp_payment_id: idUnico, updated_at: new Date().toISOString() })
        .eq("id", checkoutId)
        .or(`estado.is.null,estado.in.(iniciado,pendiente,rechazado),mp_payment_id.eq."${idUnico}"`)
        .select("email, user_id")
        .abortSignal(tope());
      if (error) console.error("[pagos] ca_checkouts (pago):", error.code, error.message);
      else if (data?.length) delCheckout = data[0] as { email: string | null; user_id: string | null };
    } catch (e) {
      console.error("[pagos] ca_checkouts (pago):", e instanceof Error ? e.message : e);
    }

    if (pago.estado === "aprobado" && !pagoCubre(pago, producto)) {
      console.warn("[pagos] pago aprobado que no cierra con el producto, no va a ca_compras:", pago.proveedor, pago.id);
      return;
    }
    if (pago.estado !== "aprobado" && pago.estado !== "reembolsado" && pago.estado !== "contracargo") return;
    const fila = filaCompraIntl(pago, producto, checkoutId, { email: delCheckout?.email, userId: delCheckout?.user_id });
    const aprobado = pago.estado === "aprobado";
    const cuerpo = aprobado ? fila : { ...fila, updated_at: new Date().toISOString() };
    await conDegradacion("ca_compras", cuerpo, (f) =>
      db.from("ca_compras").upsert(f, { onConflict: "mp_payment_id", ignoreDuplicates: aprobado }).abortSignal(tope()),
    );
  } catch (e) {
    console.error("[pagos] sincronizarPagoIntl:", e instanceof Error ? e.message : e);
  }
}

// Los datos de la calculadora que viajaron con ESTE checkout de ESTE producto, sin validar (quien
// llama los valida con validarDatosDeProducto). null si no hay, si la base no tiene la columna o si
// no contesta: los datos sólo cambian qué se entrega, nunca si se entrega.
export async function leerDatosCheckoutIntl(db: SupabaseClient, checkoutId: string, producto: ProductoIntl): Promise<unknown | null> {
  if (!UUID_RE.test(checkoutId)) return null;
  try {
    const { data, error } = await db
      .from("ca_checkouts")
      .select("datos")
      .eq("id", checkoutId)
      .eq("producto", producto.id)
      .abortSignal(tope())
      .maybeSingle();
    if (error) {
      if (SIN_COLUMNA.has(error.code ?? "")) console.warn("[pagos] ca_checkouts sin la columna datos: sale sin los datos de la calculadora");
      else console.error("[pagos] ca_checkouts (datos):", error.code, error.message);
      return null;
    }
    return (data as { datos?: unknown } | null)?.datos ?? null;
  } catch (e) {
    console.error("[pagos] ca_checkouts (datos):", e instanceof Error ? e.message : e);
    return null;
  }
}
