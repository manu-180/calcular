import type { ComponentType } from "react";
import type { Concepto } from "./conceptos";

export const CODIGOS_MERCADO = [
  "global",
  "zz",
  "uy",
  "py",
  "bo",
  "ve",
  "mx",
  "pe",
  "co",
  "cl",
  "ec",
  "cr",
  "pa",
  "ni",
  "do",
  "gt",
  "sv",
  "hn",
  "br",
] as const;
export type CodigoMercado = (typeof CODIGOS_MERCADO)[number];

// XTS es el código ISO 4217 reservado para pruebas: solo lo usa el mercado ficticio zz.
export const MONEDAS = [
  "UYU",
  "PYG",
  "BOB",
  "PEN",
  "CLP",
  "COP",
  "MXN",
  "VES",
  "USD",
  "CRC",
  "DOP",
  "GTQ",
  "HNL",
  "NIO",
  "PAB",
  "BRL",
  "ARS",
  "XTS",
] as const;
export type Moneda = (typeof MONEDAS)[number];

export const UNIDADES_REFERENCIA = [
  "UIT",
  "UF",
  "UTM",
  "UTA",
  "UMA",
  "UDI",
  "BPC",
  "UI",
  "UR",
  "UVT",
  "UVR",
  "SBU",
  "SMMLV",
  "IMM",
  "RMV",
] as const;
export type UnidadReferencia = (typeof UNIDADES_REFERENCIA)[number];

export const UNIDADES_SIMPLES = ["%", "dias", "horas", "meses", "anios", "numero", "factor"] as const;
export type UnidadSimple = (typeof UNIDADES_SIMPLES)[number];

export type Unidad = Moneda | UnidadReferencia | UnidadSimple;

export type FechaISO = `${number}-${number}-${number}`;

export type EstadoPublicacion = "borrador" | "interno" | "publicado";
// El trato es el registro de la persona a la que se le habla, en cualquier idioma: "tu" es el
// informal (tú, você, tu, du, you), "usted" el formal (usted, o senhor, vous, Sie, Lei) y "vos" el
// voseo, que solo existe en español. Los nombres quedaron en español por historia del repo.
export type Trato = "vos" | "tu" | "usted";
export const IDIOMAS = ["es", "pt", "en", "fr", "de", "it", "nl"] as const;
export type Idioma = (typeof IDIOMAS)[number];
export type SistemaUnidades = "metrico" | "imperial";

export type ModoRedondeo = "mitad-arriba" | "mitad-par" | "truncar";
export interface ReglaRedondeo {
  decimales: number;
  modo: ModoRedondeo;
}

export interface Region {
  id: string;
  nombre: string;
}

export interface Mercado {
  codigo: CodigoMercado;
  pais: string;
  nombre: string;
  locale: string;
  idioma: Idioma;
  trato: Trato;
  monedas: readonly [Moneda, ...Moneda[]];
  zonaHoraria: string;
  estado: EstadoPublicacion;
  regiones?: readonly Region[];
  redondeo: ReglaRedondeo;
  simbolos?: Readonly<Partial<Record<Moneda, string>>>;
  // Cuántas unidades de la moneda principal equivalen a "un dólar" redondeado a un número bonito.
  // Solo escala montos de ejemplo y valores por defecto de las calculadoras universales.
  escala?: number;
  unidades?: SistemaUnidades;
}

export interface Fuente {
  organismo: string;
  titulo: string;
  url: string;
  tipo: "primaria" | "secundaria";
  verificadoEl: FechaISO;
  nota?: string;
}

export type FuenteVerificada = Fuente & { url: `https://${string}`; tipo: "primaria" };

export interface FilaEscala {
  desde: number;
  hasta: number | null;
  tasa: number;
  cuotaFija?: number;
}

export interface ValorPorTipo {
  numero: number;
  mapa: Readonly<Record<string, number>>;
  escala: readonly FilaEscala[];
}
export type TipoDato = keyof ValorPorTipo;
export type ValorDato = ValorPorTipo[TipoDato];

interface TramoComun<V> {
  desde: FechaISO;
  hasta?: FechaISO;
  region?: string;
  valor?: V;
}

export interface TramoVerificado<V = ValorDato> extends TramoComun<V> {
  estado: "verificado";
  valor: V;
  fuente: FuenteVerificada;
}

export interface TramoNoVerificado<V = ValorDato> extends TramoComun<V> {
  estado: "no-verificado";
  motivo: string;
  fuente?: Fuente;
}

export type Tramo<V = ValorDato> = TramoVerificado<V> | TramoNoVerificado<V>;

export interface Dato<T extends TipoDato = TipoDato> {
  id: string;
  nombre: string;
  tipo: T;
  unidad: Unidad;
  regiones?: readonly string[];
  etiquetas?: Readonly<Record<string, string>>;
  tramos: readonly Tramo<ValorPorTipo[T]>[];
  proximaRevision?: FechaISO;
  nota?: string;
}

export type PuntoSerieTupla = readonly [FechaISO, number];

