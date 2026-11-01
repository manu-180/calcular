import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { clienteServidor } from "@/lib/supabase/servidor";
import { borrarPista } from "@/lib/auth/cookies";

export const dynamic = "force-dynamic";

// /cuenta sale con Referrer-Policy: no-referrer (next.config.ts, rutasPrivadas) y con esa política
// Chrome y Edge mandan `Origin: null` en el POST del formulario: comparar sólo el Origin rechazaba
// el botón "Cerrar sesión" propio. Sec-Fetch-Site lo pone el navegador y una página no lo puede
// falsificar, así que manda él; el Origin queda para navegadores viejos que no lo envían.
function mismoSitio(req: NextRequest): boolean {
  const sitio = req.headers.get("sec-fetch-site");
  if (sitio) return sitio === "same-origin" || sitio === "none";
  const origen = req.headers.get("origin");
  return !origen || origen === req.nextUrl.origin;
}

// POST y no GET: un <img src="/auth/salir"> en cualquier sitio no te puede cerrar la sesión.
export async function POST(req: NextRequest) {
  // Un pedido de otro sitio no cierra nada, pero tampoco deja a nadie frente a un texto pelado.
  if (!mismoSitio(req)) return NextResponse.redirect(new URL("/", req.url), 303);
  try {
    const supabase = await clienteServidor();
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) console.error("[auth] signOut:", error.code ?? error.status, error.message);
  } catch (e) {
    console.error("[auth] signOut", e);
  }
  const store = await cookies();
  borrarPista(store);
  for (const c of store.getAll()) {
    if (c.name.startsWith("sb-") && c.name.includes("-auth-token")) store.delete(c.name);
  }
  return NextResponse.redirect(new URL("/", req.url), 303);
}
