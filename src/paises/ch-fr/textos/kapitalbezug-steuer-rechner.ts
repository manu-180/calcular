import { definirTextos } from "@/motor/edicion";
import kapitalbezugSteuerRechner from "../../ch/calculadoras/kapitalbezug-steuer-rechner";
import { COMUN, ZIVILSTAND } from "../lib/comun";

export default definirTextos(kapitalbezugSteuerRechner, {
  calculadora: "ch-fr.kapitalbezug-steuer-rechner",
  slug: "impot-retrait-capital",
  campos: {
    kapital: { etiqueta: "Retrait en capital de la caisse de pension ou du pilier 3a" },
    zivilstand: { etiqueta: "État civil", opciones: ZIVILSTAND },
    mitKindern: { etiqueta: "Avec des enfants dans le même ménage" },
  },
  filas: {
    steuer: { etiqueta: "Impôt fédéral direct sur le retrait" },
    satz: { etiqueta: "Part du capital" },
    vollerTarif: { etiqueta: "Impôt selon le barème complet (avant division par cinq)" },
    netto: { etiqueta: "Capital après impôt fédéral" },
  },
  ...COMUN,
});
