import type { ContenidoUniversal, TextosUi } from "../tipos";

// En ar-EG, ar-SA, ar-AE y ar-MA el símbolo de la moneda es una abreviatura que termina en punto
// («ج.م.», «ر.س.», «د.إ.», «د.م.») e Intl le pega detrás una marca RLM. Una oración que termina en un
// monto quedaba con dos puntos («ج.م.‏.»): como en cualquier abreviatura, el punto del símbolo cierra
// también la oración. Se aplica a todo lo que devuelven textos y contenido en árabe, funciones de ui
// incluidas, porque los montos de las observaciones llegan ya formateados.
const PUNTO_DOBLE = /(\.‏?)\.(?=\s|$)/g;

function sinPuntoDoble<T>(valor: T): T {
  if (typeof valor === "string") return valor.replace(PUNTO_DOBLE, "$1") as T;
  if (typeof valor === "function") return ((...args: unknown[]) => sinPuntoDoble((valor as (...a: unknown[]) => unknown)(...args))) as T;
  if (Array.isArray(valor)) return valor.map(sinPuntoDoble) as T;
  if (valor && typeof valor === "object") return Object.fromEntries(Object.entries(valor).map(([k, v]) => [k, sinPuntoDoble(v)])) as T;
  return valor;
}

export function textosArabes<U>(textos: TextosUi<U>): TextosUi<U> {
  return { slug: textos.slug, ui: (trato, locale) => sinPuntoDoble(textos.ui(trato, locale)) };
}

export function contenidoArabe(contenido: ContenidoUniversal): ContenidoUniversal {
  return (ctx) => sinPuntoDoble(contenido(ctx));
}
