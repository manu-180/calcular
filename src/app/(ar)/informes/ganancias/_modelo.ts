// Todo número del informe sale de acá, y acá:
//   · el impuesto sale SIEMPRE de `calcularRetencionMensual`, con la misma traducción de entradas
//     que usa la calculadora de /ganancias (`entradaDelMotor`);
//   · lo que se puede deducir de cada gasto, con sus topes, sale de los motores de las calculadoras
//     de deducciones del sitio. La única regla propia es el tope de educación (art. 85 inc. j),
//     que no tiene calculadora: 40% del MNI, derivado de la tabla de Ganancias.
// Cuánto devuelve una deducción = impuesto del año sin ella − con ella, corriendo el motor dos
// veces. Nunca «deducción × alícuota»: en el borde de un tramo eso da mal.
// scripts/check_informe_ganancias.ts vigila las dos cosas.

import { calcularRetencionMensual, type FilaRetencion } from "@/lib/ganancias";
import { calcularDeduccionAlquiler, alquilerMensualQueAgotaElTope } from "@/lib/deduccion-alquiler";
import { calcularDeduccionDomestica } from "@/lib/deduccion-domestica";
import { calcularDeduccionesGenerales, type ConceptoId } from "@/lib/deducciones-generales";
import { DEDUCCIONES, ESCALA_GANANCIAS } from "@/data/ganancias";
import { TOPE_DEDUCCION_ALQUILER } from "@/data/deduccion-alquiler";
import { TOPE_DEDUCCION_ANUAL } from "@/data/deduccion-domestica";
import { TOPE_INTERESES_HIPOTECARIOS, TOPE_SEGUROS_VIGENTE } from "@/data/deducciones-generales";
import { MAX_HIJOS, entradaDelMotor, type Datos } from "@/lib/prefill/ganancias";

export const SLUG_INFORME = "informe-ganancias";
export const RUTA_LANDING_INFORME = "/informes/ganancias";
/** Sólo para pintar el precio donde no se puede leer el catálogo (componentes de cliente).
 *  El cobro y la validación del pago leen SIEMPRE el precio de src/lib/mp.ts. */
export const PRECIO_INFORME_REFERENCIA = 5900;
export const ANIO_FISCAL = 2026;
/** Fecha tope del F.572 web para el período 2026 (ARCA: «al 31 de marzo» del año siguiente). */
export const FECHA_TOPE_SIRADIG = "2027-03-31";

/** Art. 85 inc. j) LIG (Ley 27.701): «hasta el límite del cuarenta por ciento (40%) del importe
 *  establecido en el inciso a) del mencionado artículo 30». Rota con la tabla, no se copia. */
export const TOPE_EDUCACION = Math.round(DEDUCCIONES.mni * 0.4 * 100) / 100;

/** Lo que la persona paga, cargado en el informe. Vive en su navegador: no viaja con el pago. */
export type Gastos = {
  alquilerMensual: number;
  titularInmueble: boolean;
  domesticaMensual: number;
  domesticaHoras: number;
  prepagaMensual: number;
  honorariosAnual: number;
  educacionMensual: number;
  seguroVidaMensual: number;
  seguroRetiroMensual: number;
  donacionesAnual: number;
  hipotecario: boolean;
};

export const GASTOS_VACIOS: Gastos = {
  alquilerMensual: 0,
  titularInmueble: false,
  domesticaMensual: 0,
  domesticaHoras: 16,
  prepagaMensual: 0,
  honorariosAnual: 0,
  educacionMensual: 0,
  seguroVidaMensual: 0,
  seguroRetiroMensual: 0,
  donacionesAnual: 0,
  hipotecario: false,
};

export type DeduccionId =
  | "alquiler"
  | "domestica"
  | "prepaga"
  | "honorarios"
  | "educacion"
  | "seguroVida"
  | "seguroRetiro"
  | "donaciones"
  | "hipotecario";

