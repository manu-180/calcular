import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.katotatos-misthos",
  h1: "Cyprus minimum wage",
  title: "Cyprus minimum wage {{anio}}: {{cy.katotatos-misthos}} gross",
  description: "The national minimum wage is {{cy.katotatos-misthos}} a month, or {{cy.katotatos-misthos-proslipsis}} for the first six months. See net pay and part-time amounts.",
  intro: [
    "From 1 January 2026 the monthly minimum wage for full-time work is {{cy.katotatos-misthos}}. Workers with less than six months at the same employer can be paid {{cy.katotatos-misthos-proslipsis}}.",
    "Part-time minimums are reduced in line with hours. The calculator also shows net pay.",
  ],
  comoSeCalcula: [
    "The minimum wage is set by a Council of Ministers decree (ΚΔΠ 427/2025).",
    "For part-time work we multiply the minimum by your hours and divide by the sector's full-time hours.",
    "Social Insurance of {{cy.eisfora-ka-misthotou}} and GeSY of {{cy.eisfores-gesy[misthotos]}} come off. No income tax is due on the minimum wage, as it stays inside the tax-free band.",
    "The hourly figure is a guide: monthly pay divided by the month's hours (weekly hours × 52 / 12).",
  ],
  ejemplo: [
    "Full time, after six months with the same employer, the minimum is €1,088 gross. After €95.74 Social Insurance and €28.83 GeSY you take home €963.43.",
  ],
  faq: [
    { pregunta: "Who is not covered by the national minimum wage?", respuesta: "The decree doesn't apply where a specific decree or agreement applies, such as the hotel industry minimum wage. If you work in such a sector, check your own rules." },
    { pregunta: "How many hours is full time?", respuesta: "The decree keeps each sector's existing full-time hours under law, agreement, custom or practice. If you don't know yours, ask your employer or check your contract." },
    { pregunta: "When does {{cy.katotatos-misthos}} apply?", respuesta: "From 1 January 2026, once you have six months of continuous work with the same employer." },
  ],
  glosario: [
    { termino: "ΚΔΠ", definicion: "A regulatory administrative act: a decree or regulation published in the Official Gazette." },
  ],
});
