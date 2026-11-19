import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "10,000 a 5 años con la inflación de octubre de 2026",
    origen: { tipo: "recalculado", detalle: "BBS: 8.27 % (octubre de 2026). 1.0827^5 = 1.48779; 10,000 × 1.48779 = 14,877.87; 10,000 / 1.48779 = 6,721.39." },
    fecha: "2026-11-19",
    entrada: { monto: 10000, anios: 5, tasaPropia: null },
    esperado: { futuro: 14877.87, poder: 6721.39, tasa: 8.27, mesDato: "অক্টোবর ২০২৬" },
  },
  {
    nombre: "Tasa propia del 10 %",
    origen: { tipo: "recalculado", detalle: "1,000 × 1.1^2 = 1,210; 1,000 / 1.21 = 826.45." },
    fecha: "2026-10-24",
    entrada: { monto: 1000, anios: 2, tasaPropia: 10 },
    esperado: { futuro: 1210, poder: 826.45, aumento: 21 },
  },
]);
