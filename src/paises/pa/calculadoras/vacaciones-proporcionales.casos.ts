import { definirCasos } from "@/motor/calculo";
import vacacionesProporcionales from "./vacaciones-proporcionales";

export default definirCasos(vacacionesProporcionales, [
  {
    nombre: "Primer semestre de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 54, ordinal 6: un día por cada once trabajados. Del 1/1 al 30/6/2026 son 181 días: 16.45 días de vacaciones. 1,100 ÷ 30 × 16.4545 = 603.33.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1100, desde: "2026-01-01", hasta: "2026-06-30" },
    esperado: { trabajados: 181, dias: 16.45, pago: 603.33 },
  },
  {
    nombre: "Once días de trabajo",
    origen: { tipo: "recalculado", detalle: "11 días = 1 día de vacaciones = 900 ÷ 30 = 30." },
    fecha: "2026-10-12",
    entrada: { salario: 900, desde: "2026-10-01", hasta: "2026-10-11" },
    esperado: { trabajados: 11, dias: 1, pago: 30 },
  },
]);
