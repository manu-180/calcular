import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

const LEY = "https://www.boe.es/buscar/act.php?id=BOE-A-1992-28740";

export default definirCasos(iva, [
  {
    nombre: "Añadir el 21 % a 100 euros",
    origen: { tipo: "recalculado", url: LEY, detalle: "100 × 21 % = 21. Total 121." },
    fecha: "2026-10-14",
    entrada: { importe: 100, modo: "sumar", tipo: "general", recargo: false },
    esperado: { base: 100, cuota: 21, total: 121, tasa: 21 },
  },
  {
    nombre: "Quitar el 10 % a 55 euros",
    origen: { tipo: "recalculado", url: LEY, detalle: "55 / 1,10 = 50. IVA 5." },
    fecha: "2026-10-14",
    entrada: { importe: 55, modo: "quitar", tipo: "reducido", recargo: false },
    esperado: { base: 50, cuota: 5, total: 55 },
  },
  {
    nombre: "Superreducido del 4 % con recargo de equivalencia",
    origen: { tipo: "recalculado", url: LEY, detalle: "200 × 4 % = 8; recargo 200 × 0,5 % = 1. Total 209." },
    fecha: "2026-10-14",
    entrada: { importe: 200, modo: "sumar", tipo: "superreducido", recargo: true },
    esperado: { cuota: 8, recargo: 1, total: 209 },
  },
  {
    nombre: "Quitar IVA general y recargo del 5,2 %",
    origen: { tipo: "recalculado", detalle: "126,20 / 1,262 = 100. IVA 21, recargo 5,20." },
    fecha: "2026-10-14",
    entrada: { importe: 126.2, modo: "quitar", tipo: "general", recargo: true },
    esperado: { base: 100, cuota: 21, recargo: 5.2 },
  },
]);
