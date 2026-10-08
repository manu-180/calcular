import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_SITIO } from "@/motor/hosts";
import { entornoDePrueba } from "@/motor/sitio";

// Solo en previews y next dev (allowlist, ver entornoDePrueba): en un preview de *.vercel.app no hay
// host de calcularya, así que la cookie sitio=intl activa las mismas reglas que el host.
//
//   GET  /api/dev/sitio                  página con los botones, no cambia nada
//   POST /api/dev/sitio  sitio=intl|ar   pone o borra la cookie sitio=intl
//                        geo=PE          simula el país para el aviso ("" lo borra)
//
// El cambio de estado va por POST: un GET con efectos lo dispara cualquier <img> o prefetch.
export const dynamic = "force-dynamic";

const RE_PAIS = /^[A-Za-z]{2}$/;
const noEncontrado = () => new NextResponse("No encontrado", { status: 404 });

const PAGINA = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Sitio de prueba</title></head><body>
<form method="post"><input type="hidden" name="sitio" value="intl"><button>Ver calcularya</button></form>
<form method="post"><input type="hidden" name="sitio" value="ar"><button>Volver a calcular.ar</button></form>
<form method="post"><input type="hidden" name="sitio" value="intl"><input name="geo" maxlength="2" placeholder="PE"><button>Simular país</button></form>
</body></html>`;

export function GET() {
  if (!entornoDePrueba()) return noEncontrado();
  return new NextResponse(PAGINA, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "private, no-store" } });
}

export async function POST(req: NextRequest) {
  if (!entornoDePrueba()) return noEncontrado();
  const form = await req.formData().catch(() => null);
  const sitio = String(form?.get("sitio") ?? "intl");
  const geo = form?.get("geo");
  // 303 para que el navegador siga con GET. Location relativo: req.nextUrl trae el host interno.
  const res = new NextResponse(null, { status: 303, headers: { location: "/", "cache-control": "private, no-store" } });
  const opciones = { path: "/", sameSite: "lax" as const, httpOnly: true, maxAge: 60 * 60 * 24 * 7 };
  if (sitio === "ar") res.cookies.delete(COOKIE_SITIO.nombre);
  else res.cookies.set(COOKIE_SITIO.nombre, COOKIE_SITIO.valor, opciones);
  if (geo === "") res.cookies.delete("geo_prueba");
  else if (typeof geo === "string" && RE_PAIS.test(geo)) res.cookies.set("geo_prueba", geo.toUpperCase(), opciones);
  return res;
}
