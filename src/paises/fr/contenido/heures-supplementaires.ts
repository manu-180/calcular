import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.heures-supplementaires",
  h1: "Calcul des heures supplémentaires",
  title: "Heures supplémentaires : calcul à {{fr.hs-majoration-1}} et {{fr.hs-majoration-2}}",
  description:
    "Calculez le paiement de vos heures supplémentaires : majoration de {{fr.hs-majoration-1}} puis {{fr.hs-majoration-2}}, taux horaire majoré et net estimé après CSG et CRDS.",
  intro: [
    "Une heure supplémentaire est une heure travaillée au-delà de 35 heures dans la semaine. Elle est payée avec une majoration.",
    "Sans accord d'entreprise ou de branche qui fixe un autre taux, la loi prévoit {{fr.hs-majoration-1}} pour les premières {{fr.hs-heures-tranche-1}} de la semaine (de la 36e à la 43e) et {{fr.hs-majoration-2}} à partir de la 44e heure.",
  ],
  comoSeCalcula: [
    "Taux horaire : salaire mensuel brut ÷ 151,67 heures pour un temps plein à 35 heures.",
    "Premières heures : taux horaire × (1 + {{fr.hs-majoration-1}}). Heures suivantes : taux horaire × (1 + {{fr.hs-majoration-2}}).",
    "Les heures sont comptées semaine par semaine : les premières {{fr.hs-heures-tranche-1}} de chaque semaine au premier taux, les autres au second.",
    "Net estimé : les cotisations de retraite sur ces heures sont réduites (jusqu'à {{fr.hs-reduction-salariale}} du salaire). Il reste surtout la CSG et la CRDS.",
  ],
  ejemplo: [
    "Avec 2 200 € brut par mois, le taux horaire est de 14,51 €. Une heure majorée de 25 % vaut 18,14 €.",
    "Quatre heures supplémentaires par semaine pendant quatre semaines rapportent 290,24 € brut, environ 262,58 € net.",
  ],
  faq: [
    {
      pregunta: "Une convention peut-elle prévoir un autre taux ?",
      respuesta:
        "Oui. Un accord d'entreprise ou, à défaut, de branche peut fixer un taux différent, à condition qu'il soit d'au moins 10 %. Les taux de {{fr.hs-majoration-1}} et {{fr.hs-majoration-2}} s'appliquent quand aucun accord n'existe.",
    },
    {
      pregunta: "Les heures supplémentaires sont-elles imposables ?",
      respuesta: "Elles sont exonérées d'impôt sur le revenu dans la limite de {{fr.hs-exoneration-ir}} nets par an. Au-delà, elles sont imposées comme le reste du salaire.",
    },
    {
      pregunta: "Peut-on remplacer le paiement par du repos ?",
      respuesta:
        "Oui, si un accord le prévoit. Le repos compensateur de remplacement tient compte de la majoration : une heure majorée de 50 % donne droit à 1 heure 30 de repos.",
    },
  ],
  glosario: [
    { termino: "Heure supplémentaire", definicion: "Heure de travail effectuée au-delà de la durée légale de 35 heures par semaine." },
    { termino: "Majoration", definicion: "Supplément de salaire versé pour chaque heure supplémentaire." },
    { termino: "151,67 heures", definicion: "Durée mensuelle d'un temps plein à 35 heures par semaine." },
  ],
});
