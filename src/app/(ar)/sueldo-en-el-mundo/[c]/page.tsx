import type { Metadata } from "next";
import { metadataMundoAR, PaginaMundoAR } from "../mundo-ar";

type Props = { params: Promise<{ c: string }> };

export const revalidate = 3600;

// Ningún duelo en el build: cada uno se pinta al primer pedido y queda en caché.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { c } = await params;
  return metadataMundoAR(c);
}

export default async function Page({ params }: Props) {
  const { c } = await params;
  return <PaginaMundoAR c={c} />;
}
