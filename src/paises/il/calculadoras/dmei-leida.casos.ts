import { definirCasos } from "@/motor/calculo";
import calculadora from "./dmei-leida";

export default definirCasos(calculadora, [
  {
    nombre: "36.000 en 3 meses, licencia completa",
    origen: { tipo: "recalculado", detalle: "36.000 / 90 = 400 por día; 105 días: 42.000." },
    fecha: "2026-10-24",
    entrada: { sachar3: 36000, sachar6: null, zakaut: "male", yeladim: 1 },
    esperado: { yomi: 400, yamim: 105, sach: 42000 },
  },
  {
    nombre: "Mellizos: 3 semanas más",
    origen: { tipo: "recalculado", detalle: "105 + 21 = 126 días x 400 = 50.400." },
    fecha: "2026-10-24",
    entrada: { sachar3: 36000, sachar6: null, zakaut: "male", yeladim: 2 },
    esperado: { yamim: 126, sach: 50400 },
  },
  {
    nombre: "Tope diario",
    origen: { tipo: "recalculado", detalle: "180.000 / 90 = 2.000, tope 1.752,33; 105 días: 183.994,65." },
    fecha: "2026-10-24",
    entrada: { sachar3: 180000, sachar6: null, zakaut: "male", yeladim: 1 },
    esperado: { yomi: 1752.33, sach: 183994.65 },
  },
  {
    nombre: "Conviene la cuenta de 6 meses, licencia parcial",
    origen: { tipo: "recalculado", detalle: "30.000 / 90 = 333,33; 72.000 / 180 = 400: vale 400. Parcial: 56 días = 22.400." },
    fecha: "2026-10-24",
    entrada: { sachar3: 30000, sachar6: 72000, zakaut: "chelki", yeladim: 1 },
    esperado: { yomi: 400, yamim: 56, sach: 22400 },
  },
  {
    nombre: "Sin sueldo",
    origen: { tipo: "recalculado", detalle: "Sueldo 0." },
    fecha: "2026-10-24",
    entrada: { sachar3: 0, sachar6: null, zakaut: "male", yeladim: 1 },
    esperaError: true,
  },
]);
