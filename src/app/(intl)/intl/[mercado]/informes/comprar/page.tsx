import type { Metadata } from "next";
import { PaginaCompra, type ParamsCompra } from "../../planillas/_compra";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ComprarInformeIntl(props: ParamsCompra) {
  return <PaginaCompra {...props} tipo="informe" />;
}
