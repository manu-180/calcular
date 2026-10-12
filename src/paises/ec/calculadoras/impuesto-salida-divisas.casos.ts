import { definirCasos } from "@/motor/calculo";
import isd from "./impuesto-salida-divisas";

export default definirCasos(isd, [
  {
    nombre: "Compras con tarjeta que pasan el monto exento anual",
    origen: {
      tipo: "oficial",
      url: "https://www.sri.gob.ec/impuesto-a-la-salida-de-divisas-isd",
      detalle: "SRI: con tarjeta, USD 5.188,26 al año exentos (2025 a 2027); tarifa 5 %. Ya usó 4.000: quedan 1.188,26 exentos. Compra de 2.000: gravado 811,74 × 5 % = 40,59.",
    },
    fecha: "2026-10-07",
    entrada: { tipo: "tarjeta", monto: 2000, previo: 4000, menores: 0 },
    esperado: { exento: 1188.26, gravado: 811.74, impuesto: 40.59 },
  },
  {
    nombre: "Viaje con 3.000 en efectivo y un menor",
    origen: {
      tipo: "recalculado",
      detalle: "Exento: 3 salarios básicos + 1 por el menor = 4 × 482 = 1.928. Gravado 1.072 × 5 % = 53,60.",
    },
    fecha: "2026-10-07",
    entrada: { tipo: "efectivo", monto: 3000, previo: 0, menores: 1 },
    esperado: { exento: 1928, gravado: 1072, impuesto: 53.6 },
  },
  {
    nombre: "Transferencia de 10.000",
    origen: { tipo: "recalculado", detalle: "Exento 3 × 482 = 1.446. Gravado 8.554 × 5 % = 427,70." },
    fecha: "2026-10-07",
    entrada: { tipo: "transferencia", monto: 10000, previo: 0, menores: 0 },
    esperado: { exento: 1446, gravado: 8554, impuesto: 427.7 },
  },
  {
    nombre: "Efectivo dentro del monto exento",
    origen: { tipo: "recalculado", detalle: "1.000 es menos que 1.446: impuesto 0." },
    fecha: "2026-10-07",
    entrada: { tipo: "efectivo", monto: 1000, previo: 0, menores: 0 },
    esperado: { exento: 1000, impuesto: 0 },
  },
]);
