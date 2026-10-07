import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

export default definirCasos(iva, [
  {
    nombre: "Sumar el 15 % a C$1,000",
    origen: { tipo: "recalculado", detalle: "Ley 822 art. 109: alícuota del 15 %. 1000 × 15 % = 150; total 1150." },
    fecha: "2026-10-07",
    entrada: { operacion: "agregar", monto: 1000 },
    esperado: { tasa: 15, sinIva: 1000, iva: 150, total: 1150 },
  },
  {
    nombre: "Sacar el IVA de C$1,150",
    origen: { tipo: "recalculado", detalle: "1150 × 15 / 115 = 150; sin IVA 1000." },
    fecha: "2026-10-07",
    entrada: { operacion: "quitar", monto: 1150 },
    esperado: { sinIva: 1000, iva: 150, total: 1150 },
  },
  {
    nombre: "Precio con IVA que no da redondo",
    origen: { tipo: "recalculado", detalle: "999.99 × 15 / 115 = 130.4335, redondeado 130.43; sin IVA 869.56." },
    fecha: "2026-10-07",
    entrada: { operacion: "quitar", monto: 999.99 },
    esperado: { sinIva: 869.56, iva: 130.43, total: 999.99 },
  },
]);
