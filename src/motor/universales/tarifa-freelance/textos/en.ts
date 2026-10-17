import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosEn: TextosUi<UiTarifaFreelance> = {
  slug: "freelance-rate",
  ui: () => ({
    ingreso: "What you want to take home per year",
    ingresoAyuda: "After taxes and expenses. It is your salary as a freelancer.",
    gastos: "Business expenses per year",
    gastosAyuda: "Equipment, software, internet, courses, accountant, health insurance and retirement savings.",
    impuestos: "Estimated taxes and contributions (%)",
    impuestosAyuda: "What goes to tax on what you bill minus expenses. If you are not sure, ask an accountant. 25% is a starting point.",
    diasLibres: "Days off per year",
    diasLibresAyuda: "Vacation, public holidays and sick days. Nobody pays for them, so your rate has to cover them.",
    diasSemana: "Working days per week",
    horasSemana: "Billable hours per week",
    horasSemanaAyuda: "Only hours you charge for. Finding clients, admin and learning are not billable. 20 to 30 out of 40 is typical.",
    tarifaHora: "Hourly rate",
    tarifaDia: "Day rate",
    facturacionMensual: "Billing needed per month",
    facturacionAnual: "Billing needed per year",
    horasAnio: "Billable hours per year",
    errorIngreso: "Enter how much you want to earn per year.",
    errorImpuestos: "Taxes have to be below 100%.",
    errorDias: "With that many days off there are no working days left in the year.",
    errorHoras: "Enter how many hours a week you can bill.",
    observacionFacturables: "If you charge less than this, you will earn less than you planned or work more hours.",
  }),
};
