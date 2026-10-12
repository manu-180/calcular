import { definirCasos } from "@/motor/calculo";
import gastosDeRepresentacion from "./gastos-de-representacion";

export default definirCasos(gastosDeRepresentacion, [
  {
    nombre: "B/. 2,000 al mes",
    origen: { tipo: "recalculado", detalle: "24,000 al año, hasta 25,000: 10% = 2,400 (art. 701, lit. l). 200 por mes." },
    fecha: "2026-10-12",
    entrada: { monto: 2000, periodo: "mensual" },
    esperado: { anual: 24000, impuestoAnual: 2400, impuestoMensual: 200, netoMensual: 1800, tasaEfectiva: 10 },
  },
  {
    nombre: "B/. 36,000 al año",
    origen: { tipo: "recalculado", detalle: "2,500 por los primeros 25,000 más 15% de 11,000 = 1,650. Total 4,150; 345.83 por mes." },
    fecha: "2026-10-12",
    entrada: { monto: 36000, periodo: "anual" },
    esperado: { impuestoAnual: 4150, impuestoMensual: 345.83, tasaEfectiva: 11.53 },
  },
  {
    nombre: "Justo en el límite del primer tramo",
    origen: { tipo: "recalculado", detalle: "25,000 × 10% = 2,500." },
    fecha: "2026-10-12",
    entrada: { monto: 25000, periodo: "anual" },
    esperado: { impuestoAnual: 2500 },
  },
]);
