import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

const DECRETO = "https://www.impo.com.uy/bases/decretos/319-2025" as const;

export default definirCasos(salarioMinimo, [
  {
    nombre: "Desde el 1 de julio de 2026",
    origen: { tipo: "oficial", url: DECRETO, detalle: "Decreto 319/025, art. 2: $ 25.383 mensuales; el jornal sale de dividir entre 25 (1.015,32) y la hora, entre 200 (126,915, redondeado 126,92)." },
    fecha: "2026-10-07",
    entrada: { horas: null },
    esperado: { mensual: 25383, jornal: 1015.32, porHora: 126.92, paraTusHoras: null },
  },
  {
    nombre: "Último día del primer tramo de 2026",
    origen: { tipo: "oficial", url: DECRETO, detalle: "Decreto 319/025, art. 1: $ 24.572 del 1/1 al 30/6/2026. Jornal 982,88; hora 122,86." },
    fecha: "2026-06-30",
    entrada: { horas: null },
    esperado: { mensual: 24572, jornal: 982.88, porHora: 122.86 },
  },
  {
    nombre: "Primer día del aumento de julio, medio horario",
    origen: { tipo: "recalculado", detalle: "1/7/2026: 126,92 por hora × 100 horas = 12.692." },
    fecha: "2026-07-01",
    entrada: { horas: 100 },
    esperado: { mensual: 25383, paraTusHoras: 12692 },
  },
  {
    nombre: "2025",
    origen: { tipo: "oficial", url: "https://www.impo.com.uy/bases/decretos/369-2024", detalle: "Decreto 369/024: $ 23.604 desde el 1/1/2025. Jornal 944,16; hora 118,02." },
    fecha: "2025-08-01",
    entrada: { horas: null },
    esperado: { mensual: 23604, jornal: 944.16, porHora: 118.02 },
  },
]);
