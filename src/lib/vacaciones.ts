import {
  ANIO_VACACIONES,
  DIAS_TRABAJO_POR_DIA_DESCANSO,
  DIVISOR_DIA_NORMAL,
  DIVISOR_VACACIONES,
  ESCALA_VACACIONES,
} from "@/data/vacaciones";

const DIA_MS = 86_400_000;

// Días lunes a viernes entre dos fechas ISO (YYYY-MM-DD), ambos extremos incluidos.
// Para el requisito del art. 151 los feriados cuentan como hábiles, así que no se descuentan.
export function diasHabiles(desdeISO: string, hastaISO: string): number {
  const desde = Date.parse(`${desdeISO}T00:00:00Z`);
  const hasta = Date.parse(`${hastaISO}T00:00:00Z`);
  let total = 0;
  for (let t = desde; t <= hasta; t += DIA_MS) {
    const diaSemana = new Date(t).getUTCDay();
    if (diaSemana !== 0 && diaSemana !== 6) total++;
  }
  return total;
}

// Días de la escala del art. 150 según la fecha de ingreso, midiendo la antigüedad
// al 31/12 del año de referencia. "No exceda de N años" ⟺ ingresó el 31/12 de
// (año − N) o después; las fechas ISO se comparan lexicográficamente.
export function diasPorAntiguedad(ingresoISO: string, anio = ANIO_VACACIONES): number {
  for (const tramo of ESCALA_VACACIONES) {
    if (tramo.maxAnios === null || ingresoISO >= `${anio - tramo.maxAnios}-12-31`) {
      return tramo.dias;
    }
  }
  return ESCALA_VACACIONES[ESCALA_VACACIONES.length - 1].dias;
}

// Antigüedad al 31/12 del año de referencia, en años y meses completos (para mostrar).
export function antiguedadAl31(
  ingresoISO: string,
  anio = ANIO_VACACIONES
): { anios: number; meses: number } {
  const [iy, im] = ingresoISO.split("-").map(Number);
  const mesesTotales = (anio - iy) * 12 + (12 - im);
  return { anios: Math.floor(mesesTotales / 12), meses: mesesTotales % 12 };
}

export type ResultadoVacaciones = {
  modo: "escala" | "proporcional";
  antiguedad: { anios: number; meses: number };
  dias: number;
  diasTomados: number;
  // Solo en el modo proporcional:
  diasHabilesTrabajados?: number;
  valorDiaVacaciones: number;
  valorDiaNormal: number;
  retribucion: number;
  plus: number;
};

export function calcularVacaciones(params: {
  sueldo: number;
  ingresoISO: string;
  diasATomar?: number;
  anio?: number;
}): ResultadoVacaciones | null {
  const anio = params.anio ?? ANIO_VACACIONES;
  const inicioAnio = `${anio}-01-01`;
  const cierre = `${anio}-12-31`;

  if (params.ingresoISO > cierre) return null;

  let modo: ResultadoVacaciones["modo"] = "escala";
  let dias = diasPorAntiguedad(params.ingresoISO, anio);
  let diasHabilesTrabajados: number | undefined;

  if (params.ingresoISO > inicioAnio) {
    // Ingresó durante el año: el art. 151 exige haber trabajado al menos la mitad
    // de los días hábiles del año para acceder a la escala completa.
    diasHabilesTrabajados = diasHabiles(params.ingresoISO, cierre);
    const diasHabilesAnio = diasHabiles(inicioAnio, cierre);
    if (diasHabilesTrabajados < diasHabilesAnio / 2) {
      modo = "proporcional";
      dias = Math.floor(diasHabilesTrabajados / DIAS_TRABAJO_POR_DIA_DESCANSO);
    }
  }

  const diasTomados = Math.min(Math.max(params.diasATomar ?? dias, 0), dias);
  const valorDiaVacaciones = params.sueldo / DIVISOR_VACACIONES;
  const valorDiaNormal = params.sueldo / DIVISOR_DIA_NORMAL;

  return {
    modo,
    antiguedad: antiguedadAl31(params.ingresoISO, anio),
    dias,
    diasTomados,
    diasHabilesTrabajados,
    valorDiaVacaciones,
    valorDiaNormal,
    retribucion: valorDiaVacaciones * diasTomados,
    plus: (valorDiaVacaciones - valorDiaNormal) * diasTomados,
  };
}
