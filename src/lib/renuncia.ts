import { APORTES } from "@/data/sueldo";
import {
  DIAS_TRABAJO_POR_DIA_DESCANSO,
  DIVISOR_DIA,
  DIVISOR_VACACIONES,
  PREAVISO_DEL_TRABAJADOR_DIAS,
  VIGENCIA_REFORMA_ISO,
} from "@/data/renuncia";
import { diasInclusivos } from "@/lib/aguinaldo";
import { diasDelMesTrabajados, sacProporcional } from "@/lib/liquidacion";
import { diasHabiles, diasPorAntiguedad } from "@/lib/vacaciones";

// Liquidación final de una RENUNCIA (o de una extinción por mutuo acuerdo del art. 241).
//
// Contra el prejuicio de «si renunciás no te dan nada»: los arts. 123 y 156 de la LCT dicen «por
// cualquier causa». Lo que no corresponde es la indemnización por antigüedad del art. 245 y el
// preaviso del empleador — no los rubros devengados. Entonces:
//
//   1. **Días trabajados del mes** (art. 74), a razón de sueldo ÷ 30.
//   2. **SAC proporcional** (art. 123): la doceava parte de lo devengado en la fracción del
//      semestre. Se calcula con `sacProporcional()`, el mismo helper que usa `/periodo-de-prueba`
//      y la misma fórmula que `/aguinaldo` — tres páginas no pueden publicar tres importes.
//   3. **Vacaciones proporcionales no gozadas** (art. 156), al valor del art. 155 inc. a)
//      (sueldo ÷ 25). Acá hay DOS reglas y la página elige la que manda la ley en cada caso, igual
//      que `/vacaciones`:
//        · Si en el año calendario trabajó al menos la mitad de los días hábiles (art. 151),
//          le corresponden los días de la escala del art. 150 según su antigüedad, **proporcionales
//          a la fracción del año trabajada**, que es lo que dice literalmente el art. 156.
//        · Si no llegó a esa mitad, rige la licencia proporcional del art. 153: **un día cada
//          veinte** de trabajo efectivo.
//      La diferencia entre las dos no es menor y por eso el resultado dice cuál aplicó.
//   4. **SAC sobre esas vacaciones**: la doceava parte del renglón anterior. Es la misma posición
//      que ya publica `/periodo-de-prueba`; se mantiene por consistencia y se avisa que el punto
//      se discute, en vez de presentarlo como cerrado.
//
// LO QUE PUEDE RESTAR, y que casi nadie menciona: el art. 231 inc. a) obliga al TRABAJADOR a
// preavisar QUINCE días, y el art. 232 dice que «la parte que omita el preaviso» debe a la otra
// una indemnización sustitutiva equivalente a la remuneración de ese plazo. Renunciar de un día
// para el otro puede costar 15 días de sueldo. La página lo muestra como un renglón aparte, en
// negativo, y sólo si se declara que no se preavisó.
//
// NO SE CALCULA ACÁ, a propósito: la indemnización del art. 245. Una renuncia no la genera, y
// fingir lo contrario sería el error que la página viene a corregir.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoRenuncia = {
  /** Si la fecha de egreso cae bajo el texto nuevo del art. 240 (o el anterior). */
  rigeTextoNuevo: boolean;
  valorDia: number;
  valorDiaVacaciones: number;

  diasDelMes: number;
  sueldoDelMes: number;

  diasSemestre: number;
  diasTrabajadosSemestre: number;
  sacImporte: number;

  /** Qué regla de vacaciones aplicó: la escala proporcional (art. 156) o el 1 cada 20 (art. 153). */
  reglaVacaciones: "escala" | "proporcional";
  diasHabilesTrabajadosAnio: number;
  diasHabilesDelAnio: number;
  /** Días de vacaciones que corresponden (ya proporcionalizados si va por escala). */
  diasVacaciones: number;
  vacacionesImporte: number;
  sacSobreVacaciones: number;

  /** Suma de lo que se cobra. */
  totalACobrar: number;
  /** Descuento por no haber preavisado (art. 232). 0 si preavisó. */
  descuentoPreaviso: number;
  /** Lo que queda después del descuento del preaviso omitido. */
  totalNetoDeDescuento: number;

  aportes: { jubilacion: number; obraSocial: number; pami: number; total: number };
  /** Aproximación de lo que entra en mano (sin Ganancias, que depende del acumulado del año). */
  enMano: number;

  avisos: Aviso[];
};

