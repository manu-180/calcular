import { APORTES_PERSONALES, type Semestre } from "@/data/aguinaldo";

const DIA_MS = 86_400_000;

function aUTC(iso: string): number {
  return Date.parse(`${iso}T00:00:00Z`);
}

// Días entre dos fechas ISO (YYYY-MM-DD), ambos extremos incluidos.
export function diasInclusivos(desdeISO: string, hastaISO: string): number {
  return Math.round((aUTC(hastaISO) - aUTC(desdeISO)) / DIA_MS) + 1;
}

export type ResultadoAguinaldo = {
  brutoSemestreCompleto: number;
  bruto: number;
  esProporcional: boolean;
  diasTrabajados: number;
  diasTotales: number;
  aportes: { jubilacion: number; pami: number; obraSocial: number; total: number };
  netoEstimado: number;
};

export function calcularAguinaldo(params: {
  mejorSueldo: number;
  semestre: Semestre;
  ingresoISO?: string;
  egresoISO?: string;
}): ResultadoAguinaldo {
  const { mejorSueldo, semestre, ingresoISO, egresoISO } = params;

  // Las fechas ISO (YYYY-MM-DD) se comparan lexicográficamente.
  const desde =
    ingresoISO && ingresoISO > semestre.inicioISO ? ingresoISO : semestre.inicioISO;
  const hasta = egresoISO && egresoISO < semestre.finISO ? egresoISO : semestre.finISO;

  const diasTotales = diasInclusivos(semestre.inicioISO, semestre.finISO);
  const diasTrabajados =
    desde > hasta ? 0 : Math.min(diasInclusivos(desde, hasta), diasTotales);

  const brutoSemestreCompleto = mejorSueldo / 2;
  const bruto = (brutoSemestreCompleto * diasTrabajados) / diasTotales;

  const jubilacion = bruto * APORTES_PERSONALES.jubilacion;
  const pami = bruto * APORTES_PERSONALES.pami;
  const obraSocial = bruto * APORTES_PERSONALES.obraSocial;
  const totalAportes = jubilacion + pami + obraSocial;

  return {
    brutoSemestreCompleto,
    bruto,
    esProporcional: diasTrabajados < diasTotales,
    diasTrabajados,
    diasTotales,
    aportes: { jubilacion, pami, obraSocial, total: totalAportes },
    netoEstimado: bruto - totalAportes,
  };
}
