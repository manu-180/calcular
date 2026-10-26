import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

const DP = "https://www.maptss.gov.ao/wp-content/uploads/2024/09/DECRETO-PRESIDENCIAL-152_24-FIXA-O-NOVO-SALARIO-MINIMO-NACIONAL.pdf";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Salário mínimo nacional em 2026",
    origen: { tipo: "recalculado", url: DP, detalle: "Artigo 1.º, n.º 2: 100 000 Kz desde 15/9/2025. Hora = 100 000 × 12 / (52 × 44) = 524,48. INSS 3 % = 3 000." },
    fecha: "2026-10-24",
    entrada: { empresa: "geral" },
    esperado: { mensal: 100000, hora: 524.48, inss: 3000, liquido: 97000 },
  },
  {
    nombre: "Micro-empresas e startups",
    origen: { tipo: "recalculado", url: DP, detalle: "Artigo 1.º, n.º 3: 50 000 Kz. Hora = 600 000 / 2 288 = 262,24." },
    fecha: "2026-10-24",
    entrada: { empresa: "micro" },
    esperado: { mensal: 50000, hora: 262.24 },
  },
  {
    nombre: "Véspera do aumento para 100 000 Kz",
    origen: { tipo: "recalculado", url: DP, detalle: "Até 14/9/2025 vale o n.º 1: 70 000 Kz." },
    fecha: "2025-09-14",
    entrada: { empresa: "geral" },
    valores: { "ao.salario-minimo": 70000, "ao.salario-minimo-micro": 50000, "ao.inss-trabalhador": 3, "ao.horas-semanais": 44, "ao.semanas-ano": 52 },
    esperado: { mensal: 70000 },
  },
]);
