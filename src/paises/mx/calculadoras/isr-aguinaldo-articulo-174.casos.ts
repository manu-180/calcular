import { definirCasos } from "@/motor/calculo";
import art174 from "./isr-aguinaldo-articulo-174";

export default definirCasos(art174, [
  {
    nombre: "10,000 gravados con sueldo de 15,000",
    origen: {
      tipo: "recalculado",
      detalle:
        "RLISR art. 174. 10000 / 365 × 30.4 = 832.88. ISR(15832.88) 1552.07 − ISR(15000) 1402.82 = 149.25; tasa 149.2515 / 832.8767 = 17.92 %; retención 1792. Sumado al mes: ISR(25000) 3451.65 − 1402.82 = 2048.83.",
    },
    fecha: "2026-10-15",
    entrada: { gravado: 10000, sueldo: 15000 },
    esperado: { fraccion: 832.88, tasa: 17.92, retencion: 1792, normal: 2048.83, ahorro: 256.83 },
  },
  {
    nombre: "Cambio de renglón de la tarifa",
    origen: {
      tipo: "recalculado",
      detalle: "30000 / 365 × 30.4 = 2498.63. ISR(16498.63) 1671.3732 − ISR(14000) 1235.9952 = 435.378; tasa 17.4247 %; retención 30000 × 17.4247 % = 5227.40.",
    },
    fecha: "2026-10-15",
    entrada: { gravado: 30000, sueldo: 14000 },
    esperado: { fraccion: 2498.63, retencion: 5227.4 },
    tolerancia: 0.01,
  },
]);
