import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "au.tax-cut-2026-27",
    fecha: "2026-10-14",
    titulo: "The 16% tax rate drops to 15% from 1 July 2026",
    texto: "For the 2026-27 income year, income between $18,201 and $45,000 is taxed at 15c in the dollar instead of 16c. The pay, income tax and capital gains calculators already use the new rates.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["au.income-tax-calculator", "au.pay-calculator", "au.capital-gains-tax-calculator"],
    fuente: {
      organismo: "Australian Taxation Office",
      titulo: "Tax rates: Australian resident",
      url: "https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "au.minimum-wage-2026",
    fecha: "2026-10-14",
    titulo: "National Minimum Wage rises to $26.44 an hour",
    texto: "From the first full pay period starting on or after 1 July 2026, the National Minimum Wage is $1,004.90 a week or $26.44 an hour. Casual employees on the minimum get at least $33.05 an hour.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["au.minimum-wage"],
    fuente: {
      organismo: "Fair Work Ombudsman",
      titulo: "Minimum wage increase starts today (1 July 2026)",
      url: "https://www.fairwork.gov.au/newsroom/media-releases/2026-media-releases/july-2026/20260701-minimum-wage-increase-media-release",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "au.concessional-cap-2026",
    fecha: "2026-10-14",
    titulo: "Concessional super cap rises to $32,500",
    texto: "From 1 July 2026 you can put up to $32,500 a year of before-tax contributions into super, up from $30,000. That includes your employer's super guarantee and any salary sacrifice.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["au.salary-sacrifice-calculator"],
    fuente: {
      organismo: "Australian Taxation Office",
      titulo: "Contributions caps",
      url: "https://www.ato.gov.au/tax-rates-and-codes/key-superannuation-rates-and-thresholds/contributions-caps",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "au.help-thresholds-2026-27",
    fecha: "2026-10-14",
    titulo: "New HELP repayment thresholds for 2026-27",
    texto: "Compulsory HELP repayments start above $69,528 of repayment income in 2026-27, and you only repay on the income above that amount.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["au.hecs-help-repayment-calculator", "au.pay-calculator"],
    fuente: {
      organismo: "Australian Taxation Office",
      titulo: "Study and training loan minimum repayment income and rates",
      url: "https://www.ato.gov.au/tax-rates-and-codes/study-and-training-loan-minimum-repayment-income-and-rates",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
