import { MESES_FRACCION_ANIO } from "@/data/indemnizacion";
import { TOTAL_APORTES } from "@/data/sueldo";
import { DIVISOR_VACACIONES, ESCALA_VACACIONES } from "@/data/vacaciones";

// Qué cambia en la plata cuando las propinas dejan de ser remuneración (LCT art. 104, texto
// sustituido por el art. 32 de la Ley 27.802). El cálculo no inventa ningún monto: toma dos bases
// —con y sin propinas— y aplica a cada una las reglas que ya viven en el repo:
//   · SAC: 50% de la mayor remuneración mensual del semestre (art. 121/122 LCT).
//   · Vacaciones: remuneración mensual / 25 por día (art. 155 inc. a LCT), con los días del art. 150.
//   · Indemnización por antigüedad: un mes de la base por año de servicio o fracción mayor de
//     3 meses (art. 245 LCT).
//   · Aportes del trabajador: 17% (11% SIPA + 3% obra social + 3% PAMI).
// La diferencia entre las dos columnas es, exactamente, lo que la reforma sacó de la base.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

/** Años computables del art. 245: cada año de servicio o fracción mayor de 3 meses. */
export function aniosComputables(anios: number, mesesSueltos: number): number {
  const enteros = Math.max(0, Math.floor(anios));
  const fraccion = Math.min(11, Math.max(0, Math.floor(mesesSueltos)));
  return enteros + (fraccion > MESES_FRACCION_ANIO ? 1 : 0);
}

/** Días corridos de vacaciones del art. 150 LCT según la antigüedad, en años con decimales. */
export function diasDeVacaciones(antiguedadEnAnios: number): number {
  const antig = Math.max(0, antiguedadEnAnios);
  for (const tramo of ESCALA_VACACIONES) {
    if (tramo.maxAnios === null || antig <= tramo.maxAnios) return tramo.dias;
  }
  return ESCALA_VACACIONES[ESCALA_VACACIONES.length - 1].dias;
}

/** Los rubros que se derivan de una base remunerativa mensual. */
export type RubrosDerivados = {
  /** La base mensual sobre la que se calcula todo. */
  base: number;
  /** Medio aguinaldo del semestre: 50% de la mayor remuneración mensual. */
  sacSemestral: number;
  /** Los dos medios aguinaldos de un año. */
  sacAnual: number;
  /** Valor del día de vacaciones: remuneración mensual / 25. */
  diaVacaciones: number;
  /** Días de vacaciones que corresponden por la antigüedad. */
  diasVacaciones: number;
  /** Lo que se cobra por el período de vacaciones completo. */
  vacaciones: number;
  /** Indemnización del art. 245: base × años computables. */
  indemnizacionAntiguedad: number;
  /** Aportes del trabajador sobre la base (17%). */
  aportesMensuales: number;
};

function derivar(base: number, aniosComp: number, diasVac: number): RubrosDerivados {
  const sacSemestral = base / 2;
  const diaVacaciones = base / DIVISOR_VACACIONES;
  return {
    base,
    sacSemestral,
    sacAnual: sacSemestral * 2,
    diaVacaciones,
    diasVacaciones: diasVac,
    vacaciones: diaVacaciones * diasVac,
    indemnizacionAntiguedad: base * aniosComp,
    aportesMensuales: base * TOTAL_APORTES,
  };
}

export type ResultadoPropinas = {
  /** Con el texto VIGENTE: las propinas quedan afuera de la base. */
  vigente: RubrosDerivados;
  /** Con el criterio ANTERIOR al 6/3/2026: las propinas habituales integraban la base. */
  anterior: RubrosDerivados;
  /** Años de servicio computables del art. 245. */
  aniosComputables: number;
  /** Diferencia en la indemnización por antigüedad (lo que más pesa). */
  difIndemnizacion: number;
  /** Diferencia en el aguinaldo de un año entero. */
  difSacAnual: number;
  /** Diferencia en el período de vacaciones. */
  difVacaciones: number;
  /** Diferencia total en un despido: antigüedad + SAC del año + vacaciones. */
  difTotalDespido: number;
  /** Aportes mensuales que ya no se calculan sobre las propinas. */
  difAportesMensuales: number;
  /** Qué porcentaje del ingreso mensual total son las propinas. */
  pesoPropinas: number;
  avisos: Aviso[];
};