type Ficha = {
  titulo: string;
  norma: string;
  /** Una línea: qué es y el límite, en criollo. */
  regla: string;
  /** Qué tenés que tener para cargarla (lo que ARCA puede pedirte). */
  papeles: string[];
  /** Qué opción elegir dentro de «Agregar deducciones y desgravaciones» y qué te pide. */
  siradig: string;
  calculadora?: { href: string; texto: string };
};

export const FICHAS: Record<DeduccionId, Ficha> = {
  alquiler: {
    titulo: "Alquiler de tu vivienda",
    norma: "Art. 85 inc. h) LIG",
    regla: "El 40% de lo que pagás, con tope en la ganancia no imponible del año. Sólo si no sos titular de ningún inmueble, en ninguna proporción.",
    papeles: [
      "Factura o documento equivalente del dueño por cada mes (con su CUIT).",
      "El contrato en PDF: la ayuda de ARCA pide adjuntarlo una vez.",
      "Comprobantes de pago de cada mes.",
    ],
    siradig: "Alquiler de inmuebles destinado a casa habitación › Beneficio 40% - Inquilinos no propietarios. No elijas el «Beneficio 10%»: desde 2026 no corre para la vivienda (Ley 27.802).",
    calculadora: { href: "/deduccion-alquiler", texto: "Calculadora de deducción por alquiler" },
  },
  domestica: {
    titulo: "Personal de casas particulares",
    norma: "Ley 26.063, art. 16",
    regla: "El sueldo que le pagás y las contribuciones de jubilación y obra social (no la ART), con tope en la ganancia no imponible. La relación tiene que estar registrada.",
    papeles: [
      "Recibos de sueldo de cada mes.",
      "Los pagos mensuales a ARCA (VEP o comprobante de Casas Particulares).",
      "CUIL de la trabajadora o el trabajador.",
    ],
    siradig: "Deducción del personal doméstico: un detalle de pagos por mes, con sueldo, contribución y fechas de pago.",
    calculadora: { href: "/deduccion-empleada-domestica", texto: "Calculadora de deducción por empleada doméstica" },
  },
  prepaga: {
    titulo: "Prepaga o plan complementario",
    norma: "Art. 85 inc. f) LIG",
    regla: "Lo que pagás de cuota por vos y tus cargas de familia, hasta el 5% de tu ganancia neta del año.",
    papeles: ["Facturas de la prepaga de cada mes, con su CUIT."],
    siradig: "Cuotas médico-asistenciales: CUIT de la prepaga, un mes por vez o un rango, y cada factura.",
    calculadora: { href: "/deducciones-generales-ganancias", texto: "Calculadora de deducciones generales" },
  },
  honorarios: {
    titulo: "Médicos, dentista, psicólogo, kinesiólogo",
    norma: "Art. 85 inc. g) LIG",
    regla: "El 40% de lo que te facturaron y la prepaga no te reintegró, hasta el 5% de tu ganancia neta. Vale también para tus cargas de familia.",
    papeles: ["Factura de cada profesional a tu nombre, con su CUIT."],
    siradig: "La opción de honorarios por servicios de asistencia sanitaria, médica y paramédica: una carga por profesional, con cada factura.",
    calculadora: { href: "/deducciones-generales-ganancias", texto: "Calculadora de deducciones generales" },
  },
  educacion: {
    titulo: "Colegio, jardín, útiles y uniformes",
    norma: "Art. 85 inc. j) LIG (Ley 27.701)",
    regla: "Lo que pagás de educación de tus hijos a cargo, y de hijos de hasta 24 años que estudian, hasta el 40% de la ganancia no imponible.",
    papeles: [
      "Factura del colegio o del instituto con su CUIT (enseñanza oficial, jardín o guardería).",
      "Facturas de útiles, guardapolvos y uniformes.",
    ],
    siradig: "Gastos de educación: CUIT del colegio o la librería, tipo de gasto y el hijo al que corresponde.",
  },
  seguroVida: {
    titulo: "Seguro de vida",
    norma: "Art. 85 inc. b) LIG",
    regla: "Lo que pagás de prima, con un tope anual que se actualiza por inflación. Lo que pasa del tope se puede deducir en años siguientes.",
    papeles: ["Póliza y comprobantes de pago de la aseguradora."],
    siradig: "Primas de seguro para el caso de muerte: CUIT de la aseguradora y lo pagado por mes.",
    calculadora: { href: "/deducciones-generales-ganancias", texto: "Calculadora de deducciones generales" },
  },
  seguroRetiro: {
    titulo: "Seguro de retiro privado",
    norma: "Art. 85 inc. i) LIG",
    regla: "Los aportes a un plan de retiro de una aseguradora controlada por la Superintendencia de Seguros, con el mismo tope anual que el seguro de vida.",
    papeles: ["Póliza y comprobantes de pago de la aseguradora."],
    siradig: "Aportes a planes de seguro de retiro privados: CUIT de la aseguradora y lo pagado por mes.",
    calculadora: { href: "/deducciones-generales-ganancias", texto: "Calculadora de deducciones generales" },
  },
  donaciones: {
    titulo: "Donaciones",
    norma: "Art. 85 inc. c) LIG",
    regla: "A entidades reconocidas como exentas por ARCA, hechas por banco (transferencia, débito o tarjeta), hasta el 5% de tu ganancia neta.",
    papeles: ["Constancia de la entidad y comprobante bancario de cada donación."],
    siradig: "Donaciones: CUIT de la entidad y cada pago.",
    calculadora: { href: "/deducciones-generales-ganancias", texto: "Calculadora de deducciones generales" },
  },
  hipotecario: {
    titulo: "Intereses del crédito hipotecario",
    norma: "Art. 85 inc. a) LIG",
    regla: "Los intereses del crédito para comprar o construir tu vivienda, hasta $20.000 por año: un tope fijo que la ley no actualiza.",
    papeles: ["Resumen anual del banco con los intereses pagados."],
    siradig: "Intereses por préstamos hipotecarios: CUIT del banco y los intereses del año.",
  },
};

