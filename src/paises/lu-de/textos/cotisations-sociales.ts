import { definirTextos } from "@/motor/edicion";
import cotisationsSociales from "../../lu/calculadoras/cotisations-sociales";
import { COMUN } from "../lib/comun";

export default definirTextos(cotisationsSociales, {
  calculadora: "lu-de.cotisations-sociales",
  slug: "sozialversicherungsbeitraege-rechner",
  campos: {
    brut: { etiqueta: "Monatlicher Bruttolohn" },
  },
  filas: {
    total: { etiqueta: "Beiträge des Arbeitnehmers pro Monat" },
    maladie: { etiqueta: "Krankenversicherung (Sachleistungen und Geldleistungen)" },
    pension: { etiqueta: "Rentenversicherung" },
    dependance: { etiqueta: "Pflegeversicherung" },
    assiette: { etiqueta: "Bemessungsgrundlage Kranken- und Rentenversicherung (gedeckelt)" },
    annuel: { etiqueta: "Beiträge für zwölf Monate" },
    part: { etiqueta: "Anteil am Bruttolohn" },
  },
  ...COMUN,
});
