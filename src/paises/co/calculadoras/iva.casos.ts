import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

export default definirCasos(iva, [
  {
    nombre: "Sumar IVA general",
    origen: { tipo: "recalculado", detalle: "ET art. 468: 100.000 × 19 % = 19.000; total 119.000." },
    fecha: "2026-10-15",
    entrada: { operacion: "agregar", monto: 100000, tarifa: "general" },
    esperado: { tasa: 19, base: 100000, iva: 19000, total: 119000 },
  },
  {
    nombre: "Sacar IVA general de un precio final",
    origen: { tipo: "recalculado", detalle: "119.000 / 1,19 = 100.000; IVA 19.000." },
    fecha: "2026-10-15",
    entrada: { operacion: "quitar", monto: 119000, tarifa: "general" },
    esperado: { base: 100000, iva: 19000, total: 119000 },
  },
  {
    nombre: "Tarifa reducida",
    origen: { tipo: "recalculado", detalle: "ET art. 468-1: 50.000 × 5 % = 2.500." },
    fecha: "2026-10-15",
    entrada: { operacion: "agregar", monto: 50000, tarifa: "reducida" },
    esperado: { tasa: 5, iva: 2500, total: 52500 },
  },
]);
