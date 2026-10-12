import { definirCasos } from "@/motor/calculo";
import anticipo from "./anticipo-prestaciones";

export default definirCasos(anticipo, [
  {
    nombre: "Garantía de $1.000 sin anticipos previos",
    origen: { tipo: "recalculado", detalle: "LOTTT art. 144: hasta 75 %. 1.000 × 75 % = 750; quedan 250." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", garantia: 1000, anticipos: 0 },
    esperado: { porcentaje: 75, topeUsd: 750, disponibleUsd: 750, quedaUsd: 250, topeBs: null },
  },
  {
    nombre: "Con un anticipo previo en bolívares",
    origen: { tipo: "recalculado", detalle: "Tope 80.000 × 75 % = 60.000; ya recibiste 20.000: puedes pedir 40.000; quedan 20.000." },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", garantia: 80000, anticipos: 20000 },
    esperado: { topeBs: 60000, disponibleBs: 40000, quedaBs: 20000 },
  },
  {
    nombre: "Tope ya usado",
    origen: { tipo: "recalculado", detalle: "Garantía 1.000 y anticipos 800: el tope de 750 ya se pasó, no queda nada por pedir." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", garantia: 1000, anticipos: 800 },
    esperado: { disponibleUsd: 0, quedaUsd: 200 },
  },
  {
    nombre: "Anticipos mayores que la garantía",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", garantia: 100, anticipos: 200 },
    esperaError: true,
  },
]);
