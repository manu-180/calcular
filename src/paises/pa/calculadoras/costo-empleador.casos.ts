import { definirCasos } from "@/motor/calculo";
import costoEmpleador from "./costo-empleador";

export default definirCasos(costoEmpleador, [
  {
    nombre: "Salario de B/. 1,200 en 2026, sin riesgos profesionales",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 462: CSS 13.25% = 159. Seguro educativo 1.5% = 18. Décimo 1,200 ÷ 12 = 100 y 10.75% = 10.75. Total 1,487.75; anual 17,853.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 1200, riesgoProfesional: null },
    esperado: { css: 159, seguroEducativo: 18, riesgo: 0, decimo: 100, cssDecimo: 10.75, mensual: 1487.75, anual: 17853 },
  },
  {
    nombre: "Último día con la cuota de 13.25%",
    origen: { tipo: "recalculado", detalle: "28/2/2027: todavía 13.25%. Riesgo 2.1% = 25.20. Total 1,512.95." },
    fecha: "2027-02-28",
    entrada: { salario: 1200, riesgoProfesional: 2.1 },
    esperado: { css: 159, riesgo: 25.2, mensual: 1512.95 },
  },
  {
    nombre: "Primer día con la cuota de 14.25%",
    origen: { tipo: "recalculado", detalle: "1/3/2027: 14.25% = 171. Con riesgo 25.20, total 1,524.95; anual 18,299.40." },
    fecha: "2027-03-01",
    entrada: { salario: 1200, riesgoProfesional: 2.1 },
    esperado: { css: 171, riesgo: 25.2, mensual: 1524.95, anual: 18299.4 },
  },
]);
