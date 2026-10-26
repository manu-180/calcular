import { definirCasos } from "@/motor/calculo";
import calculadora from "./early-retirement-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Hombre de 52 con 300 aportes y un dependiente",
    origen: { tipo: "recalculado", detalle: "25 × 2,5 % × 1.000 = 625. Tabla 5, 52 a 53 años: 9 % = 56,25 → 568,75. Dependiente 12 % = 68,25. Total 637." },
    fecha: "2026-10-24",
    entrada: { sexo: "male", edad: 52, aportes: 300, promedio: 1000, dependientes: 1 },
    esperado: { base: 625, tasaDescuento: 9, descuento: 56.25, aumento: 68.25, pension: 637 },
  },
  {
    nombre: "Mujer de 50 con 228 aportes",
    origen: { tipo: "recalculado", detalle: "19 años × 2,5 % × 800 = 380. Tabla 5, mujer 50 a 51: 6 % = 22,8 → 357,2." },
    fecha: "2026-10-24",
    entrada: { sexo: "female", edad: 50, aportes: 228, promedio: 800, dependientes: 0 },
    esperado: { base: 380, descuento: 22.8, pension: 357.2 },
  },
  {
    nombre: "Hombre de 47 con 300 aportes (segunda vía)",
    origen: { tipo: "recalculado", detalle: "300 aportes y 45 años o más. 25 × (37,5 + 2 % de 500 = 10) = 1.187,5. Tabla 5, 47 a 48: 16 % = 190 → 997,5." },
    fecha: "2026-10-24",
    entrada: { sexo: "male", edad: 47, aportes: 300, promedio: 2000, dependientes: 0 },
    esperado: { base: 1187.5, tasaDescuento: 16, pension: 997.5 },
  },
  {
    nombre: "Hombre de 48 con 260 aportes: no cumple",
    origen: { tipo: "recalculado", detalle: "Menos de 50 años y menos de 300 aportes." },
    fecha: "2026-10-24",
    entrada: { sexo: "male", edad: 48, aportes: 260, promedio: 900, dependientes: 0 },
    esperado: { pension: null, elegible: "لا تتوافر الشروط العامة للتقاعد المبكر" },
  },
  {
    nombre: "Ya tiene la edad de vejez",
    origen: { tipo: "recalculado", detalle: "Hombre de 60: corresponde la pensión de vejez." },
    fecha: "2026-10-24",
    entrada: { sexo: "male", edad: 60, aportes: 300, promedio: 900, dependientes: 0 },
    esperado: { pension: null },
  },
]);
