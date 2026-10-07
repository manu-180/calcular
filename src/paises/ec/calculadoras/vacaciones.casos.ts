import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "Tercer año, 7 meses desde el aniversario",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 69 y 71 del Código del Trabajo. Del 1/3/2024 al 30/9/2026: 2 años y 7 meses. 15 días × 7/12 = 8,75 días × (900 / 30) = 262,50. Igual a 1/24 de lo ganado en 7 meses: 900 × 7 / 24 = 262,50.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 900, inicio: "2024-03-01", corte: "2026-09-30", pendientes: 0 },
    esperado: { diasAnio: 15, diasProporcionales: 8.75, valorProporcional: 262.5, valorAnio: 450, total: 262.5 },
  },
  {
    nombre: "Noveno año: 4 días adicionales y 5 días pendientes",
    origen: {
      tipo: "recalculado",
      detalle: "Del 1/1/2018 al 30/6/2026: 8 años y 6 meses, corre el noveno año. Días del año: 15 + (9 − 5) = 19. Proporcional 19 × 6/12 = 9,5 días × 40 = 380. Pendientes 5 × 40 = 200. Total 580.",
    },
    fecha: "2026-07-01",
    entrada: { sueldo: 1200, inicio: "2018-01-01", corte: "2026-06-30", pendientes: 5 },
    esperado: { diasAnio: 19, valorProporcional: 380, valorPendientes: 200, total: 580, valorAnio: 760 },
  },
  {
    nombre: "Un día antes de cumplir el primer año",
    origen: {
      tipo: "recalculado",
      detalle: "Del 7/10/2025 al 5/10/2026: 11 meses y 29 días. 15 × (11 + 29/30) / 12 = 14,9583 días × 20 = 299,17.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 600, inicio: "2025-10-07", corte: "2026-10-05", pendientes: 0 },
    esperado: { valorProporcional: 299.17 },
  },
  {
    nombre: "Fecha final anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible: tiene que dar error." },
    fecha: "2026-10-07",
    entrada: { sueldo: 600, inicio: "2026-05-01", corte: "2026-04-01", pendientes: 0 },
    esperaError: true,
  },
]);
