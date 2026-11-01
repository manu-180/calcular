import { definirCasos } from "@/motor/calculo";
import calculadora from "./dmei-avtala";

export default definirCasos(calculadora, [
  {
    nombre: "60.000 en 6 meses, 30 años",
    origen: {
      tipo: "recalculado",
      detalle: "Diario 60.000 / 150 = 400. 207,5 x 80 % + 103,75 x 50 % + 88,75 x 45 % = 257,8125. 100 días: 25.781,25.",
    },
    fecha: "2026-10-24",
    entrada: { hachnasa6: 60000, gil: "28-35", tluyim: false },
    esperado: { sacharYomi: 400, dmeiYomi: 257.81, yamim: 100, sach: 25781.25 },
  },
  {
    nombre: "Menor de 28",
    origen: { tipo: "recalculado", detalle: "400 diarios: 207,5 x 60 % + 103,75 x 40 % + 88,75 x 35 % = 197,0625. 67 días: 13.203,19." },
    fecha: "2026-10-24",
    entrada: { hachnasa6: 60000, gil: "25-28", tluyim: false },
    esperado: { dmeiYomi: 197.06, yamim: 67, sach: 13203.19 },
  },
  {
    nombre: "45 años, sueldo alto: segundo tope desde el día 126",
    origen: {
      tipo: "recalculado",
      detalle: "Diario 1.000: 166 + 51,875 + 46,6875 + 585 x 30 % = 440,0625. 125 días x 440,0625 + 50 días x 367,17 = 73.366,31.",
    },
    fecha: "2026-10-24",
    entrada: { hachnasa6: 150000, gil: "45", tluyim: false },
    esperado: { dmeiYomi: 440.06, yamim: 175, sach: 73366.31 },
  },
  {
    nombre: "Primer tope diario",
    origen: { tipo: "recalculado", detalle: "Diario 2.075 (5 veces el básico): 166 + 51,875 + 46,6875 + 1.660 x 30 % = 762,5625, tope 550,76." },
    fecha: "2026-10-24",
    entrada: { hachnasa6: 311250, gil: "35-45", tluyim: true },
    esperado: { dmeiYomi: 550.76, yamim: 175 },
  },
  {
    nombre: "Sin ingresos",
    origen: { tipo: "recalculado", detalle: "Ingresos 0." },
    fecha: "2026-10-24",
    entrada: { hachnasa6: 0, gil: "28-35", tluyim: false },
    esperaError: true,
  },
]);
