import { textoRobots } from "@/motor/mapa";
import { intlActivo } from "@/motor/sitio";

// Bajo [mercado] y sin force-static por lo mismo que sitemaps.xml: con el sitio apagado no se
// prerenderiza nada de /intl.
export async function GET(_req: Request, { params }: { params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  if (mercado !== "global" || !intlActivo()) return new Response("No encontrado", { status: 404 });
  return new Response(textoRobots(), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=3600" } });
}
