import { segunTrato, type TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosEs: TextosUi<UiFechaDeParto> = {
  slug: "fecha-probable-de-parto",
  ui: (trato) => ({
    metodo: segunTrato(trato, { tu: "¿Qué fecha conoces?", usted: "¿Qué fecha conoce?", vos: "¿Qué fecha conocés?" }),
    fum: "Primer día de la última menstruación",
    concepcion: "Fecha de concepción",
    fecha: "Fecha",
    fechaAyuda: segunTrato(trato, {
      tu: "Si eliges la última menstruación, pon el primer día de sangrado.",
      usted: "Si elige la última menstruación, ponga el primer día de sangrado.",
      vos: "Si elegís la última menstruación, poné el primer día de sangrado.",
    }),
    ciclo: "Duración del ciclo (días)",
    cicloAyuda: segunTrato(trato, {
      tu: "Solo se usa con la última menstruación. Si no la sabes, deja 28.",
      usted: "Solo se usa con la última menstruación. Si no la sabe, deje 28.",
      vos: "Solo se usa con la última menstruación. Si no la sabés, dejá 28.",
    }),
    fpp: "Fecha probable de parto",
    edadGestacional: "Semanas de embarazo hoy",
    trimestre: "Trimestre",
    faltan: "Días que faltan",
    fechaConcepcion: "Concepción estimada",
    semanasYDias: (s, d) => `${s} ${s === 1 ? "semana" : "semanas"}${d ? ` y ${d} ${d === 1 ? "día" : "días"}` : ""}`,
    trimestres: ["Primer trimestre", "Segundo trimestre", "Tercer trimestre"],
    errorFutura: "La fecha no puede ser posterior a hoy.",
    errorCiclo: "La duración del ciclo tiene que estar entre 20 y 45 días.",
    notaPasada: "Pasaron más de 42 semanas desde esa fecha, así que no se muestra la semana de embarazo.",
    aviso: "Es una estimación: pocos bebés nacen justo en la fecha probable de parto. La ecografía y el control con un profesional de la salud dan la fecha más precisa.",
  }),
};
