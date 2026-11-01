import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.salary-deduction-limit-calculator",
  h1: "Salary deduction limit calculator Bhutan",
  title: "Salary deductions in Bhutan: how much can be taken",
  description: "Check whether deductions from your pay are lawful in Bhutan. The Act leaves you at least {{bt.deduction-floor-share}} of the wage. Enter your pay and deductions.",
  intro: [
    "An employer in Bhutan may not deduct so much that your wage for a pay period falls below one half of the total wage. In percentage terms, at least {{bt.deduction-floor-share}} of the wage must reach you.",
    "The limit is in section 132 of the Labour and Employment Act of Bhutan 2007. Section 131 lists what an employer may deduct in the first place.",
  ],
  comoSeCalcula: [
    "Take the total wage for the pay period, before deductions.",
    "Multiply it by {{bt.deduction-floor-share}}. That is the least you must be paid, and also the most that can be deducted.",
    "Compare the planned deductions with that maximum. Anything above it breaks section 132.",
    "Income tax is on the section 131 list, along with absence from work, meals supplied at your request, advances, loan repayments, damage caused by negligence and mistaken overpayments made in the last {{bt.overpayment-recovery-months}}.",
  ],
  ejemplo: [
    "Your wage for the month is Nu. 30,000. At least Nu. 15,000 must be left to you, so deductions can total at most Nu. 15,000. If your employer plans Nu. 18,000 of deductions, Nu. 3,000 is over the limit and you still take home Nu. 15,000 at minimum.",
  ],
  faq: [
    {
      pregunta: "What can my employer deduct from my wages in Bhutan?",
      respuesta: "Section 131 lists income tax, absence from work, the cost of meals supplied at your request, repayment of advances and loans, contributions you agreed to in writing, the cost of loss or damage from your negligence, mistaken overpayments and deductions allowed by other laws.",
    },
    {
      pregunta: "Is there a limit on total deductions?",
      respuesta: "Yes. Section 132 forbids deductions that would reduce the wage for a pay period to less than one half of the total wage.",
    },
    {
      pregunta: "How far back can an overpayment be recovered?",
      respuesta: "Section 131(g) covers overpayments made by mistake in the immediately preceding {{bt.overpayment-recovery-months}}.",
    },
    {
      pregunta: "What if my employer breaks the limit?",
      respuesta: "Section 133 makes an employer who breaks section 132 guilty of an offence, which is a petty misdemeanour.",
    },
  ],
  glosario: [
    { termino: "Deduction", definicion: "An amount the employer takes out of the wage before paying it." },
    { termino: "Petty misdemeanour", definicion: "The class of offence the Act names for a deduction that breaks the one-half limit." },
  ],
});
