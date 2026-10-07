import { definirCasos } from "@/motor/calculo";
import ptu from "./ptu";

const empresa = { totalDias: 36500, totalSalarios: 20000000, dias: 365, salarioAnual: 146000, salarioDiario: 400, promedio: null, tipo: "planta" } as const;

export default definirCasos(ptu, [
  {
    nombre: "Reparto de un millón entre cien personas",
    origen: {
      tipo: "recalculado",
      detalle: "Mitad por días: 500000 × 365 / 36500 = 5000. Mitad por salarios: 500000 × 146000 / 20000000 = 3650. Total 8650, debajo del tope 400 × 90 = 36000. Exenta 15 × 117.31 = 1759.65.",
    },
    fecha: "2026-05-20",
    entrada: { ...empresa, monto: 1000000 },
    esperado: { porDias: 5000, porSalarios: 3650, calculada: 8650, tope: 36000, ptu: 8650, exenta: 1759.65 },
  },
  {
    nombre: "Tope de tres meses de salario",
    origen: { tipo: "recalculado", detalle: "Monto 10 millones: 50000 + 36500 = 86500, pasa el tope de 400 × 90 = 36000 (LFT art. 127 fr. VIII)." },
    fecha: "2026-05-20",
    entrada: { ...empresa, monto: 10000000 },
    esperado: { calculada: 86500, tope: 36000, ptu: 36000 },
  },
  {
    nombre: "El promedio de tres años da un tope más alto",
    origen: { tipo: "recalculado", detalle: "Promedio 40000 > 36000: se usa el más favorable." },
    fecha: "2026-05-20",
    entrada: { ...empresa, monto: 10000000, promedio: 40000 },
    esperado: { tope: 40000, ptu: 40000 },
  },
  {
    nombre: "Eventual con menos de 60 días",
    origen: { tipo: "recalculado", detalle: "LFT art. 127 fr. VII: sin PTU con menos de 60 días trabajados en el año." },
    fecha: "2026-05-20",
    entrada: { ...empresa, monto: 1000000, dias: 59, tipo: "eventual" },
    esperado: { ptu: 0 },
  },
]);
