import { definirCasos } from "@/motor/calculo";
import deboDeclarar from "./debo-declarar-renta";

const vacio = { ingresos: 0, patrimonio: 0, tarjeta: 0, compras: 0, consignaciones: 0, iva: false } as const;

export default definirCasos(deboDeclarar, [
  {
    nombre: "Año 2025 con ingresos de 70 millones",
    origen: { tipo: "recalculado", detalle: "ET art. 592: 1.400 UVT × 49.799 = 69.718.600. 70.000.000 llega al tope: obligado." },
    fecha: "2026-10-15",
    entrada: { ...vacio, anio: "2025", ingresos: 70000000 },
    esperado: { topeIngresos: 69718600, topePatrimonio: 224095500, resultado: "Sí, tienes que declarar renta", motivo: "tus ingresos llegan al tope" },
  },
  {
    nombre: "Año 2025 por debajo de todos los topes",
    origen: { tipo: "recalculado", detalle: "60 millones de ingresos y 200 millones de patrimonio, por debajo de 69.718.600 y 224.095.500." },
    fecha: "2026-10-15",
    entrada: { ...vacio, anio: "2025", ingresos: 60000000, patrimonio: 200000000, compras: 50000000 },
    esperado: { resultado: "No estás obligado a declarar", motivo: null },
  },
  {
    nombre: "Año 2026: patrimonio y consignaciones",
    origen: { tipo: "recalculado", detalle: "UVT 2026 de 52.374: 4.500 UVT = 235.683.000 y 1.400 UVT = 73.323.600." },
    fecha: "2026-10-15",
    entrada: { ...vacio, anio: "2026", patrimonio: 240000000, consignaciones: 80000000 },
    esperado: { topeIngresos: 73323600, topePatrimonio: 235683000, motivo: "tu patrimonio pasa el tope, tus consignaciones pasan el tope" },
  },
  {
    nombre: "Responsable de IVA",
    origen: { tipo: "recalculado", detalle: "ET art. 592 num. 1: quien es responsable de IVA no entra en la excepción." },
    fecha: "2026-10-15",
    entrada: { ...vacio, anio: "2025", iva: true },
    esperado: { resultado: "Sí, tienes que declarar renta" },
  },
]);
