import type { Novedad } from "@/motor/tipos";

const NWPC = {
  organismo: "NWPC (DOLE)",
  titulo: "Daily minimum wage rates by region",
  url: "https://nwpc.dole.gov.ph/",
  tipo: "primaria",
  verificadoEl: "2026-10-16",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "ph.ncr-28",
    fecha: "2026-10-16",
    titulo: "NCR minimum wage rises to ₱755 a day",
    texto:
      "Wage Order No. NCR-28 adds ₱60 a day from 26 September 2026. Non-agriculture workers now earn at least ₱755 a day, and agriculture, small retail and service shops and small manufacturers at least ₱718. Our minimum wage calculator already uses the new rates.",
    vigenteDesde: "2026-09-26",
    calculadoras: ["ph.minimum-wage"],
    fuente: {
      organismo: "RTWPB-NCR",
      titulo: "Wage Order No. NCR-28",
      url: "https://nwpc.dole.gov.ph/wp-content/uploads/2026/09/Wage-Order-No.-NCR-28.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
  {
    id: "ph.central-visayas-rovii-27",
    fecha: "2026-10-16",
    titulo: "New minimum wage in Central Visayas",
    texto: "Since 14 October 2026, Wage Order No. ROVII-27 sets daily minimum wages from ₱542 to ₱582 in Central Visayas.",
    vigenteDesde: "2026-10-14",
    calculadoras: ["ph.minimum-wage"],
    fuente: NWPC,
  },
  {
    id: "ph.calabarzon-iva-23",
    fecha: "2026-10-16",
    titulo: "CALABARZON minimum wage goes up on 26 October 2026",
    texto:
      "Wage Order No. IVA-23 raises daily minimum wages in CALABARZON to between ₱550 and ₱645 from 26 October 2026. The minimum wage calculator switches to the new rates on that date.",
    vigenteDesde: "2026-10-26",
    calculadoras: ["ph.minimum-wage"],
    fuente: {
      organismo: "RTWPB IV-A",
      titulo: "Wage Order No. IVA-23",
      url: "https://nwpc.dole.gov.ph/wp-content/uploads/2026/10/Wage-Order-No.-IVA-CALABARZON-23.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
];