const redondear = (n: number) => Math.round(n * 100) / 100;

export function calcularRenuncia(params: {
  /** Remuneración mensual bruta, normal y habitual. */
  sueldoMensual: number;
  /** Fecha de ingreso (ISO). */
  ingresoISO: string;
  /** Último día trabajado (ISO). */
  egresoISO: string;
  /** ¿Preavisó los 15 días del art. 231 inc. a)? */
  preaviso: boolean;
}): ResultadoRenuncia | null {
  const sueldo = Math.max(0, params.sueldoMensual || 0);
  const { ingresoISO, egresoISO } = params;

  const fechasValidas =
    /^\d{4}-\d{2}-\d{2}$/.test(ingresoISO) &&
    /^\d{4}-\d{2}-\d{2}$/.test(egresoISO) &&
    egresoISO >= ingresoISO;
  if (!fechasValidas || sueldo <= 0) return null;

  const rigeTextoNuevo = egresoISO >= VIGENCIA_REFORMA_ISO;
  const valorDia = sueldo / DIVISOR_DIA;
  const valorDiaVacaciones = sueldo / DIVISOR_VACACIONES;

  // 1. Días del mes trabajados.
  const diasDelMes = diasDelMesTrabajados(ingresoISO, egresoISO);
  const sueldoDelMes = diasDelMes * valorDia;

  // 2. SAC proporcional (art. 123), con el helper compartido.
  const sac = sacProporcional(sueldo, ingresoISO, egresoISO);

  // 3. Vacaciones proporcionales.
  const anio = Number(egresoISO.slice(0, 4));
  const inicioAnio = `${anio}-01-01`;
  const finAnio = `${anio}-12-31`;
  const desdeEnElAnio = ingresoISO > inicioAnio ? ingresoISO : inicioAnio;
  const diasHabilesTrabajadosAnio = diasHabiles(desdeEnElAnio, egresoISO);
  const diasHabilesDelAnio = diasHabiles(inicioAnio, finAnio);

  let reglaVacaciones: "escala" | "proporcional";
  let diasVacaciones: number;
  if (diasHabilesTrabajadosAnio >= diasHabilesDelAnio / 2) {
    // Art. 151 cumplido → escala del art. 150, proporcional a la fracción del año trabajada
    // (art. 156: «el período de descanso proporcional a la fracción del año trabajada»).
    reglaVacaciones = "escala";
    const diasEscala = diasPorAntiguedad(ingresoISO, anio);
    const diasDelAnio = diasInclusivos(inicioAnio, finAnio);
    const diasTrabajadosAnio = diasInclusivos(desdeEnElAnio, egresoISO);
    diasVacaciones = (diasEscala * diasTrabajadosAnio) / diasDelAnio;
  } else {
    // Art. 153: un día cada veinte de trabajo efectivo.
    reglaVacaciones = "proporcional";
    diasVacaciones = Math.floor(diasHabilesTrabajadosAnio / DIAS_TRABAJO_POR_DIA_DESCANSO);
  }

  // Se redondean los días ANTES de valorizarlos: la tabla muestra los días y el importe uno al
  // lado del otro, y si el importe saliera de un número con más decimales que el mostrado, la
  // multiplicación no cerraría a la vista de quien la revisa con la calculadora del teléfono.
  diasVacaciones = Math.round(diasVacaciones * 100) / 100;
  const vacacionesImporte = diasVacaciones * valorDiaVacaciones;
  const sacSobreVacaciones = vacacionesImporte / 12;

  const totalACobrar = sueldoDelMes + sac.importe + vacacionesImporte + sacSobreVacaciones;

  // Lo que puede restar: el preaviso que el trabajador omitió (arts. 231 inc. a] y 232).
  const descuentoPreaviso = params.preaviso ? 0 : PREAVISO_DEL_TRABAJADOR_DIAS * valorDia;
  const totalNetoDeDescuento = totalACobrar - descuentoPreaviso;

  // Aportes: se calculan sobre los rubros REMUNERATIVOS (sueldo del mes y SAC). La indemnización
  // del art. 156 no lo es, y por eso no arrastra el 17%.
  const baseAportes = sueldoDelMes + sac.importe;
  const aportes = {
    jubilacion: baseAportes * APORTES.jubilacion,
    obraSocial: baseAportes * APORTES.obraSocial,
    pami: baseAportes * APORTES.pami,
    total: 0,
  };
  aportes.total = aportes.jubilacion + aportes.obraSocial + aportes.pami;

  const enMano = totalNetoDeDescuento - aportes.total;

  const avisos: Aviso[] = [];

  if (rigeTextoNuevo) {
    avisos.push({
      tono: "ok",
      texto:
        "Para una renuncia posterior al 6 de marzo de 2026 rige el art. 240 nuevo: el despacho telegráfico puede ser «en formato físico o digital», sigue siendo gratuito y ya no exige presencia personal. Pide «la validación de su identidad», sin decir cómo. La vía ante la autoridad administrativa quedó remitida a la reglamentación.",
    });
  } else {
    avisos.push({
      tono: "atencion",
      texto:
        "La renuncia es anterior al 6 de marzo de 2026: rige el texto anterior del art. 240, que exigía despacho telegráfico «colacionado» cursado «personalmente», con presencia personal del remitente en el correo. La reforma no es retroactiva.",
    });
  }

  if (!params.preaviso) {
    avisos.push({
      tono: "bloqueante",
      texto: `El art. 231 inc. a) obliga al trabajador a preavisar ${PREAVISO_DEL_TRABAJADOR_DIAS} días, y el art. 232 dice que «la parte que omita el preaviso» debe a la otra una indemnización sustitutiva por ese plazo. Renunciar de un día para el otro puede costar ${PREAVISO_DEL_TRABAJADOR_DIAS} días de sueldo, que el empleador puede reclamar o compensar en la liquidación.`,
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "Lo que NO entra en una renuncia: la indemnización por antigüedad del art. 245 y el preaviso del empleador. Si lo que estás evaluando es una salida acordada, el art. 241 (mutuo acuerdo) no paga indemnización pero desde esta misma reforma sí da derecho a la prestación por desempleo.",
  });

  if (reglaVacaciones === "escala") {
    avisos.push({
      tono: "ok",
      texto:
        "Trabajaste al menos la mitad de los días hábiles del año (art. 151), así que las vacaciones salen de la escala del art. 150 según tu antigüedad, proporcionales a la fracción del año trabajada, y no de la regla de un día cada veinte.",
    });
  } else {
    avisos.push({
      tono: "atencion",
      texto:
        "No llegaste a la mitad de los días hábiles del año (art. 151), así que rige la licencia proporcional del art. 153: un día por cada veinte de trabajo efectivo. Es menos que la escala completa, y por eso conviene mirar la fecha de salida.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "El SAC sobre las vacaciones no gozadas se incluye acá con el mismo criterio que en el resto del sitio, pero es un punto discutido: el art. 156 llama «indemnización» a ese rubro. Si tu liquidación no lo trae, la diferencia es exactamente ese renglón.",
  });

  return {
    rigeTextoNuevo,
    valorDia: redondear(valorDia),
    valorDiaVacaciones: redondear(valorDiaVacaciones),
    diasDelMes,
    sueldoDelMes: redondear(sueldoDelMes),
    diasSemestre: sac.diasSemestre,
    diasTrabajadosSemestre: sac.diasTrabajadosSemestre,
    sacImporte: redondear(sac.importe),
    reglaVacaciones,
    diasHabilesTrabajadosAnio,
    diasHabilesDelAnio,
    diasVacaciones,
    vacacionesImporte: redondear(vacacionesImporte),
    sacSobreVacaciones: redondear(sacSobreVacaciones),
    totalACobrar: redondear(totalACobrar),
    descuentoPreaviso: redondear(descuentoPreaviso),
    totalNetoDeDescuento: redondear(totalNetoDeDescuento),
    aportes: {
      jubilacion: redondear(aportes.jubilacion),
      obraSocial: redondear(aportes.obraSocial),
      pami: redondear(aportes.pami),
      total: redondear(aportes.total),
    },
    enMano: redondear(enMano),
    avisos,
  };
}
