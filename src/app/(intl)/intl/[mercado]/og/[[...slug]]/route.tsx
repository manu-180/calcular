import { ImageResponse } from "next/og";
import { formatearFecha } from "@/motor/formato";
import { NOMBRE_SITIO_INTL, intlActivo } from "@/motor/sitio";
import { origenPublicoIntl, rutaIntl } from "@/motor/seo";
import type { CodigoMercado } from "@/motor/tipos";
import { BanderaPlana } from "@/motor/ui/Bandera";
import { contextoSitio, type ContextoSitio } from "@/motor/ui/contexto";
import { PAGINAS_LEGALES } from "@/motor/ui/Legales";
import { actualizacionDe, resolverPagina, type PaginaIntl } from "@/motor/ui/metadatos";
import { registro } from "@/paises";

// Imagen OG de calcularya: /<m>/og (home del país), /<m>/og/<slug> (calculadora, fuentes,
// novedades), /og y /og/<legal> (global) y /og/marca (logo cuadrado del JSON-LD). Llegan por los
// rewrites del host intl; el /og de calcular.ar no se toca. Solo se dibuja lo que existe en el
// registro (nada de texto por query): una URL inventada da 404 y no una imagen con lo que alguien
// escribió. No se prerenderiza: la piden los crawlers de previews y la guarda el CDN.

const TINTA = "#1E2A44";
const CREMA = "#F6F1E6";
const MAIZ = "#E8A33D";
const SUAVE = "#5B606B";

type Props = { params: Promise<{ mercado: string; slug?: string[] }> };

function Marca({ tam }: { tam: number }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 32 32">
      <rect width="32" height="32" rx="9" fill={TINTA} />
      <path d="M9 12.5h14" stroke={CREMA} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M9 19.5h8.5" stroke={MAIZ} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="22.5" cy="19.5" r="1.6" fill={MAIZ} />
    </svg>
  );
}

const fondo = {
  backgroundColor: CREMA,
  backgroundImage: `radial-gradient(circle at 92% 8%, rgba(232,163,61,0.32) 0%, rgba(232,163,61,0) 42%), radial-gradient(circle at 0% 100%, rgba(30,42,68,0.10) 0%, rgba(30,42,68,0) 50%)`,
};

function tamTitulo(texto: string): number {
  if (texto.length <= 34) return 76;
  if (texto.length <= 60) return 64;
  return 54;
}

function Tarjeta({ ctx, titulo, pie, ruta }: { ctx: ContextoSitio; titulo: string; pie: string; ruta: string }) {
  const m = ctx.mercado;
  const global = m.codigo === "global";
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 72px", color: TINTA, ...fondo }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Marca tam={56} />
          <div style={{ display: "flex", fontSize: 36, letterSpacing: -0.5 }}>{NOMBRE_SITIO_INTL}</div>
        </div>
        {global ? (
          <div style={{ display: "flex", gap: 10 }}>
            {ctx.paises.slice(0, 8).map((p) => (
              <div key={p.codigo} style={{ display: "flex", borderRadius: 6, overflow: "hidden", boxShadow: "0 2px 6px rgba(0,0,0,0.16)" }}>
                <BanderaPlana pais={p.pais} ancho={45} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 22px", borderRadius: 999, backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(30,42,68,0.12)" }}>
            <div style={{ display: "flex", borderRadius: 5, overflow: "hidden" }}>
              <BanderaPlana pais={m.pais} ancho={48} />
            </div>
            <div style={{ display: "flex", fontSize: 30 }}>{m.nombre}</div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", width: 72, height: 6, borderRadius: 3, backgroundColor: MAIZ }} />
        <div style={{ display: "flex", fontSize: tamTitulo(titulo), lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1000 }}>{titulo}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, color: SUAVE }}>
        <div style={{ display: "flex", maxWidth: 560, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{ruta}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", borderRadius: 999, backgroundColor: TINTA, color: CREMA }}>
          <div style={{ display: "flex", width: 10, height: 10, borderRadius: 5, backgroundColor: MAIZ }} />
          <div style={{ display: "flex" }}>{pie}</div>
        </div>
      </div>
    </div>
  );
}

function tituloDe(ctx: ContextoSitio, r: PaginaIntl | null): string {
  const t = ctx.textos;
  const m = ctx.mercado;
  if (!r) return m.codigo === "global" ? t.global.titulo : t.pais.titulo(m.nombre);
  switch (r.tipo) {
    case "calculadora":
      return r.pagina.contenido.h1;
    case "fuentes":
      return t.fuentes.titulo(m.nombre);
    case "novedades":
      return t.novedades.titulo(m.nombre);
    case "legal":
      return PAGINAS_LEGALES[r.slug].h1;
  }
}

const CABECERAS = { "cache-control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800" };

export async function GET(_req: Request, { params }: Props) {
  const { mercado, slug = [] } = await params;
  const ctx = intlActivo() ? contextoSitio(registro, mercado as CodigoMercado) : null;
  if (!ctx || slug.length > 1) return new Response("No encontrado", { status: 404 });

  if (slug[0] === "marca") {
    if (ctx.mercado.codigo !== "global") return new Response("No encontrado", { status: 404 });
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", ...fondo }}>
          <Marca tam={380} />
        </div>
      ),
      { width: 512, height: 512, headers: CABECERAS },
    );
  }

  const r = slug[0] ? resolverPagina(ctx, slug[0]) : null;
  if (slug[0] && !r) return new Response("No encontrado", { status: 404 });

  const t = ctx.textos;
  const fecha = actualizacionDe(ctx, r);
  const pie =
    ctx.mercado.codigo === "global" ? `${t.og.gratis} · ${t.og.paises(ctx.paises.length)}` : fecha ? t.og.actualizado(formatearFecha(fecha, ctx.mercado.locale)) : t.og.datosOficiales;
  const host = new URL(origenPublicoIntl()).host;
  const ruta = `${host}${rutaIntl(ctx.mercado.codigo, slug[0])}`.replace(/\/$/, "");

  return new ImageResponse(<Tarjeta ctx={ctx} titulo={tituloDe(ctx, r)} pie={pie} ruta={ruta} />, { width: 1200, height: 630, headers: CABECERAS });
}
