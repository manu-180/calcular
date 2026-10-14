import type { Concepto } from "../conceptos";
import type { Idioma, Trato } from "../tipos";
import { textosEs } from "./es";
import { pt } from "./pt";
import type { Categoria, TextosSitio } from "./tipos";

export type { Categoria, TextosSitio } from "./tipos";

export function textosSitio(idioma: Idioma, trato: Trato): TextosSitio {
  return idioma === "pt" ? pt : textosEs(trato);
}

export const ORDEN_CATEGORIAS: readonly Categoria[] = [
  "sueldo",
  "fin",
  "impuestos",
  "dinero",
  "finanzas",
  "negocio",
  "calculos",
  "fechas",
  "salud",
  "hogar",
  "familia",
  "otras",
];

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
  prestamo: "finanzas",
  "tasa-efectiva": "finanzas",
  hipoteca: "finanzas",
  "interes-compuesto": "finanzas",
  "interes-simple": "finanzas",
  "meta-de-ahorro": "finanzas",
  "ahorro-retiro": "finanzas",
  "tarjeta-de-credito": "finanzas",
  presupuesto: "finanzas",
  "fondo-de-emergencia": "finanzas",
  "alquilar-o-comprar": "finanzas",
  "costo-de-un-auto": "finanzas",
  "rendimiento-inversion": "negocio",
  "margen-de-ganancia": "negocio",
  "punto-de-equilibrio": "negocio",
  "tarifa-freelance": "negocio",
  "conversor-sueldo": "sueldo",
  "aumento-de-sueldo": "sueldo",
  "horas-trabajadas": "sueldo",
  porcentaje: "calculos",
  "variacion-porcentual": "calculos",
  "regla-de-tres": "calculos",
  descuento: "calculos",
  propina: "calculos",
  "dividir-gastos": "calculos",
  promedio: "calculos",
  edad: "fechas",
  "dias-entre-fechas": "fechas",
  "sumar-dias": "fechas",
  imc: "salud",
  calorias: "salud",
  "fecha-de-parto": "salud",
  ovulacion: "salud",
  "ritmo-de-carrera": "salud",
  combustible: "hogar",
  "consumo-electrico": "hogar",
  pintura: "hogar",
  "metros-cuadrados": "hogar",
  ceramicos: "hogar",
  hormigon: "hogar",
  propio: "otras",
};

export function categoriaDe(concepto: string): Categoria {
  return CATEGORIA_DE[concepto as Concepto] ?? "otras";
}
