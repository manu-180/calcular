import { definirCasos } from "@/motor/calculo";
import septimoDia from "./septimo-dia";

export default definirCasos(septimoDia, [
  {
    nombre: "Dos domingos trabajados con C$9,000 al mes",
    origen: { tipo: "recalculado", detalle: "Código del Trabajo art. 62 y 65: 100 % más. 9000 / 30 = 300 diarios. 300 + 100 % = 600 por día. 600 × 2 = 1200." },
    fecha: "2026-10-12",
    entrada: { salario: 9000, dias: 2 },
    esperado: { diario: 300, porDia: 600, total: 1200 },
  },
  {
    nombre: "Un día de descanso con el salario mínimo de la industria",
    origen: { tipo: "recalculado", detalle: "8320.48 / 30 = 277.35. 277.35 × 2 = 554.70." },
    fecha: "2026-10-12",
    entrada: { salario: 8320.48, dias: 1 },
    esperado: { diario: 277.35, porDia: 554.7, total: 554.7 },
  },
]);
