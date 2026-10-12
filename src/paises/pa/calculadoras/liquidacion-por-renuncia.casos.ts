import { definirCasos } from "@/motor/calculo";
import liquidacionPorRenuncia from "./liquidacion-por-renuncia";

export default definirCasos(liquidacionPorRenuncia, [
  {
    nombre: "Renuncia después de ocho años con aviso",
    origen: {
      tipo: "recalculado",
      detalle:
        "Semanal 1,300 × 12 ÷ 52 = 300. Prima 8 × 300 = 2,400 (art. 224). Vacaciones 1,300 × 5 ÷ 11 = 590.91. Décimo del 16/8 al 12/10 = 1.9 meses: (1,300 × 1.9 + 590.91) ÷ 12 = 255.08. Total 3,245.99.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "2018-10-13", fechaSalida: "2026-10-12", indefinido: true, mesesVacaciones: 5, conAviso: true },
    esperado: { prima: 2400, vacaciones: 590.91, decimo: 255.08, descuento: 0, total: 3245.99 },
  },
  {
    nombre: "La misma renuncia sin aviso",
    origen: { tipo: "recalculado", detalle: "Art. 222: se descuenta una semana de salario (300). Total 2,945.99." },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "2018-10-13", fechaSalida: "2026-10-12", indefinido: true, mesesVacaciones: 5, conAviso: false },
    esperado: { descuento: 300, total: 2945.99 },
  },
  {
    nombre: "Contrato por obra: sin prima",
    origen: {
      tipo: "recalculado",
      detalle: "Sin prima. Vacaciones 800 × 3 ÷ 11 = 218.18. Décimo del 16/4 al 15/7 = 3 meses: (2,400 + 218.18) ÷ 12 = 218.18. Total 436.36.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 800, fechaIngreso: "2026-04-16", fechaSalida: "2026-07-15", indefinido: false, mesesVacaciones: 3, conAviso: true },
    esperado: { prima: 0, vacaciones: 218.18, decimo: 218.18, total: 436.36 },
  },
]);
