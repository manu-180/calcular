import { definirCasos } from "@/motor/calculo";
import calculadora from "./dependent-fee-calculator";

// Borrador: los casos pisan el valor con `valores` hasta que el dato quede verificado.
export default definirCasos(calculadora, [
  {
    nombre: "Dos acompañantes por un año (valor de prueba)",
    origen: { tipo: "recalculado", detalle: "2 x 400 x 12 = 9.600 con el valor pisado." },
    fecha: "2026-10-24",
    entrada: { acompanantes: 2, meses: 12 },
    valores: { "sa.dependent-fee": 400 },
    esperado: { total: 9600, mensual: 800 },
  },
]);
