import { segunTrato, type TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosEs: TextosUi<UiOvulacion> = {
  slug: "dias-fertiles",
  ui: (trato) => ({
    fum: "Primer día de la última menstruación",
    fumAyuda: "El primer día de sangrado, no el último.",
    ciclo: "Duración del ciclo (días)",
    cicloAyuda: segunTrato(trato, {
      tu: "Desde el primer día de una menstruación hasta el día antes de la siguiente. Si varía, usa un promedio.",
      usted: "Desde el primer día de una menstruación hasta el día antes de la siguiente. Si varía, use un promedio.",
      vos: "Desde el primer día de una menstruación hasta el día antes de la siguiente. Si varía, usá un promedio.",
    }),
    ovulacion: "Ovulación estimada",
    fertilDesde: "Días fértiles desde",
    fertilHasta: "Días fértiles hasta",
    proxima: "Próxima menstruación",
    tabla: "Próximos ciclos",
    colRegla: "Menstruación",
    colDesde: "Fértil desde",
    colHasta: "Fértil hasta",
    colOvulacion: "Ovulación",
    errorCiclo: "La duración del ciclo tiene que estar entre 21 y 45 días.",
    aviso: "Es una estimación para ciclos regulares. No sirve como método anticonceptivo y no reemplaza la consulta con un profesional de la salud.",
  }),
};
