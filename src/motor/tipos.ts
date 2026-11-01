import type { ComponentType } from "react";
import type { Concepto } from "./conceptos";

// Los códigos de mercado y de moneda no se listan a mano: un mercado es "global", "zz" o un ISO
// 3166-1 alfa-2 en minúscula con sufijo de idioma opcional (ca-fr), y una moneda es cualquier ISO
// 4217 que conozca Intl (más XTS, el código reservado para pruebas que usa zz).
export type CodigoMercado = string;
export const RE_CODIGO_MERCADO = /^(?:global|zz|[a-z]{2}(?:-[a-z]{2,3})?)$/;
export function esCodigoMercado(valor: string): valor is CodigoMercado {
  return RE_CODIGO_MERCADO.test(valor);
}

export type Moneda = string;
let monedasIntl: ReadonlySet<string> | null = null;
export function esMoneda(valor: string): valor is Moneda {
  monedasIntl ??= new Set([...Intl.supportedValuesOf("currency"), "XTS"]);
  return monedasIntl.has(valor);
}

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

export const UNIDADES_SIMPLES = ["%", "dias", "semanas", "horas", "meses", "anios", "numero", "factor"] as const;
export type UnidadSimple = (typeof UNIDADES_SIMPLES)[number];

export type Unidad = Moneda | UnidadReferencia | UnidadSimple;

export type FechaISO = `${number}-${number}-${number}`;

export type EstadoPublicacion = "borrador" | "interno" | "publicado";
// El trato es el registro de la persona a la que se le habla, en cualquier idioma: "tu" es el
// informal (tú, você, tu, du, you), "usted" el formal (usted, o senhor, vous, Sie, Lei) y "vos" el
// voseo, que solo existe en español. Los nombres quedaron en español por historia del repo.
// ja, ko y zh tienen un solo registro para la web y sus mercados van con "usted": です/ます en
// japonés, 해요체 en coreano y 您 en chino (ADR 0002, D8). Los diccionarios lo escriben en base.
// El indonesio también: «Anda», el registro de bancos y servicios digitales (ADR 0002, D11).
// El turco también: «siz» con las formas corteses («hesaplayın», «girin»), el registro de los bancos
// y de e-Devlet (ADR 0002, D12).
// El bengalí también: «আপনি» con las formas verbales corteses (ADR 0002, D14).
// El tailandés también: cortés y neutro, sin pronombre ni partículas ครับ/ค่ะ (ADR 0002, D13).
// El uzbeko (escritura latina) también: «Siz» con las formas corteses («kiriting», «hisoblang»), el
// registro de soliq.uz, my.gov.uz y los bancos (ADR 0002, D16).
export type Trato = "vos" | "tu" | "usted";
// ar tiene un solo registro (árabe estándar moderno) y sus mercados van con "usted"; la dirección
// de escritura sale del idioma (i18n/direccion.ts), no del mercado.
export const IDIOMAS = ["es", "pt", "en", "fr", "de", "it", "nl", "ja", "ko", "zh", "pl", "sv", "da", "nb", "fi", "ar", "id", "tr", "bn", "th", "uk", "uz", "ru", "ro", "cs", "el", "hu", "he", "sr"] as const;
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

// Fecha que se repite cada año y que la ley de este dato fija (pago del aguinaldo hasta el 20 de
// diciembre, décimo cuarto hasta el 15 de agosto). La fuente es la del tramo verificado que rige ese
// día: sin tramo verificado, la fecha no sale. Detalle en docs/paises/RECETA.md («Fechas de calendario»).
export interface FechaCalendario {
  id: string;
  tipo: "pago" | "vencimiento";
  mes: number;
  dia: number;
  titulo: string;
  texto?: string;
  // Id de la calculadora del país que corresponde (sin esto, la primera publicada que usa el dato).
  calculadora?: string;
  // Solo para un dato por región: la región a la que aplica la fecha.
  region?: string;
  // Título y texto en el idioma de cada edición del país (ca-fr, ch-it), por idioma.
  traducciones?: Readonly<Partial<Record<Idioma, { titulo: string; texto?: string }>>>;
}

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
  calendario?: readonly FechaCalendario[];
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

