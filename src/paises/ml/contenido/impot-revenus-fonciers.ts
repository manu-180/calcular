import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.impot-revenus-fonciers",
  h1: "Calcul de l'impôt sur les revenus fonciers au Mali",
  title: "Impôt sur les loyers au Mali (IRF) : calcul",
  description: "Calculez l'impôt sur les revenus fonciers (IRF) dû sur vos loyers au Mali : {{ml.irf-taux[dur]}} pour un immeuble en dur, {{ml.irf-taux[banco]}} en banco.",
  intro: [
    "Le propriétaire qui loue un immeuble bâti au Mali paie l'impôt sur les revenus fonciers (IRF) sur les loyers encaissés dans l'année.",
    "Indiquez le loyer mensuel, les mois loués et le type de construction. Vous obtenez l'impôt de l'année.",
  ],
  comoSeCalcula: [
    "Le revenu brut est la somme des loyers de l'année. On y ajoute les charges du propriétaire payées par le locataire et on retire les charges du locataire payées par le propriétaire.",
    "Aucun abattement n'est appliqué. La base est arrondie aux mille francs inférieurs.",
    "Le taux est de {{ml.irf-taux[dur]}} pour les immeubles en dur et semi-dur et de {{ml.irf-taux[banco]}} pour les immeubles en banco.",
  ],
  ejemplo: ["Une villa en dur louée 150 000 F par mois toute l'année rapporte 1 800 000 F. L'IRF est de 216 000 F."],
  faq: [
    {
      pregunta: "Ma maison que j'habite est-elle imposée ?",
      respuesta: "Non. Les immeubles non loués occupés par le propriétaire ou par les membres de sa famille à sa charge sont exonérés.",
    },
    {
      pregunta: "Puis-je déduire mes frais d'entretien ?",
      respuesta: "Non. Le CGI précise que la base ne fait l'objet d'aucune réfaction, quel qu'en soit le motif.",
    },
    {
      pregunta: "Et si l'immeuble appartient à une société ?",
      respuesta: "Les immeubles inscrits à l'actif d'une société soumise à l'impôt sur les sociétés ne paient pas l'IRF : leurs loyers entrent dans le bénéfice de la société.",
    },
  ],
  glosario: [
    { termino: "IRF", definicion: "Impôt sur les revenus fonciers, dû sur les loyers des immeubles bâtis." },
    { termino: "Banco", definicion: "Construction en terre crue." },
  ],
});
