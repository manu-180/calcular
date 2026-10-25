import { definirCasos } from "@/motor/calculo";
import calculadora from "./alut-maasik";

export default definirCasos(calculadora, [
  {
    nombre: "15.000 con la tasa básica de פיצויים",
    origen: {
      tipo: "recalculado",
      detalle: "BL 7.703 x 4,51 % + 7.297 x 7,6 % = 901,98; pensión 6,5 % = 975; פיצויים 6 % = 900. Costo 15.000 + 2.776,98 = 17.776,98.",
    },
    fecha: "2026-10-24",
    entrada: { bruto: 15000, pitzuyim: "basis", hishtalmut: 0 },
    esperado: { bituachLeumi: 901.98, pensia: 975, pitzuyim: 900, alut: 17776.98, tosefet: 2776.98 },
  },
  {
    nombre: "Sección 14 y keren hishtalmut 7,5 %",
    origen: { tipo: "recalculado", detalle: "פיצויים 8,33 % = 1.249,5; השתלמות 7,5 % = 1.125. Costo 15.000 + 901,98 + 975 + 1.249,5 + 1.125 = 19.251,48." },
    fecha: "2026-10-24",
    entrada: { bruto: 15000, pitzuyim: "male", hishtalmut: 7.5 },
    esperado: { pitzuyim: 1249.5, hishtalmut: 1125, alut: 19251.48 },
  },
  {
    nombre: "Sin bruto",
    origen: { tipo: "recalculado", detalle: "Bruto 0." },
    fecha: "2026-10-24",
    entrada: { bruto: 0, pitzuyim: "basis", hishtalmut: 0 },
    esperaError: true,
  },
]);
