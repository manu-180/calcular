import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

export default definirCasos(calculadora, [
  {
    nombre: "Renuncia con sueldo mensual",
    origen: { tipo: "recalculado", detalle: "Art. 75 reformado (19/2/2025): 30 días. 1/11/2026 + 30 = 1/12/2026." },
    fecha: "2026-10-24",
    entrada: { quien: "worker", mensual: true, aviso: "2026-11-01", salario: 10000, cumplidos: 30 },
    esperado: { dias: 30, fin: "2026-12-01", faltan: 0, compensacion: 0 },
  },
  {
    nombre: "Despido con sueldo mensual",
    origen: { tipo: "recalculado", detalle: "60 días; 10 cumplidos: 50 x 333,33 = 16.666,67." },
    fecha: "2026-10-24",
    entrada: { quien: "employer", mensual: true, aviso: "2026-11-01", salario: 10000, cumplidos: 10 },
    esperado: { dias: 60, fin: "2026-12-31", faltan: 50, compensacion: 16666.67 },
  },
  {
    nombre: "Sueldo no mensual",
    origen: { tipo: "recalculado", detalle: "30 días para cualquiera de las partes." },
    fecha: "2026-10-24",
    entrada: { quien: "employer", mensual: false, aviso: "2026-11-01", salario: 6000, cumplidos: 0 },
    esperado: { dias: 30, compensacion: 6000 },
  },
  {
    nombre: "Sin sueldo",
    origen: { tipo: "recalculado", detalle: "Sueldo 0." },
    fecha: "2026-10-24",
    entrada: { quien: "worker", mensual: true, aviso: "2026-11-01", salario: 0, cumplidos: 0 },
    esperaError: true,
  },
]);
