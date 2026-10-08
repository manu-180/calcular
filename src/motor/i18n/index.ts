import type { Concepto } from "../conceptos";
import type { Idioma, Trato } from "../tipos";
import { textosEs } from "./es";
import { pt } from "./pt";
import type { Categoria, TextosSitio } from "./tipos";

export type { Categoria, TextosSitio } from "./tipos";

export function textosSitio(idioma: Idioma, trato: Trato): TextosSitio {
  return idioma === "pt" ? pt : textosEs(trato);
}

export const ORDEN_CATEGORIAS: readonly Categoria[] = ["sueldo", "fin", "impuestos", "dinero", "familia", "otras"];

const CATEGORIA_DE: Record<Concepto, Categoria> = {
  "sueldo-neto": "sueldo",
  "bono-semestral": "sueldo",
  "decimo-cuarto": "sueldo",
  vacaciones: "sueldo",
  "horas-extra": "sueldo",
  "salario-minimo": "sueldo",
  "reparto-utilidades": "sueldo",
  "liquidacion-final": "fin",
  "indemnizacion-despido": "fin",
  "fondo-cesantia": "fin",
  preaviso: "fin",
  "aportes-seguridad-social": "impuestos",
  "costo-empleador": "impuestos",
  "impuesto-renta": "impuestos",
  "retencion-honorarios": "impuestos",
  "regimen-simplificado": "impuestos",
  iva: "impuestos",
  "conversor-unidad": "dinero",
  "tipo-de-cambio": "dinero",
  inflacion: "dinero",
  "plazo-fijo": "dinero",
  "trabajo-domestico": "familia",
  "pension-alimentos": "familia",
  jubilacion: "familia",
  propio: "otras",
};

export function categoriaDe(concepto: string): Categoria {
  return CATEGORIA_DE[concepto as Concepto] ?? "otras";
}
