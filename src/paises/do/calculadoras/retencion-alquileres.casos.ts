import { definirCasos } from "@/motor/calculo";
import retencionAlquileres from "./retencion-alquileres";

export default definirCasos(retencionAlquileres, [
  {
    nombre: "Alquiler de RD$25,000",
    origen: { tipo: "recalculado", detalle: "Ley 30-26, art. 17 (art. 309 literal a): 15 %. 25,000 × 15 % = 3,750; el dueño recibe 21,250. En el año: 45,000." },
    fecha: "2026-10-12",
    entrada: { alquiler: 25000 },
    esperado: { tasa: 15, retencion: 3750, neto: 21250, anual: 45000 },
  },
  {
    nombre: "Antes de julio de 2026",
    origen: { tipo: "recalculado", detalle: "Guía de retenciones de la DGII: 10 %. 25,000 × 10 % = 2,500." },
    fecha: "2026-06-15",
    entrada: { alquiler: 25000 },
    esperado: { tasa: 10, retencion: 2500 },
  },
]);
