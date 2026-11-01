import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.ypologismos-fpa",
  h1: "Cyprus VAT calculator",
  title: "Cyprus VAT calculator: {{cy.fpa[19]}}, {{cy.fpa[9]}}, {{cy.fpa[5]}} and {{cy.fpa[3]}}",
  description: "Add or remove VAT at Cyprus rates: standard {{cy.fpa[19]}} and reduced {{cy.fpa[9]}}, {{cy.fpa[5]}} and {{cy.fpa[3]}}.",
  intro: [
    "Enter an amount, pick a rate and see the price with VAT or the net value without it.",
    "The rates are those of the Value Added Tax Law.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the net value by the rate. At {{cy.fpa[19]}}, €100 becomes €119.",
    "To remove VAT from a final price, divide by 1 plus the rate. At {{cy.fpa[19]}}, divide by 1.19.",
    "The standard rate is {{cy.fpa[19]}}. {{cy.fpa[9]}} applies to the Twelfth Schedule, {{cy.fpa[5]}} to the Fifth and {{cy.fpa[3]}} to the Fifteenth Schedule of the law.",
  ],
  ejemplo: [
    "A service with a net value of €250 at {{cy.fpa[9]}} carries €22.50 of VAT. The final price is €272.50.",
  ],
  faq: [
    { pregunta: "What is the standard VAT rate in Cyprus?", respuesta: "{{cy.fpa[19]}}, since 13 January 2014. It applies to everything not covered by a reduced rate or an exemption." },
    { pregunta: "Where do I find the rate for each product?", respuesta: "In the law's Schedules: the Fifth for {{cy.fpa[5]}}, the Twelfth for {{cy.fpa[9]}} and the Fifteenth for {{cy.fpa[3]}}. The Council of Ministers changes them by decree." },
    { pregunta: "Why can't I just take 19% off the final price?", respuesta: "Because the 19% was charged on the net value, not on the final price. 19% of €119 is €22.61, but the correct VAT is €19." },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value Added Tax, paid by the consumer inside the price." },
  ],
});
