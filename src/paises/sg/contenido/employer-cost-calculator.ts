import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.employer-cost-calculator",
  h1: "Employer cost calculator for Singapore",
  title: "Employer cost calculator Singapore: CPF and SDL",
  description: "Work out what an employee really costs each month in Singapore: wages plus employer CPF at the {{anio}} rates and the {{sg.sdl-tasa}} Skills Development Levy.",
  intro: [
    "Hiring someone costs more than their salary. For Singapore Citizens and PRs you pay employer CPF on top, and for all staff you pay the Skills Development Levy (SDL).",
    "Enter the monthly wages, whether the employee is a citizen, PR or foreigner, and their age group.",
  ],
  comoSeCalcula: [
    "Employer CPF follows the CPF Board's 2026 rate table: {{sg.cpf-tasa-empleador[55-y-menos]}} of wages for employees aged 55 and below, on wages up to {{sg.cpf-tope-ow}} a month.",
    "SDL is {{sg.sdl-tasa}} of monthly wages, at least {{sg.sdl-limites[minimo]}} for wages below {{sg.sdl-limites[salario-minimo]}} and at most {{sg.sdl-limites[maximo]}} for wages above {{sg.sdl-limites[salario-maximo]}}.",
    "The total monthly cost is the wages plus employer CPF plus SDL.",
  ],
  ejemplo: ["A $4,000 employee aged 30 who is a citizen costs $4,690 a month: $680 of employer CPF and $10 of SDL on top."],
  faq: [
    {
      pregunta: "Do I pay CPF for foreign employees?",
      respuesta: "The CPF contribution rate tables apply to Singapore Citizens and PRs. You still pay SDL for foreign employees, directly to the national skills agency.",
    },
    {
      pregunta: "How is SDL rounded?",
      respuesta: "Work out the levy for each employee, add them up and round the total down to the nearest dollar.",
    },
    {
      pregunta: "Does SDL apply to part-time staff?",
      respuesta: "Yes. SDL is payable for all employees working in Singapore, including permanent, part-time, casual and temporary staff.",
    },
  ],
  glosario: [
    { termino: "SDL", definicion: "Skills Development Levy, paid by employers to fund workforce training." },
    { termino: "Employer CPF", definicion: "The employer's share of CPF, paid on top of the employee's wages." },
  ],
});
