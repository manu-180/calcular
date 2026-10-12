import { definirCasos } from "@/motor/calculo";
import isrPersonaFisica from "./isr-persona-fisica";

export default definirCasos(isrPersonaFisica, [
  {
    nombre: "Profesional con RD$1,500,000 de ingresos",
    origen: { tipo: "recalculado", detalle: "Renta neta 1,500,000 − 300,000 = 1,200,000. Art. 296: 79,776 + 25 % × (1,200,000 − 867,123.01) = 162,995.25. Menos 100,000 retenidos: 62,995.25 a pagar." },
    fecha: "2026-10-12",
    entrada: { ingresos: 1500000, gastos: 300000, educativos: 0, retenciones: 100000 },
    esperado: { rentaNeta: 1200000, imponible: 1200000, impuesto: 162995.25, aPagar: 62995.25, aFavor: 0 },
  },
  {
    nombre: "Saldo a favor con gastos educativos",
    origen: { tipo: "recalculado", detalle: "Renta neta 1,000,000. Educativos: tope 10 % = 100,000 (menor que 124,866). Imponible 900,000: 79,776 + 25 % × 32,876.99 = 87,995.25. Retenciones 150,000: saldo a favor 62,004.75." },
    fecha: "2026-10-12",
    entrada: { ingresos: 1200000, gastos: 200000, educativos: 200000, retenciones: 150000 },
    esperado: { deduccion: 100000, imponible: 900000, impuesto: 87995.25, aPagar: 0, aFavor: 62004.75 },
  },
  {
    nombre: "Renta exenta",
    origen: { tipo: "recalculado", detalle: "400,000 está debajo de 416,220." },
    fecha: "2026-10-12",
    entrada: { ingresos: 400000, gastos: 0, educativos: 0, retenciones: 0 },
    esperado: { impuesto: 0, aPagar: 0 },
  },
  {
    nombre: "Gastos mayores que los ingresos",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { ingresos: 100000, gastos: 200000, educativos: 0, retenciones: 0 },
    esperaError: true,
  },
]);
