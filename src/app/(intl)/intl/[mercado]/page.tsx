import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadataDe } from "@/motor/seo";
import type { CodigoMercado } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { InicioGlobal, InicioPais } from "@/motor/ui/Inicio";
import { registro } from "@/paises";

// Home del país: lista calculadoras según la fecha del mercado (ver revalidate en layout.tsx).
export const revalidate = 3600;

type Props = { params: Promise<{ mercado: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mercado } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  if (!ctx) return {};
  const m = ctx.mercado;
  return m.codigo === "global"
    ? metadataDe({ mercado: m, title: "CalcularYa: calculadoras con datos oficiales", description: ctx.textos.global.bajada })
    : metadataDe({ mercado: m, title: `Calculadoras de ${m.nombre} con datos oficiales`, description: ctx.textos.pais.descripcion(m.nombre) });
}

export default async function InicioMercado({ params }: Props) {
  const { mercado } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  if (!ctx) notFound();
  return ctx.mercado.codigo === "global" ? <InicioGlobal ctx={ctx} /> : <InicioPais ctx={ctx} />;
}
