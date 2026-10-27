import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "dz.snmg-2026",
    fecha: "2026-10-27",
    titulo: "Le SNMG passe à 24 000 dinars depuis le 1er janvier 2026",
    texto:
      "Le décret présidentiel n° 26-01 du 7 janvier 2026 fixe le salaire national minimum garanti à 24 000 DA par mois pour 40 heures par semaine, soit 138,46 DA de l'heure. Il remplace le décret présidentiel n° 21-137 du 7 avril 2021.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["dz.snmg-algerie", "dz.calcul-salaire-net"],
    fuente: {
      organismo: "Journal officiel de la République algérienne (SGG)",
      titulo: "Décret présidentiel n° 26-01 du 7 janvier 2026 fixant le salaire national minimum garanti (JO n° 1 de 2026)",
      url: "https://www.joradp.dz/FTP/jo-francais/2026/F2026001.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
  {
    id: "dz.vignette-exemptions-2026",
    fecha: "2026-10-27",
    titulo: "Vignette automobile : les voitures électriques, hybrides et au GNC en sont exemptées",
    texto:
      "La loi de finances pour 2026 ajoute aux véhicules exemptés de la vignette ceux qui roulent au gaz naturel carburant (GNC) et les véhicules électriques ou hybrides.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["dz.vignette-automobile"],
    fuente: {
      organismo: "Journal officiel de la République algérienne (SGG)",
      titulo: "Loi n° 25-17 du 14 décembre 2025 portant loi de finances pour 2026 (JO n° 88), article 50",
      url: "https://www.joradp.dz/FTP/jo-francais/2025/F2025088.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
  {
    id: "dz.promesse-vente-2026",
    fecha: "2026-10-27",
    titulo: "Promesse de vente immobilière : un droit d'enregistrement de 2,5 %",
    texto:
      "Depuis la loi de finances pour 2026, la promesse de vente d'un immeuble est soumise à un droit de 2,5 %, et l'acte qui la concrétise à 2,5 % également. La vente directe reste soumise au droit de 5 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["dz.droits-enregistrement"],
    fuente: {
      organismo: "Journal officiel de la République algérienne (SGG)",
      titulo: "Loi n° 25-17 du 14 décembre 2025 portant loi de finances pour 2026 (JO n° 88), article 40",
      url: "https://www.joradp.dz/FTP/jo-francais/2025/F2025088.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
