import { definirCasos } from "@/motor/calculo";
import calculadora from "./gratuity-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "8 años con básico de 30,000",
    origen: { tipo: "recalculado", detalle: "Art. 2(10): 30 días de básico por año. 30,000 / 30 × 30 × 8 = 2,40,000." },
    fecha: "2026-10-24",
    entrada: { basico: 30000, anios: 8, meses: 0 },
    esperado: { gratuity: 240000, dias: 30, anios: 8 },
  },
  {
    nombre: "Más de diez años",
    origen: { tipo: "recalculado", detalle: "Más de 10 años: 45 días por año. 30,000 / 30 × 45 × 12 = 5,40,000." },
    fecha: "2026-10-24",
    entrada: { basico: 30000, anios: 12, meses: 0 },
    esperado: { gratuity: 540000, dias: 45 },
  },
  {
    nombre: "Fracción de más de seis meses",
    origen: { tipo: "recalculado", detalle: "5 años y 7 meses cuentan 6 años: 20,000 × 6 = 1,20,000." },
    fecha: "2026-10-24",
    entrada: { basico: 20000, anios: 5, meses: 7 },
    esperado: { gratuity: 120000, anios: 6 },
  },
  {
    nombre: "Diez años justos",
    origen: { tipo: "recalculado", detalle: "10 años no es más de diez: 30 días. 25,000 × 10 = 2,50,000." },
    fecha: "2026-10-24",
    entrada: { basico: 25000, anios: 10, meses: 0 },
    esperado: { gratuity: 250000, dias: 30 },
  },
]);
