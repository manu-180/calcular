import { aplicarEscalaMarginal, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FilaEscala, OpcionCampo } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;
type Redondear = (n: number) => number;

export type Contrato = "indefinido" | "temporal" | "temporal-corto";
export const OPCIONES_CONTRATO = [
  { valor: "indefinido", etiqueta: "Indefinido" },
  { valor: "temporal", etiqueta: "Temporal de un año o más" },
  { valor: "temporal-corto", etiqueta: "Temporal de menos de un año" },
] as const satisfies readonly OpcionCampo<Contrato>[];

export type SituacionFamiliar = "1" | "2" | "3";
export const OPCIONES_SITUACION = [
  { valor: "3", etiqueta: "Ninguna de las otras dos (por ejemplo, soltero sin hijos o casado con cónyuge con ingresos)" },
  { valor: "1", etiqueta: "Soltero, viudo, divorciado o separado, con hijos que viven solo contigo" },
  { valor: "2", etiqueta: "Casado, con cónyuge cuyas rentas no pasan de 1.500 euros al año" },
] as const satisfies readonly OpcionCampo<SituacionFamiliar>[];

export type TramoEdad = "menos-65" | "65-74" | "75-o-mas";
export const OPCIONES_EDAD = [
  { valor: "menos-65", etiqueta: "Menos de 65 años" },
  { valor: "65-74", etiqueta: "De 65 a 74 años" },
  { valor: "75-o-mas", etiqueta: "75 años o más" },
] as const satisfies readonly OpcionCampo<TramoEdad>[];

export const OPCIONES_PAGAS = [
  { valor: "14", etiqueta: "14 pagas (12 meses y 2 pagas extra)" },
  { valor: "12", etiqueta: "12 pagas (pagas extra prorrateadas)" },
] as const satisfies readonly OpcionCampo<"12" | "14">[];

export function esContrato(v: string): v is Contrato {
  return v === "indefinido" || v === "temporal" || v === "temporal-corto";
}

export interface CotizacionMensual {
  base: number;
  contingenciasComunes: number;
  desempleo: number;
  formacion: number;
  mei: number;
  solidaridad: number;
  total: number;
}

// Cada concepto se redondea por separado, como en una nómina: la suma puede diferir en un céntimo
// de aplicar el tipo total de una vez.
export function cotizacionTrabajador(
  retribucionMensual: number,
  contrato: Contrato,
  tipos: Mapa,
  baseMaxima: number,
  solidaridad: readonly FilaEscala[],
  redondear: Redondear,
): CotizacionMensual {
  const base = redondear(Math.min(Math.max(0, retribucionMensual), baseMaxima));
  const cc = redondear(porcentaje(base, tipos["contingencias-comunes"]));
  const des = redondear(porcentaje(base, contrato === "indefinido" ? tipos["desempleo-indefinido"] : tipos["desempleo-temporal"]));
  const fp = redondear(porcentaje(base, tipos.formacion));
  const mei = redondear(porcentaje(base, tipos.mei));
  const sol = redondear(aplicarEscalaMarginal(solidaridad, retribucionMensual));
  return { base, contingenciasComunes: cc, desempleo: des, formacion: fp, mei, solidaridad: sol, total: redondear(cc + des + fp + mei + sol) };
}

export interface CotizacionEmpresa {
  base: number;
  contingenciasComunes: number;
  desempleo: number;
  fogasa: number;
  formacion: number;
  mei: number;
  accidentes: number;
  solidaridad: number;
  total: number;
}

export function cotizacionEmpresa(
  retribucionMensual: number,
  contrato: Contrato,
  tipos: Mapa,
  tipoAccidentes: number,
  baseMaxima: number,
  solidaridad: readonly FilaEscala[],
  redondear: Redondear,
): CotizacionEmpresa {
  const base = redondear(Math.min(Math.max(0, retribucionMensual), baseMaxima));
  const cc = redondear(porcentaje(base, tipos["contingencias-comunes"]));
  const des = redondear(porcentaje(base, contrato === "indefinido" ? tipos["desempleo-indefinido"] : tipos["desempleo-temporal"]));
  const fogasa = redondear(porcentaje(base, tipos.fogasa));
  const fp = redondear(porcentaje(base, tipos.formacion));
  const mei = redondear(porcentaje(base, tipos.mei));
  const at = redondear(porcentaje(base, tipoAccidentes));
  const sol = redondear(aplicarEscalaMarginal(solidaridad, retribucionMensual));
  return {
    base,
    contingenciasComunes: cc,
    desempleo: des,
    fogasa,
    formacion: fp,
    mei,
    accidentes: at,
    solidaridad: sol,
    total: redondear(cc + des + fogasa + fp + mei + at + sol),
  };
}

