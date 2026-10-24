import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "tn.css-revenus-2025",
    fecha: "2026-10-23",
    titulo: "Contribution sociale de solidarité : le demi-point maintenu pour les revenus 2025",
    texto:
      "La loi de finances 2026 prolonge d'un an la majoration réduite d'un demi-point pour les personnes physiques : elle vaut pour les revenus déclarés en 2026, soit les revenus de 2025. Pour les revenus de 2026, le texte prévoit le retour à la majoration d'un point.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["tn.calcul-irpp-salaire", "tn.calcul-salaire-net", "tn.bareme-irpp", "tn.impot-sur-pension"],
    fuente: {
      organismo: "Journal officiel de la République tunisienne",
      titulo: "Loi n° 2025-17 du 12 décembre 2025 portant loi de finances pour l'année 2026 (article 87)",
      url: "https://www.finances.gov.tn/sites/default/files/2026-01/115725.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-23",
    },
  },
  {
    id: "tn.abattement-pensions-2027",
    fecha: "2026-10-23",
    titulo: "Pensions : l'abattement passera de 25 % à 50 % d'ici 2029",
    texto:
      "La loi de finances 2026 relève l'abattement sur les pensions et rentes viagères : 30 % à partir du 1er janvier 2027, 40 % en 2028 et 50 % en 2029. Il reste de 25 % en 2026.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["tn.impot-sur-pension"],
    fuente: {
      organismo: "Ministère des Finances (DGI, jibaya.tn)",
      titulo: "Code de l'IRPP et de l'IS, édition 2026 (article 26-II, modifié par l'article 56 de la LF 2026)",
      url: "https://jibaya.tn/wp-content/uploads/2026/03/Code_IRPP_IS_2026_fr.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-23",
    },
  },
];
