import { definirCasos } from "@/motor/calculo";
import calculadora from "./unfair-dismissal-compensation";

export default definirCasos(calculadora, [
  {
    nombre: "Indefinido, seis años",
    origen: { tipo: "recalculado", detalle: "Art. 77: 15 días x (10.000 / 30) x 6 = 30.000; mínimo dos meses 20.000." },
    fecha: "2026-10-24",
    entrada: { contrato: "indefinite", salario: 10000, anios: 6, meses: null },
    esperado: { compensacion: 30000, base: 30000, minimo: 20000 },
  },
  {
    nombre: "Indefinido, dos años: rige el mínimo",
    origen: { tipo: "recalculado", detalle: "15 x 333,33 x 2 = 10.000 < 20.000: se paga 20.000." },
    fecha: "2026-10-24",
    entrada: { contrato: "indefinite", salario: 10000, anios: 2, meses: null },
    esperado: { compensacion: 20000, base: 10000 },
  },
  {
    nombre: "Plazo fijo con ocho meses restantes",
    origen: { tipo: "recalculado", detalle: "Sueldo del resto del contrato: 10.000 x 8 = 80.000." },
    fecha: "2026-10-24",
    entrada: { contrato: "fixed", salario: 10000, anios: null, meses: 8 },
    esperado: { compensacion: 80000 },
  },
  {
    nombre: "Plazo fijo con un mes restante",
    origen: { tipo: "recalculado", detalle: "10.000 < mínimo 20.000." },
    fecha: "2026-10-24",
    entrada: { contrato: "fixed", salario: 10000, anios: null, meses: 1 },
    esperado: { compensacion: 20000 },
  },
  {
    nombre: "Sin sueldo",
    origen: { tipo: "recalculado", detalle: "Sueldo 0." },
    fecha: "2026-10-24",
    entrada: { contrato: "fixed", salario: 0, anios: null, meses: 1 },
    esperaError: true,
  },
]);
