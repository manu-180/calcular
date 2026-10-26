import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosSv: TextosUi<UiConversorSueldo> = {
  slug: "timlon-till-manadslon",
  ui: () => ({
    monto: "Lön",
    periodo: "Lönen gäller per",
    hora: "Timme",
    dia: "Dag",
    semana: "Vecka",
    quincena: "Halvmånad (24 gånger per år)",
    mes: "Månad",
    anio: "År",
    horasSemana: "Arbetstimmar per vecka",
    diasSemana: "Arbetsdagar per vecka",
    semanasAnio: "Betalda veckor per år",
    semanasAnioAyuda: "52 om du har betald semester. Får du bara betalt för de veckor du jobbar, dra av de övriga.",
    porHora: "Timlön",
    porDia: "Dagslön",
    porSemana: "Veckolön",
    porQuincena: "Lön per halvmånad",
    porMes: "Månadslön",
    porAnio: "Årslön",
    errorHoras: "Fyll i hur många timmar du jobbar per vecka.",
    errorSemanas: "Antalet betalda veckor per år måste vara större än noll.",
    observacionBruto: "Det är samma lön omräknad till andra perioder, före skatt. Tillägg och bonus läggs inte till och skatten dras inte av.",
  }),
};
