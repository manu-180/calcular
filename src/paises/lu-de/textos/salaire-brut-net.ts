import { definirTextos } from "@/motor/edicion";
import salaireBrutNet from "../../lu/calculadoras/salaire-brut-net";
import { COMUN, STEUERKLASSE } from "../lib/comun";

export default definirTextos(salaireBrutNet, {
  calculadora: "lu-de.salaire-brut-net",
  slug: "brutto-netto-rechner",
  campos: {
    brut: { etiqueta: "Monatlicher Bruttolohn" },
    classe: { etiqueta: "Steuerklasse", opciones: STEUERKLASSE },
  },
  filas: {
    net: { etiqueta: "Monatlicher Nettolohn" },
    maladie: { etiqueta: "Krankenversicherung" },
    pension: { etiqueta: "Rentenversicherung" },
    dependance: { etiqueta: "Pflegeversicherung" },
    cotisations: { etiqueta: "Sozialversicherungsbeiträge" },
    imposable: { etiqueta: "Steuerpflichtiges Monatseinkommen (auf 5 Euro abgerundet)" },
    retenue: { etiqueta: "Lohnsteuer (einschließlich Beschäftigungsfonds)" },
    credits: { etiqueta: "Steuerkredite CIS und CI-CO2" },
  },
  ...COMUN,
});
