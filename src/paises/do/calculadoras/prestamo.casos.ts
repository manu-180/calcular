import { definirCasos } from "@/motor/calculo";
import prestamo from "./prestamo";

export default definirCasos(prestamo, [
  {
    nombre: "RD$500,000 al 18 % anual a 36 meses",
    origen: { tipo: "recalculado", detalle: "Tasa mensual 1.5 %. Cuota = 500,000 × 0.015 ÷ (1 − 1.015^−36) = 18,076.20. Total 650,743.12; intereses 150,743.12." },
    fecha: "2026-10-12",
    entrada: { monto: 500000, tasa: 18, meses: 36 },
    esperado: { cuota: 18076.2, total: 650743.12, intereses: 150743.12 },
  },
  {
    nombre: "RD$1,000,000 al 12 % a 60 meses",
    origen: { tipo: "recalculado", detalle: "Tasa mensual 1 %. Cuota = 1,000,000 × 0.01 ÷ (1 − 1.01^−60) = 22,244.45." },
    fecha: "2026-10-12",
    entrada: { monto: 1000000, tasa: 12, meses: 60 },
    esperado: { cuota: 22244.45, total: 1334666.86 },
  },
  {
    nombre: "Sin interés",
    origen: { tipo: "recalculado", detalle: "120,000 ÷ 12 = 10,000." },
    fecha: "2026-10-12",
    entrada: { monto: 120000, tasa: 0, meses: 12 },
    esperado: { cuota: 10000, intereses: 0 },
  },
]);
