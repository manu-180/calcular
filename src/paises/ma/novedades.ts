import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ma.charges-de-famille-2026",
    fecha: "2026-10-16",
    titulo: "Charges de famille : 600 DH par personne depuis le 1er janvier 2026",
    texto:
      "La loi de finances 2026 porte la réduction d'impôt pour charges de famille de 500 à 600 DH par personne à charge, avec un plafond de 3 600 DH par an au lieu de 3 000 DH. Elle s'applique aux revenus acquis à partir du 1er janvier 2026.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ma.calcul-ir-salaire"],
    fuente: {
      organismo: "Bulletin officiel",
      titulo: "Loi de finances n° 50-25 pour l'année budgétaire 2026 (BO n° 7465 bis du 16-12-2025)",
      url: "https://www.sgg.gov.ma/BO/FR/2873/2025/BO_7465-bis_fr.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
  {
    id: "ma.tva-deux-taux-2026",
    fecha: "2026-10-16",
    titulo: "TVA : deux taux seulement à partir de 2026",
    texto:
      "La période transitoire ouverte par la loi de finances 2024 s'est achevée le 31 décembre 2025. Depuis le 1er janvier 2026, la TVA compte deux taux : 20 % et 10 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ma.calcul-tva"],
    fuente: {
      organismo: "Bulletin officiel",
      titulo: "Loi de finances n° 55-23 pour l'année budgétaire 2024 (BO n° 7259 bis du 25-12-2023)",
      url: "https://www.sgg.gov.ma/BO/FR/2873/2023/BO_7259-bis_fr.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
];
