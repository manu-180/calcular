import { definirCasos } from "@/motor/calculo";
import honorarios from "./recibo-de-honorarios";

export default definirCasos(honorarios, [
  {
    nombre: "10,000 a una empresa, régimen de actividades profesionales",
    origen: { tipo: "recalculado", detalle: "IVA 16 % = 1600. ISR 10 % (LISR art. 106) = 1000. IVA retenido 2/3 de 1600 (RLIVA art. 3) = 1066.67. Recibe 10000 + 1600 − 1000 − 1066.67 = 9533.33." },
    fecha: "2026-10-15",
    entrada: { honorarios: 10000, regimen: "general", cliente: "moral" },
    esperado: { iva: 1600, subtotal: 11600, retencionIsr: 1000, retencionIva: 1066.67, total: 9533.33 },
  },
  {
    nombre: "10,000 a una empresa en RESICO",
    origen: { tipo: "recalculado", detalle: "ISR 1.25 % (LISR art. 113-J) = 125. IVA retenido 1066.67. Recibe 10408.33." },
    fecha: "2026-10-15",
    entrada: { honorarios: 10000, regimen: "resico", cliente: "moral" },
    esperado: { retencionIsr: 125, retencionIva: 1066.67, total: 10408.33 },
  },
  {
    nombre: "A una persona física: sin retenciones",
    origen: { tipo: "recalculado", detalle: "Solo personas morales retienen. 10000 + 1600 = 11600." },
    fecha: "2026-10-15",
    entrada: { honorarios: 10000, regimen: "general", cliente: "fisica" },
    esperado: { retencionIsr: 0, retencionIva: 0, total: 11600 },
  },
]);
