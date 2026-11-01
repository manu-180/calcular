import { definirTextos } from "@/motor/edicion";
import base from "../../cm/calculadoras/cotisations-cnps";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cm-en.cotisations-cnps",
  slug: "cnps-contributions",
  campos: {
    brut: { etiqueta: "Monthly gross salary" },
    regime: { etiqueta: "Family benefits scheme" },
    groupe: { etiqueta: "Company risk group", ayuda: "The group depends on the company's activity. It appears on its CNPS returns." },
  },
  filas: {
    totalSalarie: { etiqueta: "Employee CNPS deduction" },
    pensionEmployeur: { etiqueta: "Old-age pension, employer share" },
    prestationsFamiliales: { etiqueta: "Family benefits (employer)" },
    accidentsTravail: { etiqueta: "Occupational injuries (employer)" },
    totalEmployeur: { etiqueta: "Total paid by the employer" },
    total: { etiqueta: "Total paid to the CNPS" },
    basePlafonnee: { etiqueta: "Salary used for pension and family benefits" },
  },
  mensajes: MENSAJES,
});
