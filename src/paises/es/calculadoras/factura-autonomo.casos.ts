import { definirCasos } from "@/motor/calculo";
import factura from "./factura-autonomo";

const LIRPF = "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764";

export default definirCasos(factura, [
  {
    nombre: "Factura de 1.000 euros con IVA general y retención del 15 %",
    origen: { tipo: "recalculado", url: LIRPF, detalle: "IVA 210, retención 150. Total 1.000 + 210 − 150 = 1.060." },
    fecha: "2026-10-14",
    entrada: { base: 1000, tipoIva: "general", retencion: "general" },
    esperado: { iva: 210, retencion: 150, total: 1060, tuyo: 850 },
  },
  {
    nombre: "Nuevo autónomo con retención del 7 %",
    origen: { tipo: "recalculado", url: LIRPF, detalle: "IVA 210, retención 70. Total 1.140." },
    fecha: "2026-10-14",
    entrada: { base: 1000, tipoIva: "general", retencion: "inicio" },
    esperado: { retencion: 70, total: 1140 },
  },
  {
    nombre: "Sin retención",
    origen: { tipo: "recalculado", detalle: "500 + 21 % = 605." },
    fecha: "2026-10-14",
    entrada: { base: 500, tipoIva: "general", retencion: "ninguna" },
    esperado: { retencion: 0, total: 605 },
  },
]);