export const ORDEN_DEDUCCIONES: DeduccionId[] = [
  "alquiler",
  "domestica",
  "prepaga",
  "honorarios",
  "educacion",
  "seguroVida",
  "seguroRetiro",
  "donaciones",
  "hipotecario",
];

export type Oportunidad = {
  id: DeduccionId;
  /** Máximo deducible en el año para esta persona. */
  techo: number;
  /** Lo que le devuelve llegar al techo, solo esa deducción. */
  ahorroTecho: number;
  /** Lo que cargó que paga en el año (0 si no cargó nada). */
  pagadoAnual: number;
  /** Lo que de eso se puede deducir, según el motor de la deducción. */
  deducible: number;
  /** Lo que le devuelve, solo esa deducción. */
  ahorro: number;
  /** Para la nota «con tanto por mes ya llegás al tope». null si el tope no depende de un pago mensual. */
  mensualParaTope: number | null;
};

export type Informe = {
  datos: Datos;
  gastos: Gastos;
  filas: FilaRetencion[];
  /** Con los gastos cargados; null si no cargó ninguno que se pueda deducir. */
  filasCon: FilaRetencion[] | null;
  total: number;
  totalCon: number;
  /** Todas las deducciones cargadas juntas (no es la suma de cada una: los tramos lo impiden). */
  ahorroTotal: number;
  paga: boolean;
  mesComun: number;
  junio: number;
  diciembre: number;
  /** Ganancias que se lleva el aguinaldo en el año: total con SAC − total sin SAC. */
  costoAguinaldo: number;
  gniAnual: number;
  alicuotaMarginal: number;
  /** Alícuota del tramo en que cae cada mes la ganancia extrapolada. */
  alicuotaPorMes: number[];
  /** Lo que devuelve en el año deducir $100.000 por mes. */
  porCada100k: number;
  /** Retención total / sueldo bruto anual con aguinaldo. */
  tasaEfectiva: number;
  oportunidades: Oportunidad[];
  /** Todas al techo a la vez: el máximo legal, con el impuesto del año como límite natural. */
  ahorroTechoTotal: number;
  cargas: { conyuge: number | null; hijo: number | null };
};

