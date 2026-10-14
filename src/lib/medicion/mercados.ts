// Liviana a propósito: la usan el cliente, /api/e y el panel, y no puede importar src/paises (pesa todo
// el registro). La lista sale de mercados-registro.ts, que genera scripts/check_medicion_mercados.ts
// --escribir desde el registro en modo producción; el check falla si quedó vieja.
import { MERCADOS_REGISTRO } from "./mercados-registro";

export type Sitio = "ar" | "intl";

export type MercadoMedido = {
  codigo: string;
  sitio: Sitio;
  nombre: string;
  pais: string | null;
};

export const MERCADO_AR: MercadoMedido = { codigo: "ar", sitio: "ar", nombre: "Argentina", pais: "AR" };

export const MERCADO_GLOBAL = "global";

// Un país (mx) o una edición de un país en otro idioma (ca-fr). Es la misma regla que el CHECK de la base.
export const FORMA_MERCADO = /^([a-z]{2}(-[a-z]{2,3})?|global)$/;

let regiones: Intl.DisplayNames | null | undefined;
let idiomas: Intl.DisplayNames | null | undefined;

function nombreDe(tipo: "region" | "language", codigo: string): string | null {
  try {
    if (tipo === "region") {
      regiones ??= new Intl.DisplayNames(["es-AR", "es"], { type: "region" });
      return regiones.of(codigo) ?? null;
    }
    idiomas ??= new Intl.DisplayNames(["es-AR", "es"], { type: "language" });
    return idiomas.of(codigo) ?? null;
  } catch {
    return null;
  }
}

export function nombreDeMercado(codigo: string, pais: string | null, idioma?: string): string {
  if (codigo === MERCADO_GLOBAL) return "Inicio de CalcularYa";
  const base = (pais && nombreDe("region", pais)) || codigo.toUpperCase();
  const edicion = codigo.includes("-") ? (idioma && nombreDe("language", idioma)) || codigo.split("-")[1] : null;
  return edicion ? `${base} (${edicion})` : base;
}

export const MERCADOS_INTL: readonly MercadoMedido[] = MERCADOS_REGISTRO.map(([codigo, pais, idioma]) => ({
  codigo,
  sitio: "intl" as const,
  nombre: nombreDeMercado(codigo, pais, idioma),
  pais,
}));

const POR_CODIGO = new Map<string, MercadoMedido>([MERCADO_AR, ...MERCADOS_INTL].map((m) => [m.codigo, m]));

export function mercadoMedido(codigo: string | null | undefined): MercadoMedido | undefined {
  return codigo ? POR_CODIGO.get(codigo) : undefined;
}

export function esMercadoIntl(codigo: unknown): codigo is string {
  return typeof codigo === "string" && FORMA_MERCADO.test(codigo) && POR_CODIGO.get(codigo)?.sitio === "intl";
}

export function esMercadoMedido(codigo: unknown): codigo is string {
  return typeof codigo === "string" && FORMA_MERCADO.test(codigo) && POR_CODIGO.has(codigo);
}

// En calcularya el primer segmento de la URL es el país; lo que no es de un país (la home, las
// páginas globales) va a "global".
export function mercadoDeRuta(path: string): string {
  const seg = path.split("/")[1] ?? "";
  return seg !== MERCADO_GLOBAL && esMercadoIntl(seg) ? seg : MERCADO_GLOBAL;
}
