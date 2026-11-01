import { definirCasos } from "@/motor/calculo";
import calculadora from "./retirement-pension-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "60 años, 25 años de aportes, promedio 1.000, un dependiente",
    origen: { tipo: "recalculado", detalle: "25 × 2,5 % × 1.000 = 625. Dependiente 12 % = 75 (entre 10 y 100). Total 700." },
    fecha: "2026-10-24",
    entrada: { sexo: "male", edad: 60, aportes: 300, promedio: 1000, dependientes: 1 },
    esperado: { base: 625, aumento: 75, pension: 700, anios: 25 },
  },
  {
    nombre: "Promedio por encima de 1.500 y tres dependientes",
    origen: { tipo: "recalculado", detalle: "Por año: 2,5 % de 1.500 = 37,5 + 2 % de 500 = 10 → 47,5 × 25 = 1.187,5. Dependientes: 12 % = 142,5 topado en 100; 6 % = 71,25 topado en 25, dos veces. Total 1.337,5." },
    fecha: "2026-10-24",
    entrada: { sexo: "male", edad: 62, aportes: 300, promedio: 2000, dependientes: 3 },
    esperado: { base: 1187.5, aumento: 150, pension: 1337.5 },
  },
  {
    nombre: "Mínimos de los aumentos por dependientes",
    origen: { tipo: "recalculado", detalle: "15 años × 2,5 % × 290 = 108,75. Primero 12 % = 13,05. Segundo 6 % = 6,525 sube al mínimo 10. Total 131,8." },
    fecha: "2026-10-24",
    entrada: { sexo: "female", edad: 55, aportes: 180, promedio: 290, dependientes: 2 },
    esperado: { base: 108.75, aumento: 23.05, pension: 131.8 },
  },
  {
    nombre: "Mujer de 54 años: todavía no",
    origen: { tipo: "recalculado", detalle: "Edad mínima 55 para la mujer (art. 62)." },
    fecha: "2026-10-24",
    entrada: { sexo: "female", edad: 54, aportes: 240, promedio: 700, dependientes: 0 },
    esperado: { pension: null, elegible: "لا تتوافر الشروط بعد" },
  },
  {
    nombre: "Sin promedio",
    origen: { tipo: "recalculado", detalle: "Promedio 0." },
    fecha: "2026-10-24",
    entrada: { sexo: "male", edad: 60, aportes: 300, promedio: 0, dependientes: 0 },
    esperaError: true,
  },
]);
