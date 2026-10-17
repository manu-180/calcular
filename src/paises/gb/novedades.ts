import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "gb.ssp-from-day-one",
    fecha: "2026-10-14",
    titulo: "Statutory Sick Pay is now paid from the first day",
    texto:
      "From 6 April 2026 there are no waiting days and no minimum earnings level. You get £123.25 a week or 80% of your average weekly earnings, whichever is lower. The sick pay calculator already uses the new rules.",
    vigenteDesde: "2026-04-06",
    calculadoras: ["gb.statutory-sick-pay"],
    fuente: {
      organismo: "HMRC",
      titulo: "Sickness absences that start before and end on or after 6 April 2026",
      url: "https://www.gov.uk/guidance/sickness-absences-that-start-before-and-end-on-or-after-6-april-2026",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "gb.national-living-wage-april-2026",
    fecha: "2026-10-14",
    titulo: "National Living Wage rises to £12.71 an hour",
    texto: "Since 1 April 2026 the minimum for workers aged 21 and over is £12.71 an hour. Workers aged 18 to 20 get at least £10.85, and under 18s and apprentices £8.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["gb.minimum-wage"],
    fuente: {
      organismo: "Department for Business and Trade",
      titulo: "National Minimum Wage and National Living Wage rates",
      url: "https://www.gov.uk/national-minimum-wage-rates",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "gb.tax-year-2026-27",
    fecha: "2026-10-14",
    titulo: "Tax year 2026/27 rates are in",
    texto:
      "Our tax calculators use the figures for 6 April 2026 to 5 April 2027: a Personal Allowance of £12,570, the new Scottish bands, dividend tax at 10.75%, 35.75% and 39.35%, and the new student loan thresholds.",
    vigenteDesde: "2026-04-06",
    calculadoras: ["gb.take-home-pay", "gb.income-tax-calculator", "gb.dividend-tax", "gb.student-loan-repayment"],
    fuente: {
      organismo: "HMRC",
      titulo: "Rates and thresholds for employers 2026 to 2027",
      url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
