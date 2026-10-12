import { definirCasos } from "@/motor/calculo";
import ganancia from "./ganancia-ocasional";

export default definirCasos(ganancia, [
  {
    nombre: "Premio de lotería de 10 millones",
    origen: { tipo: "recalculado", detalle: "ET art. 317: 20 % de 10.000.000 = 2.000.000." },
    fecha: "2026-10-15",
    entrada: { tipo: "premio", valor: 10000000 },
    esperado: { tarifa: 20, impuesto: 2000000 },
  },
  {
    nombre: "Herencia de 300 millones para un heredero",
    origen: { tipo: "recalculado", detalle: "ET art. 307 num. 3: 3.250 UVT × 52.374 = 170.215.500 exentos. Gravable 129.784.500 × 15 % (art. 314) = 19.467.675." },
    fecha: "2026-10-15",
    entrada: { tipo: "herencia", valor: 300000000 },
    esperado: { exento: 170215500, gravable: 129784500, impuesto: 19467675 },
  },
  {
    nombre: "Donación de 50 millones",
    origen: { tipo: "recalculado", detalle: "ET art. 307 num. 4: 20 % exento (10.000.000), sin pasar 1.625 UVT. Gravable 40.000.000 × 15 % = 6.000.000." },
    fecha: "2026-10-15",
    entrada: { tipo: "donacion", valor: 50000000 },
    esperado: { exento: 10000000, impuesto: 6000000 },
  },
  {
    nombre: "Donación grande: tope de 1.625 UVT",
    origen: { tipo: "recalculado", detalle: "20 % de 1.000.000.000 = 200.000.000, con tope 1.625 × 52.374 = 85.107.750. Gravable 914.892.250 × 15 % = 137.233.837,5." },
    fecha: "2026-10-15",
    entrada: { tipo: "donacion", valor: 1000000000 },
    esperado: { exento: 85107750, impuesto: 137233838 },
  },
  {
    nombre: "Venta de un bien",
    origen: { tipo: "recalculado", detalle: "15 % de una ganancia de 100.000.000 = 15.000.000." },
    fecha: "2026-10-15",
    entrada: { tipo: "venta", valor: 100000000 },
    esperado: { tarifa: 15, impuesto: 15000000 },
  },
]);
