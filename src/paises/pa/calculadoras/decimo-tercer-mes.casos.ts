import { definirCasos } from "@/motor/calculo";
import decimoTercerMes from "./decimo-tercer-mes";

export default definirCasos(decimoTercerMes, [
  {
    nombre: "Ejemplo del MITRADEL: período completo del 16 de diciembre al 15 de abril",
    origen: {
      tipo: "oficial",
      url: "https://mitradel.gob.pa/wp-content/uploads/2019/12/Bolet%C3%ADn.pdf",
      detalle: "Boletín de prestaciones laborales: total de salarios B/. 2,122.00 ÷ 12 = B/. 176.83. Descuento de la CSS (Ley 462, art. 101.5): 176.83 × 7.25% = 12.82. Neto 164.01.",
    },
    fecha: "2026-04-15",
    entrada: { partida: "abril", totalPeriodo: 2122 },
    esperado: { bruto: 176.83, css: 12.82, neto: 164.01 },
  },
  {
    nombre: "Tercera partida con salario fijo de B/. 900",
    origen: { tipo: "recalculado", detalle: "4 × 900 = 3,600 ÷ 12 = 300. CSS 300 × 7.25% = 21.75. Neto 278.25." },
    fecha: "2026-12-15",
    entrada: { partida: "diciembre", totalPeriodo: 3600 },
    esperado: { bruto: 300, css: 21.75, neto: 278.25 },
  },
  {
    nombre: "Sin ingresos en el período",
    origen: { tipo: "recalculado", detalle: "0 ÷ 12 = 0. Sin descuento." },
    fecha: "2026-08-15",
    entrada: { partida: "agosto", totalPeriodo: 0 },
    esperado: { bruto: 0, css: 0, neto: 0 },
  },
]);
