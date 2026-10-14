import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosEn: TextosUi<UiFechaDeParto> = {
  slug: "due-date",
  ui: () => ({
    metodo: "Which date do you know?",
    fum: "First day of your last period",
    concepcion: "Conception date",
    fecha: "Date",
    fechaAyuda: "If you pick your last period, enter the first day of bleeding.",
    ciclo: "Cycle length (days)",
    cicloAyuda: "Only used with your last period. If you don't know it, leave 28.",
    fpp: "Estimated due date",
    edadGestacional: "How far along today",
    trimestre: "Trimester",
    faltan: "Days to go",
    fechaConcepcion: "Estimated conception",
    semanasYDias: (s, d) => `${s} ${s === 1 ? "week" : "weeks"}${d ? ` and ${d} ${d === 1 ? "day" : "days"}` : ""}`,
    trimestres: ["First trimester", "Second trimester", "Third trimester"],
    errorFutura: "The date can't be later than today.",
    errorCiclo: "Cycle length has to be between 20 and 45 days.",
    notaPasada: "More than 42 weeks have passed since that date, so how far along is not shown.",
    aviso: "This is an estimate: few babies arrive exactly on their due date. A scan and check-ups with a health professional give the most accurate date.",
  }),
};
