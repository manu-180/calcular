import { NextResponse, type NextRequest } from "next/server";
import { clienteServidor } from "@/lib/supabase/servidor";
import { GOOGLE_ACTIVO } from "@/lib/funciones";
import { destinoSeguro } from "@/lib/auth/destino";
import { limitePorIp, origenDelSitio } from "@/lib/auth/pedido";

export const dynamic = "force-dynamic";

const aLogin = (req: NextRequest, error: string) => {
  const r = NextResponse.redirect(new URL(`/login?error=${error}`, req.url), 303);
  r.headers.set("Cache-Control", "private, no-store");
  return r;
};

// PKCE del lado del servidor: signInWithOAuth deja el code_verifier en una cookie httpOnly vía
// clienteServidor, y /auth/google/vuelta lo usa para canjear el código. En el navegador no corre
// Supabase (decisión 5 del SPEC).
export async function GET(req: NextRequest) {
  if (!GOOGLE_ACTIVO) return new NextResponse(null, { status: 404 });
  if (!(await limitePorIp("google"))) return aLogin(req, "limite");

  const next = destinoSeguro(req.nextUrl.searchParams.get("next"), "");
  const vuelta = new URL("/auth/google/vuelta", await origenDelSitio());
  if (next) vuelta.searchParams.set("next", next);

  try {
    const supabase = await clienteServidor();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: vuelta.toString(), skipBrowserRedirect: true, queryParams: { prompt: "select_account" } },
    });
    if (error || !data.url) {
      console.error("[auth] signInWithOAuth google:", error?.code ?? error?.status, error?.message);
      return aLogin(req, "google");
    }
    const r = NextResponse.redirect(data.url, 303);
    r.headers.set("Cache-Control", "private, no-store");
    return r;
  } catch (e) {
    console.error("[auth] google", e);
    return aLogin(req, "google");
  }
}
