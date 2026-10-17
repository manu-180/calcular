import { definirTextos } from "@/motor/edicion";
import lohnkostenRechner from "../../ch/calculadoras/lohnkosten-rechner";
import { ANZAHL, COMUN } from "../lib/comun";

export default definirTextos(lohnkostenRechner, {
  calculadora: "ch-fr.lohnkosten-rechner",
  slug: "cout-employeur",
  campos: {
    monatslohn: { etiqueta: "Salaire brut mensuel" },
    anzahl: { etiqueta: "Nombre de salaires mensuels par an", opciones: ANZAHL },
    alter: { etiqueta: "Âge de la personne employée" },
    fak: { etiqueta: "Taux de la caisse d'allocations familiales (CAF)", ayuda: "Le taux dépend du canton et de la caisse." },
    bu: { etiqueta: "Prime d'assurance accidents professionnels (AP)", ayuda: "Selon la police de votre assureur-accidents." },
    ktg: { etiqueta: "Part de l'employeur à la perte de gain maladie" },
    bvgMonat: { etiqueta: "Cotisation LPP de l'employeur par mois", ayuda: "Laissez vide : le calculateur retient la moitié de la bonification de vieillesse légale." },
  },
  filas: {
    kostenMonat: { etiqueta: "Coût salarial par mois" },
    ahv: { etiqueta: "AVS/AI/APG part employeur" },
    alv: { etiqueta: "AC part employeur" },
    bvg: { etiqueta: "Caisse de pension part employeur" },
    fak: { etiqueta: "Caisse d'allocations familiales" },
    bu: { etiqueta: "Accidents professionnels" },
    ktg: { etiqueta: "Perte de gain maladie" },
    beitraege: { etiqueta: "Cotisations patronales par mois" },
    zuschlag: { etiqueta: "Supplément sur le salaire brut" },
    kostenJahr: { etiqueta: "Coût salarial par an" },
  },
  ...COMUN,
});
