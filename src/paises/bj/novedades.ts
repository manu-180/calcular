import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "bj.cgi-2026",
    fecha: "2026-10-27",
    titulo: "Code général des impôts 2026 : le barème de l'ITS reste inchangé",
    texto:
      "La DGI publie le Code général des impôts mis à jour de la loi de finances pour 2026. Le barème mensuel de l'ITS, la TVA, la TPS et le versement patronal sur salaires gardent leurs taux.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["bj.calcul-salaire-net", "bj.calcul-its", "bj.calcul-tva", "bj.taxe-professionnelle-synthetique", "bj.cout-employeur"],
    fuente: {
      organismo: "Direction générale des Impôts (DGI)",
      titulo: "Code général des impôts 2026",
      url: "https://apisiteweb.impots.bj/media/6adcbd46ab83b_B%C3%A9nin-Code%20G%C3%A9n%C3%A9ral%20des%20Imp%C3%B4ts%202026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
  {
    id: "bj.loi-finances-rectificative-2026",
    fecha: "2026-10-27",
    titulo: "Loi de finances rectificative 2026 : les loyers perçus via les plateformes soumis à la retenue",
    texto:
      "La loi de finances rectificative pour 2026 étend la retenue à la source sur les loyers aux réservations d'hébergement et aux loyers collectés par les plateformes en ligne. La retenue incombe au propriétaire de la plateforme.",
    calculadoras: ["bj.impot-revenus-fonciers"],
    fuente: {
      organismo: "Direction générale des Impôts (DGI)",
      titulo: "Loi de finances rectificative pour la gestion 2026 (article 13)",
      url: "https://apisiteweb.impots.bj/media/6adcb8249c4ab_B%C3%A9nin-Loi%20de%20finances%20rectificative%202026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
  {
    id: "bj.taux-bceao-mars-2026",
    fecha: "2026-10-27",
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
      verificadoEl: "2026-10-27",
    },
  },
];
