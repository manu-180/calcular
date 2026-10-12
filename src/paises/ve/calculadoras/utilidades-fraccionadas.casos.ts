import { definirCasos } from "@/motor/calculo";
import utilidadesFraccionadas from "./utilidades-fraccionadas";

export default definirCasos(utilidadesFraccionadas, [
  {
    nombre: "Salida a fin de septiembre con 30 días al año",
    origen: { tipo: "recalculado", detalle: "LOTTT art. 131. Del 01/01 al 30/09/2026: 9 meses. 30 × 9 / 12 = 22,5 días; $300 / 30 = 10; 225." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, dias: 30, fechaIngreso: "2020-05-10", fechaSalida: "2026-09-30" },
    esperado: { meses: 9, diasQueTocan: 22.5, utilidadesUsd: 225, utilidadesBs: null },
  },
  {
    nombre: "Ingreso a mitad de año, 120 días",
    origen: { tipo: "recalculado", detalle: "Del 15/03 al 20/08/2026: 5 meses completos. 120 × 5 / 12 = 50 días. Bs 6.000 / 30 = 200; 10.000." },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", salario: 6000, dias: 120, fechaIngreso: "2026-03-15", fechaSalida: "2026-08-20" },
    esperado: { meses: 5, diasQueTocan: 50, utilidadesBs: 10000 },
  },
  {
    nombre: "Salida en enero, menos de un mes",
    origen: { tipo: "recalculado", detalle: "Del 01/01 al 20/01: 0 meses completos, 0 utilidades del nuevo ejercicio." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, dias: 30, fechaIngreso: "2022-01-01", fechaSalida: "2026-01-20" },
    esperado: { meses: 0, utilidadesUsd: 0 },
  },
]);