export interface DatosIrpf {
  escala: readonly FilaEscala[];
  minimoContribuyente: Mapa;
  minimoDescendientes: Mapa;
  reduccionTrabajo: Mapa;
  otrosGastos: number;
  reduccionHijos: number;
  limitesExclusion: Mapa;
  limiteCuota: Mapa;
  tipoMinimoTemporal: number;
}

export interface EntradaRetencion {
  retribucion: number;
  cotizaciones: number;
  situacion: SituacionFamiliar;
  hijos: number;
  hijosMenores3: number;
  hijosPorEntero: boolean;
  edad: TramoEdad;
  contrato: Contrato;
}

export interface Retencion {
  rendimientoNeto: number;
  otrosGastos: number;
  reduccionTrabajo: number;
  base: number;
  minimoPersonalFamiliar: number;
  cuota: number;
  exento: boolean;
  limiteExclusion: number | null;
  tipo: number;
  importe: number;
}

function truncar2(n: number): number {
  return Math.trunc(n * 100 + 1e-9) / 100;
}

function claveLimite(situacion: SituacionFamiliar, hijos: number): string {
  return `s${situacion}-${Math.min(hijos, 2)}`;
}

// Algoritmo de la Agencia Tributaria para el tipo de retención (art. 80 a 89 del Reglamento del
// IRPF) en su caso más común: sin discapacidad, sin ascendientes, sin movilidad geográfica, sin
// pensión compensatoria ni anualidades por alimentos y sin préstamo de vivienda anterior a 2013.
export function retencionIrpf(e: EntradaRetencion, d: DatosIrpf, redondear: Redondear): Retencion {
  if (e.hijosMenores3 > e.hijos) throw new ErrorEntrada("Los hijos menores de 3 años no pueden ser más que el total de hijos.", "hijosMenores3");
  if (e.situacion === "1" && e.hijos === 0) throw new ErrorEntrada("La situación de familia monoparental exige al menos un hijo a tu cargo.", "situacion");
  const retrib = e.retribucion;
  const cotiz = e.cotizaciones;

  const rnt = Math.max(0, retrib - cotiz);
  const otrosGastos = retrib - cotiz < 0 ? 0 : Math.min(d.otrosGastos, retrib - cotiz);
  const r = d.reduccionTrabajo;
  let red20 = 0;
  if (rnt <= r["umbral-1"]) red20 = r.maxima;
  else if (rnt <= r["umbral-2"]) red20 = r.maxima - r["coeficiente-1"] * (rnt - r["umbral-1"]);
  else if (rnt < r["umbral-3"]) red20 = r["importe-2"] - r["coeficiente-2"] * (rnt - r["umbral-2"]);
  red20 = redondear(Math.max(0, red20));
  const rntReducido = Math.max(0, rnt - otrosGastos - red20);
  const redu = e.hijos > 2 ? d.reduccionHijos : 0;
  const base = redondear(Math.max(0, rntReducido - redu));

  const mc = d.minimoContribuyente;
  const minCon = mc.general + (e.edad !== "menos-65" ? mc["mayor-65"] : 0) + (e.edad === "75-o-mas" ? mc["mayor-75"] : 0);
  const entero = e.hijosPorEntero ? 1 : 0.5;
  const md = d.minimoDescendientes;
  const porOrden = [md.primero, md.segundo, md.tercero];
  let minDes = 0;
  for (let i = 0; i < e.hijos; i++) minDes += (porOrden[i] ?? md.cuarto) * entero;
  minDes += md["menor-3"] * e.hijosMenores3 * entero;
  const minimo = redondear(minCon + redondear(minDes));

  const clave = claveLimite(e.situacion, e.hijos);
  const limiteExclusion = d.limitesExclusion[clave] ?? null;
  if (limiteExclusion !== null && retrib <= limiteExclusion) {
    return { rendimientoNeto: redondear(rnt), otrosGastos: redondear(otrosGastos), reduccionTrabajo: red20, base, minimoPersonalFamiliar: minimo, cuota: 0, exento: true, limiteExclusion, tipo: 0, importe: 0 };
  }

  let cuota = Math.max(0, aplicarEscalaMarginal(d.escala, base) - aplicarEscalaMarginal(d.escala, minimo));
  if (limiteExclusion !== null && retrib <= d.limiteCuota["hasta-retribucion"]) cuota = Math.min(cuota, porcentaje(retrib - limiteExclusion, d.limiteCuota.porcentaje));
  cuota = redondear(cuota);

  let tipo = retrib > 0 ? truncar2((cuota / retrib) * 100) : 0;
  if (e.contrato === "temporal-corto" && tipo < d.tipoMinimoTemporal) tipo = d.tipoMinimoTemporal;
  const importe = redondear((retrib * tipo) / 100);
  return { rendimientoNeto: redondear(rnt), otrosGastos: redondear(otrosGastos), reduccionTrabajo: red20, base, minimoPersonalFamiliar: minimo, cuota, exento: false, limiteExclusion, tipo, importe };
}

