// Todo número del informe sale de acá, y acá todo sale de `actualizarCreditoLaboral`: el mismo
// motor que usa la calculadora web, llamado una vez por rubro. Si el informe y la web dieran
// distinto para el mismo crédito, el abogado tendría dos cifras para el mismo expediente: eso lo
// vigila scripts/check_informe_credito_laboral.ts.

import { TASA_PURA_ANUAL } from "@/data/actualizacion-creditos";
import { actualizarCreditoLaboral, type ResultadoCredito } from "@/lib/actualizacion-creditos";
import {
  ULTIMO_PERIODO,
  indiceDe,
  mesesEntre,
  sumarMeses,
  variacionMensual,
  type Periodo,
} from "@/lib/inflacion";
import type { Datos, Rubro } from "@/lib/prefill/credito-laboral";

export const SLUG_INFORME = "informe-credito-laboral";
export const RUTA_LANDING_INFORME = "/informes/credito-laboral";
/** Sólo para pintar el precio donde no se puede leer el catálogo (componentes de cliente).
 *  El cobro y la validación del pago leen SIEMPRE el precio de src/lib/mp.ts. */
export const PRECIO_INFORME_REFERENCIA = 6900;

/** Art. 55 inc. c) de la Ley 27.802: en juicios en trámite al 6/3/2026, el resultado no puede
 *  ser inferior al 67% del cálculo del inc. b) (IPC + 3% anual). */
export const PISO_ART_55 = 0.67;

export type FilaRubro = { rubro: Rubro; r: ResultadoCredito };

export type FilaCoeficiente = {
  periodo: Periodo;
  indice: number;
  varMensual: number | null;
  /** Por cuánto se multiplica una suma debida en ese mes para llevarla al último índice usado. */
  coeficiente: number;
  /** Algún rubro de la liquidación se hizo exigible en este mes. */
  usado: boolean;
};

export type Informe = {
  filas: FilaRubro[];
  hasta: Periodo;
  /** Último mes con IPC que se pudo usar (igual para todos los rubros: depende sólo del pago). */
  hastaIpc: Periodo;
  mesesSinIpc: number;
  capital: number;
  capitalActualizado: number;
  interes: number;
  total: number;
  totalCompuesto: number;
  cuotaLitis: number;
  neto: number;
  litis: number;
  /** Cuánto sube el total con un mes más de demora, con el último IPC publicado (null sin dato). */
  costoMensualPct: number | null;
  costoMensual: number | null;
  /** Banda del art. 55 para juicios en trámite al 6/3/2026: piso y tope. */
  piso55: number;
  coeficientes: FilaCoeficiente[];
};

export function armarInforme(d: Datos): Informe | null {
  const filas: FilaRubro[] = [];
  for (const rubro of d.rubros) {
    const r = actualizarCreditoLaboral({ monto: rubro.monto, desde: rubro.desde, hasta: d.hasta, cuotaLitisPct: d.litis });
    if (!r) return null;
    filas.push({ rubro, r });
  }
  if (filas.length === 0) return null;

  const suma = (f: (r: ResultadoCredito) => number) => filas.reduce((a, x) => a + f(x.r), 0);
  const total = suma((r) => r.total);
  const { hastaIpc, mesesSinIpc } = filas[0].r;

  const mensual = variacionMensual(ULTIMO_PERIODO);
  const costoMensualPct = mensual === null ? null : mensual + (TASA_PURA_ANUAL / 12) * 100;

  return {
    filas,
    hasta: d.hasta,
    hastaIpc,
    mesesSinIpc,
    capital: d.rubros.reduce((a, r) => a + r.monto, 0),
    capitalActualizado: suma((r) => r.capitalActualizado),
    interes: suma((r) => r.interesPuro),
    total,
    totalCompuesto: suma((r) => r.totalCompuesto),
    cuotaLitis: suma((r) => r.cuotaLitis),
    neto: suma((r) => r.neto),
    litis: Math.min(Math.max(d.litis, 0), 20),
    costoMensualPct,
    costoMensual: costoMensualPct === null ? null : (total * costoMensualPct) / 100,
    piso55: total * PISO_ART_55,
    coeficientes: tablaCoeficientes(d.rubros, hastaIpc),
  };
}

function tablaCoeficientes(rubros: Rubro[], hastaIpc: Periodo): FilaCoeficiente[] {
  const desdes = new Set(rubros.map((r) => r.desde));
  const primero = rubros.reduce((min, r) => (mesesEntre(r.desde, min) > 0 ? r.desde : min), rubros[0].desde);
  const indiceFinal = indiceDe(hastaIpc);
  if (indiceFinal === null) return [];
  const filas: FilaCoeficiente[] = [];
  for (let p = primero; mesesEntre(p, hastaIpc) >= 0; p = sumarMeses(p, 1)) {
    const indice = indiceDe(p);
    if (indice === null) continue;
    filas.push({ periodo: p, indice, varMensual: variacionMensual(p), coeficiente: indiceFinal / indice, usado: desdes.has(p) });
  }
  return filas;
}

/** Caso de ejemplo de la landing: un despido sin causa de hace un año y medio, con tres rubros. */
export function casoEjemplo(): Datos {
  const despido = sumarMeses(ULTIMO_PERIODO, -18);
  return {
    rubros: [
      { concepto: "antiguedad", monto: 4_200_000, desde: despido },
      { concepto: "preaviso", monto: 1_400_000, desde: despido },
      { concepto: "vacaciones", monto: 380_000, desde: despido },
      { concepto: "diferencias", monto: 650_000, desde: sumarMeses(despido, -6) },
    ],
    hasta: ULTIMO_PERIODO,
    litis: 0,
  };
}
