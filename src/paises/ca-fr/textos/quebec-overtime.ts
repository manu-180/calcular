import { definirTextos } from "@/motor/edicion";
import heures from "../../ca/calculadoras/quebec-overtime";

export default definirTextos(heures, {
  calculadora: "ca-fr.quebec-overtime",
  slug: "calcul-heures-supplementaires",
  campos: {
    tasaHora: { etiqueta: "Votre salaire horaire habituel" },
    horas: { etiqueta: "Heures travaillées dans la semaine" },
  },
  filas: {
    total: { etiqueta: "Paie de la semaine" },
    pagoNormal: { etiqueta: "Paie des heures normales" },
    pagoExtra: { etiqueta: "Paie des heures supplémentaires" },
    extra: { etiqueta: "Heures supplémentaires" },
    tasaExtra: { etiqueta: "Taux horaire des heures supplémentaires" },
  },
  mensajes: {
    "Enter your hourly wage.": "Inscrivez votre salaire horaire.",
  },
});
