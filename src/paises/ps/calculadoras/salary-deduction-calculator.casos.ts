import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-deduction-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Adelanto y multa por encima del tope",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 83 y 84: tope adelanto 10 % de 3.000 = 300; multa 3 días = 300; total 15 % = 450. Adelanto 300, multa min(200, 300, 150) = 150; exceso 150; neto 2.550.",
    },
    fecha: "2026-10-29",
    entrada: { salario: 3000, sulfa: 400, multa: 200 },
    esperado: { total: 450, sulfa: 300, multa: 150, exceso: 150, neto: 2550, maxMulta: 300 },
  },
  {
    nombre: "Adelanto dentro del tope",
    origen: { tipo: "recalculado", detalle: "200 < 10 % de 3.000: se descuenta entero; neto 2.800." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, sulfa: 200, multa: 0 },
    esperado: { total: 200, exceso: 0, neto: 2800 },
  },
  {
    nombre: "Solo multa",
    origen: { tipo: "recalculado", detalle: "Multa 500 con salario 2.400: 3 días = 240, dentro del 15 % (360); exceso 260." },
    fecha: "2026-10-29",
    entrada: { salario: 2400, sulfa: 0, multa: 500 },
    esperado: { multa: 240, total: 240, exceso: 260 },
  },
]);
