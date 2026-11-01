import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "sr.minimumuurloon-juli-2026",
    fecha: "2026-10-27",
    titulo: "Minimum uurloon per 1 juli 2026: SRD 61,25",
    texto: "Sinds 1 juli 2026 is het algemeen minimum uurloon SRD 61,25. Daarvoor was het SRD 52,47. De minimumloonberekening rekent al met het nieuwe bedrag.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["sr.minimumloon-berekenen"],
    fuente: {
      organismo: "SRiS (Staatsblad)",
      titulo: "S.B. 2026 no. 63, Beschikking van 3 juli 2026 no. 777/26",
      url: "https://www.sris.sr/wp-content/uploads/2026/08/S.B.-2026-no.-63-Beschikking-houdende-vaststelling-van-een-nieuw-minimum-uurloon.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
  {
    id: "sr.overwerk-vakantie-bonus-2025",
    fecha: "2026-10-27",
    titulo: "Lagere belasting op overwerk en hogere vrijstelling voor vakantiegeld en bonus",
    texto: "Het Staatsbesluit van 29 oktober 2025 verbreedde de schijven voor overwerk naar SRD 2.500 en SRD 7.500 per maand, met terugwerkende kracht tot 1 juli 2025. De vrijstelling voor vakantie-uitkering en gratificatie ging met terugwerkende kracht tot 1 januari 2025 naar SRD 19.500 per jaar.",
    vigenteDesde: "2025-07-01",
    calculadoras: ["sr.overuren-berekenen", "sr.vakantietoelage-berekenen", "sr.bonus-belasting-berekenen"],
    fuente: {
      organismo: "SRiS (Staatsblad)",
      titulo: "S.B. 2025 no. 129, Staatsbesluit van 29 oktober 2025",
      url: "https://www.sris.sr/wp-content/uploads/2025/11/S.B.-2025-no.-129-STAATSBESLUIT-ter-uitvoering-van-artikel-18a-van-de-Wet-Loonbelasting.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
