import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.take-home-pay",
  h1: "Take-home pay calculator for Singapore",
  title: "Take-home pay calculator Singapore {{anio}} (after CPF)",
  description: "See your monthly take-home pay after CPF, with the {{anio}} rates by age and the {{sg.cpf-tope-ow}} Ordinary Wage ceiling. Also shows your employer's CPF.",
  intro: [
    "Your take-home pay is what lands in your bank account after your CPF contribution comes off your gross salary.",
    "Enter your monthly salary, whether you pay CPF and your age group. You also see how much your employer adds to your CPF on top.",
  ],
  comoSeCalcula: [
    "If you earn more than {{sg.cpf-tramos-salario[pleno]}} a month, your share of CPF is a fixed percentage of your salary that depends on your age: {{sg.cpf-tasa-empleado[55-y-menos]}} if you are 55 or younger.",
    "CPF only applies to the first {{sg.cpf-tope-ow}} of your ordinary wages each month. Anything above that has no CPF.",
    "Between {{sg.cpf-tramos-salario[solo-empleador]}} and {{sg.cpf-tramos-salario[pleno]}} a month, your share is phased in, and above {{sg.cpf-tramos-salario[sin-aporte]}} up to {{sg.cpf-tramos-salario[solo-empleador]}} only your employer pays.",
    "The total CPF is rounded to the nearest dollar and your share is rounded down to the dollar. Your employer pays the difference.",
  ],
  ejemplo: [
    "On $5,000 a month at age 30, you pay $1,000 of CPF and take home $4,000. Your employer adds $850, so $1,850 goes into your CPF accounts.",
  ],
  faq: [
    {
      pregunta: "How much CPF do I pay in 2026?",
      respuesta:
        "From 1 January 2026, employees aged 55 and below pay {{sg.cpf-tasa-empleado[55-y-menos]}} of their wages and employers add {{sg.cpf-tasa-empleador[55-y-menos]}}. Above 55 to 60 it is {{sg.cpf-tasa-empleado[55-60]}} and {{sg.cpf-tasa-empleador[55-60]}}, and the rates keep falling for older workers.",
    },
    {
      pregunta: "What is the CPF Ordinary Wage ceiling?",
      respuesta: "It is {{sg.cpf-tope-ow}} a month from 1 January 2026. CPF is not charged on ordinary wages above it, so the most an employee aged 55 or below pays on them is $1,600 a month.",
    },
    {
      pregunta: "I am a new PR. Why is my CPF lower?",
      respuesta: "In the first and second year of PR status, CPF is paid at lower graduated rates. You and your employer can apply jointly to pay the full rates earlier.",
    },
    {
      pregunta: "Does my take-home pay include income tax?",
      respuesta: "No. This calculator takes off CPF only. Income tax is worked out on your yearly income, which you can estimate with the income tax calculator.",
    },
  ],
  glosario: [
    { termino: "CPF", definicion: "Central Provident Fund, the savings scheme that employees and employers pay into every month." },
    { termino: "Ordinary Wages (OW)", definicion: "Pay for work done in the month, such as your basic salary and fixed allowances." },
    { termino: "Additional Wages (AW)", definicion: "Pay that is not for the month's work, such as bonuses. They have their own CPF ceiling." },
  ],
});
