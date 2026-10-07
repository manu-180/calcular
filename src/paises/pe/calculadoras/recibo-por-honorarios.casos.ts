import { definirCasos } from "@/motor/calculo";
import recibo from "./recibo-por-honorarios";

export default definirCasos(recibo, [
  {
    nombre: "Ejemplo de SUNAT: recibo de S/ 5,000",
    origen: {
      tipo: "oficial",
      url: "https://orientacion.sunat.gob.pe/3064-02-calculo-del-impuesto-por-rentas-de-cuarta-categoria",
      detalle: "SUNAT: recibo de S/ 5,000 a una empresa agente de retención, retención del 8 % = 400.",
    },
    fecha: "2026-10-07",
    entrada: { monto: 5000, suspension: false, actividad: "general", ingresosAnuales: null },
    esperado: { retencion: 400, neto: 4600, topeAnual: 48125 },
  },
  {
    nombre: "Recibo de S/ 1,500 justo: no se retiene",
    origen: { tipo: "recalculado", detalle: "No hay retención si el recibo no excede S/ 1,500." },
    fecha: "2026-10-07",
    entrada: { monto: 1500, suspension: false, actividad: "general", ingresosAnuales: null },
    esperado: { retencion: 0, neto: 1500 },
  },
  {
    nombre: "Un centavo por encima del mínimo",
    origen: { tipo: "recalculado", detalle: "1,500.01 × 8 % = 120.0008 → 120.00." },
    fecha: "2026-10-07",
    entrada: { monto: 1500.01, suspension: false, actividad: "general", ingresosAnuales: null },
    esperado: { retencion: 120, neto: 1380.01 },
  },
  {
    nombre: "Con suspensión aprobada",
    origen: { tipo: "recalculado", detalle: "Con constancia de suspensión no se retiene." },
    fecha: "2026-10-07",
    entrada: { monto: 3000, suspension: true, actividad: "general", ingresosAnuales: null },
    esperado: { retencion: 0, neto: 3000 },
  },
  {
    nombre: "Director: tope anual de S/ 38,500",
    origen: { tipo: "recalculado", detalle: "RS 000390-2025/SUNAT, art. 3, literal d." },
    fecha: "2026-10-07",
    entrada: { monto: 2000, suspension: false, actividad: "directores", ingresosAnuales: 30000 },
    esperado: { retencion: 160, topeAnual: 38500 },
  },
]);
