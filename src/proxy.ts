import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { OPCIONES_COOKIE_SESION, borrarPista, ponerPista, tieneCookiesDeSesion } from "@/lib/auth/cookies";
import { destinoSeguro } from "@/lib/auth/destino";
import { COOKIE_PISTA } from "@/lib/sesion-cliente";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";

const PROTEGIDAS = ["/cuenta", "/dashboard"];
const PRIVADAS = ["/cuenta", "/dashboard", "/login", "/registro", "/recuperar", "/auth", "/api/cuenta"];
const SOLO_SIN_SESION = ["/login", "/registro"];

const bajo = (path: string, bases: string[]) => bases.some((b) => path === b || path.startsWith(`${b}/`));

async function leerSesion(request: NextRequest, respuesta: { actual: NextResponse }): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  // Sin cookie de sesión no hay nada que refrescar: se evita el viaje a Supabase del visitante anónimo.
  if (!url || !anon || !tieneCookiesDeSesion(request.cookies.getAll().map((c) => c.name))) return false;

  const supabase = createServerClient(url, anon, {
    cookieOptions: OPCIONES_COOKIE_SESION,
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (lista, headers) => {
        for (const { name, value } of lista) request.cookies.set(name, value);
        respuesta.actual = NextResponse.next({ request });
        for (const { name, value, options } of lista) respuesta.actual.cookies.set(name, value, options);
        for (const [k, v] of Object.entries(headers ?? {})) respuesta.actual.headers.set(k, v);
      },
    },
  });
  // getUser y no getClaims: con claves asimétricas getClaims valida el JWT sin preguntarle a
  // Supabase, y un usuario borrado con token vigente armaría un loop /login ⇄ /cuenta (el proxy lo
  // da por logueado y la página, que usa getUser, no). Con la clave legacy HS256 cuestan lo mismo.
  const { data, error } = await supabase.auth.getUser();
  if (error && error.name !== "AuthSessionMissingError") console.error("[proxy] no pude validar la sesión:", error.code ?? error.message);
  return !!data?.user;
}

function redirigir(destino: URL, base: NextResponse): NextResponse {
  const r = NextResponse.redirect(destino);
  for (const c of base.cookies.getAll()) r.cookies.set(c);
  r.headers.set("Cache-Control", "private, no-store");
  return r;
}

// Con las cuentas apagadas, las rutas privadas no existen: 404 con la página de not-found de
// Next, no un redirect que las anuncie.
function noEncontrada(request: NextRequest): NextResponse {
  return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
}

export async function proxy(request: NextRequest) {
  if (!CUENTAS_ACTIVAS) return bajo(request.nextUrl.pathname, PRIVADAS) ? noEncontrada(request) : NextResponse.next();

  if (
    process.env.NODE_ENV === "development" &&
    request.nextUrl.pathname.startsWith("/dashboard") &&
    ["1", "vacio"].includes(request.nextUrl.searchParams.get("demo") ?? "")
  ) {
    return NextResponse.next();
  }
  const respuesta = { actual: NextResponse.next({ request }) };
  const conSesion = await leerSesion(request, respuesta);
  const { pathname, search } = request.nextUrl;

  // Sólo lecturas: redirigir un POST de Server Action lo reenvía a otra ruta con el mismo
  // Next-Action. Cada acción valida la sesión por su cuenta.
  const esLectura = request.method === "GET" || request.method === "HEAD";

  if (esLectura && !conSesion && bajo(pathname, PROTEGIDAS)) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", `${pathname}${search}`);
    const r = redirigir(login, respuesta.actual);
    if (request.cookies.has(COOKIE_PISTA)) borrarPista(r.cookies);
    return r;
  }

  if (esLectura && conSesion && bajo(pathname, SOLO_SIN_SESION)) {
    const destino = destinoSeguro(request.nextUrl.searchParams.get("next"), "/cuenta");
    const r = redirigir(new URL(destino, request.url), respuesta.actual);
    if (!request.cookies.has(COOKIE_PISTA)) ponerPista(r.cookies);
    return r;
  }

  const tienePista = request.cookies.get(COOKIE_PISTA)?.value === "1";
  if (conSesion && !tienePista) ponerPista(respuesta.actual.cookies);
  if (!conSesion && request.cookies.has(COOKIE_PISTA)) borrarPista(respuesta.actual.cookies);
  return respuesta.actual;
}

export const config = {
  matcher: [
    "/cuenta/:path*",
    "/dashboard/:path*",
    "/login",
    "/registro",
    "/recuperar",
    "/auth/:path*",
    "/api/cuenta/:path*",
    // Públicas, pero con sesión posible: sin pasar por acá, un token vencido se refrescaría en
    // cada pedido sin guardarse nunca. Sin cookie sb-* no hay consulta, el anónimo no paga nada.
    "/planillas/gracias",
    "/api/mp/checkout",
  ],
};
