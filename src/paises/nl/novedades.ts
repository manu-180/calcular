import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "nl.minimumloon-juli-2026",
    fecha: "2026-10-14",
    titulo: "Minimumloon per 1 juli 2026: € 14,99 per uur",
    texto: "Sinds 1 juli 2026 is het wettelijk minimumuurloon voor werknemers van 21 jaar en ouder € 14,99 bruto. De jeugdlonen zijn in dezelfde verhouding gestegen. De minimumloonberekening rekent al met de nieuwe bedragen.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["nl.minimumloon-berekenen"],
    fuente: {
      organismo: "Rijksoverheid",
      titulo: "Bedragen minimumloon 2026",
      url: "https://www.rijksoverheid.nl/onderwerpen/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2026",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "nl.kinderbijslag-q3-2026",
    fecha: "2026-10-14",
    titulo: "Kinderbijslag hoger vanaf het derde kwartaal van 2026",
    texto: "Vanaf het derde kwartaal van 2026 krijg je per kind per kwartaal € 298,40 (0 tot en met 5 jaar), € 362,35 (6 tot en met 11 jaar) of € 426,29 (12 tot en met 17 jaar).",
    vigenteDesde: "2026-07-01",
    calculadoras: ["nl.kinderbijslag-berekenen"],
    fuente: {
      organismo: "SVB",
      titulo: "Bedragen en betaaldagen kinderbijslag",
      url: "https://www.svb.nl/nl/kinderbijslag/bedragen-betaaldagen/bedragen-kinderbijslag",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "nl.overdrachtsbelasting-8-procent",
    fecha: "2026-10-14",
    titulo: "Overdrachtsbelasting op beleggingswoningen omlaag naar 8%",
    texto: "Sinds 2026 betaal je 8% overdrachtsbelasting voor een woning waarin je niet zelf gaat wonen, zoals een tweede woning of een woning voor verhuur. Dat was 10,4%. Voor een eigen woning blijft het 2%, en starters onder de 35 betalen onder voorwaarden niets.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["nl.overdrachtsbelasting-berekenen"],
    fuente: {
      organismo: "Belastingdienst",
      titulo: "Het tarief van de overdrachtsbelasting",
      url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/woning/overdrachtsbelasting/tarieven_overdrachtsbelasting/het_tarief_van_de_overdrachtbelasting",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