// visibleSi: el campo se muestra solo cuando cada campo nombrado tiene uno de esos valores
// ({ modo: ["horas"] }). Oculto no se valida y llega a calcular() como null.
interface CampoBase {
  id: string;
  etiqueta: string;
  ayuda?: string;
  requerido?: boolean;
  visibleSi?: Readonly<Record<string, readonly (string | boolean)[]>>;
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

// Hora del día "HH:MM" (00:00 a 23:59), con selector nativo del navegador.
export interface CampoHora extends CampoBase {
  tipo: "hora";
  min?: string;
  max?: string;
  porDefecto?: string;
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

// regiones: un subconjunto de las del mercado, para una calculadora que no aplica en todas (el
// impuesto provincial de Canadá sin Quebec). Sin la lista, todas.
export interface CampoRegion extends CampoBase {
  tipo: "region";
  porDefecto?: string;
  regiones?: readonly string[];
}

export interface CampoOpcionDato extends CampoBase {
  tipo: "opcion-dato";
  dato: string;
  porDefecto?: string;
}

export type Campo = CampoNumerico | CampoFecha | CampoHora | CampoOpcion | CampoSiNo | CampoRegion | CampoOpcionDato;
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

type ConOpcionalidad<K, T> = K extends { requerido: false } | { visibleSi: object } ? T | null : T;

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

export type FormatoNumerico = "moneda" | "numero" | "porcentaje" | "dias" | "semanas" | "meses" | "horas" | "anios";

export type FilaResultado<R> =
  | (FilaComun & {
      clave: ClavesCon<R, number | null>;
      formato: FormatoNumerico;
      moneda?: Moneda;
      decimales?: number;
    })
  | (FilaComun & { clave: ClavesCon<R, string | null>; formato: "texto" | "fecha" });

export type PeriodoMundo = "mes" | "anio";

// Cómo entra una calculadora de sueldo neto a «Tu sueldo en el mundo» (src/motor/mundo). Sin esto el
// motor la infiere; se declara cuando scripts/check_mundo.ts la marca excluida.
export interface MundoCalculadora {
  // Campo de moneda con el sueldo bruto y el período en que lo pide.
  bruto: string;
  periodoBruto: PeriodoMundo;
  // Clave del resultado con el neto y su período.
  neto: string;
  periodoNeto: PeriodoMundo;
  // Sueldos que paga la ley en el año (13 con aguinaldo, 14 con dos extras). Sin esto, 12.
  pagasAnuales?: number;
  // Valores fijos para otros campos (un selector de período en "anual", un subsidio apagado).
  entrada?: Readonly<Record<string, string | number | boolean>>;
  // Clave del resultado con el bruto real, del mismo período que el neto, cuando el campo no lo es
  // (un CTC que incluye aportes del empleador). La grilla busca el valor del campo que da ese bruto.
  brutoResultado?: string;
}

// Para sacarla de la grilla a propósito (su neto no descuenta el impuesto a la renta, por ejemplo).
export interface MundoExcluida {
  excluir: string;
}

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
  mundo?: MundoCalculadora | MundoExcluida;
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
  // Opcional: algunas APIs de datos (PXWeb de la PSA de Filipinas) solo responden a un POST con la
  // consulta en JSON. Un detector que lo use devuelve null si el Http no lo trae.
  postJson?(url: string, cuerpo: unknown, opciones?: OpcionesHttp): Promise<unknown>;
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

// Una calculadora del país traducida por una edición en otro idioma (ca-fr traduce ca.vacation-pay):
// el navegador arma la definición con la del país (src/paises/<mercado>/calculadoras/<archivo>.ts) y
// los textos de la edición (src/paises/<edición>/textos/<archivo>.ts).
export interface OrigenTraduccion {
  mercado: CodigoMercado;
  archivo: string;
  id: string;
}

export interface EntradaCalculadora {
  definicion: DefinicionCalculadora;
  contenido: ContenidoCalculadora;
  cliente: () => Promise<ModuloCliente>;
  traduccion?: OrigenTraduccion;
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
  // El mercado del país cuando este es una edición en otro idioma (ca-fr es edición de ca).
  edicionDe?: CodigoMercado;
}
