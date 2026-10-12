import { definirCasos } from "@/motor/calculo";
import interesesPorMoraLaboral from "./intereses-por-mora-laboral";

export default definirCasos(interesesPorMoraLaboral, [
  {
    nombre: "B/. 1,000 con 273 días de atraso",
    origen: { tipo: "recalculado", detalle: "Art. 169: 10% anual. 1,000 × 10% × 273 ÷ 365 = 74.79." },
    fecha: "2026-10-12",
    entrada: { monto: 1000, desde: "2026-01-12", hasta: "2026-10-12", sentenciaSalarios: false },
    esperado: { dias: 273, intereses: 74.79, recargo: 0, total: 1074.79 },
  },
  {
    nombre: "Salarios de una sentencia, un año de atraso",
    origen: { tipo: "recalculado", detalle: "Intereses 2,000 × 10% = 200. Recargo del art. 170: 10% = 200. Total 2,400." },
    fecha: "2026-10-12",
    entrada: { monto: 2000, desde: "2025-10-12", hasta: "2026-10-12", sentenciaSalarios: true },
    esperado: { dias: 365, intereses: 200, recargo: 200, total: 2400 },
  },
  {
    nombre: "Fecha de pago anterior a la deuda",
    origen: { tipo: "recalculado", detalle: "No puede haber mora negativa." },
    fecha: "2026-10-12",
    entrada: { monto: 1000, desde: "2026-10-12", hasta: "2026-10-01", sentenciaSalarios: false },
    esperaError: true,
  },
]);
