import { definirCasos } from "@/motor/calculo";
import retencionHonorarios from "./retencion-honorarios";

export default definirCasos(retencionHonorarios, [
  {
    nombre: "Honorarios de L10,000 sin ISV",
    origen: { tipo: "recalculado", detalle: "Ley del ISR, art. 50: retención del 12.5 %. 10000 × 12.5 % = 1250; recibe 8750." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, modo: "bruto", conIsv: false },
    esperado: { tasa: 12.5, honorarios: 10000, retencion: 1250, factura: 10000, recibe: 8750 },
  },
  {
    nombre: "Honorarios de L10,000 con ISV",
    origen: { tipo: "recalculado", detalle: "ISV 15 % sobre los honorarios: 1500. Factura 11500; la retención se calcula sobre los honorarios: 1250. Recibe 10250." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, modo: "bruto", conIsv: true },
    esperado: { isv: 1500, factura: 11500, retencion: 1250, recibe: 10250 },
  },
  {
    nombre: "Quiere recibir L8,750 limpios",
    origen: { tipo: "recalculado", detalle: "8750 / (1 − 0.125) = 10000 de honorarios; retención 1250." },
    fecha: "2026-10-12",
    entrada: { monto: 8750, modo: "neto", conIsv: false },
    esperado: { honorarios: 10000, retencion: 1250, recibe: 8750 },
  },
]);
