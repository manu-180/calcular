import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

const SDL = "https://www.cpf.gov.sg/service/article/how-do-i-calculate-and-pay-the-skills-development-levy-sdl";

export default definirCasos(calculadora, [
  {
    nombre: "$4,000 citizen aged 30",
    origen: { tipo: "recalculado", url: SDL, detalle: "Employer CPF: total 37% × 4,000 = 1,480, employee 800, employer 680. SDL 0.25% × 4,000 = 10. Total 4,690." },
    fecha: "2026-10-15",
    entrada: { salario: 4000, residencia: "ciudadano-pr", edad: "55-y-menos" },
    esperado: { mensual: 4690, cpf: 680, sdl: 10 },
  },
  {
    nombre: "$6,000 foreigner: SDL at the maximum",
    origen: { tipo: "oficial", url: SDL, detalle: "Maximum $11.25 for employees earning more than $4,500. No CPF. Total 6,011.25." },
    fecha: "2026-10-15",
    entrada: { salario: 6000, residencia: "extranjero", edad: "55-y-menos" },
    esperado: { mensual: 6011.25, cpf: 0, sdl: 11.25 },
  },
  {
    nombre: "$700 part-timer: SDL at the minimum",
    origen: { tipo: "oficial", url: SDL, detalle: "Minimum $2 for employees earning less than $800. Employer CPF 17% × 700 + 0.6 × 200 = 239 total, employee 120, employer 119." },
    fecha: "2026-10-15",
    entrada: { salario: 700, residencia: "ciudadano-pr", edad: "55-y-menos" },
    esperado: { sdl: 2, cpf: 119, mensual: 821 },
  },
]);
