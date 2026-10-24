import type { Idioma, Trato } from "@/motor/tipos";
import type { ClaveFamilia, CopyTarjeta, TextosTarjeta } from "../ofertas-intl";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { frCA } from "./fr-ca";
import { it } from "./it";
import { ja } from "./ja";
import { ko } from "./ko";
import { nl } from "./nl";
import { pt } from "./pt";
import { tr } from "./tr";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";
import { zh } from "./zh";
import { zhHans } from "./zh-hans";

export { rellenar, segunTrato, type DiccionarioVenta, type TextosFamilia, type Variante } from "./tipos";

// Todo idioma de IDIOMAS que tenga mercados reales necesita su diccionario de venta: sin él, sus
// mercados no generan informes ni ofertas (catalogo-intl, ofertas-servidor) y check_ofertas_intl
// falla al registrar un país. Un idioma nuevo del motor entra acá cuando tiene el suyo.
export const IDIOMAS_VENTA = ["es", "pt", "en", "fr", "de", "it", "nl", "ja", "ko", "zh", "tr"] as const satisfies readonly Idioma[];
export type IdiomaVenta = (typeof IDIOMAS_VENTA)[number];

export const DICCIONARIOS: Readonly<Record<IdiomaVenta, DiccionarioVenta>> = { es, pt, en, fr, de, it, nl, ja, ko, zh, tr };

// La escritura del chino cambia el diccionario entero, no solo palabras: zh.ts es tradicional
// (zh-TW, zh-HK) y zh-hans.ts simplificado. Por eso las funciones de abajo reciben el locale.
const REGIONALES: Readonly<Record<string, DiccionarioVenta>> = { "zh-CN": zhHans, "zh-SG": zhHans };

export function tieneVenta(idioma: Idioma): idioma is IdiomaVenta {
  return (IDIOMAS_VENTA as readonly Idioma[]).includes(idioma);
}

export function diccionarioVenta(idioma: Idioma, locale?: string): DiccionarioVenta {
  const regional = locale ? REGIONALES[locale] : undefined;
  if (regional && idioma === "zh") return regional;
  return tieneVenta(idioma) ? DICCIONARIOS[idioma] : DICCIONARIOS.en;
}

// Variante → string, en todo el árbol.
export type Resuelto<T> = T extends string
  ? string
  : T extends { readonly tu: string; readonly usted: string }
    ? string
    : T extends readonly (infer U)[]
      ? Resuelto<U>[]
      : T extends object
        ? { [K in keyof T]: Resuelto<T[K]> }
        : T;

const esVariante = (v: object): v is { tu: string; usted: string; vos?: string } =>
  typeof (v as { tu?: unknown }).tu === "string" && typeof (v as { usted?: unknown }).usted === "string";

export function resolverTrato<T>(valor: T, trato: Trato): Resuelto<T> {
  if (valor === null || typeof valor !== "object") return valor as Resuelto<T>;
  if (Array.isArray(valor)) return valor.map((x) => resolverTrato(x, trato)) as Resuelto<T>;
  if (esVariante(valor)) return (trato === "vos" ? (valor.vos ?? valor.tu) : valor[trato]) as Resuelto<T>;
  const salida: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(valor)) salida[k] = resolverTrato(v, trato);
  return salida as Resuelto<T>;
}

export type FamiliaResuelta = Resuelto<TextosFamilia>;

// Familias que cambian de palabra según el país dentro del mismo idioma (fr-CA: TPS y TVQ, no TVA).
export const FAMILIAS_POR_LOCALE: Readonly<Record<string, Partial<Record<ClaveFamilia, TextosFamilia>>>> = { "fr-CA": frCA };

export function textosFamilia(clave: ClaveFamilia, idioma: Idioma, trato: Trato, locale?: string): FamiliaResuelta {
  const regional = locale ? FAMILIAS_POR_LOCALE[locale]?.[clave] : undefined;
  return resolverTrato(regional ?? diccionarioVenta(idioma, locale).familias[clave], trato);
}

export function textosVenta(idioma: Idioma, trato: Trato, locale?: string): Resuelto<Omit<DiccionarioVenta, "familias">> {
  const { familias: _familias, ...resto } = diccionarioVenta(idioma, locale);
  return resolverTrato(resto, trato);
}

export function textosTarjeta(idioma: Idioma, trato: Trato, locale?: string): TextosTarjeta {
  const d = diccionarioVenta(idioma, locale);
  return { ...resolverTrato(d.tarjeta, trato), ...d.general, aviso: resolverTrato(d.aviso, trato) };
}

export function copyFamilia(clave: ClaveFamilia, idioma: Idioma, trato: Trato, locale?: string): CopyTarjeta {
  const f = textosFamilia(clave, idioma, trato, locale);
  return { nombre: f.nombre, gancho: f.gancho, incluye: f.incluye };
}

export function copyPlanilla(idioma: Idioma, trato: Trato, locale?: string): CopyTarjeta {
  const d = diccionarioVenta(idioma, locale);
  const p = resolverTrato(d.planilla, trato);
  return { nombre: d.tarjeta.cejaPlanilla, gancho: p.gancho, incluye: p.incluye };
}
