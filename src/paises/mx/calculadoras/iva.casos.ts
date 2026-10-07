import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

export default definirCasos(iva, [
  {
    nombre: "Agregar el IVA general",
    origen: { tipo: "recalculado", detalle: "1000 × 16 % = 160; total 1160 (LIVA art. 1o)." },
    fecha: "2026-10-15",
    entrada: { monto: 1000, operacion: "agregar", tasa: "general" },
    esperado: { tasa: 16, base: 1000, iva: 160, total: 1160 },
  },
  {
    nombre: "Quitar el IVA general",
    origen: { tipo: "recalculado", detalle: "1160 / 1.16 = 1000; IVA 160." },
    fecha: "2026-10-15",
    entrada: { monto: 1160, operacion: "quitar", tasa: "general" },
    esperado: { base: 1000, iva: 160 },
  },
  {
    nombre: "Frontera norte con estímulo, último día de vigencia",
    origen: { tipo: "recalculado", detalle: "Estímulo del 50 % de la tasa: 8 %. 1080 / 1.08 = 1000; IVA 80." },
    fecha: "2026-12-31",
    entrada: { monto: 1080, operacion: "quitar", tasa: "frontera" },
    esperado: { tasa: 8, base: 1000, iva: 80 },
  },
  {
    nombre: "Redondeo al centavo",
    origen: { tipo: "recalculado", detalle: "99.99 / 1.16 = 86.198 → 86.20; IVA 13.79." },
    fecha: "2026-10-15",
    entrada: { monto: 99.99, operacion: "quitar", tasa: "general" },
    esperado: { base: 86.2, iva: 13.79, total: 99.99 },
  },
]);
