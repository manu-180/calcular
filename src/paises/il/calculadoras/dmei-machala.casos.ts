import { definirCasos } from "@/motor/calculo";
import calculadora from "./dmei-machala";

export default definirCasos(calculadora, [
  {
    nombre: "4 días con un año de antigüedad",
    origen: { tipo: "recalculado", detalle: "Art. 2: día 1 sin pago, días 2 y 3 al 50 % (225 + 225), día 4 completo (450): 900. Saldo 12 x 1,5 = 18, quedan 15." },
    fecha: "2026-10-24",
    entrada: { yamim: 4, sacharYomi: 450, chodashim: 12, nutzlu: 0 },
    esperado: { tashlum: 900, meshulamim: 3, leloTashlum: 1, tzvura: 18, yitra: 15 },
  },
  {
    nombre: "Saldo corto: 2 meses de trabajo",
    origen: { tipo: "recalculado", detalle: "Art. 4: 2 x 1,5 = 3 días. Se pagan los días 2, 3 y 4 (225 + 225 + 450 = 900); los otros 6 no." },
    fecha: "2026-10-24",
    entrada: { yamim: 10, sacharYomi: 450, chodashim: 2, nutzlu: 0 },
    esperado: { tashlum: 900, meshulamim: 3, leloTashlum: 7, yitra: 0 },
  },
  {
    nombre: "Tope de 90 días acumulados",
    origen: { tipo: "recalculado", detalle: "Art. 4: 100 meses x 1,5 = 150, tope 90." },
    fecha: "2026-10-24",
    entrada: { yamim: 1, sacharYomi: 300, chodashim: 100, nutzlu: 0 },
    esperado: { tzvura: 90, tashlum: 0 },
  },
  {
    nombre: "Sin sueldo diario",
    origen: { tipo: "recalculado", detalle: "Sueldo 0." },
    fecha: "2026-10-24",
    entrada: { yamim: 3, sacharYomi: 0, chodashim: 12, nutzlu: 0 },
    esperaError: true,
  },
]);
