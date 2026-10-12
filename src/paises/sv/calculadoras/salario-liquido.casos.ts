import { definirCasos } from "@/motor/calculo";
import salarioLiquido from "./salario-liquido";

export default definirCasos(salarioLiquido, [
  {
    nombre: "Salario de $800 al mes",
    origen: {
      tipo: "recalculado",
      url: "https://www.asamblea.gob.sv/sites/default/files/documents/decretos/942D37A6-2092-4347-A68C-2542389B481D.pdf",
      detalle: "AFP 7,25 % = 58. ISSS 3 % (art. 29 LSS) = 24. Gravado 718: (718 − 550) × 10 % + 17,67 = 34,47. Líquido 800 − 58 − 24 − 34,47 = 683,53.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 800, periodo: "mensual" },
    esperado: { afp: 58, isss: 24, renta: 34.47, descuentos: 116.47, liquido: 683.53 },
  },
  {
    nombre: "Salario mínimo de comercio: sin renta",
    origen: { tipo: "recalculado", detalle: "408,80: AFP 29,64, ISSS 12,26. Gravado 366,90, bajo 550: sin retención. Líquido 366,90." },
    fecha: "2026-10-12",
    entrada: { salario: 408.8, periodo: "mensual" },
    esperado: { afp: 29.64, isss: 12.26, renta: 0, liquido: 366.9 },
  },
  {
    nombre: "Salario de $2,000: ISSS con techo",
    origen: { tipo: "recalculado", detalle: "AFP 145. ISSS 3 % de 1.000 = 30. Gravado 1.825: (1.825 − 895,24) × 20 % + 60 = 245,95. Líquido 1.579,05." },
    fecha: "2026-10-12",
    entrada: { salario: 2000, periodo: "mensual" },
    esperado: { afp: 145, isss: 30, renta: 245.95, liquido: 1579.05 },
  },
  {
    nombre: "Por quincena con $1,200 al mes",
    origen: { tipo: "recalculado", detalle: "Quincena 600: AFP 43,50. ISSS sobre la mitad del techo: 3 % de 500 = 15. Gravado 541,50, tramo III quincenal: (541,50 − 447,62) × 20 % + 30 = 48,78. Líquido 492,72." },
    fecha: "2026-10-12",
    entrada: { salario: 1200, periodo: "quincenal" },
    esperado: { salarioPeriodo: 600, afp: 43.5, isss: 15, renta: 48.78, liquido: 492.72 },
  },
]);
