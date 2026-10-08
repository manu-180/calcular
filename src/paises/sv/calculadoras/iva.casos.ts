import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

export default definirCasos(iva, [
  {
    nombre: "Sumar el 13 % a $100",
    origen: {
      tipo: "recalculado",
      url: "https://www.asamblea.gob.sv/sites/default/files/documents/decretos/C710DA02-4727-485E-B8F4-B9CBF64152A6.pdf",
      detalle: "Art. 54 de la Ley del IVA: 13 %. 100 × 13 % = 13; total 113.",
    },
    fecha: "2026-10-07",
    entrada: { monto: 100, operacion: "sumar" },
    esperado: { base: 100, iva: 13, total: 113 },
  },
  {
    nombre: "Quitar el IVA de $113",
    origen: { tipo: "recalculado", detalle: "113 / 1,13 = 100; IVA 13." },
    fecha: "2026-10-07",
    entrada: { monto: 113, operacion: "quitar" },
    esperado: { base: 100, iva: 13, total: 113 },
  },
  {
    nombre: "Quitar el IVA de $50 con redondeo",
    origen: { tipo: "recalculado", detalle: "50 / 1,13 = 44,2478 → 44,25; IVA 50 − 44,25 = 5,75." },
    fecha: "2026-10-07",
    entrada: { monto: 50, operacion: "quitar" },
    esperado: { base: 44.25, iva: 5.75, total: 50 },
  },
]);
