import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/eisfores-gesy";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.eisfores-gesy",
  slug: "gesy-contribution-calculator",
  campos: {
    misthoi: { etiqueta: "Salary for the year" },
    autotelos: { etiqueta: "Self-employed income" },
    syntaxi: { etiqueta: "Pensions for the year" },
    eisodimata: { etiqueta: "Rent, interest and dividends" },
  },
  filas: {
    eisfora: { etiqueta: "Your GeSY contribution for the year" },
    apoMisthous: { etiqueta: "On salary" },
    apoAutotelos: { etiqueta: "On self-employment" },
    apoSyntaxi: { etiqueta: "On pensions" },
    apoEisodimata: { etiqueta: "On rent, interest and dividends" },
    ergodotis: { etiqueta: "Employer contribution on your salary" },
  },
  mensajes: MENSAJES,
});
