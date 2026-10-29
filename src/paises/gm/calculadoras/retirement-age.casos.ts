import { definirCasos } from "@/motor/calculo";
import calculadora from "./retirement-age";

export default definirCasos(calculadora, [
  {
    nombre: "Born on 15 March 1975",
    origen: { tipo: "recalculado", detalle: "Labour Act 2023, s. 111(1): 60 years. 15 March 2035. From 27 Oct 2026: 8 years and 4 months." },
    fecha: "2026-10-27",
    entrada: { nacimiento: "1975-03-15" },
    esperado: { retiro: "2035-03-15", edad: 60, anios: 8, meses: 4 },
  },
  {
    nombre: "Born on 29 February 1972",
    origen: { tipo: "recalculado", detalle: "2032 is a leap year: 29 February 2032. From 27 Oct 2026: 5 years and 4 months." },
    fecha: "2026-10-27",
    entrada: { nacimiento: "1972-02-29" },
    esperado: { retiro: "2032-02-29", anios: 5, meses: 4 },
  },
  {
    nombre: "Already past 60",
    origen: { tipo: "recalculado", detalle: "Born 1 January 1960: 60 on 1 January 2020." },
    fecha: "2026-10-27",
    entrada: { nacimiento: "1960-01-01" },
    esperado: { retiro: "2020-01-01", anios: 0, meses: 0 },
  },
]);
