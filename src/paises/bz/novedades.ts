import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "bz.minimum-wage-2023",
    fecha: "2022-12-22",
    titulo: "Minimum wage is BZ$5.00 an hour",
    texto:
      "Statutory Instruments 169 and 170 of 2022 raised the minimum wage for all categories of workers to BZ$5.00 an hour from 1 January 2023, the first increase since 2012. Our minimum wage calculator uses this rate.",
    vigenteDesde: "2023-01-01",
    calculadoras: ["bz.minimum-wage-calculator"],
    fuente: {
      organismo: "Government of Belize Press Office",
      titulo: "PR378/22: Minimum Wage Increases for All Categories of Workers",
      url: "https://www.pressoffice.gov.bz/wp-content/uploads/2019/12/Dec-22-PR378-22-Minimum-Wage-Increases-for-All-Categories-of-Workers.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "bz.ssb-final-phase-2022",
    fecha: "2022-03-16",
    titulo: "Social security rate reaches 10% with a BZ$520 weekly ceiling",
    texto:
      "From 4 April 2022 the Social Security Board contribution rate is 10% of insurable earnings and the weekly wage ceiling is BZ$520. The employee pays up to BZ$23.40 a week and the employer up to BZ$28.60. Our social security and employer cost calculators use this schedule.",
    vigenteDesde: "2022-04-04",
    calculadoras: ["bz.social-security-calculator", "bz.employer-cost-calculator"],
    fuente: {
      organismo: "Social Security Board",
      titulo: "Contribution and Benefit Increase: final phase of the Contribution Reform",
      url: "https://socialsecurity.org.bz/wp-content/uploads/2022/03/Cont_Ben_Schedule.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
];
