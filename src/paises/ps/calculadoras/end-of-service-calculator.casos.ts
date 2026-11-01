import { definirCasos } from "@/motor/calculo";
import calculadora from "./end-of-service-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Siete años, fin por el empleador",
    origen: { tipo: "recalculado", detalle: "Art. 45: 1/1/2019 a 1/1/2026 = 2.557 días; 2.557 / 365 × 1 mes × 3.000 = 21.016,44." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, inicio: "2019-01-01", fin: "2026-01-01", motivo: "employer" },
    esperado: { dias: 2557, monto: 21016.44, parte: 100 },
  },
  {
    nombre: "Siete años, renuncia: dos tercios",
    origen: { tipo: "recalculado", detalle: "Art. 42.2: entre 5 y 10 años, 2/3 de 21.016,438 = 14.010,96." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, inicio: "2019-01-01", fin: "2026-01-01", motivo: "resignation" },
    esperado: { monto: 14010.96, completa: 21016.44 },
  },
  {
    nombre: "Tres años, renuncia: un tercio",
    origen: { tipo: "recalculado", detalle: "1/1/2023 a 1/1/2026 = 1.096 días; 1.096 / 365 × 3.000 = 9.008,219; un tercio = 3.002,74." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, inicio: "2023-01-01", fin: "2026-01-01", motivo: "resignation" },
    esperado: { monto: 3002.74 },
  },
  {
    nombre: "Once años, renuncia: entera",
    origen: { tipo: "recalculado", detalle: "1/1/2015 a 1/1/2026 = 4.018 días; 4.018 / 365 × 2.000 = 22.016,44 (10 años o más: completa)." },
    fecha: "2026-10-29",
    entrada: { salario: 2000, inicio: "2015-01-01", fin: "2026-01-01", motivo: "resignation" },
    esperado: { monto: 22016.44 },
  },
  {
    nombre: "Causa justificada del art. 42.1 con tres años: entera",
    origen: { tipo: "recalculado", detalle: "Art. 42.1 conserva la indemnización completa: 9.008,22." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, inicio: "2023-01-01", fin: "2026-01-01", motivo: "justified" },
    esperado: { monto: 9008.22 },
  },
  {
    nombre: "Menos de un año",
    origen: { tipo: "recalculado", detalle: "Art. 45: exige un año de trabajo; 181 días dan 0." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, inicio: "2026-01-01", fin: "2026-07-01", motivo: "employer" },
    esperado: { monto: 0, dias: 181 },
  },
  {
    nombre: "Fechas invertidas",
    origen: { tipo: "recalculado", detalle: "Fin antes del inicio." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, inicio: "2026-01-01", fin: "2025-01-01", motivo: "employer" },
    esperaError: true,
  },
]);
