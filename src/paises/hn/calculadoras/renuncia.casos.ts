import { definirCasos } from "@/motor/calculo";
import renuncia from "./renuncia";

export default definirCasos(renuncia, [
  {
    nombre: "Renuncia con 4 años y 7 meses",
    origen: {
      tipo: "recalculado",
      detalle: "Sin cesantía (menos de 15 años). Vacaciones 5 × 600 = 3000. Décimos: 18000 × 273 / 365 = 13463.01 y 18000 × 92 / 365 = 4536.99. Preaviso a dar (art. 116 e): 60 días; si no lo da, 60 × 600 × 50 % = 18000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 18000, fechaIngreso: "2022-03-01", fechaSalida: "2026-09-30", diasPendientes: 5, microempresa: false },
    esperado: { cesantia: 0, vacaciones: 3000, decimoTercero: 13463.01, decimoCuarto: 4536.99, total: 21000, diasPreaviso: 60, reclamoPreaviso: 18000 },
  },
  {
    nombre: "Renuncia con 16 años: 35 % de la cesantía",
    origen: {
      tipo: "recalculado",
      detalle: "Decreto 150-2008, art. 120 g: 16 + 267/360 = 16.7417 meses × 20000 × 35 % = 117191.67. Décimos 14958.90 + 5041.10. Total 137191.67.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 20000, fechaIngreso: "2010-01-04", fechaSalida: "2026-09-30", diasPendientes: 0, microempresa: false },
    esperado: { cesantia: 117191.67, total: 137191.67 },
  },
  {
    nombre: "Renuncia con 16 años en una microempresa",
    origen: { tipo: "recalculado", detalle: "Art. 120-A: en la microempresa no aplica el literal g. Solo los décimos: 14958.90 + 5041.10 = 20000." },
    fecha: "2026-10-12",
    entrada: { salario: 20000, fechaIngreso: "2010-01-04", fechaSalida: "2026-09-30", diasPendientes: 0, microempresa: true },
    esperado: { cesantia: 0, total: 20000 },
  },
]);
