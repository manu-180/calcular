import { segunTrato, type TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosEs: TextosUi<UiVariacion> = {
  slug: "variacion-porcentual",
  ui: (trato) => ({
    inicial: "Valor inicial",
    final: "Valor final",
    variacion: "Variación",
    diferencia: "Diferencia",
    vuelta: "Para volver al valor inicial",
    vueltaAyuda: segunTrato(trato, {
      tu: "Cuánto tendría que cambiar el valor final para regresar al de partida.",
      usted: "Cuánto tendría que cambiar el valor final para regresar al de partida.",
      vos: "Cuánto tendría que cambiar el valor final para volver al de partida.",
    }),
    errorInicialCero: "El valor inicial no puede ser 0: no hay variación porcentual desde cero.",
    subio: (p) => `Subió un ${p} %.`,
    bajo: (p) => `Bajó un ${p} %.`,
    igual: "No cambió: los dos valores son iguales.",
  }),
};
