import { definirCasos } from "@/motor/calculo";
import calculadora from "./retrenchment-benefit";

const MOM = "https://www.mom.gov.sg/employment-practices/retrenchment/responsible-retrenchment";

export default definirCasos(calculadora, [
  {
    nombre: "$5,000 a month, 6 years",
    origen: { tipo: "recalculado", url: MOM, detalle: "Norm: 2 weeks to 1 month per year. Weekly 5,000 × 12 / 52 = 1,153.85. Low 1,153.85 × 2 × 6 = 13,846.20. High 5,000 × 6 = 30,000." },
    fecha: "2026-10-14",
    entrada: { salario: 5000, anios: 6 },
    esperado: { bajo: 13846.2, alto: 30000, semanal: 1153.85 },
  },
  {
    nombre: "Exactly 2 years",
    origen: { tipo: "recalculado", url: MOM, detalle: "Eligible from 2 years. Weekly 3,000 × 12 / 52 = 692.31. Low 692.31 × 4 = 2,769.24. High 6,000." },
    fecha: "2026-10-14",
    entrada: { salario: 3000, anios: 2 },
    esperado: { bajo: 2769.24, alto: 6000 },
  },
  {
    nombre: "Less than 2 years",
    origen: { tipo: "oficial", url: MOM, detalle: "Employees with at least 2 years of service are eligible." },
    fecha: "2026-10-14",
    entrada: { salario: 5000, anios: 1.5 },
    esperado: { bajo: 0, alto: 0 },
  },
]);
