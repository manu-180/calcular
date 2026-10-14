import type { Concepto } from "../conceptos";
import type {
  CodigoMercado,
  ContenidoCalculadora,
  DefinicionCalculadora,
  EstadoPublicacion,
  Idioma,
  Moneda,
  SistemaUnidades,
  Trato,
  ValorEntrada,
  ValorResultado,
} from "../tipos";

// Todo lo que una calculadora universal sabe del mercado donde se instancia. Es dato plano y
// serializable a propósito: el cliente reconstruye la definición con el mismo contexto.
export interface ContextoUniversal {
  id: string;
  // Vacío = el slug por defecto del idioma (textos.slug). Un país lo pisa si su gente busca otra palabra.
  slug: string;
  mercado: CodigoMercado;
  pais: string;
  nombrePais: string;
  locale: string;
  idioma: Idioma;
  trato: Trato;
  moneda: Moneda;
  escala: number;
  unidades: SistemaUnidades;
  estado: EstadoPublicacion;
  datos: Readonly<Record<string, string>>;
}

// Lo que viaja al cliente: etiquetas de campos, opciones, filas de resultado, observaciones y
// mensajes de error. Cada universal define su forma U.
export interface TextosUi<U> {
  slug: string;
  ui(trato: Trato, locale: string): U;
}

// Lo que solo usa el servidor para la página: h1, title, FAQ, ejemplo.
export type ContenidoUniversal = (ctx: ContextoUniversal) => Omit<ContenidoCalculadora, "calculadora">;

export interface CasoUniversal {
  nombre: string;
  detalle: string;
  fecha: `${number}-${number}-${number}`;
  entrada: Readonly<Record<string, ValorEntrada>>;
  esperado?: Readonly<Record<string, ValorResultado>>;
  esperaError?: true;
  tolerancia?: number;
  contexto?: Partial<Pick<ContextoUniversal, "moneda" | "escala" | "unidades" | "idioma" | "trato">>;
  valores?: Readonly<Record<string, number>>;
}

export interface Universal<U = unknown> {
  id: string;
  concepto: Concepto;
  // Claves que el país tiene que mapear a ids de su datos.json (por ejemplo { tasa: "mx.iva-general" }).
  datos?: readonly string[];
  definir(ctx: ContextoUniversal, ui: U): DefinicionCalculadora;
  textos: Partial<Record<Idioma, TextosUi<U>>>;
  contenido: Partial<Record<Idioma, ContenidoUniversal>>;
  casos: readonly CasoUniversal[];
}

export function definirUniversal<U>(universal: Universal<U>): Universal<U> {
  return universal;
}

export function idiomasDe(universal: Universal): Idioma[] {
  return (Object.keys(universal.textos) as Idioma[]).filter((i) => universal.contenido[i]);
}

export function instanciar<U>(
  universal: Universal<U>,
  ctx: ContextoUniversal,
): { definicion: DefinicionCalculadora; contenido: ContenidoCalculadora } {
  const textos = universal.textos[ctx.idioma];
  const contenido = universal.contenido[ctx.idioma];
  if (!textos || !contenido) throw new Error(`${universal.id}: no tiene textos en ${ctx.idioma}`);
  for (const clave of universal.datos ?? []) {
    if (!ctx.datos[clave]) throw new Error(`${universal.id}: falta el dato "${clave}" en ${ctx.mercado}`);
  }
  const completo: ContextoUniversal = { ...ctx, slug: ctx.slug || textos.slug };
  const definicion = universal.definir(completo, textos.ui(completo.trato, completo.locale));
  return { definicion, contenido: { calculadora: completo.id, ...contenido(completo) } };
}

// Elige la variante del texto según el trato. En idiomas sin voseo, "vos" no se usa nunca.
export function segunTrato(trato: Trato, variantes: { tu: string; usted: string; vos?: string }): string {
  return trato === "vos" ? (variantes.vos ?? variantes.tu) : variantes[trato];
}

// El title de una página no puede pasar de 60 caracteres y hay países de nombre largo («Saint Vincent
// and the Grenadines»): se pasan candidatos de más a menos completo y va el primero que entra.
export function tituloQueEntre(...candidatos: readonly string[]): string {
  return candidatos.find((c) => c.length <= 60) ?? candidatos[candidatos.length - 1];
}

const BONITOS = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 7.5, 8, 10];

// Monto de ejemplo en la moneda del mercado: el valor en "dólares" por la escala, llevado al número
// redondo más cercano (25.000 y no 23.817) para que los ejemplos se lean como los escribiría alguien.
export function montoEjemplo(ctx: Pick<ContextoUniversal, "escala">, base: number): number {
  const x = base * ctx.escala;
  if (x <= 0) return 0;
  const magnitud = 10 ** Math.floor(Math.log10(x));
  const normal = x / magnitud;
  let mejor = BONITOS[0];
  for (const b of BONITOS) if (Math.abs(b - normal) < Math.abs(mejor - normal)) mejor = b;
  return Math.round(mejor * magnitud * 100) / 100;
}

// Sin decimales pedidos, un monto entero va sin ",00" («200 000 €», no «200 000,00 €»): los ejemplos
// y las observaciones son prosa. Los que no son enteros llevan los decimales de la moneda.
export function formatearMonto(ctx: Pick<ContextoUniversal, "locale" | "moneda">, n: number, decimales?: number): string {
  const opciones: Intl.NumberFormatOptions = { style: "currency", currency: ctx.moneda };
  if (decimales === undefined && Math.abs(n - Math.round(n)) < 0.005) decimales = 0;
  if (decimales !== undefined) {
    opciones.minimumFractionDigits = decimales;
    opciones.maximumFractionDigits = decimales;
  }
  return new Intl.NumberFormat(ctx.locale, opciones).format(n);
}

export function formatearNumero(ctx: Pick<ContextoUniversal, "locale">, n: number, decimales = 0): string {
  return new Intl.NumberFormat(ctx.locale, { minimumFractionDigits: decimales, maximumFractionDigits: decimales }).format(n);
}

// Un número para meter en una frase con el separador del locale y hasta `maximo` decimales, sin ceros
// de relleno: 37 da «37», 33.33 da «33,33» en es-ES y «33.33» en en-US.
export function formatearCifra(ctx: Pick<ContextoUniversal, "locale">, n: number, maximo = 2): string {
  return new Intl.NumberFormat(ctx.locale, { minimumFractionDigits: 0, maximumFractionDigits: maximo }).format(n);
}
