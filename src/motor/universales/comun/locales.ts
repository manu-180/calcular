import type { Trato } from "../../tipos";
import type { ContenidoUniversal, ContextoUniversal, TextosUi } from "../tipos";

export const esEspana = (locale: string): boolean => locale === "es-ES";
export const esPortugal = (locale: string): boolean => locale === "pt-PT";
export const esCanadaFrances = (locale: string): boolean => locale === "fr-CA";
export const esSuiza = (locale: string): boolean => locale.endsWith("-CH");

// El ahorro propio al comprar una casa se llama «deposit» en el inglés británico y en el de los países
// que lo siguen; «down payment» es de EE. UU. y Canadá y es lo que se usa en Asia.
const CON_DEPOSIT = new Set(["en-GB", "en-IE", "en-AU", "en-NZ", "en-ZA"]);
export const entradaDeCasaEn = (locale: string): "deposit" | "down payment" => (CON_DEPOSIT.has(locale) ? "deposit" : "down payment");

// En Suiza el alemán no usa «ß»: siempre «ss» («Körpergrösse»). Es una regla ortográfica sin
// excepciones, así que se aplica a todo el texto en vez de ramificar etiqueta por etiqueta. Las
// funciones de ui se envuelven para que lo que devuelvan también pase por acá.
function sinEszett<T>(valor: T): T {
  if (typeof valor === "string") return valor.replace(/ß/g, "ss") as T;
  if (typeof valor === "function") return ((...args: unknown[]) => sinEszett((valor as (...a: unknown[]) => unknown)(...args))) as T;
  if (Array.isArray(valor)) return valor.map(sinEszett) as T;
  if (valor && typeof valor === "object") return Object.fromEntries(Object.entries(valor).map(([k, v]) => [k, sinEszett(v)])) as T;
  return valor;
}

export function paraSuiza<T>(locale: string, valor: T): T {
  return esSuiza(locale) ? sinEszett(valor) : valor;
}

export function textosConSuiza<U>(textos: TextosUi<U>): TextosUi<U> {
  return { slug: textos.slug, ui: (trato, locale) => paraSuiza(locale, textos.ui(trato, locale)) };
}

// Las etiquetas que cambian en una variante del idioma (es-ES, pt-PT, fr-CA) se pisan sobre las de
// la base; lo que la variante no nombra queda igual. La clave es el locale del mercado.
export function conVariantes<U>(textos: TextosUi<U>, variantes: Readonly<Record<string, (trato: Trato) => Partial<U>>>): TextosUi<U> {
  return {
    slug: textos.slug,
    ui: (trato, locale) => {
      const base = textos.ui(trato, locale);
      const variante = variantes[locale];
      return variante ? { ...base, ...variante(trato) } : base;
    },
  };
}

// Para el contenido de la página: lo que la variante devuelve pisa campo por campo al de la base.
export function contenidoConVariantes(
  base: ContenidoUniversal,
  variantes: Readonly<Record<string, (ctx: ContextoUniversal) => Partial<ReturnType<ContenidoUniversal>>>>,
): ContenidoUniversal {
  return (ctx) => {
    const variante = variantes[ctx.locale];
    return variante ? { ...base(ctx), ...variante(ctx) } : base(ctx);
  };
}