const totalDe = (filas: FilaRetencion[]) => filas[filas.length - 1].retencionAcumulada;

function correr(d: Datos, extraAnual = 0): FilaRetencion[] {
  return calcularRetencionMensual(entradaDelMotor(d, extraAnual));
}

export function alicuotaDeTramo(gni: number): number {
  if (gni <= 0) return 0;
  let a = ESCALA_GANANCIAS[0].alicuota;
  for (const t of ESCALA_GANANCIAS) {
    if (gni > t.desde) a = t.alicuota;
    else break;
  }
  return a;
}

/** Lo deducible de cada gasto en el año, con los motores de las calculadoras de deducciones. */
export function deduciblesDe(d: Datos, g: Gastos): Record<DeduccionId, { pagado: number; deducible: number }> {
  const familia = { conyuge: d.conyuge, hijos: d.hijos };

  const alq = calcularDeduccionAlquiler({
    alquilerMensual: g.alquilerMensual,
    mesesPagados: 12,
    brutoMensual: d.bruto,
    ...familia,
    titularDeInmueble: g.titularInmueble,
    computarDiezPorCiento: false,
  });

  const dom =
    g.domesticaMensual > 0
      ? calcularDeduccionDomestica({
          sueldoMensual: g.domesticaMensual,
          mesesTrabajados: 12,
          incluirAguinaldo: true,
          horasSemanales: g.domesticaHoras,
          condicion: "activo-mayor-18",
          brutoMensualEmpleador: d.bruto,
          ...familia,
        })
      : null;

  const gen = calcularDeduccionesGenerales({
    brutoMensual: d.bruto,
    ...familia,
    prepagaAnual: g.prepagaMensual * 12,
    honorariosFacturadosAnual: g.honorariosAnual,
    honorariosReintegradosAnual: 0,
    seguroVidaAnual: g.seguroVidaMensual * 12,
    seguroRetiroAnual: g.seguroRetiroMensual * 12,
    donacionesAnual: g.donacionesAnual,
    interesesHipotecariosAnual: g.hipotecario ? TOPE_INTERESES_HIPOTECARIOS : 0,
  });
  const linea = (id: ConceptoId) => {
    const l = gen.lineas.find((x) => x.id === id)!;
    return { pagado: l.pagado, deducible: l.deducible };
  };

  const educacionPagado = Math.max(0, g.educacionMensual) * 12;

  return {
    alquiler: { pagado: alq.alquilerAnual, deducible: alq.deduccionIncH },
    domestica: dom
      ? { pagado: dom.remuneracionAnual + dom.contribucionesAnual, deducible: dom.deduccionAplicada }
      : { pagado: 0, deducible: 0 },
    prepaga: linea("prepaga"),
    honorarios: linea("honorarios"),
    educacion: { pagado: educacionPagado, deducible: Math.min(educacionPagado, TOPE_EDUCACION) },
    seguroVida: linea("seguroVida"),
    seguroRetiro: linea("seguroRetiro"),
    donaciones: linea("donaciones"),
    hipotecario: linea("hipotecario"),
  };
}

/** Máximo deducible de cada concepto para este sueldo. */
export function techosDe(d: Datos, titularInmueble = false): Record<DeduccionId, number> {
  const cinco = calcularDeduccionesGenerales({
    brutoMensual: d.bruto,
    conyuge: d.conyuge,
    hijos: d.hijos,
    prepagaAnual: 0,
    honorariosFacturadosAnual: 0,
    honorariosReintegradosAnual: 0,
    seguroVidaAnual: 0,
    seguroRetiroAnual: 0,
    donacionesAnual: 0,
    interesesHipotecariosAnual: 0,
  }).topeCincoPorCiento;
  return {
    alquiler: titularInmueble ? 0 : TOPE_DEDUCCION_ALQUILER,
    domestica: TOPE_DEDUCCION_ANUAL,
    prepaga: cinco,
    honorarios: cinco,
    educacion: TOPE_EDUCACION,
    seguroVida: TOPE_SEGUROS_VIGENTE,
    seguroRetiro: TOPE_SEGUROS_VIGENTE,
    donaciones: cinco,
    hipotecario: TOPE_INTERESES_HIPOTECARIOS,
  };
}

