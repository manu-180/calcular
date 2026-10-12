import { redirect } from "next/navigation";
import { rutaIntl } from "@/motor/seo";
import type { CodigoMercado } from "@/motor/tipos";

// Planillas e informes viven en un solo catálogo por país.
export default async function InformesIntl({ params }: { params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  redirect(rutaIntl(mercado as CodigoMercado, "planillas"));
}
