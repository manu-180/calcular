import { definirCasos } from "@/motor/calculo";
import calculadora from "./employee-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Saudí, régimen anterior",
    origen: {
      tipo: "recalculado",
      detalle: "Bruto 13.500. Empleador 11,75 % de 12.500 = 1.468,75. Provisión 13.500 x 0,5 / 12 = 562,5. Total 15.531,25; anual 186.375.",
    },
    fecha: "2026-10-24",
    entrada: { basico: 10000, vivienda: 2500, otros: 1000, nacionalidad: "saudi", regimen: "legacy" },
    esperado: { aportes: 1468.75, provision: 562.5, mensual: 15531.25, anual: 186375 },
  },
  {
    nombre: "Extranjero: solo riesgos laborales",
    origen: { tipo: "recalculado", detalle: "2 % de 12.500 = 250. 13.500 + 250 + 562,5 = 14.312,5." },
    fecha: "2026-10-24",
    entrada: { basico: 10000, vivienda: 2500, otros: 1000, nacionalidad: "non-saudi", regimen: null },
    esperado: { aportes: 250, mensual: 14312.5 },
  },
  {
    nombre: "Sin básico",
    origen: { tipo: "recalculado", detalle: "Básico 0." },
    fecha: "2026-10-24",
    entrada: { basico: 0, vivienda: 0, otros: 0, nacionalidad: "saudi", regimen: "legacy" },
    esperaError: true,
  },
]);
