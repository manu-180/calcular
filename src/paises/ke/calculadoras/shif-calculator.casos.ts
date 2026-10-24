import { definirCasos } from "@/motor/calculo";
import calculadora from "./shif-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Salaried, KSh 50,000",
    origen: { tipo: "recalculado", url: "https://www.sha.go.ke/premium-rates/", detalle: "2.75% × 50,000 = 1,375 a month." },
    fecha: "2026-10-17",
    entrada: { tipo: "salaried", ingreso: 50000 },
    esperado: { mensual: 1375, anual: 16500 },
  },
  {
    nombre: "Low income pays the minimum",
    origen: { tipo: "recalculado", detalle: "2.75% × 8,000 = 220, below the minimum of 300." },
    fecha: "2026-10-17",
    entrada: { tipo: "non-salaried", ingreso: 8000 },
    esperado: { mensual: 300, calculado: 220 },
  },
  {
    nombre: "No upper limit",
    origen: { tipo: "recalculado", detalle: "2.75% × 1,000,000 = 27,500." },
    fecha: "2026-10-17",
    entrada: { tipo: "salaried", ingreso: 1000000 },
    esperado: { mensual: 27500 },
  },
]);