export interface Serie {
  id: string;
  nombre: string;
  unidad: Unidad;
  frecuencia: "diaria" | "semanal" | "mensual" | "trimestral" | "anual";
  maxAntiguedadDias: number;
  fuente: FuenteVerificada;
  puntos: readonly PuntoSerieTupla[];
}

export interface PuntoSerie {
  fecha: FechaISO;
  valor: number;
}

export type NivelAviso = "info" | "cautela" | "bloquea";
export interface Aviso {
  id: string;
  nivel: NivelAviso;
  desde: FechaISO;
  hasta?: FechaISO;
  aplicaA: readonly string[] | "*";
  titulo?: string;
  texto: string;
  fuente: Fuente;
}

export interface ArchivoDatos {
  mercado: CodigoMercado;
  datos: readonly Dato[];
}
export interface ArchivoSeries {
  mercado: CodigoMercado;
  series: readonly Serie[];
}
export interface ArchivoAvisos {
  mercado: CodigoMercado;
  avisos: readonly Aviso[];
}

export type Requisito =
  | "numero"
  | "mapa"
  | "escala"
  | "numero-por-region"
  | "mapa-por-region"
  | "escala-por-region"
  | "serie";

export type Requisitos = Readonly<Record<string, Requisito>>;

type ValorDeRequisito<Q extends Requisito> = Q extends "serie"
  ? PuntoSerie
  : Q extends `${infer T extends TipoDato}-por-region`
    ? Readonly<Record<string, ValorPorTipo[T]>>
    : Q extends TipoDato
      ? ValorPorTipo[Q]
      : never;

export type ValoresDe<Q extends Requisitos> = { readonly [K in keyof Q]: ValorDeRequisito<Q[K]> };

export type ValorResuelto =
  | number
  | Readonly<Record<string, number>>
  | readonly FilaEscala[]
  | PuntoSerie
  | Readonly<Record<string, ValorDato>>;
export type ValoresSerializados = Readonly<Record<string, ValorResuelto>>;

interface CampoBase {
  id: string;
  etiqueta: string;
  ayuda?: string;
  requerido?: boolean;
}

export interface CampoNumerico extends CampoBase {
  tipo: "moneda" | "numero" | "entero" | "porcentaje";
  min?: number;
  max?: number;
  porDefecto?: number;
  moneda?: Moneda;
}

export interface CampoFecha extends CampoBase {
  tipo: "fecha";
  min?: FechaISO;
  max?: FechaISO;
  porDefecto?: FechaISO | "hoy";
}

export interface OpcionCampo<V extends string = string> {
  valor: V;
  etiqueta: string;
}

export interface CampoOpcion extends CampoBase {
  tipo: "opcion";
  opciones: readonly OpcionCampo[];
  porDefecto?: string;
}

export interface CampoSiNo extends CampoBase {
  tipo: "si-no";
  porDefecto?: boolean;
}

export interface CampoRegion extends CampoBase {
  tipo: "region";
  porDefecto?: string;
}

export interface CampoOpcionDato extends CampoBase {
  tipo: "opcion-dato";
  dato: string;
  porDefecto?: string;
}

export type Campo = CampoNumerico | CampoFecha | CampoOpcion | CampoSiNo | CampoRegion | CampoOpcionDato;
export type TipoCampo = Campo["tipo"];

type ValorDeCampo<K> = K extends { tipo: "moneda" | "numero" | "entero" | "porcentaje" }
  ? number
  : K extends { tipo: "fecha" }
    ? FechaISO
    : K extends { tipo: "opcion"; opciones: readonly { valor: infer V }[] }
      ? V
      : K extends { tipo: "si-no" }
        ? boolean
        : string;

type ConOpcionalidad<K, T> = K extends { requerido: false } ? T | null : T;

export type EntradaDe<C extends readonly Campo[]> = {
  readonly [K in C[number] as K["id"]]: ConOpcionalidad<K, ValorDeCampo<K>>;
};

export type ValorEntrada = number | string | boolean | null;

export interface ContextoCalculo {
  fecha: FechaISO;
  mercado: CodigoMercado;
  moneda: Moneda;
  redondear: (n: number) => number;
}

export interface ColumnaTabla {
  clave: string;
  etiqueta: string;
  formato: FormatoNumerico | "texto" | "fecha";
}
// Tabla detallada de un resultado (por ejemplo, la amortización de un préstamo). La página muestra
// las primeras filas y el informe pago la tabla entera.
export interface TablaResultado {
  readonly tipo: "tabla";
  readonly columnas: readonly ColumnaTabla[];
  readonly filas: readonly (readonly (number | string | null)[])[];
}
export type ValorResultado = number | string | boolean | null | undefined | readonly string[] | TablaResultado;
export type ResultadoBase = { readonly [clave: string]: ValorResultado };

type ClavesCon<R, T> = string extends keyof R ? string : { [K in keyof R]-?: Exclude<R[K], undefined> extends T ? K : never }[keyof R] & string;

