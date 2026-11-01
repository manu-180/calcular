import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Hombre a los 60 con 30 años",
    origen: { tipo: "recalculado", detalle: "2 % × 900 × 30 = 540; sin reducción." },
    fecha: "2026-10-26",
    entrada: { promedio: 900, anios: 30, edad: 60, sexo: "male" },
    esperado: { pension: 540, tasa: 60, reduccion: 0, sinReduccion: 60 },
  },
  {
    nombre: "Mujer a los 53 con 25 años",
    origen: { tipo: "recalculado", detalle: "Sin reducción a los 55; faltan 2 años × 5 % = 10 %. 2 % × 900 × 25 = 450 − 10 % = 405." },
    fecha: "2026-10-26",
    entrada: { promedio: 900, anios: 25, edad: 53, sexo: "female" },
    esperado: { pension: 405, reduccion: 10, sinReduccion: 55 },
  },
  {
    nombre: "Treinta años de servicio a los 50",
    origen: { tipo: "recalculado", detalle: "Hombre: faltan 10 años: 5 × 5 % + 5 × 1 % = 30 %. Tope 3.000: 2 % × 3.000 × 30 = 1.800 − 30 % = 1.260." },
    fecha: "2026-10-26",
    entrada: { promedio: 4000, anios: 30, edad: 50, sexo: "male" },
    esperado: { pension: 1260, reduccion: 30 },
  },
  {
    nombre: "Demasiado joven",
    origen: { tipo: "recalculado", detalle: "Hombre de 50 con 22 años: faltan 10 > 5 y menos de 30 años." },
    fecha: "2026-10-26",
    entrada: { promedio: 900, anios: 22, edad: 50, sexo: "male" },
    esperaError: true,
  },
]);
