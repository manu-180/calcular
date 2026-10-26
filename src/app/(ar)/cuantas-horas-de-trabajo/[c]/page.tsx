import type { Metadata } from "next";
import { metadataHorasAR, PaginaHorasAR } from "../horas-ar";

type Props = { params: Promise<{ c: string }> };

export const revalidate = 3600;

// Ningún link compartido en el build: cada uno se pinta al primer pedido y queda en caché.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { c } = await params;
  return metadataHorasAR(c);
}

export default async function Page({ params }: Props) {
  const { c } = await params;
  return <PaginaHorasAR c={c} />;
}
