import { definirCasos } from "@/motor/calculo";
import subsidioEnfermedad from "./subsidio-enfermedad";

export default definirCasos(subsidioEnfermedad, [
  {
    nombre: "Atención ambulatoria con RD$30,000",
    origen: { tipo: "recalculado", detalle: "DIDA (ABC 4): 60 % del salario promedio cotizable. 30,000 × 60 % = 18,000 por mes." },
    fecha: "2026-10-12",
    entrada: { salario: 30000, atencion: "ambulatoria" },
    esperado: { tasa: 60, base: 30000, mensual: 18000 },
  },
  {
    nombre: "Hospitalización con RD$30,000",
    origen: { tipo: "recalculado", detalle: "40 % de 30,000 = 12,000." },
    fecha: "2026-10-12",
    entrada: { salario: 30000, atencion: "hospitalaria" },
    esperado: { tasa: 40, mensual: 12000 },
  },
  {
    nombre: "Salario sobre el tope del SFS",
    origen: { tipo: "recalculado", detalle: "El salario cotizable del SFS llega hasta 232,230. 60 % = 139,338." },
    fecha: "2026-10-12",
    entrada: { salario: 300000, atencion: "ambulatoria" },
    esperado: { base: 232230, mensual: 139338 },
  },
]);
