import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.bonus-tax-calculator",
  h1: "Bonus tax calculator Sri Lanka",
  title: "Bonus tax calculator Sri Lanka: APIT on lump-sum payments",
  description:
    "See how much APIT comes off your bonus under IRD Tax Table No. 02 for 2025/26, and what reaches your account.",
  intro: [
    "A bonus is taxed differently from your monthly salary. Your employer uses Tax Table No. 02, which looks at everything you earn in the year, bonus included.",
    "Enter your monthly salary and the bonus to see the APIT on it.",
  ],
  comoSeCalcula: [
    "Your employer adds up the salary for the 12 months of the year of assessment and every lump-sum payment. The IRD calls this the estimated gross aggregate remuneration.",
    "The tax for the year on that total is worked out with the personal relief of {{lk.personal-relief}} and the normal rates, from {{lk.income-tax-bands[0].tasa}} to {{lk.income-tax-bands[-1].tasa}}.",
    "The APIT already deducted, or still to be deducted, from your monthly salary comes off. What is left is the APIT on the bonus.",
  ],
  ejemplo: [
    "On a salary of Rs. 300,000 a month, a bonus of Rs. 600,000 brings the year to Rs. 4,200,000. Table No. 02 gives 30% of that less Rs. 870,000 and the year's monthly APIT of Rs. 222,000, so Rs. 168,000 of APIT on the bonus.",
  ],
  faq: [
    {
      pregunta: "Which payments count as lump sums?",
      respuesta: "Bonuses, leave encashment, medical expense reimbursements, salary arrears and the market value of shares under an employee share scheme, among others.",
    },
    {
      pregunta: "Why is so much of my bonus taxed?",
      respuesta: "The bonus sits on top of your salary, so it is taxed at your highest rates. On a high salary most of the bonus falls in the top bands.",
    },
    {
      pregunta: "My salary is below the tax free amount. Is my bonus taxed?",
      respuesta: "Only if salary and bonus together go above {{lk.personal-relief}} for the year. The IRD says Table No. 02 is used in that case, not Table No. 05.",
    },
  ],
  glosario: [
    { termino: "Lump-sum payment", definicion: "A payment made once instead of every month, such as a bonus." },
    { termino: "EGAR", definicion: "Estimated gross aggregate remuneration: salary and lump sums paid and payable in the year." },
  ],
});
