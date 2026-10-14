import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.self-employment-tax",
  h1: "Self-employment tax calculator",
  title: "Self-Employment Tax Calculator 2026 (Schedule SE)",
  description:
    "Figure your 2026 self-employment tax for Social Security and Medicare, the deduction for half of it and what to set aside each quarter. For 1099 workers.",
  intro: [
    "If you freelance, drive for an app or run a sole proprietorship, you pay both halves of Social Security and Medicare yourself. That is the self-employment tax.",
    "Enter your net profit to see the tax, the deduction you get for half of it and a quarterly amount to set aside.",
  ],
  comoSeCalcula: [
    "Only {{us.se-earnings-factor}} of your net profit is taxed. If that amount is under {{us.se-minimum}}, you owe nothing.",
    "Social Security takes twice {{us.social-security-rate}} on net earnings up to {{us.social-security-wage-base}}, minus any W-2 wages you already earned this year.",
    "Medicare takes twice {{us.medicare-rate}} on all net earnings. Above {{us.additional-medicare-threshold[single]}} ({{us.additional-medicare-threshold[mfj]}} on a joint return), the Additional Medicare Tax of {{us.additional-medicare-rate}} applies too.",
    "Half of the self-employment tax is a deduction from your income for income tax purposes.",
  ],
  ejemplo: ["With $50,000 of profit, $46,175 is taxed. Self-employment tax is $7,064.78 and you deduct $3,532.39 when you figure your income tax."],
  faq: [
    {
      pregunta: "What is the self-employment tax rate?",
      respuesta: "15.3% on net earnings: 12.4% for Social Security up to the wage base and 2.9% for Medicare with no limit.",
    },
    {
      pregunta: "Why is only part of my profit taxed?",
      respuesta: "An employee's FICA isn't charged on the employer's half. The {{us.se-earnings-factor}} factor gives you the same break.",
    },
    {
      pregunta: "Do I have to pay it every quarter?",
      respuesta:
        "Usually yes. When you have no paycheck withholding to cover it, the IRS expects estimated payments in April, June, September and January. Our quarterly estimated tax calculator shows the safe amount.",
    },
  ],
  glosario: [
    { termino: "Net earnings from self-employment", definicion: "Your net profit multiplied by {{us.se-earnings-factor}}." },
    { termino: "Schedule SE", definicion: "The IRS form where you figure this tax. It goes with your Form 1040." },
  ],
});
