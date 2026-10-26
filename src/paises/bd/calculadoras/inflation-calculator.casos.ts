import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "10,000 a 5 años con la inflación de septiembre de 2026",
    origen: { tipo: "recalculado", detalle: "BBS: 8.34 % (septiembre de 2026). 1.0834^5 = 1.49260; 10,000 × 1.49260 = 14,926.02; 10,000 / 1.49260 = 6,699.71." },
    fecha: "2026-10-24",
    entrada: { monto: 10000, anios: 5, tasaPropia: null },
    esperado: { futuro: 14926.02, poder: 6699.71, tasa: 8.34, mesDato: "সেপ্টেম্বর ২০২৬" },
  },
  {
    nombre: "Tasa propia del 10 %",
    origen: { tipo: "recalculado", detalle: "1,000 × 1.1^2 = 1,210; 1,000 / 1.21 = 826.45." },
    fecha: "2026-10-24",
    entrada: { monto: 1000, anios: 2, tasaPropia: 10 },
    esperado: { futuro: 1210, poder: 826.45, aumento: 21 },
  },
]);
