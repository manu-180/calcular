import { escrituraZh } from "../../i18n/escritura";
import type { ContenidoUniversal, TextosUi } from "../tipos";

// Un solo textos/zh.ts y contenido/zh.ts por universal, con las dos escrituras escritas a mano:
// tradicional (zh-TW, zh-HK) y simplificada (zh-CN, zh-SG). Nada se convierte solo.
export const esSimplificado = (locale: string): boolean => escrituraZh(locale) === "hans";
export const esHongKong = (locale: string): boolean => locale === "zh-HK" || locale === "zh-MO";

export function textosPorEscritura<U>(slug: string, hant: (locale: string) => U, hans: (locale: string) => U): TextosUi<U> {
  return { slug, ui: (_trato, locale) => (esSimplificado(locale) ? hans(locale) : hant(locale)) };
}

export function contenidoPorEscritura(hant: ContenidoUniversal, hans: ContenidoUniversal): ContenidoUniversal {
  return (ctx) => (esSimplificado(ctx.locale) ? hans(ctx) : hant(ctx));
}
