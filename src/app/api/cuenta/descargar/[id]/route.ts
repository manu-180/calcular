import { NextResponse, after, type NextRequest } from "next/server";
import { productoPorSlug } from "@/lib/mp";
import { servirArchivoProducto } from "@/lib/entrega";
import { clienteServidor } from "@/lib/supabase/servidor";
import { registrarEvento } from "@/lib/rastreo-servidor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/cuenta/descargar/:id — la versión actual del .xlsx de una compra propia. La propiedad
// la decide la RLS de ca_compras (user_id = auth.uid()); el filtro por user_id es un segundo cerrojo.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d{1,18}$/.test(id)) return new NextResponse("No encontrado", { status: 404 });

  let supabase;
  try {
    supabase = await clienteServidor();
  } catch (e) {
    console.error("[cuenta/descargar] sin configuración de Supabase", e);
    return new NextResponse("No disponible", { status: 503 });
  }
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    const login = new URL("/login", req.url);
    login.searchParams.set("next", "/cuenta");
    return NextResponse.redirect(login, 303);
  }

  const { data: compra, error } = await supabase
    .from("ca_compras")
    .select("id, producto, estado")
    .eq("id", id)
    .eq("user_id", auth.user.id)
    .maybeSingle();
  if (error) {
    console.error("[cuenta/descargar] ca_compras:", error.code, error.message);
    return new NextResponse("No pudimos verificar la compra", { status: 502 });
  }
  if (!compra) return new NextResponse("No encontrado", { status: 404 });
  if (compra.estado !== "aprobado") return new NextResponse("Esta compra no está activa", { status: 403 });

  const producto = productoPorSlug(compra.producto);
  if (!producto) {
    console.error("[cuenta/descargar] producto desconocido en la compra", id, compra.producto);
    return new NextResponse("Producto no disponible", { status: 500 });
  }

  after(() => registrarEvento({ tipo: "descarga", path: "/cuenta", producto: producto.slug, userId: auth.user.id, props: { via: "cuenta" } }));
  return servirArchivoProducto(producto);
}
