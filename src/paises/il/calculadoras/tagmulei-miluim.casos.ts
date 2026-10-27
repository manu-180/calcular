import { definirCasos } from "@/motor/calculo";
import calculadora from "./tagmulei-miluim";

export default definirCasos(calculadora, [
  {
    nombre: "Asalariado, 20 días: el ejemplo del ביטוח לאומי, 21 días a pagar",
    origen: { tipo: "recalculado", detalle: "36.000 / 90 = 400 por día; 20 días, resto 6 = 1 día de תוספת; 21 x 400 = 8.400." },
    fecha: "2026-10-26",
    entrada: { sug: "sachir", hachnasa3: 36000, yamim: 20 },
    esperado: { yomi: 400, yemeiTashlum: 21, tosefet: 1, tagmul: 8400, pitzui: 0, sach: 8400 },
  },
  {
    nombre: "Autónomo, 7 días: 25% de פיצוי",
    origen: { tipo: "recalculado", detalle: "400 x 7 = 2.800 de תגמול; פיצוי 100 x 7 = 700; total 3.500." },
    fecha: "2026-10-26",
    entrada: { sug: "atzmai", hachnasa3: 36000, yamim: 7 },
    esperado: { yomi: 400, tosefet: 0, tagmul: 2800, pitzui: 700, sach: 3500 },
  },
  {
    nombre: "Estudiante, 5 días: mínimo diario",
    origen: { tipo: "recalculado", detalle: "328,76 por día; resto 5 = 2 días de תוספת; 7 x 328,76 = 2.301,32." },
    fecha: "2026-10-26",
    entrada: { sug: "lo-oved", hachnasa3: null, yamim: 5 },
    esperado: { yomi: 328.76, yemeiTashlum: 7, sach: 2301.32 },
  },
  {
    nombre: "Asalariado sobre el tope, 22 días: 22,4 de la tabla",
    origen: { tipo: "recalculado", detalle: "180.000 / 90 = 2.000, tope 1.730,33; 22,4 días x 1.730,33 = 38.759,39." },
    fecha: "2026-10-26",
    entrada: { sug: "sachir", hachnasa3: 180000, yamim: 22 },
    esperado: { yomi: 1730.33, yemeiTashlum: 22.4, sach: 38759.39 },
  },
  {
    nombre: "Autónomo cerca del tope: el פיצוי no pasa el máximo diario",
    origen: { tipo: "recalculado", detalle: "150.000 / 90 = 1.666,67; פיצוי limitado a 1.730,33 menos 1.666,67 = 63,66 por día; 7 días: 11.666,69 + 445,62." },
    fecha: "2026-10-26",
    entrada: { sug: "atzmai", hachnasa3: 150000, yamim: 7 },
    esperado: { yomi: 1666.67, tagmul: 11666.69, pitzui: 445.62, sach: 12112.31 },
  },
  {
    nombre: "Asalariado sin ingreso",
    origen: { tipo: "recalculado", detalle: "Ingreso 0." },
    fecha: "2026-10-26",
    entrada: { sug: "sachir", hachnasa3: 0, yamim: 5 },
    esperaError: true,
  },
]);
