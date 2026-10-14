import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

const base: TextosUi<UiHorasTrabajadas> = {
  slug: "horas-trabajadas",
  ui: (trato) => ({
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    entrada: (dia) => `${dia}: entrada`,
    salida: (dia) => `${dia}: salida`,
    horarioAyuda: segunTrato(trato, {
      tu: "Deja vacíos los días que no trabajaste. Si sales después de medianoche, se cuenta como el mismo turno.",
      usted: "Deje vacíos los días que no trabajó. Si sale después de medianoche, se cuenta como el mismo turno.",
      vos: "Dejá vacíos los días que no trabajaste. Si salís después de medianoche, se cuenta como el mismo turno.",
    }),
    pausa: "Pausa por día (minutos)",
    pausaAyuda: "El tiempo de almuerzo o descanso que no se paga. Se descuenta en cada día trabajado.",
    pagoHora: "Pago por hora",
    umbral: "Horas normales por semana (opcional)",
    umbralAyuda: segunTrato(trato, {
      tu: "Las horas por encima de este número se pagan con recargo. Déjalo vacío si no hay horas extra.",
      usted: "Las horas por encima de este número se pagan con recargo. Déjelo vacío si no hay horas extra.",
      vos: "Las horas por encima de este número se pagan con recargo. Dejalo vacío si no hay horas extra.",
    }),
    recargo: "Recargo de las horas extra (%)",
    recargoAyuda: "Cuánto más se paga cada hora extra. 50 % significa que vale una vez y media.",
    horasTotales: "Horas trabajadas",
    horasReloj: "En horas y minutos",
    horasNormales: "Horas normales",
    horasExtra: "Horas extra",
    pagoNormal: "Pago de horas normales",
    pagoExtra: "Pago de horas extra",
    pagoTotal: "Pago total de la semana",
    tabla: "Detalle por día",
    colDia: "Día",
    colEntrada: "Entrada",
    colSalida: "Salida",
    colHoras: "Horas",
    errorFaltaSalida: (dia) => `Falta la hora de salida del ${dia.toLowerCase()}.`,
    errorFaltaEntrada: (dia) => `Falta la hora de entrada del ${dia.toLowerCase()}.`,
    errorIguales: (dia) => `El ${dia.toLowerCase()} tiene la misma hora de entrada y de salida.`,
    errorPausa: (dia) => `La pausa es igual o más larga que la jornada del ${dia.toLowerCase()}.`,
    errorSinDias: segunTrato(trato, {
      tu: "Completa la entrada y la salida de al menos un día.",
      usted: "Complete la entrada y la salida de al menos un día.",
      vos: "Completá la entrada y la salida de al menos un día.",
    }),
    observacionNoche: "Hay turnos que terminan al día siguiente: se cuentan completos en el día en que empiezan.",
    observacionGenerico:
      "Es un cálculo general. La jornada máxima, el recargo y el pago del trabajo nocturno o de feriados dependen de la ley y del convenio de cada país.",
  }),
};

const espana = (): Partial<UiHorasTrabajadas> => ({
  pausa: "Pausa al día (minutos)",
  pausaAyuda: "El tiempo de comida o descanso que no se paga. Se descuenta en cada día trabajado.",
  umbral: "Horas ordinarias a la semana (opcional)",
  horasNormales: "Horas ordinarias",
  pagoNormal: "Pago de horas ordinarias",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
