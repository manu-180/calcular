import { definirCasos } from "@/motor/calculo";
import calculadora from "./dmei-pgia";

export default definirCasos(calculadora, [
  {
    nombre: "36.000 en 3 meses, 30 días de ausencia",
    origen: { tipo: "recalculado", detalle: "36.000 / 90 x 75% = 300 por día; 30 x 300 = 9.000." },
    fecha: "2026-10-26",
    entrada: { hachnasa3: 36000, yamim: 30 },
    esperado: { yomi: 300, yamim: 30, sach: 9000 },
  },
  {
    nombre: "Ausencia corta: 8 días, se pagan 6 desde el tercer día",
    origen: { tipo: "recalculado", detalle: "Ejemplo del ביטוח לאומי: lesión el 1.6, ausencia hasta el 8.6, se paga del 4.6 al 8.6; de 8 días se descuentan 2." },
    fecha: "2026-10-26",
    entrada: { hachnasa3: 36000, yamim: 8 },
    esperado: { yamim: 6, sach: 1800 },
  },
  {
    nombre: "12 días: se pagan todos",
    origen: { tipo: "recalculado", detalle: "12 no es menos de 12: 12 x 300 = 3.600." },
    fecha: "2026-10-26",
    entrada: { hachnasa3: 36000, yamim: 12 },
    esperado: { yamim: 12, sach: 3600 },
  },
  {
    nombre: "Tope de 91 días",
    origen: { tipo: "recalculado", detalle: "120 días, se pagan 91 x 300 = 27.300." },
    fecha: "2026-10-26",
    entrada: { hachnasa3: 36000, yamim: 120 },
    esperado: { yamim: 91, sach: 27300 },
  },
  {
    nombre: "Tope diario",
    origen: { tipo: "recalculado", detalle: "240.000 / 90 x 75% = 2.000, tope 1.314,25; 30 días = 39.427,50." },
    fecha: "2026-10-26",
    entrada: { hachnasa3: 240000, yamim: 30 },
    esperado: { yomi: 1314.25, sach: 39427.5 },
  },
  {
    nombre: "Sin ingreso",
    origen: { tipo: "recalculado", detalle: "Ingreso 0." },
    fecha: "2026-10-26",
    entrada: { hachnasa3: 0, yamim: 10 },
    esperaError: true,
  },
]);
