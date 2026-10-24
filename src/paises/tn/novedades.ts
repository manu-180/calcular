import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "tn.cnss-non-salaries-t2-2026",
    fecha: "2026-10-24",
    titulo: "CNSS : nouveau barème des cotisations des non-salariés depuis le 2e trimestre 2026",
    texto:
      "La CNSS applique depuis le 2e trimestre 2026 un nouveau barème aux travailleurs non salariés du secteur non agricole. Au taux de 14,71 %, la classe 1 paie 235,389 dinars par trimestre et la classe 10, 4 237,010 dinars.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["tn.cotisations-travailleur-non-salarie"],
    fuente: {
      organismo: "CNSS",
      titulo: "Travailleurs non salariés du secteur non agricole : cotisations",
      url: "https://www.cnss.tn/web/non-salarie/non_sal_asset_services/-/asset_publisher/w1WU/content/non_sal-secteur_-non_agr1_cotisations?convention=false&categorie=1&secteur=1&champAppli=1&servActif=2",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "tn.loi-2025-9-contrats",
    fecha: "2026-10-24",
    titulo: "Contrats de travail : la période d'essai limitée à six mois renouvelables une fois",
    texto:
      "La loi n° 2025-9 du 21 mai 2025 fait du contrat à durée indéterminée la règle et limite le contrat à durée déterminée à des cas exceptionnels. La période d'essai ne peut plus dépasser six mois, renouvelables une fois, et chaque partie prévient l'autre quinze jours avant d'y mettre fin.",
    vigenteDesde: "2025-05-23",
    calculadoras: ["tn.periode-d-essai"],
    fuente: {
      organismo: "Ministère des Affaires sociales",
      titulo: "Loi n° 2025-9 du 21 mai 2025 relative à l'organisation des contrats de travail et à l'interdiction de la sous-traitance (JORT n° 61)",
      url: "https://www.social.gov.tn/sites/default/files/2025-09/%D9%82%D8%A7%D9%86%D9%88%D9%86%20%D8%B9%D8%AF%D8%AF%209%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D9%8A%D8%AA%D8%B9%D9%84%D9%82%20%D8%A8%D8%AA%D9%86%D8%B8%D9%8A%D9%85%20%D8%B9%D9%82%D9%88%D8%AF%20%D8%A7%D9%84%D8%B4%D8%BA%D9%84%20%D9%88%D9%85%D9%86%D8%B9%20%D8%A7%D9%84%D9%85%D9%86%D8%A7%D9%88%D9%84%D8%A9.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
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
