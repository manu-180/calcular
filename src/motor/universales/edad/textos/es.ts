import { segunTrato, type TextosUi } from "../../tipos";
import { duracionEs } from "../../dias-entre-fechas/textos/es";
import type { UiEdad } from "../definicion";

export const textosEs: TextosUi<UiEdad> = {
  slug: "edad",
  ui: (trato) => ({
    nacimiento: "Fecha de nacimiento",
    referencia: "Calcular la edad al",
    referenciaAyuda: segunTrato(trato, {
      tu: "Por defecto es hoy. Cámbiala para saber la edad en otra fecha.",
      usted: "Por defecto es hoy. Cámbiela para saber la edad en otra fecha.",
      vos: "Por defecto es hoy. Cambiala para saber la edad en otra fecha.",
    }),
    edad: "Edad",
    anios: "Años cumplidos",
    totalMeses: "En meses",
    totalSemanas: "En semanas",
    totalDias: "En días",
    proximo: "Próximo cumpleaños",
    faltan: "Días que faltan",
    cumplira: "Años que cumple",
    duracion: duracionEs,
    errorFutura: "La fecha de nacimiento no puede ser posterior a la fecha de cálculo.",
    cumpleHoy: (anios) => `Hoy cumple ${anios} años.`,
    nota29: "Para quien nació un 29 de febrero, en los años que no son bisiestos el cumpleaños se cuenta el 28 de febrero.",
  }),
};
