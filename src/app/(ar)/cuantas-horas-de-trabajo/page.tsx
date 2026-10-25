import type { Metadata } from "next";
import { metadataHorasAR, PaginaHorasAR } from "./horas-ar";

// Los precios vencen solos: cada hora se rearma y un precio viejo sale sin deploy.
export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return metadataHorasAR();
}

export default function Page() {
  return <PaginaHorasAR />;
}
