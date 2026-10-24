import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calendarioPublicado, hreflangCalendario, SLUG_CALENDARIO, urlCalendario } from "@/motor/calendario/rutas";
import { PaginaCalendario } from "@/motor/calendario/ui/PaginaCalendario";
import { descripcionSeo, vistaCalendario } from "@/motor/calendario/ui/presentar";
import { elegirTitulo, metadataDe } from "@/motor/seo";
import type { CodigoMercado, Idioma } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { registro } from "@/paises";

// Calendario laboral y fiscal, compartido por las carpetas de cada slug de SLUG_CALENDARIO (una por
// idioma). Cada carpeta responde solo en las ediciones de su idioma; en otra, o sin fechas por
// delante, da el 404 intl.

type Props = { params: Promise<{ mercado: string }> };

function resolver(idioma: Idioma, mercado: string) {
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  if (!ctx || ctx.mercado.idioma !== idioma || ctx.mercado.codigo === "global") return null;
  const c = calendarioPublicado(registro, ctx.mercado, ctx.modo);
  const v = c ? vistaCalendario(ctx, c) : null;
  return v ? { ctx, v } : null;
}

export function crearPaginaCalendario(idioma: Idioma) {
  const slug = SLUG_CALENDARIO[idioma];

  // Nada en el build: cada edición se pinta al primer pedido y queda en caché con el revalidate de la
  // carpeta, como «Tu sueldo en el mundo».
  function generateStaticParams() {
    return [];
  }

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { mercado } = await params;
    const r = resolver(idioma, mercado);
    if (!r) return {};
    const { v, ctx } = r;
    const idiomas = hreflangCalendario(registro, ctx.mercado.codigo, ctx.modo);
    return metadataDe({
      mercado: ctx.mercado,
      slug,
      title: elegirTitulo(v.t.seo.titulo(ctx.mercado.nombre, v.anios)),
      description: descripcionSeo(v),
      ...(idiomas ? { idiomas } : {}),
      imagen: `${urlCalendario(ctx.mercado)}/og`,
    });
  }

  async function Pagina({ params }: Props) {
    const { mercado } = await params;
    const r = resolver(idioma, mercado);
    if (!r) notFound();
    return <PaginaCalendario ctx={r.ctx} v={r.v} />;
  }

  return { generateStaticParams, generateMetadata, Pagina };
}
