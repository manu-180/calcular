import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "tt.nis-rate-january-2026",
    fecha: "2026-10-27",
    titulo: "NIS contribution rate rises to 16.2%",
    texto:
      "From January 5, 2026 National Insurance contributions are based on a rate of 16.2%. Each earnings class has new weekly amounts, and the top class now starts at TT$3,138 a week or TT$13,600 a month. Employees pay one third and employers two thirds. Our salary, NIS and employer cost calculators already use the new table.",
    vigenteDesde: "2026-01-05",
    calculadoras: ["tt.salary-calculator", "tt.nis-calculator", "tt.employer-cost-calculator"],
    fuente: {
      organismo: "National Insurance Board of Trinidad and Tobago",
      titulo: "Earnings Classes and Contributions from 05 January 2026 (contribution rate of 16.2%)",
      url: "https://nibtt.net/Contribution_Rates/NISContributions_20260105.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
