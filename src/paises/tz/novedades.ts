import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "tz.wage-order-2026",
    fecha: "2026-10-17",
    titulo: "New minimum wages from 1 January 2026",
    texto:
      "The Labour Institutions (Minimum Wage for Private Sector) Order, 2025 replaced the 2022 order on 1 January 2026. It sets minimum wages for 50 sectors and areas, from TSh 80,000 a month for some domestic workers to TSh 765,900 in the energy sector. Sectors not listed have a minimum of TSh 175,000. Our minimum wage calculator already uses the new rates.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["tz.minimum-wage"],
    fuente: {
      organismo: "Government Gazette (Laws.Africa commons)",
      titulo: "Labour Institutions (Minimum Wage for Private Sector) Order, 2025, GN No. 605A",
      url: "https://commons.laws.africa/akn/tz/act/gn/2025/605a/media/publication/tz-act-gn-2025-605a-publication-document.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-17",
    },
  },
];
