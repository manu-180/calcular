import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Omaní con 600 de básico y 200 de subsidios",
    origen: { tipo: "recalculado", detalle: "Salario 800. Vejez 7,5 % = 60. Seguridad laboral 0,5 % = 4. Descuento 64. Neto 736. Anual 8.832." },
    fecha: "2026-10-26",
    entrada: { basico: 600, bdl: 200, nacionalidad: "omani" },
    esperado: { bruto: 800, vejez: 60, seguridad: 4, descuento: 64, neto: 736, anual: 8832 },
  },
  {
    nombre: "Extranjero sin descuentos",
    origen: { tipo: "recalculado", detalle: "Sin aportes del empleado: neto = 800." },
    fecha: "2026-10-26",
    entrada: { basico: 600, bdl: 200, nacionalidad: "expat" },
    esperado: { descuento: 0, neto: 800 },
  },
  {
    nombre: "Omaní por encima del tope",
    origen: { tipo: "recalculado", detalle: "Salario 4.000. Vejez 7,5 % de 3.000 = 225. Seguridad 0,5 % de 4.000 = 20. Neto 4.000 - 245 = 3.755." },
    fecha: "2026-10-26",
    entrada: { basico: 3500, bdl: 500, nacionalidad: "omani" },
    esperado: { vejez: 225, seguridad: 20, neto: 3755 },
  },
  {
    nombre: "Sin básico",
    origen: { tipo: "recalculado", detalle: "Básico 0." },
    fecha: "2026-10-26",
    entrada: { basico: 0, bdl: 0, nacionalidad: "omani" },
    esperaError: true,
  },
]);
