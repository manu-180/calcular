import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Sumar el 15 % a 10,000",
    origen: { tipo: "recalculado", detalle: "10,000 × 15 % = 1,500; total 11,500." },
    fecha: "2026-10-24",
    entrada: { operacion: "agregar", monto: 10000, tasaPropia: null },
    esperado: { vat: 1500, total: 11500, neto: 10000, tasa: 15 },
  },
  {
    nombre: "Separar el IVA de 11,500",
    origen: { tipo: "recalculado", detalle: "11,500 / 1.15 = 10,000; IVA 1,500." },
    fecha: "2026-10-24",
    entrada: { operacion: "quitar", monto: 11500, tasaPropia: null },
    esperado: { neto: 10000, vat: 1500, total: 11500 },
  },
  {
    nombre: "Tasa reducida de 7.5 % escrita por la persona",
    origen: { tipo: "recalculado", detalle: "2,000 × 7.5 % = 150; total 2,150." },
    fecha: "2026-10-24",
    entrada: { operacion: "agregar", monto: 2000, tasaPropia: 7.5 },
    esperado: { vat: 150, total: 2150, tasa: 7.5 },
  },
]);
