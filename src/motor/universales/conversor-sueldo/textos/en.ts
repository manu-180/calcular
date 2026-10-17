import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosEn: TextosUi<UiConversorSueldo> = {
  slug: "hourly-to-salary",
  ui: () => ({
    monto: "Pay",
    periodo: "Pay is per",
    hora: "Hour",
    dia: "Day",
    semana: "Week",
    quincena: "Half month (24 a year)",
    mes: "Month",
    anio: "Year",
    horasSemana: "Hours worked per week",
    diasSemana: "Days worked per week",
    semanasAnio: "Paid weeks per year",
    semanasAnioAyuda: "52 if you get paid vacation. If you are only paid for the weeks you work, take the others off.",
    porHora: "Hourly",
    porDia: "Daily",
    porSemana: "Weekly",
    porQuincena: "Semimonthly",
    porMes: "Monthly",
    porAnio: "Yearly",
    errorHoras: "Enter how many hours you work per week.",
    errorSemanas: "Paid weeks per year have to be more than zero.",
    observacionBruto: "It is the same amount shown for other periods. Bonuses are not added and taxes are not taken off.",
  }),
};
