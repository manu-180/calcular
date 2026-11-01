import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { urlIntl } from "@/motor/seo";
import { intlActivo, modoPublicacion } from "@/motor/sitio";
import type { CodigoMercado } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { metadatosDe } from "@/motor/ui/metadatos";
import { textosInicio } from "@/motor/ui/textos-inicio";
import { registro } from "@/paises";
import { NovedadesVivas } from "./vista";

// Ruta propia (gana sobre [slug]): la página junta las notas del país con el registro automático de
// sus datos y series. La fecha del mercado decide qué rige, así que se regenera cada hora como el resto.
export const revalidate = 86400;

type Props = { params: Promise<{ mercado: string }> };

export function generateStaticParams() {
  if (!intlActivo()) return [];
  return registro
    .mercados(modoPublicacion())
    .filter((m) => m.codigo !== "global")
    .map((m) => ({ mercado: m.codigo }));
}

function contexto(mercado: string) {
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  return ctx && ctx.mercado.codigo !== "global" ? ctx : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mercado } = await params;
  const ctx = contexto(mercado);
  if (!ctx) return {};
  const md = metadatosDe(ctx, { tipo: "novedades" });
  const feed = textosInicio(ctx.mercado.idioma, ctx.mercado.trato, ctx.mercado.locale).novedades.feedTitulo(ctx.mercado.nombre);
  return { ...md, alternates: { ...md.alternates, types: { "application/atom+xml": [{ url: urlIntl(ctx.mercado.codigo, "novedades.xml"), title: feed }] } } };
}

export default async function PaginaNovedades({ params }: Props) {
  const { mercado } = await params;
  const ctx = contexto(mercado);
  if (!ctx) notFound();
  return <NovedadesVivas ctx={ctx} />;
}
