import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Single, $60,000 salary, paid every two weeks, 5% to a 401(k)",
    origen: {
      tipo: "recalculado",
      detalle:
        "401(k) 3000. FICA on 60000: SS 3720, Medicare 870. Taxable 60000 - 3000 - 16100 = 40900, tax 1240 + 12% of 28500 = 4660. Net 60000 - 3000 - 4660 - 3720 - 870 = 47750, or 1836.54 per paycheck.",
    },
    fecha: "2026-10-14",
    entrada: { sueldo: 60000, frecuencia: "biweekly", estado: "single", aporte: 5, salud: null },
    esperado: { bruto: 2307.69, k401: 115.38, federal: 179.23, socialSecurity: 143.08, medicare: 33.46, neto: 1836.54, netoAnual: 47750, impuestosAnuales: 9250 },
  },
  {
    nombre: "Married couple over the wage base with a capped 401(k)",
    origen: {
      tipo: "recalculado",
      detalle:
        "401(k) capped at 24500. FICA wages 294000: SS 6.2% of 184500 = 11439, Medicare 4263, Additional Medicare 0.9% of 44000 = 396. Taxable 300000 - 24500 - 6000 - 32200 = 237300, tax 35932 + 24% of 25900 = 42148. Net 211254.",
    },
    fecha: "2026-10-14",
    entrada: { sueldo: 300000, frecuencia: "monthly", estado: "mfj", aporte: 10, salud: 6000 },
    esperado: { k401: 2041.67, federal: 3512.33, socialSecurity: 953.25, medicare: 388.25, netoAnual: 211254, neto: 17604.5 },
  },
  {
    nombre: "Benefits larger than the salary",
    origen: { tipo: "recalculado", detalle: "The function rejects pre-tax benefits above the salary." },
    fecha: "2026-10-14",
    entrada: { sueldo: 1000, frecuencia: "monthly", estado: "single", aporte: 0, salud: 2000 },
    esperaError: true,
  },
]);
