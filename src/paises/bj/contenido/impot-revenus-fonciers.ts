import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.impot-revenus-fonciers",
  h1: "Impôt sur les revenus fonciers (IRF) {{anio}} au Bénin",
  title: "Impôt sur les revenus fonciers {{anio}} : loyers au Bénin",
  description:
    "Calculez l'impôt sur vos loyers au Bénin : {{bj.irf-taux}} des loyers bruts, redevance de {{bj.irf-redevance-ortb}} et retenue à la source déjà opérée par le locataire.",
  intro: [
    "Un propriétaire béninois qui loue un logement, un local ou un terrain paie l'impôt sur les revenus fonciers sur le montant brut des loyers de l'année. Certains locataires retiennent une partie de l'impôt directement.",
    "Indiquez le loyer mensuel, le nombre de mois et la retenue éventuelle. Le résultat montre ce qu'il reste à régler.",
  ],
  comoSeCalcula: [
    "La base est le montant brut des loyers, augmenté des dépenses du propriétaire que le bail met à la charge du locataire (article 103).",
    "Le taux est de {{bj.irf-taux}}, majoré d'une redevance de {{bj.irf-redevance-ortb}} au profit de la radiodiffusion et télévision (article 104).",
    "Le locataire qui est une entité soumise à l'impôt retient {{bj.irf-retenue[general]}} du loyer, ou {{bj.irf-retenue[bailleur-entreprise]}} si le bailleur relève de l'IBA ou de l'IS. Les locataires particuliers n'opèrent pas de retenue. La retenue vient en déduction de l'impôt dû (article 106).",
  ],
  ejemplo: [
    "Un appartement loué 150 000 F par mois pendant 12 mois rapporte 1 800 000 F. L'impôt est de 216 000 F, auquel s'ajoutent 4 000 F de redevance : 220 000 F. Si le locataire est une société qui a retenu 12 %, soit 216 000 F, il ne reste que la redevance de 4 000 F.",
  ],
  faq: [
    {
      pregunta: "Quel est le taux de l'impôt sur les loyers au Bénin ?",
      respuesta: "L'article 104 du Code général des impôts fixe le taux à {{bj.irf-taux}} des loyers bruts, avec une redevance de {{bj.irf-redevance-ortb}}.",
    },
    {
      pregunta: "Qui doit retenir l'impôt sur le loyer ?",
      respuesta: "L'article 106 oblige les locataires à retenir {{bj.irf-retenue[general]}} du loyer brut, ou {{bj.irf-retenue[bailleur-entreprise]}} si le bailleur est soumis à l'IBA ou à l'IS. Les particuliers en sont exemptés, sauf s'ils louent par une entité soumise à l'impôt sur les bénéfices.",
    },
    {
      pregunta: "La retenue dispense-t-elle de déclarer ?",
      respuesta: "Non. L'article 106 précise qu'elle est libératoire mais ne dispense pas de l'obligation déclarative annuelle. L'état des loyers se remet avant le 10 février (article 105).",
    },
  ],
  glosario: [
    { termino: "Revenus fonciers", definicion: "Les loyers des immeubles bâtis ou non, y compris les locations meublées, hors entreprise." },
    { termino: "Retenue à la source", definicion: "La part de l'impôt que le locataire garde sur le loyer pour la verser à l'administration." },
    { termino: "Bailleur", definicion: "Le propriétaire qui donne le bien en location." },
  ],
});
