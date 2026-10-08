import { definirCasos } from "@/motor/calculo";
import salarioNeto from "./salario-neto";

export default definirCasos(salarioNeto, [
  {
    nombre: "C$20,000 en el régimen integral",
    origen: {
      tipo: "recalculado",
      detalle:
        "INSS 7 % (Decreto 06-2019 art. 11): 1400. Reglamento LCT art. 19: (20000 − 1400) × 12 = 223200; art. 23: 15000 + 20 % × 23200 = 19640 al año, 1636.67 al mes. Neto 20000 − 1400 − 1636.67 = 16963.33.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 20000, regimen: "integral" },
    esperado: { inss: 1400, ir: 1636.67, neto: 16963.33 },
  },
  {
    nombre: "Salario que no paga IR",
    origen: { tipo: "recalculado", detalle: "INSS 560. (8000 − 560) × 12 = 89280, debajo de 100000: IR 0. Neto 7440." },
    fecha: "2026-10-07",
    entrada: { salario: 8000, regimen: "integral" },
    esperado: { inss: 560, ir: 0, neto: 7440 },
  },
  {
    nombre: "Apenas arriba del tramo exento",
    origen: { tipo: "recalculado", detalle: "INSS 630. (9000 − 630) × 12 = 100440; 15 % × 440 = 66 al año, 5.50 al mes. Neto 8364.50." },
    fecha: "2026-10-07",
    entrada: { salario: 9000, regimen: "integral" },
    esperado: { inss: 630, ir: 5.5, neto: 8364.5 },
  },
  {
    nombre: "Tramo del 30 %",
    origen: { tipo: "recalculado", detalle: "INSS 4200. (60000 − 4200) × 12 = 669600; 82500 + 30 % × 169600 = 133380 al año, 11115 al mes. Neto 44685." },
    fecha: "2026-10-07",
    entrada: { salario: 60000, regimen: "integral" },
    esperado: { inss: 4200, ir: 11115, neto: 44685 },
  },
  {
    nombre: "Régimen IVM",
    origen: { tipo: "recalculado", detalle: "INSS 4.75 % + 0.25 % = 5 %: 1000. (20000 − 1000) × 12 = 228000; 15000 + 20 % × 28000 = 20600 al año, 1716.67 al mes. Neto 17283.33." },
    fecha: "2026-10-07",
    entrada: { salario: 20000, regimen: "ivm" },
    esperado: { tasa: 5, inss: 1000, ir: 1716.67, neto: 17283.33 },
  },
]);
