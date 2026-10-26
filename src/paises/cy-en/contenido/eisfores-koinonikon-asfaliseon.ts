import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.eisfores-koinonikon-asfaliseon",
  h1: "Cyprus Social Insurance calculator",
  title: "Cyprus Social Insurance and GeSY contributions 2026",
  description: "See employee and employer contributions in Cyprus: Social Insurance {{cy.eisfora-ka-misthotou}}, GeSY, Social Cohesion, Redundancy and Holiday funds.",
  intro: [
    "Enter your gross monthly salary to see what comes off your pay and what your employer pays into each fund.",
    "The rates are those in the Social Insurance Services' Employer's Guide.",
  ],
  comoSeCalcula: [
    "Social Insurance: the employee pays {{cy.eisfora-ka-misthotou}} and the employer {{cy.eisfora-ka-ergodoti}}, up to {{cy.anotato-orio-ka}} a month.",
    "GeSY: {{cy.eisfores-gesy[misthotos]}} from the employee and {{cy.eisfores-gesy[ergodotis]}} from the employer.",
    "Only the employer pays {{cy.eisfores-tameion-ergodoti[pleonasmos]}} to the Redundancy Fund, {{cy.eisfores-tameion-ergodoti[anaptyxi]}} to the Human Resource Development Fund and {{cy.eisfores-tameion-ergodoti[synochi]}} to the Social Cohesion Fund, which has no ceiling.",
    "An employer paying into the Central Holiday Fund adds {{cy.eisfores-tameion-ergodoti[adeies]}} for 20 days of leave. That amount counts as pay for all other contributions.",
  ],
  ejemplo: [
    "In the Employer's Guide example, a €1,000 salary with Holiday Fund payments gives €1,080 of earnings for contributions. All contributions together, employee and employer, come to €369.98.",
  ],
  faq: [
    { pregunta: "How much comes off my salary?", respuesta: "{{cy.eisfora-ka-misthotou}} for Social Insurance and {{cy.eisfores-gesy[misthotos]}} for GeSY. On €1,500 that's €171.75 a month. Income tax is withheld separately." },
    { pregunta: "Will the rates change?", respuesta: "Yes. Under the Employer's Guide, the employee and employer rates each rise to 9.3% from 2029." },
    { pregunta: "What is the Central Holiday Fund?", respuesta: "It pays annual leave when the employer doesn't pay it directly. Employers with their own better leave scheme can apply for an exemption." },
  ],
  glosario: [
    { termino: "Insurable earnings", definicion: "The pay on which contributions are charged, up to the ceiling." },
  ],
});
