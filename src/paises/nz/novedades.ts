import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "nz.parental-leave-july-2026",
    fecha: "2026-10-14",
    titulo: "Paid parental leave goes up to $811.05 a week",
    texto: "From 1 July 2026 the most you can get is $811.05 a week before tax, up from $788.66. The minimum for self-employed parents is now $239.50 a week.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["nz.parental-leave-pay"],
    fuente: {
      organismo: "Inland Revenue",
      titulo: "Paid parental leave rates from 1 July 2026",
      url: "https://www.ird.govt.nz/updates/news-folder/2026/paid-parental-leave",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "nz.kiwisaver-3-5-april-2026",
    fecha: "2026-10-14",
    titulo: "KiwiSaver contributions rise to 3.5%",
    texto:
      "Since 1 April 2026 the default employee rate and the compulsory employer contribution are 3.5% of gross pay. You can apply to stay at 3% for 12 months. Both rates go up to 4% from 1 April 2028.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["nz.take-home-pay", "nz.kiwisaver-calculator", "nz.esct-calculator"],
    fuente: {
      organismo: "Inland Revenue",
      titulo: "Payroll Calculations and Business Rules Specification, 1 April 2026 to 31 March 2027",
      url: "https://www.ird.govt.nz/-/media/project/ir/home/documents/digital-service-providers/software-providers/payroll-calculations-business-rules-specifications/payroll-calculations-and-business-rules-specification.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "nz.minimum-wage-april-2026",
    fecha: "2026-10-14",
    titulo: "Adult minimum wage rises to $23.95 an hour",
    texto: "From 1 April 2026 the adult minimum wage is $23.95 an hour, up from $23.50. The starting-out and training minimum wage is $19.16, up from $18.80.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["nz.minimum-wage"],
    fuente: {
      organismo: "Employment New Zealand",
      titulo: "Minimum wage is increasing on 1 April 2026",
      url: "https://www.employment.govt.nz/news-and-updates/minimum-wage-is-increasing-on-1-april-2026",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "nz.acc-levy-april-2026",
    fecha: "2026-10-14",
    titulo: "ACC earners' levy is 1.75% this tax year",
    texto: "From 1 April 2026 the earners' levy is $1.75 per $100 of earnings, up to earnings of $156,641. It was 1.67% the year before and rises to 1.83% from 1 April 2027.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["nz.take-home-pay", "nz.acc-levy-calculator"],
    fuente: {
      organismo: "Inland Revenue",
      titulo: "ACC earners' levy rates",
      url: "https://www.ird.govt.nz/acclevy",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
