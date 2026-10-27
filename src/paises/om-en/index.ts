import { definirEdicion } from "@/motor/registro";
import om from "../om";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import contenidoEmployeeCostCalculator from "./contenido/employee-cost-calculator";
import contenidoEndOfServiceGratuity from "./contenido/end-of-service-gratuity";
import contenidoFinalSettlement from "./contenido/final-settlement";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import contenidoJobSecurityBenefit from "./contenido/job-security-benefit";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import contenidoNoticePeriod from "./contenido/notice-period";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import contenidoPensionCalculator from "./contenido/pension-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import contenidoSickLeaveCalculator from "./contenido/sick-leave-calculator";
import contenidoSpfContributionCalculator from "./contenido/spf-contribution-calculator";
import contenidoUnfairDismissalCompensation from "./contenido/unfair-dismissal-compensation";
import contenidoVatCalculator from "./contenido/vat-calculator";
import contenidoWorkingHoursCalculator from "./contenido/working-hours-calculator";
import { mercado } from "./mercado";
import textosAnnualLeaveCalculator from "./textos/annual-leave-calculator";
import textosEmployeeCostCalculator from "./textos/employee-cost-calculator";
import textosEndOfServiceGratuity from "./textos/end-of-service-gratuity";
import textosFinalSettlement from "./textos/final-settlement";
import textosInflationCalculator from "./textos/inflation-calculator";
import textosJobSecurityBenefit from "./textos/job-security-benefit";
import textosMaternityLeaveCalculator from "./textos/maternity-leave-calculator";
import textosNoticePeriod from "./textos/notice-period";
import textosOvertimeCalculator from "./textos/overtime-calculator";
import textosPensionCalculator from "./textos/pension-calculator";
import textosSalaryCalculator from "./textos/salary-calculator";
import textosSickLeaveCalculator from "./textos/sick-leave-calculator";
import textosSpfContributionCalculator from "./textos/spf-contribution-calculator";
import textosUnfairDismissalCompensation from "./textos/unfair-dismissal-compensation";
import textosVatCalculator from "./textos/vat-calculator";
import textosWorkingHoursCalculator from "./textos/working-hours-calculator";

export default definirEdicion(om, {
  mercado,
  traducciones: [
    { textos: textosAnnualLeaveCalculator, contenido: contenidoAnnualLeaveCalculator },
    { textos: textosEmployeeCostCalculator, contenido: contenidoEmployeeCostCalculator },
    { textos: textosEndOfServiceGratuity, contenido: contenidoEndOfServiceGratuity },
    { textos: textosFinalSettlement, contenido: contenidoFinalSettlement },
    { textos: textosInflationCalculator, contenido: contenidoInflationCalculator },
    { textos: textosJobSecurityBenefit, contenido: contenidoJobSecurityBenefit },
    { textos: textosMaternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator },
    { textos: textosNoticePeriod, contenido: contenidoNoticePeriod },
    { textos: textosOvertimeCalculator, contenido: contenidoOvertimeCalculator },
    { textos: textosPensionCalculator, contenido: contenidoPensionCalculator },
    { textos: textosSalaryCalculator, contenido: contenidoSalaryCalculator },
    { textos: textosSickLeaveCalculator, contenido: contenidoSickLeaveCalculator },
    { textos: textosSpfContributionCalculator, contenido: contenidoSpfContributionCalculator },
    { textos: textosUnfairDismissalCompensation, contenido: contenidoUnfairDismissalCompensation },
    { textos: textosVatCalculator, contenido: contenidoVatCalculator },
    { textos: textosWorkingHoursCalculator, contenido: contenidoWorkingHoursCalculator },
  ],
  universales: "todas",
  avisos: {
    "om.labour-law-scope": {
      texto: "The calculation follows the Labour Law issued by Royal Decree 53/2023, which sets the minimum rights of workers. If your contract or company rules give you more, the better terms apply.",
    },
    "om.savings-scheme": {
      texto: "Once the Social Protection Fund savings scheme starts, it replaces the end-of-service gratuity for non-Omanis for the period after it starts. The employer still owes the gratuity for the period before, under the Labour Law.",
    },
  },
  datos: {
    "om.vat": { nombre: "Standard VAT rate" },
    "om.spf-old-age": { nombre: "Old age, disability and death contributions", etiquetas: { employer: "Employer share", employee: "Employee share" } },
    "om.spf-cap": { nombre: "Contribution wage cap for old age and work injuries" },
    "om.spf-injury": { nombre: "Employer contribution to work injury insurance" },
    "om.spf-job-security": { nombre: "Job security contributions", etiquetas: { employer: "Employer share", employee: "Employee share" } },
    "om.spf-maternity": { nombre: "Employer contribution to maternity leave insurance" },
    "om.spf-sick": { nombre: "Employer contribution to sick and non-ordinary leave insurance" },
    "om.sick-employer-days": { nombre: "Sick leave days the employer pays in full" },
    "om.sick-leave": { nombre: "Share of pay during sick leave by days in the year" },
    "om.sick-leave-days": { nombre: "Maximum sick leave per year" },
    "om.job-security-rate": { nombre: "Job security allowance as a share of average wage" },
    "om.job-security-min": { nombre: "Minimum job security allowance" },
    "om.job-security-months": { nombre: "Maximum months of job security allowance" },
    "om.pension-accrual": { nombre: "Old age pension rate per year of service" },
    "om.old-age": { nombre: "Old age" },
    "om.early-reduction": { nombre: "Early retirement reduction per year", etiquetas: { first5: "For each of the first five years", beyond: "For each year after that" } },
    "om.women-early-years": { nombre: "Years before old age a woman can retire without reduction" },
    "om.annual-leave": { nombre: "Minimum annual leave" },
    "om.notice": { nombre: "Notice period to end an open-ended contract", etiquetas: { monthly: "Monthly-paid worker", other: "Other workers" } },
    "om.overtime": { nombre: "Overtime premium on the basic wage", etiquetas: { day: "Daytime hours", night: "Night hours", rest: "Rest day or public holiday" } },
    "om.overtime-urgent": { nombre: "Overtime premium without the worker's consent", etiquetas: { day: "Daytime hours", night: "Night hours", rest: "Rest day or public holiday" } },
    "om.working-hours": { nombre: "Maximum working hours", etiquetas: { daily: "Per day", weekly: "Per week", "ramadan-daily": "Per day in Ramadan", "ramadan-weekly": "Per week in Ramadan", "max-daily": "Per day with overtime" } },
    "om.gratuity": { nombre: "End-of-service gratuity per year (in monthly basic wage)" },
    "om.unfair-dismissal": { nombre: "Unfair dismissal compensation (in monthly total wage)", etiquetas: { min: "Minimum", max: "Maximum" } },
    "om.family-leave": { nombre: "Maternity and paternity leave", etiquetas: { maternity: "Maternity leave", prenatal: "Maximum before the birth", paternity: "Paternity leave" } },
    "om.minimum-wage": { nombre: "Minimum wage for Omanis in the private sector" },
    "om.cpi-yoy": { nombre: "Annual inflation (consumer price index)" },
  },
});
