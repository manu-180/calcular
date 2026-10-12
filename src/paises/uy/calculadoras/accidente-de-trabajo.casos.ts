import { definirCasos } from "@/motor/calculo";
import accidenteDeTrabajo from "./accidente-de-trabajo";

export default definirCasos(accidenteDeTrabajo, [
  {
    nombre: "Mensual de $ 45.000 con 10 días de ausencia",
    origen: {
      tipo: "recalculado",
      url: "https://www.impo.com.uy/bases/leyes/16074-1989/19",
      detalle: "Ley 16.074, art. 19: 2/3 del jornal desde el cuarto día. Jornal 1.500; BSE 1.000 por día × 7 = 7.000. El BPS completa hasta el 70 % (1.050): 50 × 7 = 350. Total 7.350.",
    },
    fecha: "2026-10-12",
    entrada: { modalidad: "mensual", monto: 45000, dias: 10 },
    esperado: { diasPagos: 7, diarioBse: 1000, bse: 7000, complementoBps: 350, total: 7350 },
  },
  {
    nombre: "Jornalero con 3 días: no se cobra",
    origen: { tipo: "recalculado", detalle: "Se cobra desde el cuarto día: con 3 días, 0." },
    fecha: "2026-10-12",
    entrada: { modalidad: "jornal", monto: 2100, dias: 3 },
    esperado: { diasPagos: 0, total: 0 },
  },
  {
    nombre: "Jornalero de $ 2.100 con 30 días",
    origen: { tipo: "recalculado", detalle: "2/3 de 2.100 = 1.400 × 27 = 37.800. Complemento (1.470 − 1.400) × 27 = 1.890. Total 39.690." },
    fecha: "2026-10-12",
    entrada: { modalidad: "jornal", monto: 2100, dias: 30 },
    esperado: { bse: 37800, complementoBps: 1890, total: 39690 },
  },
]);
