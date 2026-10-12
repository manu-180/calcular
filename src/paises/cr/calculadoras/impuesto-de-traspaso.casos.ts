import { definirCasos } from "@/motor/calculo";
import impuestoDeTraspaso from "./impuesto-de-traspaso";

export default definirCasos(impuestoDeTraspaso, [
  {
    nombre: "Casa de ₡80.000.000",
    origen: { tipo: "recalculado", detalle: "Ley 6999, art. 8: 1,5 % de 80.000.000 = 1.200.000. Art. 6: por partes iguales, 600.000 cada uno." },
    fecha: "2026-10-12",
    entrada: { precio: 80000000, valorRegistrado: null },
    esperado: { impuesto: 1200000, vendedor: 600000, comprador: 600000 },
  },
  {
    nombre: "Precio menor que el valor registrado",
    origen: { tipo: "recalculado", detalle: "Art. 7: nunca menos que el valor registrado. Base 50.000.000 × 1,5 % = 750.000." },
    fecha: "2026-10-12",
    entrada: { precio: 40000000, valorRegistrado: 50000000 },
    esperado: { base: 50000000, impuesto: 750000 },
  },
]);
