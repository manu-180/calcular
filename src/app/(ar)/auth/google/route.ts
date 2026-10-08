import { createHash, randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { GOOGLE_ACTIVO } from "@/lib/funciones";
import { destinoSeguro } from "@/lib/auth/destino";
import { COOKIE_GOOGLE, OPCIONES_GOOGLE } from "@/lib/auth/cookies";
import { limitePorIp, origenDelSitio } from "@/lib/auth/pedido";

export const dynamic = "force-dynamic";

const aLogin = (req: NextRequest, error: string) => {
  const r = NextResponse.redirect(new URL(`/login?error=${error}`, req.url), 303);
  r.headers.set("Cache-Control", "private, no-store");
  return r;
};

// El ida y vuelta con Google lo hacemos nosotros y no Supabase: si la vuelta fuera a
// <ref>.supabase.co, la pantalla de Google diría «Ir a wsmsspeeeujynqornyrj.supabase.co».
// Con la vuelta en calcular.ar, Google muestra nuestro dominio; la sesión sale después de
// signInWithIdToken en /auth/google/vuelta.
export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  if (!GOOGLE_ACTIVO || !clientId) return new NextResponse(null, { status: 404 });
  if (!(await limitePorIp("google"))) return aLogin(req, "limite");

  const state = randomBytes(24).toString("base64url");
  const nonce = randomBytes(24).toString("base64url");
  const next = destinoSeguro(req.nextUrl.searchParams.get("next"), "");

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", `${await origenDelSitio()}/auth/google/vuelta`);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  // Google firma el hash; a Supabase se le pasa el nonce crudo y lo hashea él para comparar.
  url.searchParams.set("nonce", createHash("sha256").update(nonce).digest("hex"));
  url.searchParams.set("prompt", "select_account");

  const r = NextResponse.redirect(url, 303);
  r.headers.set("Cache-Control", "private, no-store");
  r.cookies.set(COOKIE_GOOGLE, JSON.stringify({ state, nonce, next }), OPCIONES_GOOGLE);
  return r;
}
