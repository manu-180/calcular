import { definirCasos } from "@/motor/calculo";
import calculadora from "./provisional-tax-calculator";

const URL = "https://revenue.gov.ws/wp-content/uploads/2026/10/IS01_Income-Tax-1-2026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Official IS01 example: WST 10,000 of tax",
    origen: { tipo: "oficial", url: URL, detalle: "IS01 shows instalments of 3,333.33, 3,333.33 and 3,333.34 on 31 March, 31 July and 31 October." },
    fecha: "2026-10-29",
    entrada: { impuestoAnterior: 10000, anio: 2020 },
    esperado: { primera: 3333.33, segunda: 3333.33, tercera: 3333.34, total: 10000 },
  },
  {
    nombre: "Tax of WST 9,000 for 2026",
    origen: { tipo: "recalculado", url: URL, detalle: "9,000 / 3 = 3,000 three times." },
    fecha: "2026-10-29",
    entrada: { impuestoAnterior: 9000, anio: 2026 },
    esperado: { primera: 3000, segunda: 3000, tercera: 3000, fecha1: "31 March 2026", fecha3: "31 October 2026" },
  },
  {
    nombre: "Tax under WST 500",
    origen: { tipo: "oficial", url: URL, detalle: "Under 500, the full amount is paid in the first payment in March." },
    fecha: "2026-10-29",
    entrada: { impuestoAnterior: 400, anio: 2026 },
    esperado: { primera: 400, segunda: 0, tercera: 0, total: 400 },
  },
]);
