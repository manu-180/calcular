import { definirCasos } from "@/motor/calculo";
import rentaTrabajadorIndependiente from "./renta-trabajador-independiente";

export default definirCasos(rentaTrabajadorIndependiente, [
  {
    nombre: "Renta neta de ₡12.000.000 con un hijo",
    origen: {
      tipo: "recalculado",
      detalle:
        "Decreto 45333-H, art. 4: exento hasta 6.244.000; 2.085.000 × 10 % = 208.500; 2.085.000 × 15 % = 312.750; (12.000.000 − 10.414.000) × 20 % = 317.200. Suma 838.450. Menos 20.520 por un hijo: 817.930.",
    },
    fecha: "2026-10-12",
    entrada: { rentaNeta: 12000000, hijos: 1, conyuge: false, salarioAnual: null },
    esperado: { segunTramos: 838450, creditos: 20520, impuesto: 817930 },
  },
  {
    nombre: "Renta exenta",
    origen: { tipo: "recalculado", detalle: "6.000.000 no pasa de 6.244.000: impuesto 0." },
    fecha: "2026-10-12",
    entrada: { rentaNeta: 6000000, hijos: 2, conyuge: true, salarioAnual: null },
    esperado: { segunTramos: 0, creditos: 0, impuesto: 0 },
  },
  {
    nombre: "Último tramo con cónyuge",
    origen: {
      tipo: "recalculado",
      detalle: "208.500 + 312.750 + 10.458.000 × 20 % (2.091.600) + 4.128.000 × 25 % (1.032.000) = 3.644.850. Menos 31.080: 3.613.770.",
    },
    fecha: "2026-10-12",
    entrada: { rentaNeta: 25000000, hijos: 0, conyuge: true, salarioAnual: null },
    esperado: { segunTramos: 3644850, impuesto: 3613770 },
  },
  {
    nombre: "También tiene salario: sin tramo exento",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 7092, art. 15 c: el salario ya usó 918.000 × 12 = 11.016.000 exentos, más que 6.244.000. La actividad paga desde el primer colón al 10 %: 5.000.000 × 10 % = 500.000.",
    },
    fecha: "2026-10-12",
    entrada: { rentaNeta: 5000000, hijos: 0, conyuge: false, salarioAnual: 12000000 },
    esperado: { tramoExento: 0, impuesto: 500000 },
  },
  {
    nombre: "Salario bajo: tramo exento reducido",
    origen: { tipo: "recalculado", detalle: "Exento usado en salario: 4.000.000. Queda 6.244.000 − 4.000.000 = 2.244.000. (5.000.000 − 2.244.000) × 10 % = 275.600." },
    fecha: "2026-10-12",
    entrada: { rentaNeta: 5000000, hijos: 0, conyuge: false, salarioAnual: 4000000 },
    esperado: { tramoExento: 2244000, impuesto: 275600 },
  },
]);
