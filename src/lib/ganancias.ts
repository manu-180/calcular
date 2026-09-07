import { DEDUCCIONES, ESCALA_GANANCIAS } from "@/data/ganancias";
import { TOTAL_APORTES, TOPE_SIPA } from "@/data/sueldo";

// Aplica la escala progresiva del art. 94 a una ganancia neta imponible ANUAL.
// Devuelve el impuesto anual determinado. gni ≤ 0 → 0.
export function impuestoSegunEscala(gni: number): number {
  if (gni <= 0) return 0;
  let tramo = ESCALA_GANANCIAS[0];
  for (const t of ESCALA_GANANCIAS) {
    if (gni > t.desde) tramo = t;
    else break;
  }
  return tramo.fijo + (gni - tramo.excedenteSobre) * tramo.alicuota;
}

export type EstimacionGanancias = {
  gananciaBrutaAnual: number;
  aportesAnual: number;
  deduccionesPersonales: number;
  otrasDeducciones: number;
  gananciaNetaImponible: number;
  impuestoAnual: number;
  retencionMensual: number;
  pagaGanancias: boolean;
};

export type FilaRetencion = {
  mes: number;
  nombreMes: string;
  brutoMes: number;
  aportesMes: number;
  gananciaAcumulada: number;
  gniExtrapolada: number;
  impuestoAnualProyectado: number;
  retencionAcumulada: number;
  retencionMes: number;
};

// Retención mensual acumulada según RG ARCA 5008 (método real del empleador).
// Para cada mes M: acumula el bruto (incluye SAC en junio y diciembre), descuenta
// aportes y deducciones proporcionales a M/12, extrapola la GNI a año completo,
// aplica la escala y calcula cuánto corresponde retener ese mes.
// Asume sueldo bruto fijo durante todo el año (SAC = 50% del bruto mensual).
export function calcularRetencionMensual(opts: {
  brutoMensual: number;
  conyuge?: boolean;
  hijos?: number;
  sindicalPct?: number;
  otrasDeduccionesAnual?: number;
  incluirSAC?: boolean;
}): FilaRetencion[] {
  const {
    brutoMensual,
    conyuge = false,
    hijos = 0,
    sindicalPct = 0,
    otrasDeduccionesAnual = 0,
    incluirSAC = true,
  } = opts;

  const deduccionesPersonalesAnuales =
    DEDUCCIONES.mni +
    DEDUCCIONES.deduccionEspecialDependencia +
    (conyuge ? DEDUCCIONES.conyuge : 0) +
    Math.max(0, Math.floor(hijos)) * DEDUCCIONES.hijo;

  const NOMBRES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  const filas: FilaRetencion[] = [];
  let gananciaAcumulada = 0;
  let aportesAcumulados = 0;
  let sindicalAcumulada = 0;
  let retencionAcumuladaPrevia = 0;

  for (let mes = 1; mes <= 12; mes++) {
    const sac = incluirSAC && (mes === 6 || mes === 12) ? brutoMensual * 0.5 : 0;
    const brutoMes = brutoMensual + sac;

    const aportesBruto = Math.min(brutoMensual, TOPE_SIPA.baseMaxima) * TOTAL_APORTES;
    const aportesSAC = sac > 0 ? Math.min(sac, TOPE_SIPA.baseMaxima) * TOTAL_APORTES : 0;
    const aportesMes = aportesBruto + aportesSAC;

    gananciaAcumulada += brutoMes;
    aportesAcumulados += aportesMes;
    sindicalAcumulada += brutoMes * sindicalPct;

    const deduccionesPersonalesProp = deduccionesPersonalesAnuales * (mes / 12);
    const otrasDeduccionesProp = otrasDeduccionesAnual * (mes / 12);

    const gniProporcional =
      gananciaAcumulada - aportesAcumulados - sindicalAcumulada -
      deduccionesPersonalesProp - otrasDeduccionesProp;

    const gniExtrapolada = gniProporcional > 0 ? gniProporcional * (12 / mes) : 0;
    const impuestoAnualProyectado = impuestoSegunEscala(gniExtrapolada);
    const retencionAcumulada = impuestoAnualProyectado * (mes / 12);
    const retencionMes = Math.max(0, retencionAcumulada - retencionAcumuladaPrevia);

    filas.push({
      mes,
      nombreMes: NOMBRES[mes - 1],
      brutoMes,
      aportesMes,
      gananciaAcumulada,
      gniExtrapolada,
      impuestoAnualProyectado,
      retencionAcumulada,
      retencionMes,
    });

    retencionAcumuladaPrevia = retencionAcumulada;
  }

  return filas;
}

// Estimación ANUAL orientativa del impuesto a las Ganancias de 4ta categoría.
// Modelo de año completo (no la retención mensual acumulada que liquida el empleador):
//   ingreso anual = 13 remuneraciones (12 sueldos + 1 SAC, ambos gravados)
//   − aportes (17% con tope SIPA) − cuota sindical − deducciones personales art. 30
//   − otras deducciones → ganancia neta imponible → escala art. 94 → impuesto anual.
// retención mensual ≈ impuesto anual / 12. Es una ESTIMACIÓN, no una liquidación.
export function estimarGananciasAnual(opts: {
  brutoMensual: number;
  conyuge?: boolean;
  hijos?: number;
  sindicalPct?: number;
  otrasDeduccionesAnual?: number;
}): EstimacionGanancias {
  const {
    brutoMensual,
    conyuge = false,
    hijos = 0,
    sindicalPct = 0,
    otrasDeduccionesAnual = 0,
  } = opts;

  const meses = 13; // 12 sueldos + 1 SAC
  const gananciaBrutaAnual = brutoMensual * meses;
  const baseAportes = Math.min(brutoMensual, TOPE_SIPA.baseMaxima);
  const aportesAnual = baseAportes * TOTAL_APORTES * meses;
  const sindicalAnual = brutoMensual * sindicalPct * meses;

  const deduccionesPersonales =
    DEDUCCIONES.mni +
    DEDUCCIONES.deduccionEspecialDependencia +
    (conyuge ? DEDUCCIONES.conyuge : 0) +
    Math.max(0, hijos) * DEDUCCIONES.hijo;

  const gni =
    gananciaBrutaAnual -
    aportesAnual -
    sindicalAnual -
    deduccionesPersonales -
    otrasDeduccionesAnual;

  const impuestoAnual = impuestoSegunEscala(gni);

  return {
    gananciaBrutaAnual,
    aportesAnual,
    deduccionesPersonales: deduccionesPersonales + otrasDeduccionesAnual,
    otrasDeducciones: otrasDeduccionesAnual,
    gananciaNetaImponible: Math.max(0, gni),
    impuestoAnual,
    retencionMensual: impuestoAnual / 12,
    pagaGanancias: impuestoAnual > 0,
  };
}
