import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

export default definirCasos(calculadora, [
  {
    nombre: "Renuncia con salario mensual: un mes",
    origen: { tipo: "recalculado", detalle: "Art. 35: un mes desde el 1/11/2026 termina el 1/12/2026 (30 días)." },
    fecha: "2026-10-29",
    entrada: { quien: "worker", pago: "monthly", aviso: "2026-11-01", salario: 3000, faltan: null },
    esperado: { fin: "2026-12-01", dias: 30, compensacion: null, mitad: null },
  },
  {
    nombre: "Renuncia con salario diario: una semana",
    origen: { tipo: "recalculado", detalle: "Art. 35: una semana desde el 1/11/2026 = 8/11/2026." },
    fecha: "2026-10-29",
    entrada: { quien: "worker", pago: "weekly", aviso: "2026-11-01", salario: 2400, faltan: null },
    esperado: { fin: "2026-11-08", dias: 7 },
  },
  {
    nombre: "Despido con 10 días sin respetar",
    origen: { tipo: "recalculado", detalle: "Art. 46: un mes desde el 15/1/2026 = 15/2/2026 (31 días); mitad desde el 31/1; 10 × 3.000 / 30 = 1.000." },
    fecha: "2026-10-29",
    entrada: { quien: "employer", pago: null, aviso: "2026-01-15", salario: 3000, faltan: 10 },
    esperado: { fin: "2026-02-15", dias: 31, mitad: "2026-01-31", compensacion: 1000 },
  },
  {
    nombre: "Más días faltantes que el preaviso",
    origen: { tipo: "recalculado", detalle: "40 días faltantes con un preaviso de 31 días." },
    fecha: "2026-10-29",
    entrada: { quien: "employer", pago: null, aviso: "2026-01-15", salario: 3000, faltan: 40 },
    esperaError: true,
  },
]);
