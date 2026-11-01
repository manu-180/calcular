import { definirTextos } from "@/motor/edicion";
import base from "../../cm/calculadoras/smig";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cm-en.smig",
  slug: "minimum-wage",
  campos: {
    secteur: { etiqueta: "Sector" },
    salaire: { etiqueta: "Your monthly salary (optional)", ayuda: "To compare a salary with the legal minimum for your sector." },
  },
  filas: {
    smig: { etiqueta: "Monthly minimum wage" },
    annuel: { etiqueta: "Minimum wage over 12 months" },
    ecart: { etiqueta: "Difference between your salary and the minimum wage" },
  },
  mensajes: MENSAJES,
});
