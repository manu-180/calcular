import { definirCasos } from "@/motor/calculo";
import salarioNeto from "./salario-neto";

export default definirCasos(salarioNeto, [
  {
    nombre: "Salario de ₡1.200.000 en 2026",
    origen: {
      tipo: "recalculado",
      detalle: "SEM 5,50 % = 66.000; IVM 4,33 % = 51.960; Banco Popular 1 % = 12.000; cargas 129.960. Renta (1.200.000 − 918.000) × 10 % = 28.200. Neto 1.041.840.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 1200000, hijos: 0, conyuge: false },
    esperado: { sem: 66000, ivm: 51960, bancoPopular: 12000, cargas: 129960, renta: 28200, neto: 1041840 },
  },
  {
    nombre: "Salario exento de renta",
    origen: { tipo: "recalculado", detalle: "600.000: SEM 33.000, IVM 25.980, BP 6.000 = 64.980. Sin renta. Neto 535.020." },
    fecha: "2026-10-07",
    entrada: { salario: 600000, hijos: 1, conyuge: false },
    esperado: { cargas: 64980, renta: 0, neto: 535020 },
  },
  {
    nombre: "Escalón del IVM de 2029",
    origen: {
      tipo: "recalculado",
      detalle: "Desde el 1/1/2029 el IVM del trabajador es 4,50 %: 54.000. Cargas 66.000 + 54.000 + 12.000 = 132.000. Con los tramos de renta cargados, neto 1.200.000 − 132.000 − 28.200 = 1.039.800.",
    },
    fecha: "2029-01-15",
    entrada: { salario: 1200000, hijos: 0, conyuge: false },
    esperado: { ivm: 54000, cargas: 132000, neto: 1039800 },
  },
]);
