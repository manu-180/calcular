import { definirCasos } from "@/motor/calculo";
import impuestoVehicular from "./impuesto-vehicular";

export default definirCasos(impuestoVehicular, [
  {
    nombre: "Auto con avalúo de 15.000",
    origen: {
      tipo: "oficial",
      url: "https://www.sri.gob.ec/impuestos-vehiculares",
      detalle: "Tabla del SRI: de 12.001 a 16.000, 140 sobre la fracción básica + 3 % del excedente. 140 + 3.000 × 3 % = 230.",
    },
    fecha: "2026-10-07",
    entrada: { avaluo: 15000, compraUsado: false, precio: 0 },
    esperado: { propiedad: 230, compra: 0, total: 230 },
  },
  {
    nombre: "Último tramo: avalúo de 30.000",
    origen: { tipo: "recalculado", detalle: "Desde 24.001: 620 + (30.000 − 24.000) × 6 % = 980." },
    fecha: "2026-10-07",
    entrada: { avaluo: 30000, compraUsado: false, precio: 0 },
    esperado: { propiedad: 980 },
  },
  {
    nombre: "Primer tramo: avalúo de 3.000",
    origen: { tipo: "recalculado", detalle: "Hasta 4.000: 0,5 % × 3.000 = 15." },
    fecha: "2026-10-07",
    entrada: { avaluo: 3000, compraUsado: false, precio: 0 },
    esperado: { propiedad: 15 },
  },
  {
    nombre: "Compra de usado con precio menor al avalúo",
    origen: { tipo: "recalculado", detalle: "1 % sobre el mayor entre precio (14.000) y avalúo (15.000) = 150. Más 230 de propiedad = 380." },
    fecha: "2026-10-07",
    entrada: { avaluo: 15000, compraUsado: true, precio: 14000 },
    esperado: { propiedad: 230, compra: 150, total: 380 },
  },
]);
