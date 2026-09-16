// Motor de las deducciones generales de Ganancias (art. 85 LIG). Funciones puras.
//
// Cada inciso tiene su propio límite y se aplica por separado: prepaga, honorarios médicos y
// donaciones tienen CADA UNO un 5% de la misma base, no un 5% compartido. Honorarios además pasa
// primero por el 40% de lo facturado. Los seguros de vida y de retiro tienen cada uno el tope
// anual derivado del IPC; el excedente de vida se difiere a años siguientes por texto expreso del
// inc. b), y el del retiro no (el párrafo del diferimiento está dentro del inc. b)).
//
// La base del 5% es una estimación para relación de dependencia: sueldo bruto anual con aguinaldo
// menos aportes obligatorios, antes de deducciones personales. Otras rentas o quebrantos la
// cambian; la página lo dice.

import { estimarGananciasAnual, type EstimacionGanancias } from "./ganancias";
import {
  PORCENTAJE_HONORARIOS_FACTURADOS,
  PORCENTAJE_TOPE_GANANCIA_NETA,
  TOPE_INTERESES_HIPOTECARIOS,
  TOPE_SEGUROS_VIGENTE,
} from "@/data/deducciones-generales";

export type EntradaDeduccionesGenerales = {
  brutoMensual: number;
  conyuge: boolean;
  hijos: number;
  /** Todos los importes son ANUALES, pagados en el período fiscal. */
  prepagaAnual: number;
  honorariosFacturadosAnual: number;
  /** Parte de los honorarios que la prepaga u obra social ya te reintegró. */
  honorariosReintegradosAnual: number;
  seguroVidaAnual: number;
  seguroRetiroAnual: number;
  donacionesAnual: number;
  interesesHipotecariosAnual: number;
};

export type ConceptoId = "prepaga" | "honorarios" | "seguroVida" | "seguroRetiro" | "donaciones" | "hipotecario";

export type LineaDeduccion = {
  id: ConceptoId;
  concepto: string;
  inciso: string;
  pagado: number;
  /** Lo que entra antes del límite (en honorarios: 40% de lo facturado sin reintegro). */
  computable: number;
  limite: number;
  deducible: number;
  /** Lo que no entra este año. */
  excedente: number;
  /** true si el excedente se puede deducir en años siguientes (sólo seguro de vida). */
  excedenteDiferible: boolean;
  limiteDescripcion: string;
};

export type ResultadoDeduccionesGenerales = {
  baseCincoPorCiento: number;
  topeCincoPorCiento: number;
  lineas: LineaDeduccion[];
  totalPagado: number;
  totalDeducible: number;
  impuestoSin: EstimacionGanancias;
  impuestoCon: EstimacionGanancias;
  ahorroAnual: number;
  alicuotaEfectiva: number;
};

const positivo = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0);
const centavos = (n: number) => Math.round(n * 100) / 100;

function linea(
  id: ConceptoId,
  concepto: string,
  inciso: string,
  pagado: number,
  computable: number,
  limite: number,
  limiteDescripcion: string,
  excedenteDiferible = false,
): LineaDeduccion {
  const deducible = centavos(Math.min(computable, limite));
  return {
    id,
    concepto,
    inciso,
    pagado,
    computable: centavos(computable),
    limite: centavos(limite),
    deducible,
    excedente: centavos(Math.max(0, pagado - deducible)),
    excedenteDiferible,
    limiteDescripcion,
  };
}

export function calcularDeduccionesGenerales(e: EntradaDeduccionesGenerales): ResultadoDeduccionesGenerales {
  const base = {
    brutoMensual: positivo(e.brutoMensual),
    conyuge: e.conyuge,
    hijos: Math.floor(positivo(e.hijos)),
  };
  const impuestoSin = estimarGananciasAnual(base);
  const baseCincoPorCiento = Math.max(0, impuestoSin.gananciaBrutaAnual - impuestoSin.aportesAnual);
  const topeCincoPorCiento = centavos(baseCincoPorCiento * PORCENTAJE_TOPE_GANANCIA_NETA);

  const prepaga = positivo(e.prepagaAnual);
  const facturado = positivo(e.honorariosFacturadosAnual);
  const reintegrado = Math.min(facturado, positivo(e.honorariosReintegradosAnual));
  const honorariosComputable = (facturado - reintegrado) * PORCENTAJE_HONORARIOS_FACTURADOS;

  const lineas: LineaDeduccion[] = [
    linea("prepaga", "Cuota de prepaga", "inc. f)", prepaga, prepaga, topeCincoPorCiento, "5% de la ganancia neta"),
    linea(
      "honorarios",
      "Honorarios médicos y paramédicos",
      "inc. g)",
      facturado,
      honorariosComputable,
      topeCincoPorCiento,
      "40% de lo facturado, con tope del 5% de la ganancia neta",
    ),
    linea(
      "seguroVida",
      "Seguro de vida (y mixtos)",
      "inc. b)",
      positivo(e.seguroVidaAnual),
      positivo(e.seguroVidaAnual),
      TOPE_SEGUROS_VIGENTE,
      "tope anual ajustado por IPC",
      true,
    ),
    linea(
      "seguroRetiro",
      "Seguro de retiro privado",
      "inc. i)",
      positivo(e.seguroRetiroAnual),
      positivo(e.seguroRetiroAnual),
      TOPE_SEGUROS_VIGENTE,
      "tope anual ajustado por IPC",
    ),
    linea(
      "donaciones",
      "Donaciones",
      "inc. c)",
      positivo(e.donacionesAnual),
      positivo(e.donacionesAnual),
      topeCincoPorCiento,
      "5% de la ganancia neta",
    ),
    linea(
      "hipotecario",
      "Intereses de crédito hipotecario",
      "inc. a)",
      positivo(e.interesesHipotecariosAnual),
      positivo(e.interesesHipotecariosAnual),
      TOPE_INTERESES_HIPOTECARIOS,
      "$20.000 fijos por año",
    ),
  ];

  const totalPagado = centavos(lineas.reduce((s, l) => s + l.pagado, 0));
  const totalDeducible = centavos(lineas.reduce((s, l) => s + l.deducible, 0));
  const impuestoCon = estimarGananciasAnual({ ...base, otrasDeduccionesAnual: totalDeducible });
  const ahorroAnual = Math.max(0, impuestoSin.impuestoAnual - impuestoCon.impuestoAnual);

  return {
    baseCincoPorCiento,
    topeCincoPorCiento,
    lineas,
    totalPagado,
    totalDeducible,
    impuestoSin,
    impuestoCon,
    ahorroAnual,
    alicuotaEfectiva: totalDeducible > 0 ? ahorroAnual / totalDeducible : 0,
  };
}
