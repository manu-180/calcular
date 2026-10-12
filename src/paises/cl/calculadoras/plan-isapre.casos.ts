import { definirCasos } from "@/motor/calculo";
import planIsapre from "./plan-isapre";

export default definirCasos(planIsapre, [
  {
    nombre: "Plan de 5 UF con sueldo de $2.000.000",
    origen: {
      tipo: "recalculado",
      detalle: "UF 41.114,54: plan 205.572,7 → 205.573. Cotización legal 7 % de 2.000.000 = 140.000. Adicional 65.573. Descuento total 205.573 (10,28 % del sueldo).",
    },
    fecha: "2026-10-07",
    entrada: { planUf: 5, imponible: 2000000 },
    esperado: { plan: 205573, legal: 140000, adicional: 65573, descuento: 205573, excedente: 0 },
  },
  {
    nombre: "Plan barato: queda excedente",
    origen: { tipo: "recalculado", detalle: "Plan 3 UF = 123.344. 7 % de 3.000.000 = 210.000. Descuento 210.000; excedente 86.656." },
    fecha: "2026-10-07",
    entrada: { planUf: 3, imponible: 3000000 },
    esperado: { plan: 123344, descuento: 210000, excedente: 86656, adicional: 0 },
  },
  {
    nombre: "Sueldo sobre el tope",
    origen: { tipo: "recalculado", detalle: "7 % de 3.700.309 (tope 90 UF) = 259.021,6 → 259.022." },
    fecha: "2026-10-07",
    entrada: { planUf: 4, imponible: 6000000 },
    esperado: { legal: 259022 },
  },
]);
