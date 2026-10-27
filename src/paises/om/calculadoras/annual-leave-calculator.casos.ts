import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Fin de servicio con salario total",
    origen: { tipo: "recalculado", detalle: "550 / 30 = 18,333 por día × 15 = 275." },
    fecha: "2026-10-26",
    entrada: { momento: "end", basico: 400, total: 550, saldo: 15, diasMes: 30 },
    esperado: { pago: 275, diario: 18.333, anual: 30 },
  },
  {
    nombre: "Durante el servicio con salario básico",
    origen: { tipo: "recalculado", detalle: "400 / 30 × 15 = 200." },
    fecha: "2026-10-26",
    entrada: { momento: "during", basico: 400, total: null, saldo: 15, diasMes: 30 },
    esperado: { pago: 200 },
  },
  {
    nombre: "Total menor que el básico",
    origen: { tipo: "recalculado", detalle: "Total 300 < básico 400." },
    fecha: "2026-10-26",
    entrada: { momento: "end", basico: 400, total: 300, saldo: 15, diasMes: 30 },
    esperaError: true,
  },
]);
