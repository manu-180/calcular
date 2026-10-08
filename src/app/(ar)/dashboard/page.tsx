import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/admin";
import { cargarPanel, leerMercado } from "@/lib/panel/datos";
import { RANGOS, type PanelDatos, type Rango } from "@/lib/panel/tipos";
import Panel from "@/components/panel/Panel";
import PanelError from "@/components/panel/PanelError";
import { EnlaceOpiniones } from "@/components/opiniones/EnlaceOpiniones";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false, nocache: true },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function leerRango(valor: string | string[] | undefined): Rango {
  return typeof valor === "string" && (RANGOS as string[]).includes(valor) ? (valor as Rango) : "7d";
}

export default async function DashboardPage({ searchParams }: Props) {
  const sp = await searchParams;
  const rango = leerRango(sp.r);
  const mercado = leerMercado(sp.mercado);

  // Sin variable intermedia a propósito: Next reemplaza `process.env.NODE_ENV` por un literal en
  // el build, y así esta rama (con el import del fixture) no existe en producción.
  if (process.env.NODE_ENV === "development" && (sp.demo === "1" || sp.demo === "vacio")) {
    const { panelDeEjemplo, panelSinDatos } = await import("@/lib/panel/fixture");
    const datos = sp.demo === "vacio" ? panelSinDatos(rango, { mercado }) : panelDeEjemplo(rango, { mercado });
    return (
      <>
        <EnlaceOpiniones demo={sp.demo} />
        <Panel inicial={datos} demo={sp.demo} />
      </>
    );
  }

  await requireAdmin("/dashboard");

  let datos: PanelDatos;
  try {
    datos = await cargarPanel(rango, mercado);
  } catch (e) {
    console.error("[dashboard] cargarPanel falló", e);
    return <PanelError detalle={e instanceof Error ? e.message : String(e)} />;
  }
  return (
    <>
      <EnlaceOpiniones demo={null} />
      <Panel inicial={datos} demo={null} />
    </>
  );
}