export function calcularPropinas(params: {
  /** Remuneración mensual registrada, sin propinas. */
  remuneracionMensual: number;
  /** Promedio mensual de propinas. */
  propinasMensuales: number;
  /** Años enteros de antigüedad. */
  anios: number;
  /** Meses sueltos de antigüedad (0-11). */
  meses: number;
}): ResultadoPropinas {
  const remuneracion = Math.max(0, params.remuneracionMensual || 0);
  const propinas = Math.max(0, params.propinasMensuales || 0);
  const anios = Math.max(0, Math.floor(params.anios || 0));
  const meses = Math.min(11, Math.max(0, Math.floor(params.meses || 0)));

  const comp = aniosComputables(anios, meses);

  // Los días de vacaciones dependen de la antigüedad, no del monto: es la escala del art. 150.
  const diasVac = diasDeVacaciones(anios + meses / 12);

  const vigente = derivar(remuneracion, comp, diasVac);
  const anterior = derivar(remuneracion + propinas, comp, diasVac);

  const difIndemnizacion = anterior.indemnizacionAntiguedad - vigente.indemnizacionAntiguedad;
  const difSacAnual = anterior.sacAnual - vigente.sacAnual;
  const difVacaciones = anterior.vacaciones - vigente.vacaciones;

  const ingresoTotal = remuneracion + propinas;
  const pesoPropinas = ingresoTotal > 0 ? propinas / ingresoTotal : 0;

  const avisos: Aviso[] = [];

  if (propinas <= 0) {
    avisos.push({
      tono: "atencion",
      texto:
        "Sin propinas cargadas las dos columnas dan igual: la reforma no cambia nada para quien no las percibe.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "La reforma NO es retroactiva: rige desde el 6 de marzo de 2026, «a partir de su publicación en el Boletín Oficial». Los períodos anteriores se siguen rigiendo por el artículo 113 derogado, y esa es la discusión de los juicios en trámite.",
  });

  if (pesoPropinas >= 0.3) {
    avisos.push({
      tono: "bloqueante",
      texto: `Las propinas son el ${(pesoPropinas * 100).toLocaleString("es-AR", { maximumFractionDigits: 0 })}% de lo que entra por mes, pero desde la reforma no cuentan para ningún rubro derivado del salario: ni aguinaldo, ni vacaciones, ni indemnización, ni aportes jubilatorios. El bolsillo del mes no cambia; el del despido y el de la jubilación futura, sí.`,
    });
  }

  avisos.push({
    tono: "ok",
    texto:
      "Lo que el artículo 104 excluye es la propina, o sea lo que paga un tercero. Un adicional que pague el empleador o que fije el convenio colectivo —aunque se lo llame «por manejo de dinero»— es salario del artículo 103 y sigue integrando la base.",
  });

  avisos.push({
    tono: "atencion",
    texto:
      "La indemnización por antigüedad del artículo 245 tiene su propio tope, calculado sobre el promedio de las remuneraciones del convenio. Si en tu caso el tope se aplica, la diferencia real puede ser menor que la de acá: esta página muestra el efecto de sacar las propinas de la base, no una liquidación de juicio.",
  });

  return {
    vigente,
    anterior,
    aniosComputables: comp,
    difIndemnizacion,
    difSacAnual,
    difVacaciones,
    difTotalDespido: difIndemnizacion + difSacAnual + difVacaciones,
    difAportesMensuales: anterior.aportesMensuales - vigente.aportesMensuales,
    pesoPropinas,
    avisos,
  };
}
