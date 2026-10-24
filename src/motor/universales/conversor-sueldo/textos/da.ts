import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosDa: TextosUi<UiConversorSueldo> = {
  slug: "timeloen-til-maanedsloen",
  ui: () => ({
    monto: "Løn",
    periodo: "Lønnen gælder pr.",
    hora: "Time",
    dia: "Dag",
    semana: "Uge",
    quincena: "Halv måned (24 gange om året)",
    mes: "Måned",
    anio: "År",
    horasSemana: "Arbejdstimer om ugen",
    diasSemana: "Arbejdsdage om ugen",
    semanasAnio: "Betalte uger om året",
    semanasAnioAyuda: "52, hvis du har ferie med løn. Får du kun løn for de uger, du arbejder, så træk de andre fra.",
    porHora: "Timeløn",
    porDia: "Dagsløn",
    porSemana: "Ugeløn",
    porQuincena: "Løn pr. halve måned",
    porMes: "Månedsløn",
    porAnio: "Årsløn",
    errorHoras: "Skriv, hvor mange timer du arbejder om ugen.",
    errorSemanas: "Antallet af betalte uger om året skal være større end nul.",
    observacionBruto: "Det er den samme løn regnet om til andre perioder, før skat. Tillæg og bonus lægges ikke til, og skatten trækkes ikke fra.",
  }),
};
