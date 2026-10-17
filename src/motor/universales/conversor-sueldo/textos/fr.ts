import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosFr: TextosUi<UiConversorSueldo> = {
  slug: "convertir-salaire-horaire-mensuel",
  ui: () => ({
    monto: "Salaire",
    periodo: "Le salaire est par",
    hora: "Heure",
    dia: "Jour",
    semana: "Semaine",
    quincena: "Quinzaine (24 par an)",
    mes: "Mois",
    anio: "An",
    horasSemana: "Heures travaillées par semaine",
    diasSemana: "Jours travaillés par semaine",
    semanasAnio: "Semaines payées par an",
    semanasAnioAyuda: "52 si vos congés sont payés. Si vous n’êtes payé que les semaines travaillées, retirez les autres.",
    porHora: "Par heure",
    porDia: "Par jour",
    porSemana: "Par semaine",
    porQuincena: "Par quinzaine",
    porMes: "Par mois",
    porAnio: "Par an",
    errorHoras: "Indiquez combien d’heures vous travaillez par semaine.",
    errorSemanas: "Le nombre de semaines payées par an doit être supérieur à zéro.",
    observacionBruto: "C’est le même montant ramené à d’autres périodes. Les primes ne sont pas ajoutées et les cotisations ne sont pas retirées.",
  }),
};
