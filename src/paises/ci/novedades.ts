import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ci.annexe-fiscale-2026",
    fecha: "2026-10-24",
    titulo: "L'annexe fiscale 2026 s'applique depuis le 5 janvier 2026",
    texto:
      "L'annexe fiscale à la loi de finances n° 2025-987 du 19 décembre 2025 a paru au Journal officiel le 31 décembre 2025. Selon la note de service de la DGI, ses dispositions prennent effet à compter du lundi 5 janvier 2026.",
    vigenteDesde: "2026-01-05",
    calculadoras: ["ci.calcul-its", "ci.calcul-tva", "ci.taxe-entreprenant", "ci.impot-sur-les-benefices"],
    fuente: {
      organismo: "DGI",
      titulo: "Annexe fiscale 2026 et note de service n° 06499/MFB/DGI/DLCD-SDL du 31 décembre 2025",
      url: "https://www.dgi.gouv.ci/assets/documents/ANNEXE_FISCALE_2026/",
      tipo: "primaria",
      verificadoEl: "2026-10-18",
    },
  },
  {
    id: "ci.taux-bceao-mars-2026",
    fecha: "2026-10-24",
    titulo: "BCEAO : taux minimum de soumission à 3 % depuis le 16 mars 2026",
    texto:
      "Le taux minimum de soumission aux appels d'offres de la BCEAO est de 3,00 % et le taux du guichet de prêt marginal de 5,00 %, en vigueur depuis le 16 mars 2026.",
    vigenteDesde: "2026-03-16",
    calculadoras: [],
    fuente: {
      organismo: "BCEAO",
      titulo: "Page d'accueil de la BCEAO : taux directeurs",
      url: "https://www.bceao.int/",
      tipo: "primaria",
      verificadoEl: "2026-10-23",
    },
  },
];
