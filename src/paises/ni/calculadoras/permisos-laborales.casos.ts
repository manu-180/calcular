import { definirCasos } from "@/motor/calculo";
import permisosLaborales from "./permisos-laborales";

export default definirCasos(permisosLaborales, [
  {
    nombre: "Permiso por matrimonio con C$9,000",
    origen: { tipo: "recalculado", detalle: "Código del Trabajo art. 73: cinco días hábiles con goce de salario. 9000 / 30 = 300 × 5 = 1500." },
    fecha: "2026-10-12",
    entrada: { motivo: "matrimonio", salario: 9000 },
    esperado: { dias: 5, pagoDiario: 300, total: 1500 },
  },
  {
    nombre: "Permiso por fallecimiento",
    origen: { tipo: "recalculado", detalle: "Art. 73: tres días hábiles. 12000 / 30 = 400 × 3 = 1200." },
    fecha: "2026-10-12",
    entrada: { motivo: "fallecimiento", salario: 12000 },
    esperado: { dias: 3, total: 1200 },
  },
  {
    nombre: "Enfermedad grave de un familiar, mínimo garantizado",
    origen: { tipo: "recalculado", detalle: "Art. 74 c: hasta seis días, con al menos el 50 % del salario. 300 × 50 % = 150 × 6 = 900." },
    fecha: "2026-10-12",
    entrada: { motivo: "enfermedad-familiar", salario: 9000 },
    esperado: { dias: 6, pagoDiario: 150, total: 900 },
  },
]);
