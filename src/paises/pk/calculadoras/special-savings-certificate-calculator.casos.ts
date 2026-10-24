import { definirCasos } from "@/motor/calculo";
import calculadora from "./special-savings-certificate-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 100,000, filer",
    origen: {
      tipo: "oficial",
      url: "https://savings.gov.pk/latest-profit-rates/",
      detalle: "Profit table from 01-Oct-26: 5,800 for each of the first five half-years and 6,450 for the last, per Rs. 100,000. Total 35,450; filer tax 15% = 5,317.50; net 30,132.50.",
    },
    fecha: "2026-10-17",
    entrada: { monto: 100000, contribuyente: "filer" },
    esperado: { bruto: 35450, impuesto: 5317.5, neto: 30132.5, semestre: 4930, ultimo: 5482.5 },
  },
]);
