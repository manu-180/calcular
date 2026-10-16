import { definirTextos } from "@/motor/edicion";
import minimumWage from "../../ca/calculadoras/minimum-wage";

export default definirTextos(minimumWage, {
  calculadora: "ca-fr.minimum-wage",
  slug: "salaire-minimum",
  campos: {
    region: { etiqueta: "Province ou territoire où vous travaillez", porDefecto: "qc" },
    federal: { etiqueta: "Votre emploi est de compétence fédérale (banques, télécommunications, transport interprovincial ou international)" },
    horas: { etiqueta: "Heures par semaine" },
  },
  filas: {
    hora: { etiqueta: "Salaire minimum à l'heure" },
    semanal: { etiqueta: "Pour une semaine à ces heures" },
    mensual: { etiqueta: "Pour un mois (moyenne)" },
    anual: { etiqueta: "Pour une année (52 semaines)" },
    provincial: { etiqueta: "Minimum provincial ou territorial" },
    federal: { etiqueta: "Minimum fédéral" },
  },
  mensajes: {
    "The provincial minimum is higher than the federal one, so your employer has to pay the provincial rate.":
      "Le minimum provincial est plus élevé que le minimum fédéral : votre employeur doit donc payer le taux provincial.",
  },
});
