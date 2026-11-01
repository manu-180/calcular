import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Dos años: dos semanas",
    origen: { tipo: "recalculado", detalle: "Art. 74.1: 2 semanas; semana = 3.000 × 12 / 52 = 692,31; 2 semanas = 1.384,62." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, anios: 2, peligroso: false, pendientes: 0 },
    esperado: { semanas: 2, valor: 1384.62, semanal: 692.31, tope: 4 },
  },
  {
    nombre: "Cinco años: tres semanas",
    origen: { tipo: "recalculado", detalle: "Art. 74.1: cinco años en el establecimiento dan 3 semanas; 3 × 692,3077 = 2.076,92." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, anios: 5, peligroso: false, pendientes: 0 },
    esperado: { semanas: 3, valor: 2076.92 },
  },
  {
    nombre: "Trabajo peligroso desde el primer año",
    origen: { tipo: "recalculado", detalle: "Art. 74.1: trabajos peligrosos 3 semanas; 2.600 × 12 / 52 = 600 por semana; 1.800." },
    fecha: "2026-10-29",
    entrada: { salario: 2600, anios: 1, peligroso: true, pendientes: 0 },
    esperado: { semanas: 3, valor: 1800, semanal: 600 },
  },
  {
    nombre: "Acumuladas por encima de dos años",
    origen: { tipo: "recalculado", detalle: "Art. 74.4: tope 2 años × 2 semanas = 4; 6 pendientes cuentan 4 × 600 = 2.400." },
    fecha: "2026-10-29",
    entrada: { salario: 2600, anios: 3, peligroso: false, pendientes: 6 },
    esperado: { tope: 4, acumulables: 4, valorAcumuladas: 2400 },
  },
]);
