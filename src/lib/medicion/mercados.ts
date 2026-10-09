// Lista liviana de los mercados que se miden, para el cliente, /api/e y el panel. No importa
// src/paises (pesa todo el registro). scripts/check_medicion_mercados.ts la compara con el registro
// en modo producción: un país publicado que falte acá no se mediría.

export type Sitio = "ar" | "intl";

export type MercadoMedido = {
  codigo: string;
  sitio: Sitio;
  nombre: string;
  pais: string | null;
};

export const MERCADO_AR: MercadoMedido = { codigo: "ar", sitio: "ar", nombre: "Argentina", pais: "AR" };

export const MERCADO_GLOBAL = "global";

export const MERCADOS_INTL: readonly MercadoMedido[] = [
  { codigo: "bo", sitio: "intl", nombre: "Bolivia", pais: "BO" },
  { codigo: "cl", sitio: "intl", nombre: "Chile", pais: "CL" },
  { codigo: "co", sitio: "intl", nombre: "Colombia", pais: "CO" },
  { codigo: "cr", sitio: "intl", nombre: "Costa Rica", pais: "CR" },
  { codigo: "ec", sitio: "intl", nombre: "Ecuador", pais: "EC" },
  { codigo: "sv", sitio: "intl", nombre: "El Salvador", pais: "SV" },
  { codigo: "gt", sitio: "intl", nombre: "Guatemala", pais: "GT" },
  { codigo: "hn", sitio: "intl", nombre: "Honduras", pais: "HN" },
  { codigo: "mx", sitio: "intl", nombre: "México", pais: "MX" },
  { codigo: "ni", sitio: "intl", nombre: "Nicaragua", pais: "NI" },
  { codigo: "pa", sitio: "intl", nombre: "Panamá", pais: "PA" },
  { codigo: "py", sitio: "intl", nombre: "Paraguay", pais: "PY" },
  { codigo: "pe", sitio: "intl", nombre: "Perú", pais: "PE" },
  { codigo: "do", sitio: "intl", nombre: "República Dominicana", pais: "DO" },
  { codigo: "uy", sitio: "intl", nombre: "Uruguay", pais: "UY" },
  { codigo: "ve", sitio: "intl", nombre: "Venezuela", pais: "VE" },
  { codigo: MERCADO_GLOBAL, sitio: "intl", nombre: "Inicio de CalcularYa", pais: null },
];

const POR_CODIGO = new Map<string, MercadoMedido>([MERCADO_AR, ...MERCADOS_INTL].map((m) => [m.codigo, m]));

export function mercadoMedido(codigo: string | null | undefined): MercadoMedido | undefined {
  return codigo ? POR_CODIGO.get(codigo) : undefined;
}

export function esMercadoIntl(codigo: unknown): codigo is string {
  return typeof codigo === "string" && POR_CODIGO.get(codigo)?.sitio === "intl";
}

export function esMercadoMedido(codigo: unknown): codigo is string {
  return typeof codigo === "string" && POR_CODIGO.has(codigo);
}

// En calcularya el primer segmento de la URL es el país; lo que no es de un país (la home, las
// páginas globales) va a "global".
export function mercadoDeRuta(path: string): string {
  const seg = path.split("/")[1] ?? "";
  return seg !== MERCADO_GLOBAL && esMercadoIntl(seg) ? seg : MERCADO_GLOBAL;
}
