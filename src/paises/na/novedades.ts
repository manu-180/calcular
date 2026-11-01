import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "na.ssc-maternity-october-2026",
    fecha: "2026-10-27",
    titulo: "Social Security maternity benefit now pays up to N$20,000 a month",
    texto: "From 1 October 2026 the Social Security Commission pays 100% of your basic wage during maternity leave, up to N$20,000 a month. The maternity leave calculator already uses the new cap.",
    vigenteDesde: "2026-10-01",
    calculadoras: ["na.maternity-leave-calculator"],
    fuente: {
      organismo: "Government Gazette of the Republic of Namibia",
      titulo: "Government Notice No. 305 of 2026, Government Gazette No. 9037",
      url: "https://archive.gazettes.africa/archive/na/2026/na-government-gazette-dated-2026-09-29-no-9037.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
  {
    id: "na.ssc-ceiling-2026",
    fecha: "2026-10-27",
    titulo: "Social Security contributions now capped at N$12,500 of basic wage",
    texto: "The maximum basic wage for Social Security contributions went up from N$11,000 to N$12,500, so the most you and your employer each pay is N$112.50 a month. It rises to N$14,000 from 1 March 2027.",
    vigenteDesde: "2026-03-01",
    calculadoras: ["na.social-security-calculator", "na.net-salary-calculator", "na.employer-cost-calculator"],
    fuente: {
      organismo: "Government Gazette of the Republic of Namibia",
      titulo: "Government Notice No. 236 of 2026, Government Gazette No. 8975",
      url: "https://archive.gazettes.africa/archive/na/2026/na-government-gazette-dated-2026-07-15-no-8975.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
