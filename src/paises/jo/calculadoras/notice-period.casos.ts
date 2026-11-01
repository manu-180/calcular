import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

export default definirCasos(calculadora, [
  {
    nombre: "Renuncia con 10 días sin cumplir",
    origen: { tipo: "recalculado", detalle: "Aviso 24/10/2026 + 1 mes = 24/11/2026 (31 días). 10 × 600 / 30 = 200, a cargo del trabajador." },
    fecha: "2026-10-24",
    entrada: { quien: "worker", aviso: "2026-10-24", salario: 600, faltan: 10 },
    esperado: { fin: "2026-11-24", dias: 31, compensacion: 200, quienPaga: "يدفعه العامل لصاحب العمل" },
  },
  {
    nombre: "Despido sin aviso: el mes entero",
    origen: { tipo: "recalculado", detalle: "Aviso 31/1/2026 + 1 mes = 28/2/2026 (28 días). 28 × 900 / 30 = 840, a cargo del empleador." },
    fecha: "2026-10-24",
    entrada: { quien: "employer", aviso: "2026-01-31", salario: 900, faltan: 28 },
    esperado: { fin: "2026-02-28", dias: 28, compensacion: 840, quienPaga: "يدفعه صاحب العمل للعامل" },
  },
  {
    nombre: "Más días que el aviso",
    origen: { tipo: "recalculado", detalle: "40 días > 31." },
    fecha: "2026-10-24",
    entrada: { quien: "worker", aviso: "2026-10-24", salario: 600, faltan: 40 },
    esperaError: true,
  },
]);
