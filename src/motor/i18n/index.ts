import type { Concepto } from "../conceptos";
import type { Idioma, Trato } from "../tipos";
import { ar } from "./ar";
import { bg } from "./bg";
import { bn } from "./bn";
import { cs } from "./cs";
import { lt } from "./lt";
import { de } from "./de";
import { el } from "./el";
import { en } from "./en";
import { es } from "./es";
import { hu } from "./hu";
import { fr } from "./fr";
import { id } from "./id";
import { he } from "./he";
import { it } from "./it";
import { ja } from "./ja";
import { ko } from "./ko";
import { nl } from "./nl";
import { sv } from "./sv";
import { da } from "./da";
import { fi } from "./fi";
import { nb } from "./nb";
import { pl } from "./pl";
import { pt } from "./pt";
import { tr } from "./tr";
import { th } from "./th";
import { uk } from "./uk";
import { uz } from "./uz";
import { ru } from "./ru";
import { ro } from "./ro";
import { sr } from "./sr";
import { zh } from "./zh";
import { resolver, type Diccionarios } from "./resolver";
import type { Categoria, TextosSitio } from "./tipos";

export type { Categoria, TextosSitio } from "./tipos";

// Un idioma nuevo entra con su archivo (base en el registro informal y, si cambia, parches de usted
// y vos) y su línea acá; el Record obliga a que estén todos.
export const DICCIONARIOS_SITIO: Diccionarios<TextosSitio> = { es, pt, en, fr, de, it, nl, ja, ko, zh, pl, sv, da, nb, fi, ar, id, tr, bn, th, uk, uz, ru, ro, cs, el, hu, he, sr, bg, lt };

export function textosSitio(idioma: Idioma, trato: Trato, locale?: string): TextosSitio {
  return resolver(DICCIONARIOS_SITIO, idioma, trato, locale);
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
