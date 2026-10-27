import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.impot-sur-les-loyers",
  h1: "Impôt sur les revenus locatifs au Togo",
  title: "Impôt sur les loyers Togo : IRPP et retenue de {{tg.loyers-retenue[total]}}",
  description:
    "Calculez l'IRPP sur vos loyers au Togo : déduction de {{tg.foncier-abattement}}, barème de l'impôt et retenue à la source de {{tg.loyers-retenue[total]}} sur les loyers bruts.",
  intro: [
    "Les loyers encaissés par un propriétaire sont des revenus fonciers soumis à l'IRPP. Une retenue de {{tg.loyers-retenue[total]}} est prélevée sur les loyers en cours d'année.",
    "Indiquez les loyers bruts de l'année et les taxes foncières payées pour connaître l'impôt et ce qui reste dû après la retenue.",
  ],
  comoSeCalcula: [
    "Le revenu net foncier est égal aux loyers bruts moins une déduction forfaitaire de {{tg.foncier-abattement}}, moins les taxes foncières à la charge du propriétaire.",
    "Ce revenu net, arrondi au millier inférieur, passe au barème de l'IRPP, de {{tg.irpp-bareme[1].tasa}} à {{tg.irpp-bareme[-1].tasa}}.",
    "La retenue de {{tg.loyers-retenue[total]}} s'impute pour {{tg.loyers-retenue[irpp]}} sur l'IRPP et pour {{tg.loyers-retenue[taxe-fonciere]}} sur la taxe foncière.",
  ],
  ejemplo: [
    "Avec 6 000 000 F de loyers par an, le revenu net est de 3 000 000 F et l'IRPP de 63 000 F. La part de la retenue imputée sur l'IRPP, 300 000 F, le couvre déjà.",
  ],
  faq: [
    {
      pregunta: "Qui opère la retenue sur les loyers ?",
      respuesta:
        "Le locataire, lorsqu'il s'agit d'une collectivité publique, d'une organisation internationale, d'une personne morale ou d'une personne physique exerçant une activité artisanale, commerciale ou non commerciale.",
    },
    {
      pregunta: "Et si mon locataire est un particulier ?",
      respuesta:
        "Vous versez vous-même des acomptes au même taux de {{tg.loyers-retenue[total]}}, au plus tard le 15 du mois qui suit la période de loyer.",
    },
    {
      pregunta: "Peut-on déduire les frais réels au lieu du forfait ?",
      respuesta:
        "Oui, sur option demandée avant le 30 novembre. Elle vaut pour tous vos revenus fonciers et ne peut être révoquée qu'après trois ans.",
    },
  ],
  glosario: [
    { termino: "Revenus fonciers", definicion: "Revenus tirés de la location de propriétés bâties ou non bâties." },
    { termino: "Imputation", definicion: "Déduction d'une somme déjà payée de l'impôt à payer." },
  ],
});
