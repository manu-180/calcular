import { decimalesDeMoneda, redondear } from "./formato";
import type { CodigoError } from "./textos";
import type {
  Campo,
  ContenidoCalculadora,
  ContextoCalculo,
  ContextoSerializado,
  DefinicionCalculadora,
  EntradaDe,
  FechaISO,
  FilaEscala,
  FormatoNumerico,
  Moneda,
  Mercado,
  ReglaRedondeo,
  Requisitos,
  ResultadoBase,
  ValoresDe,
} from "./tipos";

// Para un mensaje propio, el país lo escribe en su tono. Con un código, el motor pone el texto
// según el trato del mercado (un helper compartido no puede saber si va "elige" o "elegí").
export class ErrorEntrada extends Error {
  override name = "ErrorEntrada";
  readonly codigo: CodigoError | null;
  constructor(
    mensaje: string | { codigo: CodigoError },
    readonly campo: string | null = null,
  ) {
    super(typeof mensaje === "string" ? mensaje : mensaje.codigo);
    this.codigo = typeof mensaje === "string" ? null : mensaje.codigo;
  }
}

interface FilaLibre {
  clave: string;
  etiqueta: string;
  formato: FormatoNumerico | "texto" | "fecha";
  moneda?: Moneda;
  decimales?: number;
  ayuda?: string;
  destacada?: boolean;
  ocultarSiCero?: boolean;
}

type ClaveInvalida<Fila, R> = Fila extends { clave: infer K; formato: infer Fo }
  ? K extends keyof R
    ? Fo extends "texto" | "fecha"
      ? Exclude<R[K], undefined> extends string | null
        ? never
        : K
      : Exclude<R[K], undefined> extends number | null
        ? never
        : K
    : K
  : never;

type ClavesInvalidas<F extends readonly FilaLibre[], R> = { [I in keyof F]: ClaveInvalida<F[I], R> }[number];

// Las filas de resultado van en su propio genérico F: si se tiparan con R, el literal "total" fija R
// antes de que TypeScript lo infiera de lo que devuelve calcular() y todas las claves dan never.
// El cruce con R se hace después, y un error nombra la clave que no existe o no es del tipo pedido.
export function definirCalculadora<
  const C extends readonly Campo[],
  const Q extends Requisitos,
  R extends ResultadoBase,
  const F extends readonly FilaLibre[],
>(
  definicion: Omit<DefinicionCalculadora<C, Q, R>, "resultado"> & { resultado: F },
): [ClavesInvalidas<F, R>] extends [never] ? DefinicionCalculadora<C, Q, R> : { "error: estas claves de resultado no salen de calcular() o tienen otro tipo": ClavesInvalidas<F, R> } {
  return definicion as never;
}

export function definirContenido(contenido: ContenidoCalculadora): ContenidoCalculadora {
  return contenido;
}

export function porcentaje(base: number, tasaEnPorcentaje: number): number {
  return (base * tasaEnPorcentaje) / 100;
}

export function porRegion<V>(mapa: Readonly<Record<string, V>>, region: string | null): V {
  if (region === null || !(region in mapa)) throw new ErrorEntrada({ codigo: "region-invalida" });
  return mapa[region];
}

export function enMapa(mapa: Readonly<Record<string, number>>, clave: string | null): number {
  if (clave === null || !(clave in mapa)) throw new ErrorEntrada({ codigo: "opcion-invalida" });
  return mapa[clave];
}

function filaPara(escala: readonly FilaEscala[], base: number): FilaEscala {
  let elegida = escala[0];
  for (const f of escala) if (base >= f.desde) elegida = f;
  return elegida;
}

// Tabla de "cuota fija + tasa sobre el excedente del límite inferior" (ISR de México, impuesto
// único de Chile). Sin cuotaFija en la fila se toma 0.
export function aplicarEscala(escala: readonly FilaEscala[], base: number): number {
  if (base <= 0) return 0;
  const f = filaPara(escala, base);
  return (f.cuotaFija ?? 0) + ((base - f.desde) * f.tasa) / 100;
}

// Escala acumulativa por tramos (renta de quinta de Perú, IRPF de Uruguay): cada porción de la base
// paga la tasa de su tramo. Ignora cuotaFija.
export function aplicarEscalaMarginal(escala: readonly FilaEscala[], base: number): number {
  let total = 0;
  for (const f of escala) {
    if (base <= f.desde) break;
    const tope = f.hasta === null ? base : Math.min(base, f.hasta);
    total += ((tope - f.desde) * f.tasa) / 100;
  }
  return total;
}

export function reglaPorDefecto(mercado: Pick<Mercado, "redondeo">, definicion?: { redondeo?: ReglaRedondeo }): ReglaRedondeo {
  return definicion?.redondeo ?? mercado.redondeo;
}

export function crearContexto(
  mercado: Pick<Mercado, "codigo" | "monedas" | "redondeo">,
  fecha: FechaISO,
  definicion?: { redondeo?: ReglaRedondeo },
): ContextoCalculo {
  const regla = reglaPorDefecto(mercado, definicion);
  return { fecha, mercado: mercado.codigo, moneda: mercado.monedas[0], redondear: (n) => redondear(n, regla) };
}

export function contextoDesdeSerializado(ctx: ContextoSerializado): ContextoCalculo {
  return { fecha: ctx.fecha, mercado: ctx.mercado, moneda: ctx.moneda, redondear: (n) => redondear(n, ctx.redondeo) };
}

export function reglaDeMoneda(mercado: Pick<Mercado, "monedas" | "locale">): ReglaRedondeo {
  return { decimales: decimalesDeMoneda(mercado.monedas[0], mercado.locale), modo: "mitad-arriba" };
}

export type OrigenCaso =
  | { tipo: "oficial"; url: `https://${string}`; detalle: string }
  | { tipo: "recalculado"; detalle: string; url?: `https://${string}` };

export interface Caso<C extends readonly Campo[], Q extends Requisitos, R extends ResultadoBase> {
  nombre: string;
  origen: OrigenCaso;
  fecha: FechaISO;
  entrada: EntradaDe<C>;
  valores?: Partial<ValoresDe<Q>>;
  esperado?: { readonly [K in keyof R]?: R[K] };
  esperaError?: true;
  tolerancia?: number;
}

export interface CasosCalculadora<
  C extends readonly Campo[] = readonly Campo[],
  Q extends Requisitos = Requisitos,
  R extends ResultadoBase = ResultadoBase,
> {
  calculadora: DefinicionCalculadora<C, Q, R>;
  casos: readonly Caso<C, Q, R>[];
}

export function definirCasos<C extends readonly Campo[], Q extends Requisitos, R extends ResultadoBase>(
  calculadora: DefinicionCalculadora<C, Q, R>,
  casos: readonly Caso<C, Q, R>[],
): CasosCalculadora<C, Q, R> {
  return { calculadora, casos };
}
