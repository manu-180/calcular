import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

// Borrador: el dato no está verificado, así que el caso fija el valor con `valores` para probar la fórmula.
export default definirCasos(calculadora, [
  {
    nombre: "Salario por debajo del mínimo",
    origen: { tipo: "recalculado", detalle: "Mínimo de prueba 1.880 − 1.500 = 380." },
    fecha: "2026-10-29",
    entrada: { salario: 1500 },
    valores: { "ps.minimum-wage": 1880 },
    esperado: { diferencia: 380, cumple: "لا" },
  },
]);