export const REQUIERE_IRPF = {
  "es.irpf-escala-retencion": "escala",
  "es.irpf-minimo-contribuyente": "mapa",
  "es.irpf-minimo-descendientes": "mapa",
  "es.irpf-reduccion-trabajo": "mapa",
  "es.irpf-otros-gastos": "numero",
  "es.irpf-reduccion-hijos": "numero",
  "es.irpf-limites-exclusion": "mapa",
  "es.irpf-limite-cuota": "mapa",
  "es.irpf-tipo-minimo-temporal": "numero",
} as const;

export const REQUIERE_COTIZACION = {
  "es.cotizacion-trabajador": "mapa",
  "es.base-maxima-cotizacion": "numero",
  "es.solidaridad-trabajador": "escala",
} as const;

interface ValoresIrpf {
  readonly "es.irpf-escala-retencion": readonly FilaEscala[];
  readonly "es.irpf-minimo-contribuyente": Mapa;
  readonly "es.irpf-minimo-descendientes": Mapa;
  readonly "es.irpf-reduccion-trabajo": Mapa;
  readonly "es.irpf-otros-gastos": number;
  readonly "es.irpf-reduccion-hijos": number;
  readonly "es.irpf-limites-exclusion": Mapa;
  readonly "es.irpf-limite-cuota": Mapa;
  readonly "es.irpf-tipo-minimo-temporal": number;
}

export function datosIrpf(v: ValoresIrpf): DatosIrpf {
  return {
    escala: v["es.irpf-escala-retencion"],
    minimoContribuyente: v["es.irpf-minimo-contribuyente"],
    minimoDescendientes: v["es.irpf-minimo-descendientes"],
    reduccionTrabajo: v["es.irpf-reduccion-trabajo"],
    otrosGastos: v["es.irpf-otros-gastos"],
    reduccionHijos: v["es.irpf-reduccion-hijos"],
    limitesExclusion: v["es.irpf-limites-exclusion"],
    limiteCuota: v["es.irpf-limite-cuota"],
    tipoMinimoTemporal: v["es.irpf-tipo-minimo-temporal"],
  };
}

export function esSituacion(v: string): v is SituacionFamiliar {
  return v === "1" || v === "2" || v === "3";
}

export function esTramoEdad(v: string): v is TramoEdad {
  return v === "menos-65" || v === "65-74" || v === "75-o-mas";
}

export const CAMPOS_FAMILIA = [
  { id: "situacion", tipo: "opcion", etiqueta: "Situación familiar", opciones: OPCIONES_SITUACION, porDefecto: "3" },
  { id: "hijos", tipo: "entero", etiqueta: "Hijos menores de 25 años que viven contigo", min: 0, max: 16, porDefecto: 0 },
  { id: "hijosMenores3", tipo: "entero", etiqueta: "De ellos, menores de 3 años", min: 0, max: 16, porDefecto: 0 },
  {
    id: "hijosPorEntero",
    tipo: "si-no",
    etiqueta: "Te aplicas el mínimo por hijos entero",
    porDefecto: false,
    ayuda: "Marca sí solo si el otro progenitor no se lo aplica. Si los dos progenitores conviven con ellos, se reparte a medias.",
  },
  { id: "edad", tipo: "opcion", etiqueta: "Tu edad", opciones: OPCIONES_EDAD, porDefecto: "menos-65" },
] as const;
