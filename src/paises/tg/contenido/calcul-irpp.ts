import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.calcul-irpp",
  h1: "Calcul de l'IRPP sur salaire au Togo",
  title: "Calcul IRPP Togo : impôt sur les salaires",
  description:
    "Calculez l'IRPP de l'année sur vos revenus d'emploi au Togo : déduction de {{tg.irpp-abattement}}, charges de famille et barème de {{tg.irpp-bareme[1].tasa}} à {{tg.irpp-bareme[-1].tasa}}.",
  intro: [
    "L'impôt sur le revenu des personnes physiques (IRPP) frappe les salaires selon un barème annuel progressif. L'employeur le retient chaque mois sur le bulletin.",
    "Indiquez votre revenu brut de l'année et vos personnes à charge pour connaître l'impôt, la retenue moyenne du mois et votre tranche.",
  ],
  comoSeCalcula: [
    "On retire du brut les cotisations retraite et maladie retenues sur le salaire.",
    "On applique la déduction forfaitaire de {{tg.irpp-abattement}} sur la partie du revenu jusqu'à {{tg.irpp-abattement-plafond}}, puis {{tg.irpp-charge-famille}} par personne à charge et par mois.",
    "Le revenu net, arrondi au millier inférieur, passe au barème : rien jusqu'à {{tg.irpp-bareme[1].desde}}, puis {{tg.irpp-bareme[1].tasa}} et ainsi de suite jusqu'à {{tg.irpp-bareme[-1].tasa}} au-delà de {{tg.irpp-bareme[-1].desde}}.",
  ],
  ejemplo: [
    "Pour 2 400 000 F bruts par an, sans charge : 216 000 F de cotisations et 611 520 F de déduction forfaitaire. Le revenu imposable est de 1 572 000 F et l'IRPP de 20 160 F.",
  ],
  faq: [
    {
      pregunta: "Le barème s'applique-t-il par tranches ?",
      respuesta:
        "Oui. Chaque partie du revenu paie le taux de sa tranche. Passer dans la tranche supérieure ne fait monter l'impôt que sur la partie qui dépasse le seuil.",
    },
    {
      pregunta: "Combien de personnes à charge peut-on déclarer ?",
      respuesta: "Le Code général des impôts limite leur nombre à {{tg.irpp-charges-max}}. Chacune réduit le revenu imposable de {{tg.irpp-charge-famille}} par mois.",
    },
    {
      pregunta: "Comment l'impôt est-il arrondi ?",
      respuesta: "Le revenu net imposable est arrondi au millier de francs inférieur et l'impôt obtenu à la dizaine de francs inférieure.",
    },
  ],
  glosario: [
    { termino: "IRPP", definicion: "Impôt sur le revenu des personnes physiques, prévu par le Code général des impôts." },
    { termino: "Déduction forfaitaire", definicion: "Réduction automatique du revenu d'emploi pour tenir compte des frais professionnels." },
  ],
});
