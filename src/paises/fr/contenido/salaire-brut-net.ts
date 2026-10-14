import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.salaire-brut-net",
  h1: "Salaire brut en net : calcul 2026",
  title: "Salaire brut en net 2026 : calcul exact, cadre et non-cadre",
  description:
    "Passez du brut au net (ou du net au brut) avec les cotisations salariales 2026 : retraite, CSG, CRDS, cadre ou non-cadre et prélèvement à la source.",
  intro: [
    "Le salaire net, c'est le brut moins les cotisations salariales. Dans le privé, elles retirent environ 21 % du brut, hors mutuelle.",
    "Le calcul suit les taux 2026 de l'Urssaf et de l'Agirc-Arrco, cotisation par cotisation. Vous pouvez aussi partir du net pour retrouver le brut, et ajouter votre taux de prélèvement à la source.",
  ],
  comoSeCalcula: [
    "Retraite de base : {{fr.vieillesse-plafonnee}} jusqu'au plafond mensuel de la Sécurité sociale ({{fr.pmss}}) et {{fr.vieillesse-deplafonnee}} sur tout le salaire.",
    "Retraite complémentaire Agirc-Arrco : {{fr.agirc-arrco-t1}} plus {{fr.ceg-t1}} jusqu'au plafond, puis {{fr.agirc-arrco-t2}} plus {{fr.ceg-t2}} sur la part entre 1 et 8 plafonds. Au-dessus du plafond s'ajoute la CET de {{fr.cet}}, et l'Apec de {{fr.apec}} pour un cadre.",
    "CSG et CRDS : {{fr.csg-deductible}} de CSG déductible, {{fr.csg-non-deductible}} de CSG non déductible et {{fr.crds}} de CRDS, sur {{fr.assiette-csg}} du brut.",
    "Le net imposable ajoute au net la CSG non déductible et la CRDS. C'est sur lui que s'applique votre taux de prélèvement à la source.",
  ],
  ejemplo: [
    "Pour un salaire de 3 000 € brut par mois, non-cadre, les cotisations font 625,21 €. Le net avant impôt est de 2 374,79 € et le net imposable de 2 460,27 €.",
    "Avec un taux de prélèvement de 7,5 %, l'impôt retenu est de 184,52 € et il reste 2 190,27 € sur le compte.",
  ],
  faq: [
    {
      pregunta: "Combien de pourcentage entre le brut et le net ?",
      respuesta:
        "Hors mutuelle, le net représente environ 79 % du brut, pour un cadre comme pour un non-cadre. La différence entre les deux statuts tient surtout à la cotisation Apec, très faible. La calculatrice affiche la part exacte pour votre salaire.",
    },
    {
      pregunta: "Pourquoi le net imposable est-il plus élevé que le net ?",
      respuesta:
        "Une partie de la CSG ({{fr.csg-non-deductible}}) et la CRDS ({{fr.crds}}) sont retenues sur votre salaire mais restent soumises à l'impôt. Elles s'ajoutent donc au net pour obtenir le net imposable.",
    },
    {
      pregunta: "La mutuelle est-elle comprise ?",
      respuesta:
        "Non. La part salariale de la mutuelle et de la prévoyance dépend du contrat de votre entreprise. Retirez-la du net affiché pour retrouver le montant exact de votre bulletin.",
    },
    {
      pregunta: "Et en Alsace-Moselle ?",
      respuesta:
        "Les salariés du Bas-Rhin, du Haut-Rhin et de la Moselle paient une cotisation maladie supplémentaire de {{fr.maladie-alsace-moselle}} du brut. Cochez la case correspondante pour l'ajouter.",
    },
  ],
  glosario: [
    { termino: "Salaire brut", definicion: "Le salaire avant toute cotisation, celui inscrit sur le contrat de travail." },
    { termino: "Net avant impôt", definicion: "Le brut moins les cotisations et contributions salariales." },
    { termino: "PMSS", definicion: "Plafond mensuel de la Sécurité sociale. Il sert de limite à plusieurs cotisations." },
    { termino: "CSG et CRDS", definicion: "Contributions sociales prélevées sur presque tous les revenus d'activité." },
  ],
});
