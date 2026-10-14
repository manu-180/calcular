import { segunTrato, type TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosEs: TextosUi<UiSumarDias> = {
  slug: "sumar-dias-a-una-fecha",
  ui: (trato) => ({
    fecha: "Fecha de partida",
    operacion: "Operación",
    sumar: "Sumar días",
    restar: "Restar días",
    dias: "Cantidad de días",
    tipo: "Tipo de días",
    corridos: "Corridos (todos los días)",
    habiles: "Hábiles (de lunes a viernes)",
    resultado: "Fecha resultante",
    diaSemana: "Día de la semana",
    diasCorridos: "Días corridos en total",
    nombresDias: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    errorDias: "La cantidad de días tiene que ser un número entero, de hasta 100 años.",
    notaHabiles: segunTrato(trato, {
      tu: "Los días hábiles saltan sábados y domingos, pero no los feriados. Si hay alguno en el medio, súmalo aparte.",
      usted: "Los días hábiles saltan sábados y domingos, pero no los feriados. Si hay alguno en el medio, súmelo aparte.",
      vos: "Los días hábiles saltan sábados y domingos, pero no los feriados. Si hay alguno en el medio, sumalo aparte.",
    }),
  }),
};
