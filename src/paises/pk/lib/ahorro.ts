import { enMapa, porcentaje } from "@/motor/calculo";

export type Contribuyente = "filer" | "nonfiler";

export function retencion(v: { "pk.nss-wht-filer": number; "pk.nss-wht-nonfiler": number }, quien: Contribuyente): number {
  return quien === "filer" ? v["pk.nss-wht-filer"] : v["pk.nss-wht-nonfiler"];
}

export function tasaNss(mapa: Readonly<Record<string, number>>, clave: string): number {
  return enMapa(mapa, clave);
}

export function neto(bruto: number, tasaRetencion: number): { impuesto: number; neto: number } {
  const impuesto = porcentaje(bruto, tasaRetencion);
  return { impuesto, neto: bruto - impuesto };
}

export const CAMPO_CONTRIBUYENTE = {
  id: "contribuyente",
  tipo: "opcion",
  etiqueta: "Tax status",
  opciones: [
    { valor: "filer", etiqueta: "Filer (on the Active Taxpayers List)" },
    { valor: "nonfiler", etiqueta: "Non-filer" },
  ],
  porDefecto: "filer",
} as const;
