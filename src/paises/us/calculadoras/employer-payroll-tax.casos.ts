import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-payroll-tax";

export default definirCasos(calculadora, [
  {
    nombre: "One employee at $50,000 without state unemployment tax",
    origen: { tipo: "recalculado", url: "https://www.irs.gov/pub/irs-pdf/p15.pdf", detalle: "SS 3100, Medicare 725, FUTA 0.6% of 7000 = 42. Taxes 3867, cost 53867." },
    fecha: "2026-10-14",
    entrada: { salario: 50000, empleados: 1, sutaTasa: null, sutaBase: null },
    esperado: { socialSecurity: 3100, medicare: 725, futa: 42, suta: 0, impuestos: 3867, costo: 53867, porcentajeExtra: 7.73, costoTotal: 53867 },
  },
  {
    nombre: "Three employees at $200,000 with a 2.7% SUTA on $9,000",
    origen: { tipo: "recalculado", detalle: "SS 6.2% of 184500 = 11439, Medicare 2900, FUTA 42, SUTA 243. Taxes 14624 each; cost 214624 each and 643872 in total." },
    fecha: "2026-10-14",
    entrada: { salario: 200000, empleados: 3, sutaTasa: 2.7, sutaBase: 9000 },
    esperado: { socialSecurity: 11439, medicare: 2900, futa: 42, suta: 243, impuestos: 14624, costo: 214624, costoTotal: 643872 },
  },
]);