export function armarInforme(d: Datos, g: Gastos = GASTOS_VACIOS): Informe | null {
  if (!(d.bruto > 0)) return null;
  const filas = correr(d);
  const total = totalDe(filas);
  const ahorroDe = (extra: number) => (extra > 0 ? Math.max(0, total - totalDe(correr(d, extra))) : 0);

  const deducibles = deduciblesDe(d, g);
  const techos = techosDe(d, g.titularInmueble);

  const oportunidades: Oportunidad[] = ORDEN_DEDUCCIONES.map((id) => ({
    id,
    techo: techos[id],
    ahorroTecho: ahorroDe(techos[id]),
    pagadoAnual: deducibles[id].pagado,
    deducible: deducibles[id].deducible,
    ahorro: ahorroDe(deducibles[id].deducible),
    mensualParaTope:
      id === "alquiler"
        ? alquilerMensualQueAgotaElTope()
        : id === "prepaga" || id === "educacion" || id === "seguroVida" || id === "seguroRetiro"
          ? techos[id] / 12
          : null,
  }));

  const deducibleTotal = oportunidades.reduce((s, o) => s + o.deducible, 0);
  const filasCon = deducibleTotal > 0 ? correr(d, deducibleTotal) : null;
  const totalCon = filasCon ? totalDe(filasCon) : total;

  const sinSac = totalDe(calcularRetencionMensual({ ...entradaDelMotor(d), incluirSAC: false }));
  const gniAnual = filas[filas.length - 1].gniExtrapolada;

  return {
    datos: d,
    gastos: g,
    filas,
    filasCon,
    total,
    totalCon,
    ahorroTotal: Math.max(0, total - totalCon),
    paga: total > 0,
    mesComun: filas[0].retencionMes,
    junio: filas[5].retencionMes,
    diciembre: filas[11].retencionMes,
    costoAguinaldo: Math.max(0, total - sinSac),
    gniAnual,
    alicuotaMarginal: alicuotaDeTramo(gniAnual),
    alicuotaPorMes: filas.map((f) => alicuotaDeTramo(f.gniExtrapolada)),
    porCada100k: ahorroDe(1_200_000),
    tasaEfectiva: d.bruto > 0 ? total / (d.bruto * 13) : 0,
    oportunidades,
    ahorroTechoTotal: ahorroDe(oportunidades.reduce((s, o) => s + o.techo, 0)),
    cargas: {
      conyuge: d.conyuge ? null : Math.max(0, total - totalDe(correr({ ...d, conyuge: true }))),
      hijo: d.hijos >= MAX_HIJOS ? null : Math.max(0, total - totalDe(correr({ ...d, hijos: d.hijos + 1 }))),
    },
  };
}

/** Las tres deducciones que más le pueden devolver a esta persona: es la vista previa de la oferta. */
export function principales(inf: Informe, n = 3): Oportunidad[] {
  return [...inf.oportunidades].sort((a, b) => b.ahorroTecho - a.ahorroTecho).slice(0, n);
}

/** Caso de ejemplo de la landing: un sueldo que paga Ganancias de verdad, con dos hijos. */
export const CASO_EJEMPLO: Datos = { bruto: 5_200_000, conyuge: false, hijos: 2, sindical: 0, otras: 0 };
export const GASTOS_EJEMPLO: Gastos = {
  ...GASTOS_VACIOS,
  alquilerMensual: 850_000,
  prepagaMensual: 260_000,
  educacionMensual: 180_000,
};
