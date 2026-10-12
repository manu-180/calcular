import { definirCasos } from "@/motor/calculo";
import impuestoALaTransferencia from "./impuesto-a-la-transferencia";

const L843 = "https://www.impuestos.gob.bo/wp-content/uploads/2026/09/1.-LEY-N%C2%B0-843-08-26.pdf" as const;

export default definirCasos(impuestoALaTransferencia, [
  {
    nombre: "Precio mayor que la base municipal",
    origen: { tipo: "recalculado", url: L843, detalle: "D.S. 24054 arts. 6 y 7: el mayor entre precio (500.000) y base del impuesto a la propiedad (420.000); 3 % = 15.000." },
    fecha: "2026-10-12",
    entrada: { precio: 500000, baseImponible: 420000 },
    esperado: { base: 500000, impuesto: 15000 },
  },
  {
    nombre: "Base municipal mayor que el precio",
    origen: { tipo: "recalculado", url: L843, detalle: "Precio 300.000 y base 350.000: se usa 350.000. 3 % = 10.500." },
    fecha: "2026-10-12",
    entrada: { precio: 300000, baseImponible: 350000 },
    esperado: { base: 350000, impuesto: 10500 },
  },
  {
    nombre: "Venta de un auto sin dato de base",
    origen: { tipo: "recalculado", detalle: "Solo el precio: 80.000 × 3 % = 2.400." },
    fecha: "2026-10-12",
    entrada: { precio: 80000, baseImponible: null },
    esperado: { base: 80000, impuesto: 2400 },
  },
]);
