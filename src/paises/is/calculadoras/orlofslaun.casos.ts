import { definirCasos } from "@/motor/calculo";
import calc from "./orlofslaun";

export default definirCasos(calc, [
  {
    nombre: "10,17% af 600.000 kr.",
    origen: { tipo: "recalculado", detalle: "600.000 x 10,17% = 61.020." },
    fecha: "2026-06-15",
    entrada: { laun: 600000, orlof: "d24" },
    esperado: { orlofslaun: 61020, samtals: 661020 },
  },
  {
    nombre: "27 og 30 dagar",
    origen: { tipo: "recalculado", detalle: "600.000 x 11,59% = 69.540." },
    fecha: "2026-06-15",
    entrada: { laun: 600000, orlof: "d27" },
    esperado: { orlofslaun: 69540 },
  },
  {
    nombre: "30 dagar",
    origen: { tipo: "recalculado", detalle: "600.000 x 13,04% = 78.240." },
    fecha: "2026-06-15",
    entrada: { laun: 600000, orlof: "d30" },
    esperado: { orlofslaun: 78240 },
  },
]);
