import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/admin";
import { cargarPanel } from "@/lib/panel/datos";
import { hoyAR, leerRango } from "@/lib/panel/fechas";
import type { PanelDatos } from "@/lib/panel/tipos";
import { MERCADO_AR, MERCADOS_INTL, nombreDeMercado } from "@/lib/medicion/mercados";
import { nombrePais } from "@/lib/panel/formato";
import PanelError from "@/components/panel/PanelError";
import { PaginaPaises } from "@/components/panel/PaginaPaises";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Países",
  robots: { index: false, follow: false, nocache: true },
};

function nombresDe(datos: PanelDatos): Record<string, string> {
  const nombres: Record<string, string> = { [MERCADO_AR.codigo]: MERCADO_AR.nombre };
  for (const m of MERCADOS_INTL) nombres[m.codigo] = m.nombre;
  for (const m of datos.mercados ?? []) nombres[m.mercado] ??= nombreDeMercado(m.mercado, m.mercado.slice(0, 2).toUpperCase(), m.mercado.split("-")[1]);
  for (const r of [...datos.paises, ...(datos.paisesCompra ?? [])]) nombres[`iso:${r.clave}`] = nombrePais(r.clave);
  return nombres;
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function PaisesPage({ searchParams }: Props) {
  const sp = await searchParams;
  const rango = leerRango(sp.r, hoyAR()) ?? "hoy";

  // Igual que /dashboard: con NODE_ENV como literal, esta rama y el fixture no existen en producción.
  if (process.env.NODE_ENV === "development" && (sp.demo === "1" || sp.demo === "vacio")) {
    const { panelDeEjemplo, panelSinDatos } = await import("@/lib/panel/fixture");
    const datos = sp.demo === "vacio" ? panelSinDatos(rango, { mercado: null }) : panelDeEjemplo(rango, { mercado: null });
    return <PaginaPaises inicial={datos} demo={sp.demo} nombres={nombresDe(datos)} />;
  }

  await requireAdmin(`/dashboard/paises${sp.r ? `?r=${encodeURIComponent(String(sp.r))}` : ""}`);

  let datos: PanelDatos;
  try {
    datos = await cargarPanel(rango, null);
  } catch (e) {
    console.error("[dashboard/paises] cargarPanel falló", e);
    return <PanelError detalle={e instanceof Error ? e.message : String(e)} />;
  }
  return <PaginaPaises inicial={datos} demo={null} nombres={nombresDe(datos)} />;
}
