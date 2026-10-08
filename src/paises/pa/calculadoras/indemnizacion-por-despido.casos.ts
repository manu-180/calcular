import { definirCasos } from "@/motor/calculo";
import indemnizacion from "./indemnizacion-por-despido";

export default definirCasos(indemnizacion, [
  {
    nombre: "Cinco años justos",
    origen: { tipo: "recalculado", detalle: "Art. 225, literal C: 5 × 3.4 = 17 semanas. Semanal 1,300 × 12 ÷ 52 = 300. 17 × 300 = 5,100." },
    fecha: "2026-10-07",
    entrada: { promedioSeisMeses: 1300, ultimoMes: null, fechaIngreso: "2021-10-01", fechaSalida: "2026-09-30" },
    esperado: { salarioBase: 1300, semanas: 17, indemnizacion: 5100 },
  },
  {
    nombre: "Doce años y medio, con último mes mayor que el promedio",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 149: se toma el más favorable, 1,300. Art. 225 C: 10 × 3.4 + 2.5 × 1 = 36.5 semanas × 300 = 10,950.",
    },
    fecha: "2026-10-07",
    entrada: { promedioSeisMeses: 1200, ultimoMes: 1300, fechaIngreso: "2014-04-01", fechaSalida: "2026-09-30" },
    esperado: { salarioBase: 1300, semanas: 36.5, indemnizacion: 10950 },
  },
  {
    nombre: "Diez años justos (borde de la escala)",
    origen: { tipo: "recalculado", detalle: "10 × 3.4 = 34 semanas × 300 = 10,200." },
    fecha: "2026-10-07",
    entrada: { promedioSeisMeses: 1300, ultimoMes: 1000, fechaIngreso: "2016-10-01", fechaSalida: "2026-09-30" },
    esperado: { salarioBase: 1300, semanas: 34, indemnizacion: 10200 },
  },
  {
    nombre: "Relación iniciada antes de la Ley 44 de 1995",
    origen: { tipo: "recalculado", detalle: "El literal C solo vale desde el 14/8/1995: la calculadora rechaza la entrada." },
    fecha: "2026-10-07",
    entrada: { promedioSeisMeses: 1300, ultimoMes: null, fechaIngreso: "1995-08-13", fechaSalida: "2026-09-30" },
    esperaError: true,
  },
]);
