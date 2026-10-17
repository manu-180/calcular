import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.cpf-contribution-calculator",
  h1: "CPF contribution calculator",
  title: "CPF contribution calculator 2026: employee and employer",
  description: "Work out the monthly CPF for an employee: the employee's share, the employer's share and the total, with the 2026 rates and the {{sg.cpf-tope-ow}} wage ceiling.",
  intro: [
    "Every month, employers pay CPF for their Singapore Citizen and PR employees. Part of it is deducted from the employee's pay and the rest is paid by the employer.",
    "Enter the wages for the month and the employee's age group to see both shares, worked out the way the CPF Board's rate table says.",
  ],
  comoSeCalcula: [
    "Above {{sg.cpf-tramos-salario[pleno]}} a month, the total CPF is a percentage of the wages that depends on age. For employees aged 55 and below it is {{sg.cpf-tasa-empleado[55-y-menos]}} from the employee plus {{sg.cpf-tasa-empleador[55-y-menos]}} from the employer.",
    "Ordinary wages above {{sg.cpf-tope-ow}} a month do not attract CPF.",
    "From {{sg.cpf-tramos-salario[solo-empleador]}} to {{sg.cpf-tramos-salario[pleno]}}, the employee's share is phased in. Above {{sg.cpf-tramos-salario[sin-aporte]}} up to {{sg.cpf-tramos-salario[solo-empleador]}}, only the employer pays.",
    "The total is rounded to the nearest dollar, the employee's share is rounded down, and the employer's share is the difference.",
  ],
  ejemplo: [
    "For a 40-year-old earning $4,500, the total CPF is $1,665. The employee pays $900 and the employer pays $765.",
  ],
  faq: [
    {
      pregunta: "What are the CPF rates for older workers in 2026?",
      respuesta:
        "Above 55 to 60, the employee pays {{sg.cpf-tasa-empleado[55-60]}} and the employer {{sg.cpf-tasa-empleador[55-60]}}. Above 60 to 65 it is {{sg.cpf-tasa-empleado[60-65]}} and {{sg.cpf-tasa-empleador[60-65]}}, above 65 to 70 {{sg.cpf-tasa-empleado[65-70]}} and {{sg.cpf-tasa-empleador[65-70]}}, and above 70 {{sg.cpf-tasa-empleado[mas-70]}} and {{sg.cpf-tasa-empleador[mas-70]}}.",
    },
    {
      pregunta: "How is CPF rounded?",
      respuesta: "Work out the total and round it to the nearest dollar (50 cents goes up). Then work out the employee's share and round it down to the dollar. The employer pays the rest.",
    },
    {
      pregunta: "Do these rates apply to new PRs?",
      respuesta: "Only from the third year of PR status, or earlier if the employer and employee apply jointly for full rates. In the first two years, lower graduated rates apply.",
    },
    {
      pregunta: "What about bonuses?",
      respuesta: "Bonuses are Additional Wages and follow their own ceiling. This calculator covers the ordinary wages for the month.",
    },
  ],
  glosario: [
    { termino: "Total wages (TW)", definicion: "Ordinary Wages plus Additional Wages for the calendar month." },
    { termino: "OW ceiling", definicion: "The most ordinary wages a month that attract CPF: {{sg.cpf-tope-ow}} from 1 January 2026." },
  ],
});
