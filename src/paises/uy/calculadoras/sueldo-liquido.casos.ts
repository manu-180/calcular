import { definirCasos } from "@/motor/calculo";
import sueldoLiquido from "./sueldo-liquido";

const BASE = { hijos: 0, hijosDiscapacidad: 0, conyuge: false, reparto: "entera" } as const;

export default definirCasos(sueldoLiquido, [
  {
    nombre: "$ 100.000 nominales, sin hijos ni cónyuge",
    origen: {
      tipo: "recalculado",
      detalle:
        "BPC 6.864. Montepío 15 % = 15.000; Fonasa 4,5 % (pasa 2,5 BPC) = 4.500; FRL 0,1 % = 100. Pasa 10 BPC: renta 106.000. Escala: 20.592 × 10 % + 34.320 × 15 % + 3.040 × 24 % = 7.936,80. Deducciones 19.600 × 14 % = 2.744. IRPF 5.192,80. Líquido 75.207,20.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, nominal: 100000 },
    esperado: { montepio: 15000, fonasa: 4500, tasaFonasa: 4.5, frl: 100, irpf: 5192.8, descuentos: 24792.8, liquido: 75207.2 },
  },
  {
    nombre: "$ 60.000 nominales: las deducciones cubren el IRPF",
    origen: {
      tipo: "recalculado",
      detalle: "Montepío 9.000; Fonasa 2.700; FRL 60. Escala: (60.000 − 48.048) × 10 % = 1.195,20. Deducciones 11.760 × 14 % = 1.646,40, mayor que el impuesto: IRPF 0. Líquido 48.240.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, nominal: 60000 },
    esperado: { montepio: 9000, fonasa: 2700, frl: 60, irpf: 0, liquido: 48240 },
  },
  {
    nombre: "$ 100.000 con cónyuge y dos hijos",
    origen: {
      tipo: "recalculado",
      detalle:
        "Fonasa con cónyuge e hijos, más de 2,5 BPC: 8 % = 8.000. Hijos: 2 × 20 BPC × 6.864 / 12 = 22.880. Deducciones 15.000 + 8.000 + 100 + 22.880 = 45.980 × 14 % = 6.437,20. IRPF 7.936,80 − 6.437,20 = 1.499,60. Líquido 75.400,40.",
    },
    fecha: "2026-10-07",
    entrada: { hijos: 2, hijosDiscapacidad: 0, conyuge: true, reparto: "entera", nominal: 100000 },
    esperado: { fonasa: 8000, tasaFonasa: 8, irpf: 1499.6, liquido: 75400.4 },
  },
  {
    nombre: "Deducción de hijos compartida",
    origen: {
      tipo: "recalculado",
      detalle: "Igual que el caso anterior pero la deducción de los hijos va a la mitad: 11.440. Deducciones 34.540 × 14 % = 4.835,60. IRPF 7.936,80 − 4.835,60 = 3.101,20.",
    },
    fecha: "2026-10-07",
    entrada: { hijos: 2, hijosDiscapacidad: 0, conyuge: true, reparto: "mitad", nominal: 100000 },
    esperado: { irpf: 3101.2, liquido: 73798.8 },
  },
  {
    nombre: "$ 300.000: pasa el tope de aportación y la deducción baja al 8 %",
    origen: {
      tipo: "recalculado",
      detalle:
        "Montepío 15 % del tope 288.836 = 43.325,40; Fonasa 13.500; FRL 300. Renta 318.000: 2.059,20 + 5.148 + 24.710,40 + 112.080 × 25 % = 59.937,60. Deducciones 57.125,40 × 8 % = 4.570,03. IRPF 55.367,57. Líquido 187.507,03.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, nominal: 300000 },
    esperado: { montepio: 43325.4, fonasa: 13500, frl: 300, irpf: 55367.57, liquido: 187507.03 },
  },
  {
    nombre: "Justo 2,5 BPC: Fonasa al 3 %",
    origen: { tipo: "recalculado", detalle: "17.160 no pasa 2,5 BPC: Fonasa 3 % = 514,80. Montepío 2.574; FRL 17,16. Sin IRPF. Líquido 14.054,04." },
    fecha: "2026-10-07",
    entrada: { ...BASE, nominal: 17160 },
    esperado: { fonasa: 514.8, tasaFonasa: 3, irpf: 0, liquido: 14054.04 },
  },
  {
    nombre: "Justo 10 BPC: sin el 6 % extra",
    origen: {
      tipo: "recalculado",
      detalle: "68.640 no pasa 10 BPC. Escala 20.592 × 10 % = 2.059,20. Deducciones 10.296 + 3.088,80 + 68,64 = 13.453,44 × 14 % = 1.883,48. IRPF 175,72. Líquido 55.010,84.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, nominal: 68640 },
    esperado: { irpf: 175.72, liquido: 55010.84 },
  },
]);
