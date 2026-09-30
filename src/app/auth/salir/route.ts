import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { clienteServidor } from "@/lib/supabase/servidor";
import { borrarPista } from "@/lib/auth/cookies";

export const dynamic = "force-dynamic";

// POST y no GET: un <img src="/auth/salir"> en cualquier sitio no te puede cerrar la sesión.
export async function POST(req: NextRequest) {
  const origen = req.headers.get("origin");
  if (origen && origen !== req.nextUrl.origin) {
    return new NextResponse("Origen no permitido", { status: 403 });
  }
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
