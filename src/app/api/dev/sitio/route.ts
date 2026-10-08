import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_SITIO } from "@/motor/hosts";

// Solo fuera de producción: en un preview de *.vercel.app no hay host de calcularya, así que la
// cookie sitio=intl activa las mismas reglas que el host (next.config.ts las agrega solo si
// VERCEL_ENV !== "production"). ?sitio=ar la borra. ?geo=PE simula el país para el aviso.
export const dynamic = "force-dynamic";

const RE_PAIS = /^[A-Za-z]{2}$/;

export function GET(req: NextRequest) {
  if (process.env.VERCEL_ENV === "production") return new NextResponse("No encontrado", { status: 404 });
  const sitio = req.nextUrl.searchParams.get("sitio") ?? "intl";
  const geo = req.nextUrl.searchParams.get("geo");
  // Location relativo: req.nextUrl trae el host interno del server, no el que pidió el navegador.
  const res = new NextResponse(null, { status: 307, headers: { location: "/", "cache-control": "private, no-store" } });
  const opciones = { path: "/", sameSite: "lax" as const, httpOnly: true, maxAge: 60 * 60 * 24 * 7 };
  if (sitio === "ar") res.cookies.delete(COOKIE_SITIO.nombre);
  else res.cookies.set(COOKIE_SITIO.nombre, COOKIE_SITIO.valor, opciones);
  if (geo === "") res.cookies.delete("geo_prueba");
  else if (geo && RE_PAIS.test(geo)) res.cookies.set("geo_prueba", geo.toUpperCase(), opciones);
  return res;
}
