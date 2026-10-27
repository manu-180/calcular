import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.kostos-ergodoti",
  h1: "Employer cost calculator for Cyprus",
  title: "Cyprus employer cost {{anio}}: salary plus contributions",
  description: "Work out what an employee costs in Cyprus: salary, Social Insurance {{cy.eisfora-ka-ergodoti}}, GeSY {{cy.eisfores-gesy[ergodotis]}} and the other funds.",
  intro: [
    "Enter the gross salary to see the total cost to the business, per month and per year.",
    "It includes every contribution the employer pays alone, as set out in the Social Insurance Services' Employer's Guide.",
  ],
  comoSeCalcula: [
    "The employer pays {{cy.eisfora-ka-ergodoti}} Social Insurance, {{cy.eisfores-tameion-ergodoti[pleonasmos]}} Redundancy Fund and {{cy.eisfores-tameion-ergodoti[anaptyxi]}} Human Resource Development Fund, up to {{cy.anotato-orio-ka}} a month.",
    "It also pays {{cy.eisfores-gesy[ergodotis]}} GeSY and {{cy.eisfores-tameion-ergodoti[synochi]}} Social Cohesion Fund, which has no ceiling.",
    "Without an exemption it adds {{cy.eisfores-tameion-ergodoti[adeies]}} to the Central Holiday Fund, which counts as pay for the other contributions.",
    "With a 13th salary, December carries a double salary and its contributions stop at the monthly ceiling.",
  ],
  ejemplo: [
    "For a €1,500 salary without the Holiday Fund, the employer pays €231 a month in contributions. The cost is €1,731 a month and €20,772 a year.",
  ],
  faq: [
    { pregunta: "How much does the employer add on top of salary?", respuesta: "Without the Holiday Fund and below the ceiling, about 15.4%. With the Holiday Fund it's higher." },
    { pregunta: "Are the employee's contributions part of the cost?", respuesta: "No. The employer withholds and pays them, but they come out of the employee's salary." },
    { pregunta: "When are contributions due?", respuesta: "By the end of the following month. Late payment carries a surcharge of 3% that grows by 3 points each month, according to the Employer's Guide." },
  ],
  glosario: [
    { termino: "Maximum insurable earnings", definicion: "The salary above which most contributions are not charged." },
  ],
});
