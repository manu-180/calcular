import { definirCasos } from "@/motor/calculo";
import calculadora from "./final-settlement";

export default definirCasos(calculadora, [
  {
    nombre: "Fin de contrato con vacaciones y días pendientes",
    origen: {
      tipo: "recalculado",
      detalle: "مكافأة 54.065,75 (7,005479 años con 12.000). Diario 12.000 / 30 = 400. Vacaciones 15 x 400 = 6.000. 10 días x 400 = 4.000. Total 64.065,75.",
    },
    fecha: "2026-01-01",
    entrada: { salario: 12000, inicio: "2019-01-01", fin: "2026-01-01", motivo: "termination", vacaciones: 15, diasPendientes: 10, otros: 0 },
    esperado: { mkafaa: 54065.75, vacaciones: 6000, sueldo: 4000, total: 64065.75, diario: 400 },
  },
  {
    nombre: "Renuncia con cuatro años y otros importes",
    origen: { tipo: "recalculado", detalle: "Un tercio = 6.004,11. Diario 300; vacaciones 21 x 300 = 6.300. Otros 1.000. Total 13.304,11." },
    fecha: "2026-06-01",
    entrada: { salario: 9000, inicio: "2022-06-01", fin: "2026-06-01", motivo: "resignation", vacaciones: 21, diasPendientes: 0, otros: 1000 },
    esperado: { mkafaa: 6004.11, vacaciones: 6300, total: 13304.11 },
  },
  {
    nombre: "Sin sueldo",
    origen: { tipo: "recalculado", detalle: "Sueldo 0." },
    fecha: "2026-06-01",
    entrada: { salario: 0, inicio: "2022-06-01", fin: "2026-06-01", motivo: "termination", vacaciones: 0, diasPendientes: 0, otros: 0 },
    esperaError: true,
  },
]);
