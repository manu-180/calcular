import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { ProveedorSitio } from "@/components/cuenta/SitioCuenta";
import "@/components/cuenta/cuenta-intl.css";

// Las pantallas de cuenta de calcularya: /login, /registro, /recuperar, /auth/* y /cuenta/* del host
// intl llegan acá por los rewrites de src/motor/hosts.ts, siempre como /intl/global/... Un país no
// tiene cuenta propia (la cuenta es una sola para los dos sitios), así que /mx/login no existe.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function LayoutCuentaIntl({ children, params }: { children: React.ReactNode; params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  if (!CUENTAS_ACTIVAS || mercado !== "global") notFound();
  return (
    <div className="ca-cuenta px-4 py-8 sm:px-6 sm:py-12">
      <ProveedorSitio sitio="intl">{children}</ProveedorSitio>
    </div>
  );
}
