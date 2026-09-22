// Motor de Ganancias anual para autónomos que trabajan personalmente (art. 30 inc. c) apdo. 1).
// Funciones puras. Modelo de declaración jurada anual: no hay retención mensual ni doceava parte
// (la doceava es sólo del apartado 2, el de empleados y jubilados).

import { DEDUCCIONES } from "@/data/ganancias";
import { MESES_NUEVO_PROFESIONAL } from "@/data/ganancias-autonomos";
import { impuestoSegunEscala } from "@/lib/ganancias";

const r2 = (n: number) => Math.round(n * 100) / 100;

export type EntradaAutonomos = {
  /** Ganancia neta del año de la actividad: lo facturado menos los gastos deducibles. */
  gananciaNetaAnual: number;
  /** Aporte mensual de autónomos (o a la caja profesional sustitutiva). */
  aporteMensual: number;
  /** Meses desde la matrícula o la inscripción al inicio del año. */
  mesesDeAntiguedad?: number;
  conyuge?: boolean;
  hijos?: number;
  otrasDeduccionesAnual?: number;
};

export type Tipo = "nuevo" | "comun" | "sin-aportes";

export type ResultadoAutonomos = {
  tipo: Tipo;
  aportesAnual: number;
  deduccionEspecial: number;
  cargasFamilia: number;
  deduccionesTotales: number;
  gananciaNetaImponible: number;
  impuestoAnual: number;
  alicuotaEfectiva: number;
  /** Impuesto que pagaría con la especial común (2,5 veces): la diferencia es lo que vale ser «nuevo». */
  impuestoComoComun: number;
  ahorroPorNuevo: number;
  /** Impuesto si no pagara los aportes: pierde la especial entera. */
  impuestoSinAportes: number;
};

export function tipoDe(e: EntradaAutonomos): Tipo {
  if ((e.aporteMensual || 0) <= 0) return "sin-aportes";
  return (e.mesesDeAntiguedad ?? 999) <= MESES_NUEVO_PROFESIONAL ? "nuevo" : "comun";
}

export function especialPara(tipo: Tipo) {
  if (tipo === "nuevo") return DEDUCCIONES.deduccionEspecialNuevosProfesionales;
  if (tipo === "comun") return DEDUCCIONES.deduccionEspecialAutonomos;
  return 0;
}

function impuestoCon(e: EntradaAutonomos, tipo: Tipo) {
  const aportesAnual = r2(Math.max(0, e.aporteMensual || 0) * 12);
  const cargasFamilia = r2(
    (e.conyuge ? DEDUCCIONES.conyuge : 0) + Math.max(0, Math.floor(e.hijos ?? 0)) * DEDUCCIONES.hijo,
  );
  const deduccionEspecial = especialPara(tipo);
  const deduccionesTotales = r2(
    DEDUCCIONES.mni + deduccionEspecial + cargasFamilia + Math.max(0, e.otrasDeduccionesAnual ?? 0),
  );
  const gni = r2(Math.max(0, (e.gananciaNetaAnual || 0) - aportesAnual - deduccionesTotales));
  return {
    aportesAnual,
    cargasFamilia,
    deduccionEspecial,
    deduccionesTotales,
    gni,
    impuesto: r2(impuestoSegunEscala(gni)),
  };
}

export function calcularGananciasAutonomos(e: EntradaAutonomos): ResultadoAutonomos {
  const tipo = tipoDe(e);
  const real = impuestoCon(e, tipo);
  const comun = tipo === "nuevo" ? impuestoCon(e, "comun").impuesto : real.impuesto;
  const sinAportes = impuestoCon({ ...e, aporteMensual: 0 }, "sin-aportes").impuesto;
  const bruto = Math.max(0, e.gananciaNetaAnual || 0);
  return {
    tipo,
    aportesAnual: real.aportesAnual,
    deduccionEspecial: real.deduccionEspecial,
    cargasFamilia: real.cargasFamilia,
    deduccionesTotales: real.deduccionesTotales,
    gananciaNetaImponible: real.gni,
    impuestoAnual: real.impuesto,
    alicuotaEfectiva: bruto > 0 ? real.impuesto / bruto : 0,
    impuestoComoComun: comun,
    ahorroPorNuevo: r2(comun - real.impuesto),
    impuestoSinAportes: sinAportes,
  };
}

/** Ganancia neta anual (antes de aportes) desde la que se paga, con los mismos datos. */
export function umbralAutonomos(e: Omit<EntradaAutonomos, "gananciaNetaAnual">) {
  const tipo = tipoDe({ ...e, gananciaNetaAnual: 0 });
  const { aportesAnual, deduccionesTotales } = impuestoCon({ ...e, gananciaNetaAnual: 0 }, tipo);
  return r2(aportesAnual + deduccionesTotales);
}
