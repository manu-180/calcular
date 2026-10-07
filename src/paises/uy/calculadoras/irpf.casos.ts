import { definirCasos } from "@/motor/calculo";
import irpf from "./irpf";

const BASE = { hijos: 0, hijosDiscapacidad: 0, reparto: "entera", conyuge: false, otrasDeducciones: 0 } as const;

export default definirCasos(irpf, [
  {
    nombre: "$ 100.000 sin deducciones extra",
    origen: {
      tipo: "recalculado",
      detalle:
        "Decreto 148/007, art. 63. Pasa 10 BPC (68.640): renta 106.000. Escala: 20.592 × 10 % + 34.320 × 15 % + 3.040 × 24 % = 7.936,80. Deducciones 15.000 + 4.500 + 100 = 19.600 × 14 % = 2.744. IRPF 5.192,80.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, nominal: 100000 },
    esperado: { rentaComputable: 106000, impuestoEscala: 7936.8, tasaMarginal: 24, deducciones: 19600, tasaDeducciones: 14, descuentoDeducciones: 2744, irpf: 5192.8, tasaEfectiva: 5.19 },
  },
  {
    nombre: "Un hijo con discapacidad",
    origen: {
      tipo: "recalculado",
      detalle: "Deducción 40 BPC × 6.864 / 12 = 22.880. Fonasa con hijos 6 % = 6.000. Deducciones 15.000 + 6.000 + 100 + 22.880 = 43.980 × 14 % = 6.157,20. IRPF 7.936,80 − 6.157,20 = 1.779,60.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, hijosDiscapacidad: 1, nominal: 100000 },
    esperado: { deduccionHijos: 22880, deducciones: 43980, irpf: 1779.6 },
  },
  {
    nombre: "Justo 15 BPC: deducciones al 14 %",
    origen: {
      tipo: "recalculado",
      detalle: "102.960 no pasa 15 BPC. Renta 109.137,60. Escala 2.059,20 + 5.148 + 6.177,60 × 24 % = 8.689,82. Deducciones 15.444 + 4.633,20 + 102,96 = 20.180,16 × 14 % = 2.825,22. IRPF 5.864,60.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, nominal: 102960 },
    esperado: { tasaDeducciones: 14, impuestoEscala: 8689.82, irpf: 5864.6 },
  },
  {
    nombre: "Pasa 15 BPC: deducciones al 8 %",
    origen: {
      tipo: "recalculado",
      detalle: "104.000: renta 110.240. Escala 2.059,20 + 5.148 + 7.280 × 24 % = 8.954,40. Deducciones 15.600 + 4.680 + 104 = 20.384 × 8 % = 1.630,72. IRPF 7.323,68.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, nominal: 104000 },
    esperado: { tasaDeducciones: 8, irpf: 7323.68 },
  },
  {
    nombre: "$ 120.000 con Fondo de Solidaridad",
    origen: {
      tipo: "recalculado",
      detalle: "Renta 127.200. Escala 2.059,20 + 5.148 + 24.240 × 24 % = 13.024,80. Deducciones 18.000 + 5.400 + 120 + 1.144 = 24.664 × 8 % = 1.973,12. IRPF 11.051,68.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, nominal: 120000, otrasDeducciones: 1144 },
    esperado: { impuestoEscala: 13024.8, irpf: 11051.68 },
  },
  {
    nombre: "Sueldo exento",
    origen: { tipo: "recalculado", detalle: "40.000 no llega al mínimo no imponible de 7 BPC (48.048): impuesto 0." },
    fecha: "2026-10-07",
    entrada: { ...BASE, nominal: 40000 },
    esperado: { impuestoEscala: 0, tasaMarginal: 0, irpf: 0 },
  },
]);
