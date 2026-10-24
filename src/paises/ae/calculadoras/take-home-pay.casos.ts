import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Expatriate on AED 15,000 with AED 9,000 basic",
    origen: { tipo: "recalculado", detalle: "Basic below 16,000: unemployment insurance premium 5 a month. 15,000 - 5 = 14,995." },
    fecha: "2026-10-17",
    entrada: { total: 15000, basico: 9000, emirati: false, baseGpssa: null, iloe: true },
    esperado: { neto: 14995, pension: 0, seguro: 5 },
  },
  {
    nombre: "Emirati on AED 30,000 with AED 20,000 basic",
    origen: { tipo: "recalculado", detalle: "GPSSA employee 5% of 30,000 = 1,500. Basic above 16,000: premium 10. 30,000 - 1,500 - 10 = 28,490." },
    fecha: "2026-10-17",
    entrada: { total: 30000, basico: 20000, emirati: true, baseGpssa: 0, iloe: true },
    esperado: { pension: 1500, seguro: 10, neto: 28490, anual: 341880 },
  },
  {
    nombre: "Emirati with a separate contribution salary",
    origen: { tipo: "recalculado", detalle: "5% of 18,000 = 900. 25,000 - 900 = 24,100 without the insurance premium." },
    fecha: "2026-10-17",
    entrada: { total: 25000, basico: 15000, emirati: true, baseGpssa: 18000, iloe: false },
    esperado: { pension: 900, neto: 24100 },
  },
  {
    nombre: "Basic above total is not valid",
    origen: { tipo: "recalculado", detalle: "basico > total." },
    fecha: "2026-10-17",
    entrada: { total: 10000, basico: 12000, emirati: false, baseGpssa: null, iloe: true },
    esperaError: true,
  },
]);
