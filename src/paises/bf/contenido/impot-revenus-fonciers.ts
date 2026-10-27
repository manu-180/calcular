import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.impot-revenus-fonciers",
  h1: "Calcul de l'impôt sur les revenus fonciers (IRF)",
  title: "IRF Burkina Faso : impôt sur les loyers",
  description:
    "Calculez l'impôt sur les revenus fonciers d'une location : abattement de {{bf.irf-abattement}}, puis {{bf.irf-bareme[0].tasa}} et {{bf.irf-bareme[1].tasa}} par tranche.",
  intro: [
    "Le propriétaire qui loue un immeuble paie l'impôt sur les revenus fonciers (IRF) sur les loyers qu'il encaisse.",
    "Indiquez le loyer mensuel d'une location. Vous obtenez l'impôt du mois et ce qui vous reste.",
  ],
  comoSeCalcula: [
    "Le revenu net imposable est le loyer brut hors TVA, moins un abattement forfaitaire de {{bf.irf-abattement}}.",
    "On applique {{bf.irf-bareme[0].tasa}} jusqu'à {{bf.irf-bareme[0].hasta}} de revenu net, puis {{bf.irf-bareme[1].tasa}} au-dessus.",
    "Le calcul se fait pour chaque location et pour le mois ou la période considérée.",
  ],
  ejemplo: ["Un loyer de 300 000 F par mois : revenu net de 150 000 F, impôt de 30 500 F."],
  faq: [
    {
      pregunta: "Que comprend le loyer brut ?",
      respuesta:
        "Les loyers, les dépenses du bailleur mises à la charge du locataire, les suppléments de loyer et les dépôts de garantie utilisés pour couvrir des loyers.",
    },
    {
      pregunta: "Quand l'impôt est-il exigible ?",
      respuesta: "Il est exigible sur les loyers dus au titre du mois écoulé, à partir de la mise de l'immeuble à la disposition du locataire.",
    },
    {
      pregunta: "Que faire si le bail est résilié avant terme ?",
      respuesta: "Le bailleur doit le notifier au service des impôts dans les dix jours de la rupture. À défaut, l'impôt reste dû.",
    },
  ],
  glosario: [
    { termino: "Revenus fonciers", definicion: "Les revenus tirés de la location d'immeubles bâtis ou non bâtis." },
    { termino: "Abattement forfaitaire", definicion: "La part du loyer retirée d'office de la base de l'impôt, sans justificatif." },
  ],
});
