import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/admin";
import { BandejaOpiniones } from "@/components/opiniones/BandejaOpiniones";
import { Aviso } from "@/components/cuenta/Campos";
import { cargarOpiniones, leerFiltro, leerMercadoOpiniones, type BandejaDatos } from "./datos";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Opiniones",
  robots: { index: false, follow: false, nocache: true },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function OpinionesAdminPage({ searchParams }: Props) {
  const sp = await searchParams;
  const filtro = leerFiltro(sp.ver);
  const mercado = leerMercadoOpiniones(sp.mercado);

  // Igual que /dashboard: con NODE_ENV como literal, esta rama y el import del ejemplo no
  // existen en el build de producción.
  if (process.env.NODE_ENV === "development" && (sp.demo === "1" || sp.demo === "vacio")) {
    const { bandejaDeEjemplo } = await import("./ejemplo");
    return <BandejaOpiniones inicial={bandejaDeEjemplo(filtro, sp.demo === "vacio", mercado)} filtro={filtro} demo={sp.demo} ahora={Date.now()} />;
  }

  const vuelta = new URLSearchParams();
  if (filtro !== "nuevas") vuelta.set("ver", filtro);
  if (mercado) vuelta.set("mercado", mercado);
  await requireAdmin(`/dashboard/opiniones${vuelta.size ? `?${vuelta}` : ""}`);

  let datos: BandejaDatos;
  try {
    datos = await cargarOpiniones(filtro, mercado);
  } catch (e) {
    console.error("[dashboard/opiniones] no pude cargar", e);
    return (
      <div className="mx-auto w-full max-w-3xl pb-8 sm:pt-4">
        <Aviso tono="error" titulo="No pudimos traer las opiniones">
          Probá recargar en un rato. Si sigue igual, revisá que la migración de ca_opiniones esté aplicada.
        </Aviso>
      </div>
    );
  }
  return <BandejaOpiniones inicial={datos} filtro={filtro} demo={null} ahora={Date.now()} />;
}
