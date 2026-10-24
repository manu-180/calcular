import { armarIcs } from "@/motor/calendario/ics";
import { calendarioPublicado } from "@/motor/calendario/rutas";
import { icsDe, vistaCalendario } from "@/motor/calendario/ui/presentar";
import { intlActivo } from "@/motor/sitio";
import type { CodigoMercado, Idioma } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { registro } from "@/paises";

// El .ics de la edición (suscripción webcal) y el de una sola fecha («Agregar a mi calendario»). Salen
// de la misma vista que la página, así el archivo nunca dice otra cosa. No se indexan.

const CABECERAS = {
  "content-type": "text/calendar; charset=utf-8",
  "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
  "x-robots-tag": "noindex",
};

const noEncontrado = () => new Response("No encontrado", { status: 404, headers: { "x-robots-tag": "noindex" } });

function vista(idioma: Idioma, mercado: string) {
  if (!intlActivo()) return null;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  if (!ctx || ctx.mercado.idioma !== idioma || ctx.mercado.codigo === "global") return null;
  const c = calendarioPublicado(registro, ctx.mercado, ctx.modo);
  return c ? vistaCalendario(ctx, c) : null;
}

export function crearIcsCalendario(idioma: Idioma) {
  return async function GET(_req: Request, { params }: { params: Promise<{ mercado: string }> }) {
    const { mercado } = await params;
    const v = vista(idioma, mercado);
    if (!v) return noEncontrado();
    return new Response(armarIcs(icsDe(v)), {
      headers: { ...CABECERAS, "content-disposition": `inline; filename="calendario-${v.m.codigo}.ics"` },
    });
  };
}

export function crearIcsEvento(idioma: Idioma) {
  return async function GET(_req: Request, { params }: { params: Promise<{ mercado: string; archivo: string }> }) {
    const { mercado, archivo } = await params;
    const id = /^([a-z0-9][a-z0-9.-]*)\.ics$/.exec(archivo)?.[1];
    const v = id ? vista(idioma, mercado) : null;
    const e = v ? [...v.proximos, ...v.pasados].find((x) => x.id === id) : undefined;
    if (!v || !e) return noEncontrado();
    return new Response(armarIcs(icsDe(v, [e], false)), {
      headers: { ...CABECERAS, "content-disposition": `attachment; filename="${e.id}.ics"` },
    });
  };
}
