import { definirCasos } from "@/motor/calculo";
import costoPatronal from "./costo-patronal";

export default definirCasos(costoPatronal, [
  {
    nombre: "Salario mínimo con bonificación y reserva de indemnización",
    origen: {
      tipo: "recalculado",
      detalle:
        "4002.28 + 250 + IGSS 10.67 % 427.04 + IRTRA 40.02 + INTECAP 40.02 + aguinaldo /12 333.52 + Bono 14 /12 333.52 + vacaciones 4002.28/30 × 15 /12 = 166.76 + indemnización 4002.28 × 14/12 /12 = 389.11. Total 5982.27, 49.47 % sobre el salario.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 4002.28, bonificacion: true, reservaIndemnizacion: true },
    esperado: { cuotaIgss: 427.04, aguinaldo: 333.52, vacaciones: 166.76, indemnizacion: 389.11, total: 5982.27, recargo: 49.47 },
  },
  {
    nombre: "Sin bonificación ni reserva de indemnización",
    origen: { tipo: "recalculado", detalle: "10000 + 1067 + 100 + 100 + 833.33 + 833.33 + 416.67 = 13350.33; 33.5 %." },
    fecha: "2026-10-12",
    entrada: { salario: 10000, bonificacion: false, reservaIndemnizacion: false },
    esperado: { bonificacion: 0, indemnizacion: 0, total: 13350.33, recargo: 33.5 },
  },
]);
