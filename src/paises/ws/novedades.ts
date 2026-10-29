import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ws.minimum-wage-5-24-2026",
    fecha: "2026-07-01",
    titulo: "Minimum wage is WST 5.24 an hour from 1 July 2026",
    texto:
      "The Ministry of Commerce, Industry and Labour lists the private sector and state-owned enterprise minimum wage at WST 5.24 an hour from 1 July 2026. Later steps are WST 5.65 from 1 July 2027 and WST 6.05 from 1 July 2028. The minimum wage calculator switches on each date.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["ws.minimum-wage"],
    fuente: {
      organismo: "Ministry of Commerce, Industry and Labour",
      titulo: "Employment: minimum wage rates",
      url: "https://www.mcil.gov.ws/services/employment",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "ws.cpi-september-2026",
    fecha: "2026-10-19",
    titulo: "Consumer prices up 3.4% in the year to September 2026",
    texto:
      "The Samoa Bureau of Statistics reports that the CPI rose 3.4% over September 2025, mainly because of transport prices, and fell 0.6% from August 2026. Average annual inflation for the year to September was 1.2%. The next release is due on 13 November 2026.",
    calculadoras: ["ws.inflation-calculator"],
    fuente: {
      organismo: "Samoa Bureau of Statistics",
      titulo: "Consumer Price Index, September 2026",
      url: "https://www.sbs.gov.ws/documents/economics/CPI/2026/09_CPI_September.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
];
