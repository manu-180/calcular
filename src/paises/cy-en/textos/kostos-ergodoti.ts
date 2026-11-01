import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/kostos-ergodoti";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.kostos-ergodoti",
  slug: "employer-cost-calculator",
  campos: {
    misthos: { etiqueta: "Gross monthly salary" },
    misthoi: { etiqueta: "Salaries a year", opciones: { "12": "12 salaries", "13": "13 salaries (with a 13th salary)" } },
    tameioAdeion: { etiqueta: "You pay into the Central Holiday Fund", ayuda: "No, if you have an exemption and pay your employees' annual leave yourself." },
  },
  filas: {
    kostosMina: { etiqueta: "Employer cost per month" },
    ergodotiMina: { etiqueta: "Employer contributions per month" },
    kaErgodoti: { etiqueta: "Social Insurance" },
    gesyErgodoti: { etiqueta: "GeSY" },
    tameia: { etiqueta: "Holiday, Redundancy, Human Resource Development and Cohesion funds" },
    miktaEtous: { etiqueta: "Gross salaries for the year" },
    ergodotiEtous: { etiqueta: "Employer contributions for the year" },
    kostosEtous: { etiqueta: "Total cost for the year" },
    epivarynsi: { etiqueta: "On-cost over the salary" },
  },
  mensajes: MENSAJES,
});
