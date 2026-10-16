import { definirTextos } from "@/motor/edicion";
import bruttoNettoRechner from "../../ch/calculadoras/brutto-netto-rechner";
import { ANZAHL, COMUN } from "../lib/comun";

export default definirTextos(bruttoNettoRechner, {
  calculadora: "ch-fr.brutto-netto-rechner",
  slug: "calcul-salaire-net",
  campos: {
    monatslohn: { etiqueta: "Salaire brut mensuel" },
    anzahl: { etiqueta: "Nombre de salaires mensuels par an", opciones: ANZAHL },
    alter: { etiqueta: "Âge (année civile moins année de naissance)" },
    nbu: { etiqueta: "Prime d'assurance accidents non professionnels (ANP)", ayuda: "Elle figure sur votre fiche de salaire. Elle dépend de l'assureur et de la branche." },
    ktg: { etiqueta: "Cotisation perte de gain maladie (si déduite)" },
    bvgMonat: { etiqueta: "Déduction LPP mensuelle selon la fiche de salaire", ayuda: "Laissez vide : le calculateur estime la cotisation minimale légale." },
  },
  filas: {
    netto: { etiqueta: "Salaire net mensuel" },
    ahv: { etiqueta: "AVS/AI/APG" },
    alv: { etiqueta: "Assurance-chômage (AC)" },
    bvg: { etiqueta: "Caisse de pension (LPP)" },
    nbu: { etiqueta: "Accidents non professionnels (ANP)" },
    ktg: { etiqueta: "Perte de gain maladie" },
    total: { etiqueta: "Total des déductions par mois" },
    jahreslohn: { etiqueta: "Salaire brut annuel" },
    nettoJahr: { etiqueta: "Salaire net annuel" },
    koordinierterLohn: { etiqueta: "Salaire coordonné (LPP)" },
  },
  ...COMUN,
});
