import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage-in-nepal";

export default definirCasos(calculadora, [
  {
    nombre: "The minimum from 1 Shrawan 2082",
    origen: {
      tipo: "oficial",
      url: "https://www.moless.gov.np/content/13291/press-release-related-press-release-remuneration-remained/",
      detalle: "The press release lists NPR 12,170 basic plus 7,380 allowance = 19,550 a month, 470 + 284 = 754 a day and 63 + 38 = 101 an hour.",
    },
    fecha: "2026-10-29",
    entrada: { sueldo: null },
    esperado: { mensual: 19550, basico: 12170, carestia: 7380, diario: 754, hora: 101, parcial: 107, anual: 234600 },
  },
  {
    nombre: "A worker paid NPR 18,000",
    origen: { tipo: "recalculado", detalle: "18,000 − 19,550 = −1,550." },
    fecha: "2026-10-29",
    entrada: { sueldo: 18000 },
    esperado: { diferencia: -1550 },
  },
  {
    nombre: "Negative pay",
    origen: { tipo: "recalculado", detalle: "Pay cannot be negative." },
    fecha: "2026-10-29",
    entrada: { sueldo: -1 },
    esperaError: true,
  },
]);
