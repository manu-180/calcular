import { NextResponse, type NextRequest } from "next/server";
import { ipDelPedido } from "@/lib/acceso-entrega";
import { permitido } from "@/lib/limite";
import { emailValido } from "@/lib/mp";
import { productoIntl } from "@/lib/pagos/catalogo-intl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/pagos/aviso {email, producto}: «avísame cuando esté a la venta» de calcularya.com,
// mientras no hay cobro configurado. Va a la misma tabla subscribers que la lista de calcular.ar,
// con su propio source, y sin el mail de bienvenida de calcular.ar (otra marca, otro trato).
export async function POST(req: NextRequest) {
  const ip = ipDelPedido(req.headers);
  if (!ip || !(await permitido(`aviso-intl:${ip}`, 8, 3600))) return NextResponse.json({ error: "demasiados pedidos" }, { status: 429 });
  let cuerpo: { email?: unknown; producto?: unknown };
  try {
    cuerpo = (await req.json()) as typeof cuerpo;
  } catch {
    return NextResponse.json({ error: "pedido inválido" }, { status: 400 });
  }
  const email = emailValido(typeof cuerpo.email === "string" ? cuerpo.email : "");
  const producto = productoIntl(typeof cuerpo.producto === "string" ? cuerpo.producto : "");
  if (!email || !producto) return NextResponse.json({ error: "datos inválidos" }, { status: 400 });

  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) {
    console.error("[pagos/aviso] sin SUPABASE_URL / SUPABASE_ANON_KEY: no se guarda el aviso", producto.id);
    return NextResponse.json({ error: "no disponible" }, { status: 503 });
  }
  try {
    const res = await fetch(`${url}/rest/v1/subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: anon, Authorization: `Bearer ${anon}`, Prefer: "return=minimal" },
      body: JSON.stringify({ email: email.toLowerCase(), source: `calcularya:${producto.id}`.slice(0, 80), unsubscribe_token: crypto.randomUUID() }),
      signal: AbortSignal.timeout(5000),
    });
    // 409: ya estaba en la lista. Para la persona es lo mismo: queda avisada.
    if (!res.ok && res.status !== 409) {
      console.error("[pagos/aviso] subscribers respondió", res.status, (await res.text().catch(() => "")).slice(0, 200));
      return NextResponse.json({ error: "no se pudo guardar" }, { status: 502 });
    }
  } catch (e) {
    console.error("[pagos/aviso]", producto.id, e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "no se pudo guardar" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
