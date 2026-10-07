import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "Salario mínimo de comercio, año completo",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF",
      detalle: "Art. 177: 15 días más 30 %. 408,80 / 30 × 15 = 204,40; 30 % = 61,32; total 265,72.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 408.8, periodo: "completas", diasTrabajados: null },
    esperado: { dias: 15, salarioVacaciones: 204.4, recargo: 61.32, total: 265.72 },
  },
  {
    nombre: "Año completo con $600",
    origen: { tipo: "recalculado", detalle: "20 × 15 = 300; 30 % = 90; total 390." },
    fecha: "2026-10-07",
    entrada: { salario: 600, periodo: "completas", diasTrabajados: null },
    esperado: { salarioVacaciones: 300, recargo: 90, total: 390 },
  },
  {
    nombre: "Proporcionales de 182 días",
    origen: { tipo: "recalculado", detalle: "Art. 187. 15 × 182 / 365 = 7,4795 días × 20 = 149,59; 30 % = 44,88; total 194,47." },
    fecha: "2026-10-07",
    entrada: { salario: 600, periodo: "proporcionales", diasTrabajados: 182 },
    esperado: { dias: 7.48, salarioVacaciones: 149.59, recargo: 44.88, total: 194.47 },
  },
  {
    nombre: "Proporcionales sin días",
    origen: { tipo: "recalculado", detalle: "Sin los días no se puede calcular: tiene que dar error." },
    fecha: "2026-10-07",
    entrada: { salario: 600, periodo: "proporcionales", diasTrabajados: null },
    esperaError: true,
  },
]);
