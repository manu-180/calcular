import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Renuncia de un permanente",
    origen: { tipo: "recalculado", detalle: "Art. 27(1): 60 días. 25,000 / 30 × 60 = 50,000." },
    fecha: "2026-10-24",
    entrada: { quien: "worker", tipo: "permanent", mensual: true, salario: 25000 },
    esperado: { dias: 60, pago: 50000 },
  },
  {
    nombre: "Empleador termina a un permanente mensualizado",
    origen: { tipo: "recalculado", detalle: "Art. 26(1)(ক): 120 días. 30,000 × 4 = 1,20,000." },
    fecha: "2026-10-24",
    entrada: { quien: "employer", tipo: "permanent", mensual: true, salario: 30000 },
    esperado: { dias: 120, pago: 120000 },
  },
  {
    nombre: "Empleador termina a un temporario no mensualizado",
    origen: { tipo: "recalculado", detalle: "Art. 26(2)(খ): 14 días. 15,000 / 30 × 14 = 7,000." },
    fecha: "2026-10-24",
    entrada: { quien: "employer", tipo: "temporary", mensual: false, salario: 15000 },
    esperado: { dias: 14, pago: 7000 },
  },
  {
    nombre: "Renuncia de un temporario mensualizado",
    origen: { tipo: "recalculado", detalle: "Art. 27(2)(ক): 30 días = un mes de salario." },
    fecha: "2026-10-24",
    entrada: { quien: "worker", tipo: "temporary", mensual: true, salario: 20000 },
    esperado: { dias: 30, pago: 20000 },
  },
]);
