import { definirCasos } from "@/motor/calculo";
import sueldoNominal from "./sueldo-nominal";

const SIN_FAMILIA = { hijos: 0, conyuge: false } as const;

export default definirCasos(sueldoNominal, [
  {
    nombre: "Líquido de $ 40.200 sin hijos",
    origen: {
      tipo: "recalculado",
      detalle: "Nominal 50.000: montepío 7.500, Fonasa 4,5 % 2.250, FRL 50. IRPF: 10 % de 1.952 = 195,20 menos 14 % de 9.800 = 1.372, da 0. Líquido 40.200.",
    },
    fecha: "2026-10-12",
    entrada: { ...SIN_FAMILIA, liquido: 40200 },
    esperado: { nominal: 50000, liquido: 40200, irpf: 0 },
    tolerancia: 0.02,
  },
  {
    nombre: "Líquido bajo, sin IRPF",
    origen: { tipo: "recalculado", detalle: "Nominal 15.000: montepío 2.250, Fonasa 3 % 450, FRL 15. Líquido 12.285." },
    fecha: "2026-10-12",
    entrada: { ...SIN_FAMILIA, liquido: 12285 },
    esperado: { nominal: 15000, liquido: 12285 },
    tolerancia: 0.02,
  },
  {
    nombre: "Líquido con IRPF e incremento del 6 %",
    origen: {
      tipo: "recalculado",
      detalle:
        "Nominal 100.000: aportes 15.000 + 4.500 + 100. Renta 106.000: 10 % de 20.592 (2.059,20) + 15 % de 34.320 (5.148) + 24 % de 3.040 (729,60) = 7.936,80, menos 14 % de 19.600 (2.744) = 5.192,80. Líquido 75.207,20.",
    },
    fecha: "2026-10-12",
    entrada: { ...SIN_FAMILIA, liquido: 75207.2 },
    esperado: { nominal: 100000, irpf: 5192.8, liquido: 75207.2 },
    tolerancia: 0.02,
  },
  {
    nombre: "Líquido en cero",
    origen: { tipo: "recalculado", detalle: "Sin monto no hay nada que buscar." },
    fecha: "2026-10-12",
    entrada: { ...SIN_FAMILIA, liquido: 0 },
    esperaError: true,
  },
]);
