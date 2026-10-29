import { definirCasos } from "@/motor/calculo";
import calculadora from "./immovable-property-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Villa valued at SCR 5 million",
    origen: { tipo: "recalculado", detalle: "0.50 % of 5,000,000 = 25,000." },
    fecha: "2026-10-29",
    entrada: { valor: 5000000, uso: "residential", casado: false, primerAnio: false },
    esperado: { impuesto: 25000 },
  },
  {
    nombre: "Owner married to a Seychellois",
    origen: { tipo: "oficial", url: "https://src.gov.sc/seychelles-tax-system/", detalle: "The SRC page lists residential property owned by a taxpayer married to a Seychellois as exempt." },
    fecha: "2026-10-29",
    entrada: { valor: 5000000, uso: "residential", casado: true, primerAnio: false },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Commercial property",
    origen: { tipo: "oficial", url: "https://src.gov.sc/seychelles-tax-system/", detalle: "The SRC page lists commercial and industrial property as exempt from this tax." },
    fecha: "2026-10-29",
    entrada: { valor: 12000000, uso: "commercial", casado: false, primerAnio: false },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "First year exemption",
    origen: { tipo: "oficial", url: "https://src.gov.sc/seychelles-tax-system/", detalle: "A first time owner after 1 January 2020 is exempt for one year from the date of owning." },
    fecha: "2026-10-29",
    entrada: { valor: 3000000, uso: "residential", casado: false, primerAnio: true },
    esperado: { impuesto: 0 },
  },
]);
