import type { Metadata } from "next";
import { metadataMundoAR, PaginaMundoAR } from "./mundo-ar";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return metadataMundoAR();
}

export default function Page() {
  return <PaginaMundoAR />;
}
