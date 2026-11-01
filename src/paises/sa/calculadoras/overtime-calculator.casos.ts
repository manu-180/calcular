import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Diez horas con jornada de ocho",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 107: hora 8.000 / 30 / 8 = 33,33 + 50 % de 6.000 / 30 / 8 = 12,5 -> 45,83 x 10 = 458,33.",
    },
    fecha: "2026-10-24",
    entrada: { basico: 6000, total: 8000, horasDia: 8, horas: 10 },
    esperado: { pago: 458.33, porHora: 45.83, horaTotal: 33.33, recargo: 12.5 },
  },
  {
    nombre: "Ramadán con jornada de seis",
    origen: { tipo: "recalculado", detalle: "8.000 / 180 = 44,44 + 50 % de 33,33 = 16,67 -> 61,11 x 10 = 611,11." },
    fecha: "2026-10-24",
    entrada: { basico: 6000, total: 8000, horasDia: 6, horas: 10 },
    esperado: { pago: 611.11 },
  },
  {
    nombre: "Sueldo total menor que el básico",
    origen: { tipo: "recalculado", detalle: "Total 5.000 < básico 6.000." },
    fecha: "2026-10-24",
    entrada: { basico: 6000, total: 5000, horasDia: 8, horas: 10 },
    esperaError: true,
  },
]);