interface FilaComun {
  etiqueta: string;
  ayuda?: string;
  destacada?: boolean;
  ocultarSiCero?: boolean;
}

export type FormatoNumerico = "moneda" | "numero" | "porcentaje" | "dias" | "meses" | "horas" | "anios";

export type FilaResultado<R> =
  | (FilaComun & {
      clave: ClavesCon<R, number | null>;
      formato: FormatoNumerico;
      moneda?: Moneda;
      decimales?: number;
    })
  | (FilaComun & { clave: ClavesCon<R, string | null>; formato: "texto" | "fecha" });

export interface DefinicionCalculadora<
  C extends readonly Campo[] = readonly Campo[],
  Q extends Requisitos = Requisitos,
  R extends ResultadoBase = ResultadoBase,
> {
  id: string;
  mercado: CodigoMercado;
  concepto: Concepto;
  slug: string;
  estado: EstadoPublicacion;
  requiere: Q;
  campos: C;
  // Sintaxis de método a propósito: da bivarianza de parámetros y deja guardar definiciones
  // concretas en el registro como DefinicionCalculadora sin genéricos (tipo borrado).
  calcular(entrada: EntradaDe<C>, valores: ValoresDe<Q>, contexto: ContextoCalculo): R;
  resultado: readonly FilaResultado<R>[];
  redondeo?: ReglaRedondeo;
  producto?: string;
  tablas?: readonly { clave: string; titulo: string; filasVisibles?: number }[];
}

export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

export interface EntradaGlosario {
  termino: string;
  definicion: string;
}

export interface ContenidoCalculadora {
  calculadora: string;
  h1: string;
  title: string;
  description: string;
  intro: readonly string[];
  comoSeCalcula: readonly string[];
  ejemplo?: readonly string[];
  faq: readonly PreguntaFrecuente[];
  glosario: readonly EntradaGlosario[];
}

export interface Novedad {
  id: string;
  fecha: FechaISO;
  titulo: string;
  texto: string;
  vigenteDesde?: FechaISO;
  calculadoras: readonly string[];
  fuente: Fuente;
}

export interface OpcionesHttp {
  userAgentNavegador?: boolean;
  tlsTolerante?: boolean;
  encabezados?: Readonly<Record<string, string>>;
}

export interface Http {
  json(url: string, opciones?: OpcionesHttp): Promise<unknown>;
  texto(url: string, opciones?: OpcionesHttp): Promise<string>;
}

export interface BandaSerie {
  min: number;
  max: number;
  saltoRelativoMax: number;
}

export type MetodoDetector = "api-json" | "api-xml" | "html" | "pdf" | "manual";

interface DetectorComun {
  id: string;
  metodo: MetodoDetector;
  url: `https://${string}`;
  tlsTolerante?: boolean;
  userAgentNavegador?: boolean;
}

export interface DetectorSerie extends DetectorComun {
  carril: "serie";
  serie: string;
  banda: BandaSerie;
  traer(http: Http): Promise<readonly PuntoSerie[] | null>;
}

export interface HallazgoNorma {
  titulo: string;
  url: string;
  fecha: FechaISO;
}

export interface DetectorNorma extends DetectorComun {
  carril: "norma";
  datos: readonly string[];
  traer(http: Http): Promise<readonly HallazgoNorma[] | null>;
}

export type Detector = DetectorSerie | DetectorNorma;

export interface AvisoResuelto {
  id: string;
  nivel: NivelAviso;
  titulo?: string;
  texto: string;
  fuente: Fuente;
}

export interface OpcionDinamica {
  valor: string;
  etiqueta: string;
}

export interface ContextoSerializado {
  fecha: FechaISO;
  mercado: CodigoMercado;
  locale: string;
  idioma: Idioma;
  trato: Trato;
  moneda: Moneda;
  redondeo: ReglaRedondeo;
  regiones: readonly Region[];
  simbolos?: Readonly<Partial<Record<Moneda, string>>>;
}

export interface PropsCalculadora {
  valores: ValoresSerializados;
  contexto: ContextoSerializado;
  avisos: readonly AvisoResuelto[];
  opcionesDinamicas: Readonly<Record<string, readonly OpcionDinamica[]>>;
}

export type ModuloCliente = { default: ComponentType<PropsCalculadora> };

export interface EntradaCalculadora {
  definicion: DefinicionCalculadora;
  contenido: ContenidoCalculadora;
  cliente: () => Promise<ModuloCliente>;
}

export interface DeclaracionPais {
  mercado: Mercado;
  datos?: unknown;
  series?: unknown;
  avisos?: unknown;
  calculadoras?: readonly EntradaCalculadora[];
  novedades?: readonly Novedad[];
  detectores?: readonly Detector[];
}

export interface PaisDefinido {
  mercado: Mercado;
  datos: readonly Dato[];
  series: readonly Serie[];
  avisos: readonly Aviso[];
  calculadoras: readonly EntradaCalculadora[];
  novedades: readonly Novedad[];
  detectores: readonly Detector[];
  errores: readonly string[];
}
