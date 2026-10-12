import { definirCasos } from "@/motor/calculo";
import propinaLegal from "./propina-legal";

export default definirCasos(propinaLegal, [
  {
    nombre: "Consumo de RD$1,000",
    origen: { tipo: "recalculado", detalle: "ITBIS 18 % = 180. Propina legal 10 % (art. 228) = 100. Total 1,280." },
    fecha: "2026-10-12",
    entrada: { modo: "consumo", monto: 1000 },
    esperado: { consumo: 1000, itbis: 180, propina: 100, total: 1280 },
  },
  {
    nombre: "Cuenta total de RD$2,560",
    origen: { tipo: "recalculado", detalle: "2,560 ÷ 1.28 = 2,000 de consumo. ITBIS 360, propina 200." },
    fecha: "2026-10-12",
    entrada: { modo: "total", monto: 2560 },
    esperado: { consumo: 2000, itbis: 360, propina: 200, total: 2560 },
  },
]);
