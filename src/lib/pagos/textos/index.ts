import type { Idioma, Trato } from "@/motor/tipos";
import type { ClaveFamilia, CopyTarjeta, TextosTarjeta } from "../ofertas-intl";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { frCA } from "./fr-ca";
import { it } from "./it";
import { nl } from "./nl";
import { sv } from "./sv";
import { da } from "./da";
import { pl } from "./pl";
import { pt } from "./pt";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

export { rellenar, segunTrato, type DiccionarioVenta, type TextosFamilia, type Variante } from "./tipos";

// ja, ko y zh entraron al motor sin diccionario de venta (frente aparte): sus mercados no generan
// informes ni ofertas (catalogo-intl, ofertas-servidor) y check_ofertas_intl falla si se registra un
// país real de esos idiomas antes de que exista. Al sumar el diccionario, el idioma pasa a esta lista.
export const IDIOMAS_VENTA = ["es", "pt", "en", "fr", "de", "it", "nl", "pl", "sv", "da"] as const satisfies readonly Idioma[];
export type IdiomaVenta = (typeof IDIOMAS_VENTA)[number];

export const DICCIONARIOS: Readonly<Record<IdiomaVenta, DiccionarioVenta>> = { es, pt, en, fr, de, it, nl, pl, sv, da };

export function tieneVenta(idioma: Idioma): idioma is IdiomaVenta {
  return (IDIOMAS_VENTA as readonly Idioma[]).includes(idioma);
}

export function diccionarioVenta(idioma: Idioma): DiccionarioVenta {
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

export function resolver<T>(valor: T, trato: Trato): Resuelto<T> {
  if (valor === null || typeof valor !== "object") return valor as Resuelto<T>;
  if (Array.isArray(valor)) return valor.map((x) => resolver(x, trato)) as Resuelto<T>;
  if (esVariante(valor)) return (trato === "vos" ? (valor.vos ?? valor.tu) : valor[trato]) as Resuelto<T>;
  const salida: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(valor)) salida[k] = resolver(v, trato);
  return salida as Resuelto<T>;
}

export type FamiliaResuelta = Resuelto<TextosFamilia>;

// Familias que cambian de palabra según el país dentro del mismo idioma (fr-CA: TPS y TVQ, no TVA).
export const FAMILIAS_POR_LOCALE: Readonly<Record<string, Partial<Record<ClaveFamilia, TextosFamilia>>>> = { "fr-CA": frCA };

export function textosFamilia(clave: ClaveFamilia, idioma: Idioma, trato: Trato, locale?: string): FamiliaResuelta {
  const regional = locale ? FAMILIAS_POR_LOCALE[locale]?.[clave] : undefined;
  return resolver(regional ?? diccionarioVenta(idioma).familias[clave], trato);
}

export function textosVenta(idioma: Idioma, trato: Trato): Resuelto<Omit<DiccionarioVenta, "familias">> {
  const { familias: _familias, ...resto } = diccionarioVenta(idioma);
  return resolver(resto, trato);
}

export function textosTarjeta(idioma: Idioma, trato: Trato): TextosTarjeta {
  const d = diccionarioVenta(idioma);
  return { ...resolver(d.tarjeta, trato), ...d.general, aviso: resolver(d.aviso, trato) };
}

export function copyFamilia(clave: ClaveFamilia, idioma: Idioma, trato: Trato, locale?: string): CopyTarjeta {
  const f = textosFamilia(clave, idioma, trato, locale);
  return { nombre: f.nombre, gancho: f.gancho, incluye: f.incluye };
}

export function copyPlanilla(idioma: Idioma, trato: Trato): CopyTarjeta {
  const d = diccionarioVenta(idioma);
  const p = resolver(d.planilla, trato);
  return { nombre: d.tarjeta.cejaPlanilla, gancho: p.gancho, incluye: p.incluye };
}
