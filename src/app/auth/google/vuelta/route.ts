import { randomBytes } from "node:crypto";
import { NextResponse, after, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { clienteServidor } from "@/lib/supabase/servidor";
import { servicio } from "@/lib/supabase/servicio";
import { registrarEvento } from "@/lib/rastreo-servidor";
import { GOOGLE_ACTIVO } from "@/lib/funciones";
import { esAdminEmail } from "@/lib/auth/admin";
import { ponerPista } from "@/lib/auth/cookies";
import { destinoSeguro } from "@/lib/auth/destino";
import { limitePorIp } from "@/lib/auth/pedido";
import { asegurarPerfil, verificadoPrevio, vincularCompras } from "@/lib/auth/perfil";

export const dynamic = "force-dynamic";

const ir = (req: NextRequest, ruta: string) => {
  const r = NextResponse.redirect(new URL(ruta, req.url), 303);
  r.headers.set("Cache-Control", "private, no-store");
  return r;
};

export async function GET(req: NextRequest) {
  if (!GOOGLE_ACTIVO) return new NextResponse(null, { status: 404 });
  const sp = req.nextUrl.searchParams;
  const code = sp.get("code");
  // Cancelar en la pantalla de Google vuelve con ?error=access_denied: no es una falla, es volver.
  if (!code) return ir(req, sp.get("error") === "access_denied" ? "/login" : "/login?error=google");
  if (!(await limitePorIp("google"))) return ir(req, "/login?error=limite");

  const supabase = await clienteServidor();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user?.email) {
    console.error("[auth] exchangeCodeForSession google:", error?.code ?? error?.status, error?.message);
    return ir(req, "/login?error=google");
  }

  const usuario = data.user;
  const userId = usuario.id;
  const email = usuario.email!.toLowerCase();

  // Google prueba el buzón igual que un enlace al mail, así que corre la misma defensa contra la
  // toma de cuenta previa al registro (ver confirmarEnlace): si alguien había dado de alta este
  // mail con SU clave y nunca se probó el buzón, esa clave se descarta.
  if (!(await verificadoPrevio(userId, email))) {
    const teniaClave = usuario.identities?.some((i) => i.provider === "email") ?? false;
    if (teniaClave) {
      const { error: eClave } = await servicio().auth.admin.updateUserById(userId, {
        password: randomBytes(32).toString("base64url"),
      });
      if (eClave) {
        console.error("[auth] google: no pude descartar la clave previa:", eClave.code ?? eClave.status, eClave.message);
        await supabase.auth.signOut({ scope: "local" });
        return ir(req, "/login?error=google");
      }
    }
    const { error: eOtras } = await supabase.auth.signOut({ scope: "others" });
    if (eOtras) console.error("[auth] google: no pude cerrar las otras sesiones:", eOtras.code ?? eOtras.status, eOtras.message);
  }

  // El botón dice que al continuar se aceptan los términos: queda asentado como en el registro con clave.
  if (!usuario.user_metadata?.terminos_aceptados_at) {
    const { error: eMeta } = await servicio().auth.admin.updateUserById(userId, {
      user_metadata: { terminos_aceptados_at: new Date().toISOString() },
    });
    if (eMeta) console.error("[auth] google: no pude guardar la aceptación de términos:", eMeta.code ?? eMeta.status, eMeta.message);
  }

  // El orden importa: ca_vincular_compras exige el perfil ya verificado.
  const verificado = await asegurarPerfil(userId, email, true);
  if (verificado) await vincularCompras(supabase);
  ponerPista(await cookies());
  const nueva = Date.now() - Date.parse(usuario.created_at) < 2 * 60_000;
  after(() =>
    registrarEvento({ tipo: nueva ? "registro" : "login", path: "/auth/google", userId, props: { via: "google" } }),
  );

  const porDefecto = verificado && esAdminEmail(email) ? "/dashboard" : "/cuenta";
  return ir(req, destinoSeguro(sp.get("next"), porDefecto));
}
