import { definirCasos } from "@/motor/calculo";
import dreizehnterMonatslohnRechner from "./13-monatslohn-rechner";

export default definirCasos(dreizehnterMonatslohnRechner, [
  {
    nombre: "Ganzes Jahr",
    origen: { tipo: "recalculado", detalle: "6500 × 12 / 12 = 6500; Jahreslohn 6500 × 12 + 6500 = 84 500." },
    fecha: "2026-10-14",
    entrada: { monatslohn: 6500, monate: 12 },
    esperado: { anteil: 6500, proMonat: 541.67, jahreslohn: 84500 },
  },
  {
    nombre: "Eintritt Mitte Mai",
    origen: { tipo: "recalculado", detalle: "7,5 Monate: 6500 × 7,5 / 12 = 4062,50." },
    fecha: "2026-10-14",
    entrada: { monatslohn: 6500, monate: 7.5 },
    esperado: { anteil: 4062.5, jahreslohn: 52812.5 },
  },
  {
    nombre: "Mehr als 12 Monate",
    origen: { tipo: "recalculado", detalle: "13 Monate sind nicht möglich." },
    fecha: "2026-10-14",
    entrada: { monatslohn: 6500, monate: 13 },
    esperaError: true,
  },
]);
