import { definirCasos } from "@/motor/calculo";
import reservaLaboral from "./reserva-laboral";

export default definirCasos(reservaLaboral, [
  {
    nombre: "Salario de L15,000 durante un año",
    origen: { tipo: "recalculado", detalle: "Decreto 47-2024 art. 4: 4 % mensual del salario ordinario. 15000 × 4 % = 600; × 12 = 7200." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, meses: 12 },
    esperado: { base: 15000, mensual: 600, acumulado: 7200 },
  },
  {
    nombre: "Salario sobre el techo de tres salarios mínimos",
    origen: {
      tipo: "recalculado",
      detalle: "Techo: 3 × 19298.72 (el mínimo más alto de 2026, servicios financieros de 151 o más) = 57896.16. 57896.16 × 4 % = 2315.85.",
      url: "https://tsc.gob.hn/web/leyes/Acuerdo-SETRASS-233-2026.pdf",
    },
    fecha: "2026-10-12",
    entrada: { salario: 80000, meses: 1 },
    esperado: { techo: 57896.16, base: 57896.16, mensual: 2315.85, acumulado: 2315.85 },
  },
]);
