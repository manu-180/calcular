import type { Metadata } from "next";
import { ARGENTINA } from "@/components/shell/argentina";
import { notFound } from "next/navigation";
import type { CodigoMercado } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { InicioGlobal, InicioPais } from "@/motor/ui/Inicio";
import { metadatosDe } from "@/motor/ui/metadatos";
import { DestacadoMundo } from "@/motor/mundo/ui/Destacado";
import { registro } from "@/paises";
import { grillaPublicada } from "./_mundo/datos";

// Home del país: lista calculadoras según la fecha del mercado (ver revalidate en layout.tsx).
export const revalidate = 3600;

type Props = { params: Promise<{ mercado: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mercado } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  return ctx ? metadatosDe(ctx, null) : {};
}

export default async function InicioMercado({ params }: Props) {
  const { mercado } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  if (!ctx) notFound();
  // La tarjeta de «Tu sueldo en el mundo» solo aparece si la página existe (la grilla tiene países).
  const destacado = (await grillaPublicada()).paises.length ? <DestacadoMundo mercado={ctx.mercado} /> : null;
  return ctx.mercado.codigo === "global" ? <InicioGlobal ctx={ctx} externos={[ARGENTINA]} destacado={destacado} /> : <InicioPais ctx={ctx} destacado={destacado} />;
}
