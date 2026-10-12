import { definirCasos } from "@/motor/calculo";
import salarioIntegral from "./salario-integral";

export default definirCasos(salarioIntegral, [
  {
    nombre: "Salario integral de 25 millones en 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "Mínimo 10 × 1.750.905 × 1,3 = 22.761.765. Parte salarial 25.000.000 / 1,3 = 19.230.769. Base de aportes 70 % = 17.500.000 (9,99 SMMLV): salud 700.000, pensión 700.000, FSP 1 % 175.000. Retención: 25.000.000 − 1.575.000 = 23.425.000; exenta tope 790/12 × 52.374 = 3.447.955; base 19.977.045 = 381,43 UVT; (381,43 − 360) × 33 % + 69 = 76,07 UVT = 3.984.200. Neto 19.440.800.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 25000000, dependiente: false },
    esperado: { minimo: 22761765, parteSalarial: 19230769, factorPrestacional: 5769231, baseAportes: 17500000, salud: 700000, pension: 700000, fsp: 175000, retencion: 3984200, neto: 19440800 },
  },
  {
    nombre: "Por debajo del mínimo en 2026",
    origen: { tipo: "recalculado", detalle: "20.000.000 es menor que 22.761.765 (13 salarios mínimos de 2026)." },
    fecha: "2026-10-15",
    entrada: { salario: 20000000, dependiente: false },
    esperado: { minimo: 22761765, cumple: "No, está por debajo del mínimo legal" },
  },
  {
    nombre: "Mínimo del salario integral en 2025",
    origen: { tipo: "recalculado", detalle: "Decreto 1572 de 2024: 1.423.500 × 10 × 1,3 = 18.505.500." },
    fecha: "2025-06-01",
    entrada: { salario: 20000000, dependiente: false },
    esperado: { minimo: 18505500, cumple: "Sí, cumple el mínimo legal" },
  },
]);
