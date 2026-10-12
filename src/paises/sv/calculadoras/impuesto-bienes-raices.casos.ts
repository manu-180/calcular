import { definirCasos } from "@/motor/calculo";
import impuesto from "./impuesto-bienes-raices";

export default definirCasos(impuesto, [
  {
    nombre: "Casa de $100,000",
    origen: {
      tipo: "oficial",
      url: "https://www.mh.gob.sv/wp-content/uploads/2020/11/PMHDC8216.pdf",
      detalle: "Formulario de Hacienda: 3 % sobre el exceso de 28.571,43. 100.000 − 28.571,43 = 71.428,57; 3 % = 2.142,86.",
    },
    fecha: "2026-10-12",
    entrada: { valor: 100000 },
    esperado: { exceso: 71428.57, impuesto: 2142.86 },
  },
  {
    nombre: "Terreno de $25,000: exento",
    origen: { tipo: "recalculado", detalle: "No pasa de 28.571,43: sin impuesto." },
    fecha: "2026-10-12",
    entrada: { valor: 25000 },
    esperado: { exceso: 0, impuesto: 0 },
  },
  {
    nombre: "Un centavo sobre el límite",
    origen: { tipo: "recalculado", detalle: "28.571,44: exceso 0,01; 3 % = 0,0003, redondea a 0." },
    fecha: "2026-10-12",
    entrada: { valor: 28571.44 },
    esperado: { exceso: 0.01, impuesto: 0 },
  },
]);
