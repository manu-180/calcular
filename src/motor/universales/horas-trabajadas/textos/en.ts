import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosEn: TextosUi<UiHorasTrabajadas> = {
  slug: "time-card",
  ui: () => ({
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    entrada: (dia) => `${dia}: start`,
    salida: (dia) => `${dia}: end`,
    horarioAyuda: "Leave the days you did not work empty. If you finish after midnight, it counts as the same shift.",
    pausa: "Unpaid break per day (minutes)",
    pausaAyuda: "Lunch or rest time that is not paid. It is taken off each day you worked.",
    pagoHora: "Hourly pay",
    umbral: "Regular hours per week (optional)",
    umbralAyuda: "Hours above this number are paid at the overtime rate. Leave it empty if there is no overtime.",
    recargo: "Overtime premium (%)",
    recargoAyuda: "How much more each overtime hour pays. 50% means time and a half.",
    horasTotales: "Hours worked",
    horasReloj: "In hours and minutes",
    horasNormales: "Regular hours",
    horasExtra: "Overtime hours",
    pagoNormal: "Regular pay",
    pagoExtra: "Overtime pay",
    pagoTotal: "Total pay for the week",
    tabla: "Day by day",
    colDia: "Day",
    colEntrada: "Start",
    colSalida: "End",
    colHoras: "Hours",
    errorFaltaSalida: (dia) => `${dia} is missing an end time.`,
    errorFaltaEntrada: (dia) => `${dia} is missing a start time.`,
    errorIguales: (dia) => `${dia} has the same start and end time.`,
    errorPausa: (dia) => `The break is as long as or longer than ${dia}'s shift.`,
    errorSinDias: "Fill in the start and end time for at least one day.",
    observacionNoche: "Some shifts end the next day: they count in full on the day they start.",
    observacionGenerico:
      "This is a general calculation. Maximum hours, overtime rules and pay for night or holiday work depend on the law and your contract.",
  }),
};
