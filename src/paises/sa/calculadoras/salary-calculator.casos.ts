import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Saudí, régimen anterior",
    origen: { tipo: "recalculado", detalle: "Bruto 10.000 + 2.500 + 1.000 = 13.500. GOSI 9,75 % de 12.500 = 1.218,75. Neto 12.281,25." },
    fecha: "2026-10-24",
    entrada: { basico: 10000, vivienda: 2500, otros: 1000, nacionalidad: "saudi", regimen: "legacy" },
    esperado: { bruto: 13500, descuento: 1218.75, neto: 12281.25, anual: 147375 },
  },
  {
    nombre: "Saudí, sistema nuevo en octubre de 2026",
    origen: { tipo: "recalculado", detalle: "10 % + 0,75 % de 12.500 = 1.343,75. Neto 13.500 - 1.343,75 = 12.156,25." },
    fecha: "2026-10-24",
    entrada: { basico: 10000, vivienda: 2500, otros: 1000, nacionalidad: "saudi", regimen: "new" },
    esperado: { descuento: 1343.75, neto: 12156.25 },
  },
  {
    nombre: "Extranjero sin descuentos",
    origen: { tipo: "recalculado", detalle: "Sin aporte del empleado: neto = bruto 13.500." },
    fecha: "2026-10-24",
    entrada: { basico: 10000, vivienda: 2500, otros: 1000, nacionalidad: "non-saudi", regimen: null },
    esperado: { descuento: 0, neto: 13500 },
  },
  {
    nombre: "Tope en sueldos altos",
    origen: { tipo: "recalculado", detalle: "Base 40.000 + 10.000 = 50.000 topada en 45.000. 9,75 % = 4.387,5. Neto 50.000 - 4.387,5 = 45.612,5." },
    fecha: "2026-10-24",
    entrada: { basico: 40000, vivienda: 10000, otros: 0, nacionalidad: "saudi", regimen: "legacy" },
    esperado: { descuento: 4387.5, neto: 45612.5 },
  },
  {
    nombre: "Sin básico",
    origen: { tipo: "recalculado", detalle: "Básico 0." },
    fecha: "2026-10-24",
    entrada: { basico: 0, vivienda: 0, otros: 0, nacionalidad: "saudi", regimen: "legacy" },
    esperaError: true,
  },
]);
