import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosNb: TextosUi<UiConversorSueldo> = {
  slug: "timelonn-til-manedslonn",
  ui: () => ({
    monto: "Lønn",
    periodo: "Lønnen gjelder per",
    hora: "Time",
    dia: "Dag",
    semana: "Uke",
    quincena: "Halvmåned (24 ganger i året)",
    mes: "Måned",
    anio: "År",
    horasSemana: "Arbeidstimer per uke",
    diasSemana: "Arbeidsdager per uke",
    semanasAnio: "Betalte uker per år",
    semanasAnioAyuda: "52 hvis du har ferie med lønn. Får du bare lønn for ukene du jobber, trekk fra de andre.",
    porHora: "Timelønn",
    porDia: "Dagslønn",
    porSemana: "Ukelønn",
    porQuincena: "Lønn per halvmåned",
    porMes: "Månedslønn",
    porAnio: "Årslønn",
    errorHoras: "Fyll inn hvor mange timer du jobber per uke.",
    errorSemanas: "Antall betalte uker per år må være større enn null.",
    observacionBruto: "Det er den samme lønnen regnet om til andre perioder, før skatt. Tillegg og bonus legges ikke til, og skatten trekkes ikke fra.",
  }),
};
