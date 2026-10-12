import type { Metadata } from "next";
import { PaginaCompra, type ParamsCompra } from "../_compra";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ComprarPlanillaIntl(props: ParamsCompra) {
  return <PaginaCompra {...props} tipo="planilla" />;
}
