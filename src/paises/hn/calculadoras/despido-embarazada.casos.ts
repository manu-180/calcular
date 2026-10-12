import { definirCasos } from "@/motor/calculo";
import despidoEmbarazada from "./despido-embarazada";

export default definirCasos(despidoEmbarazada, [
  {
    nombre: "Despido durante el embarazo, sin descanso tomado",
    origen: { tipo: "recalculado", detalle: "CT art. 144: 60 días de salario más las 10 semanas de descanso no tomadas. 12000 / 30 = 400; 400 × 60 = 24000; 400 × 70 = 28000. Total 52000." },
    fecha: "2026-10-12",
    entrada: { salario: 12000, tomoDescanso: false },
    esperado: { indemnizacion: 24000, diasDescanso: 70, descanso: 28000, total: 52000 },
  },
  {
    nombre: "Despido después del parto, con el descanso ya tomado",
    origen: { tipo: "recalculado", detalle: "Art. 144: solo los 60 días de salario. 400 × 60 = 24000." },
    fecha: "2026-10-12",
    entrada: { salario: 12000, tomoDescanso: true },
    esperado: { indemnizacion: 24000, descanso: 0, total: 24000 },
  },
]);
