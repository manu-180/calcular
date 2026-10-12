import { definirCasos } from "@/motor/calculo";
import gmf from "./4x1000";

export default definirCasos(gmf, [
  {
    nombre: "Transferencia de un millón sin exención",
    origen: { tipo: "recalculado", detalle: "ET art. 872: 4 por mil de 1.000.000 = 4.000." },
    fecha: "2026-10-15",
    entrada: { monto: 1000000, marcada: false, usado: 0 },
    esperado: { gravado: 1000000, gmf: 4000, total: 1004000 },
  },
  {
    nombre: "Retiro de 22 millones en la cuenta marcada",
    origen: { tipo: "recalculado", detalle: "ET art. 879: 350 UVT × 52.374 = 18.330.900 exentos. Gravado 3.669.100 × 0,4 % = 14.676." },
    fecha: "2026-10-15",
    entrada: { monto: 22000000, marcada: true, usado: 0 },
    esperado: { exencionMes: 18330900, exento: 18330900, gravado: 3669100, gmf: 14676 },
  },
  {
    nombre: "Exención casi agotada en el mes",
    origen: { tipo: "recalculado", detalle: "Quedan 330.900 exentos; gravado 669.100 × 0,4 % = 2.676." },
    fecha: "2026-10-15",
    entrada: { monto: 1000000, marcada: true, usado: 18000000 },
    esperado: { exento: 330900, gravado: 669100, gmf: 2676 },
  },
  {
    nombre: "Exención de 2025",
    origen: { tipo: "recalculado", detalle: "UVT 2025: 350 × 49.799 = 17.429.650." },
    fecha: "2025-06-15",
    entrada: { monto: 1000000, marcada: true, usado: 0 },
    esperado: { exencionMes: 17429650, gmf: 0 },
  },
]);
