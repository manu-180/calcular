import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Expatriate in the first five years",
    origen: { tipo: "recalculado", detalle: "180,000 salary + gratuity provision 9,000 / 30 x 21 = 6,300. Total 186,300." },
    fecha: "2026-10-17",
    entrada: { total: 15000, basico: 9000, emirati: false, anios: 2, otros: 0 },
    esperado: { sueldos: 180000, gratuidad: 6300, total: 186300 },
  },
  {
    nombre: "Expatriate after five years with other costs",
    origen: { tipo: "recalculado", detalle: "180,000 + 9,000 / 30 x 30 = 9,000 + 5,000 = 194,000." },
    fecha: "2026-10-17",
    entrada: { total: 15000, basico: 9000, emirati: false, anios: 6, otros: 5000 },
    esperado: { gratuidad: 9000, total: 194000 },
  },
  {
    nombre: "Emirati: employer GPSSA 12.5%",
    origen: { tipo: "recalculado", detalle: "20,000 x 12.5% = 2,500 a month x 12 = 30,000. 240,000 + 30,000 = 270,000." },
    fecha: "2026-10-17",
    entrada: { total: 20000, basico: 14000, emirati: true, anios: null, otros: 0 },
    esperado: { pension: 30000, total: 270000 },
  },
]);
