import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosIt: TextosUi<UiConversorSueldo> = {
  slug: "calcolo-paga-oraria",
  ui: () => ({
    monto: "Retribuzione",
    periodo: "La retribuzione è",
    hora: "All'ora",
    dia: "Al giorno",
    semana: "A settimana",
    quincena: "Ogni quindici giorni (24 all'anno)",
    mes: "Al mese",
    anio: "All'anno",
    horasSemana: "Ore lavorate a settimana",
    diasSemana: "Giorni lavorati a settimana",
    semanasAnio: "Settimane pagate all'anno",
    semanasAnioAyuda: "52 se hai le ferie retribuite. Se ti pagano solo le settimane che lavori, togli le altre.",
    porHora: "All'ora",
    porDia: "Al giorno",
    porSemana: "A settimana",
    porQuincena: "Ogni quindici giorni",
    porMes: "Al mese",
    porAnio: "All'anno",
    errorHoras: "Inserisci quante ore lavori a settimana.",
    errorSemanas: "Le settimane pagate all'anno devono essere più di zero.",
    observacionBruto: "È la stessa cifra divisa per periodi diversi. Non aggiunge premi e non toglie tasse.",
  }),
};
