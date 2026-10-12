import { definirCasos } from "@/motor/calculo";
import rop from "./rop";

export default definirCasos(rop, [
  {
    nombre: "Salario de ₡1.000.000",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 7983, art. 13: 1 % del trabajador al Banco Popular (10.000), la mitad del 0,5 % patronal al Banco Popular (2.500) y 3 % patronal (30.000). Total 42.500 por mes (4,25 %); un año 510.000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1000000, anios: 1 },
    esperado: { trabajador: 10000, bpPatrono: 2500, patrono: 30000, mensual: 42500, tasa: 4.25, acumulado: 510000 },
  },
  {
    nombre: "Diez años con ₡500.000",
    origen: { tipo: "recalculado", detalle: "4,25 % de 500.000 = 21.250 por mes; × 120 = 2.550.000." },
    fecha: "2026-10-12",
    entrada: { salario: 500000, anios: 10 },
    esperado: { mensual: 21250, acumulado: 2550000 },
  },
]);
