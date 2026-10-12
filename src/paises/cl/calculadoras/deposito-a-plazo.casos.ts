import { definirCasos } from "@/motor/calculo";
import depositoAPlazo from "./deposito-a-plazo";

export default definirCasos(depositoAPlazo, [
  {
    nombre: "$1.000.000 a 30 días con 0,35 % mensual",
    origen: { tipo: "recalculado", detalle: "Interés simple: 1.000.000 × 0,35 % × 30/30 = 3.500. Total 1.003.500. Anual equivalente 4,2 %." },
    fecha: "2026-10-07",
    entrada: { capital: 1000000, tasa: 0.35, base: "30-dias", dias: 30 },
    esperado: { interes: 3500, total: 1003500, tasaAnual: 4.2 },
  },
  {
    nombre: "$5.000.000 a 90 días con 4,8 % anual",
    origen: { tipo: "recalculado", detalle: "4,8 % anual base 360 = 0,4 % por 30 días. 90 días = 1,2 %. 5.000.000 × 1,2 % = 60.000." },
    fecha: "2026-10-07",
    entrada: { capital: 5000000, tasa: 4.8, base: "anual", dias: 90 },
    esperado: { interes: 60000, total: 5060000, tasaPeriodo: 1.2 },
  },
]);
