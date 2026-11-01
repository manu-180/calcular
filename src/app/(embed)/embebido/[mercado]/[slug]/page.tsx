import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculadoraIntl } from "@/app/(intl)/intl/[mercado]/[slug]/calculadora-intl";
import { VistaEmbed } from "@/motor/embed/VistaEmbed";
import { intlActivo } from "@/motor/sitio";
import type { CodigoMercado, PropsCalculadora } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { resolverPagina } from "@/motor/ui/metadatos";
import { registro } from "@/paises";

export const revalidate = 86400;

type Props = { params: Promise<{ mercado: string; slug: string }> };

// Ninguna se genera en el build: el embed es un derivado de la página de cada calculadora y se pinta
// al primer pedido (queda en caché con el revalidate de arriba). El ?tema y el ?acento no pasan por
// acá: los aplica SCRIPT_OPCIONES en el navegador, así la página sigue siendo una sola para todos.
export function generateStaticParams() {
  return [];
}

function resolver(mercado: string, slug: string) {
  if (!intlActivo()) return null;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  const r = ctx && ctx.mercado.codigo !== "global" ? resolverPagina(ctx, slug) : null;
  return ctx && r?.tipo === "calculadora" ? { ctx, pagina: r.pagina } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mercado, slug } = await params;
  const r = resolver(mercado, slug);
  return r ? { title: `${r.pagina.contenido.h1} | CalcularYa`, robots: { index: false, follow: true } } : {};
}

export default async function EmbedCalculadora({ params }: Props) {
  const { mercado, slug } = await params;
  const r = resolver(mercado, slug);
  if (!r) notFound();
  const { ctx, pagina } = r;
  // Igual que src/app/(intl)/intl/[mercado]/[slug]/page.tsx: la parte visible viaja como props y
  // calcular() la baja el navegador aparte.
  const entrada = registro.calculadora(ctx.mercado.codigo, slug)!;
  const { id, campos, resultado, tablas } = entrada.definicion;
  const definicion = { id, campos, resultado, ...(tablas ? { tablas } : {}) };
  const universal = pagina.universal;
  const traduccion = entrada.traduccion;
  const Cliente = (props: PropsCalculadora) => (
    <CalculadoraIntl
      mercado={ctx.mercado.codigo}
      slug={slug}
      definicion={definicion}
      {...(universal ? { universal } : {})}
      {...(traduccion ? { traduccion } : {})}
      {...props}
    />
  );
  return <VistaEmbed ctx={ctx} pagina={pagina} Cliente={Cliente} />;
}
