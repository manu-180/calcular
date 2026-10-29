import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ls.tax-year-2027",
    fecha: "2026-10-27",
    titulo: "New income tax band and credit for 2026/27",
    texto:
      "From 1 April 2026 the 20% band goes up to M6 480 a month (M77 760 a year) and the tax credit to M1 020 a month (M12 240 a year). Our take-home pay, income tax and net to gross calculators already use them.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["ls.take-home-pay", "ls.income-tax-calculator", "ls.gross-salary-calculator"],
    fuente: {
      organismo: "Revenue Services Lesotho",
      titulo: "Income Tax Structure for the period starting 1 April 2026 (Legal Notice No. 24 of 2026)",
      url: "https://www.rsl.org.ls/sites/default/files/2026-09/2026%20-2027%20Income%20Tax%20structure%201.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
