import { NextResponse, type NextRequest } from "next/server";
import { esAdminEmail } from "@/lib/auth/admin";
import { usuarioActual } from "@/lib/auth/sesion";
import { cargarPanel, leerMercado } from "@/lib/panel/datos";
import { RANGOS, type Rango } from "@/lib/panel/tipos";

export const dynamic = "force-dynamic";

const CABECERAS = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" };

function responder(cuerpo: unknown, status = 200) {
  return NextResponse.json(cuerpo, { status, headers: CABECERAS });
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const r = q.get("r") ?? "";
  const rango = (RANGOS as string[]).includes(r) ? (r as Rango) : null;
  const demo = q.get("demo");
  const mercado = leerMercado(q.get("m"));

  if (process.env.NODE_ENV === "development" && (demo === "1" || demo === "vacio")) {
    if (!rango) return responder({ error: "Rango inválido" }, 400);
    const { panelDeEjemplo, panelSinDatos } = await import("@/lib/panel/fixture");
    return responder(demo === "vacio" ? panelSinDatos(rango, { mercado }) : panelDeEjemplo(rango, { mercado }));
  }

  const usuario = await usuarioActual();
  if (!usuario) return responder({ error: "Tenés que iniciar sesión" }, 401);
  if (!usuario.verificado || !esAdminEmail(usuario.email)) return responder({ error: "Sin permiso" }, 403);
  if (!rango) return responder({ error: "Rango inválido" }, 400);

  try {
    return responder(await cargarPanel(rango, mercado));
  } catch (e) {
    console.error("[dashboard/datos] cargarPanel falló", e);
    return responder({ error: "No pude traer los números" }, 500);
  }
}
