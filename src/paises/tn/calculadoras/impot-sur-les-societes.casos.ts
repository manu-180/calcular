import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-societes";

export default definirCasos(calculadora, [
  {
    nombre: "100 000 DT au taux normal",
    origen: { tipo: "recalculado", detalle: "IS 20 % = 20 000 ; CSS 3 points = 3 000." },
    fecha: "2026-10-24",
    entrada: { benefice: 100000, regime: "normal" },
    esperado: { is: 20000, css: 3000, total: 23000, taux: 20 },
  },
  {
    nombre: "Petit bénéfice au taux réduit : minimum de CSS",
    origen: { tipo: "recalculado", detalle: "IS 10 % de 1 000 = 100 ; CSS 3 % = 30, porté au minimum de 200." },
    fecha: "2026-10-24",
    entrada: { benefice: 1000.9, regime: "reduit" },
    esperado: { is: 100, css: 200, total: 300 },
  },
  {
    nombre: "1 000 000 DT au taux majoré",
    origen: { tipo: "recalculado", detalle: "IS 35 % = 350 000 ; CSS 4 points = 40 000." },
    fecha: "2026-10-24",
    entrada: { benefice: 1000000, regime: "majore" },
    esperado: { is: 350000, css: 40000, total: 390000 },
  },
]);
