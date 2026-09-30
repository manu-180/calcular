import "server-only";
import { servicio } from "@/lib/supabase/servicio";
import { productoPorSlug, type Producto } from "@/lib/mp";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const VIGENCIA_MS = 7 * 24 * 60 * 60 * 1000;

export function esUuid(v: unknown): v is string {
  return typeof v === "string" && UUID_RE.test(v);
}

// «manuel@gmail.com» → «ma•••@gmail.com»: alcanza para reconocer cuál de tus mails usaste.
export function enmascararEmail(email: string): string | null {
  const [local, dominio] = email.trim().toLowerCase().split("@");
  if (!local || !dominio) return null;
  return `${local.slice(0, local.length > 3 ? 2 : 1)}•••@${dominio}`;
}

export type CheckoutRegistro = { pistaEmail: string | null; producto: Producto | null };

// El uuid viaja en la URL de vuelta de MercadoPago (external_reference) y de ahí a los scripts de
// terceros de /planillas/gracias: el mail completo nunca sale de acá. Sólo checkouts pagados y
// recientes, que son los únicos a los que apunta el botón «Guardala en tu cuenta».
export async function checkoutParaRegistro(id: string): Promise<CheckoutRegistro | null> {
  if (!esUuid(id)) return null;
  try {
    const { data, error } = await servicio()
      .from("ca_checkouts")
      .select("email, producto, estado, ts")
      .eq("id", id.toLowerCase())
      .maybeSingle();
    if (error) {
      console.error("[auth] ca_checkouts:", error.code, error.message);
      return null;
    }
    if (!data || data.estado !== "pagado") return null;
    const ts = Date.parse(String(data.ts ?? ""));
    if (!Number.isFinite(ts) || Date.now() - ts > VIGENCIA_MS) return null;
    return {
      pistaEmail: typeof data.email === "string" ? enmascararEmail(data.email) : null,
      producto: productoPorSlug(typeof data.producto === "string" ? data.producto : null),
    };
  } catch (e) {
    console.error("[auth] ca_checkouts", e);
    return null;
  }
}
