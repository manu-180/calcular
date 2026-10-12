import { definirCasos } from "@/motor/calculo";
import licenciasLaborales from "./licencias-laborales";

export default definirCasos(licenciasLaborales, [
  {
    nombre: "Licencia por matrimonio",
    origen: { tipo: "recalculado", detalle: "Art. 54: 5 días. Diario 30,000 ÷ 23.83 = 1,258.92 × 5 = 6,294.60." },
    fecha: "2026-10-12",
    entrada: { motivo: "matrimonio", salario: 30000 },
    esperado: { dias: 5, diario: 1258.92, pago: 6294.6 },
  },
  {
    nombre: "Licencia por nacimiento (paternidad)",
    origen: { tipo: "recalculado", detalle: "Art. 54: 2 días. 1,258.92 × 2 = 2,517.84." },
    fecha: "2026-10-12",
    entrada: { motivo: "nacimiento", salario: 30000 },
    esperado: { dias: 2, pago: 2517.84 },
  },
  {
    nombre: "Licencia por fallecimiento",
    origen: { tipo: "recalculado", detalle: "Art. 54: 3 días. 1,258.92 × 3 = 3,776.76." },
    fecha: "2026-10-12",
    entrada: { motivo: "fallecimiento", salario: 30000 },
    esperado: { dias: 3, pago: 3776.76 },
  },
]);
