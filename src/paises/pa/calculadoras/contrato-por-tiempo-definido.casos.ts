import { definirCasos } from "@/motor/calculo";
import contratoPorTiempoDefinido from "./contrato-por-tiempo-definido";

export default definirCasos(contratoPorTiempoDefinido, [
  {
    nombre: "Despido el 12 de octubre en un contrato hasta fin de año",
    origen: {
      tipo: "recalculado",
      detalle:
        "Art. 227: salarios del 13/10 al 31/12 = 2 meses y 19 días = 2.6333 meses × 900 = 2,370. Vacaciones 900 × 9 ÷ 11 = 736.36. Décimo del 16/8 al 12/10 = 1.9 meses: (1,710 + 736.36) ÷ 12 = 203.86. Total 3,310.22.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 900, fechaIngreso: "2026-01-05", fechaSalida: "2026-10-12", fechaFin: "2026-12-31", mesesVacaciones: 9 },
    esperado: { salariosRestantes: 2370, vacaciones: 736.36, decimo: 203.86, total: 3310.22 },
  },
  {
    nombre: "Faltaba un mes justo",
    origen: { tipo: "recalculado", detalle: "Del 16/6 al 15/7: un mes = 1,200. Décimo del 16/4 al 15/6 = 2 meses: 2,400 ÷ 12 = 200." },
    fecha: "2026-10-12",
    entrada: { salario: 1200, fechaIngreso: "2026-04-16", fechaSalida: "2026-06-15", fechaFin: "2026-07-15", mesesVacaciones: 0 },
    esperado: { salariosRestantes: 1200, decimo: 200, total: 1400 },
  },
  {
    nombre: "Fin del contrato antes del despido",
    origen: { tipo: "recalculado", detalle: "No hay salarios restantes si el contrato ya terminó." },
    fecha: "2026-10-12",
    entrada: { salario: 900, fechaIngreso: "2026-01-05", fechaSalida: "2026-10-12", fechaFin: "2026-10-01", mesesVacaciones: 0 },
    esperaError: true,
  },
]);
