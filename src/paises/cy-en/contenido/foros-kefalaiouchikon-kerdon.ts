import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.foros-kefalaiouchikon-kerdon",
  h1: "Capital gains tax calculator for Cyprus",
  title: "Cyprus capital gains tax: {{cy.foros-kefalaiouchikon-kerdon}} calculator",
  description: "Work out Cyprus capital gains tax of {{cy.foros-kefalaiouchikon-kerdon}} on property sales, with the {{cy.exairesi-kefalaiouchikon-kerdon[geniki]}} general or {{cy.exairesi-kefalaiouchikon-kerdon[katoikia]}} main residence exemption.",
  intro: [
    "When you sell property in Cyprus, or shares in a company that owns Cyprus property, the gain pays capital gains tax.",
    "Enter the sale price, the inflation-adjusted cost and the exemption that applies to you.",
  ],
  comoSeCalcula: [
    "The gain is the sale price minus the acquisition cost and selling costs. Cost and improvements are adjusted for inflation with the Consumer Price Index.",
    "Each individual has a lifetime exemption: {{cy.exairesi-kefalaiouchikon-kerdon[geniki]}} in general, {{cy.exairesi-kefalaiouchikon-kerdon[georgiki]}} for farmland sold by a farmer, or {{cy.exairesi-kefalaiouchikon-kerdon[katoikia]}} for a main residence. You get only one, the larger.",
    "The gain above the exemption pays {{cy.foros-kefalaiouchikon-kerdon}}.",
  ],
  ejemplo: [
    "You sell for €300,000 a property with an adjusted cost of €200,000 and €10,000 of costs. The gain is €90,000. After the €30,000 general exemption, €60,000 is taxed and the tax is €12,000.",
  ],
  faq: [
    { pregunta: "When does the main residence exemption apply?", respuesta: "When you lived there for at least five years and the plot is up to one and a half decares. A second home sale needs ten years. It doesn't apply if you sell more than a year after you stopped living there." },
    { pregunta: "Are listed shares taxed?", respuesta: "No. Gains on shares listed on a regulated market of a recognised stock exchange are not taxed." },
    { pregunta: "How is the cost adjusted?", respuesta: "With the Consumer Price Index from purchase to sale. You can estimate it with the inflation calculator. For property held before 1980, the cost is its value on 1 January 1980." },
  ],
  glosario: [
    { termino: "Exemption", definicion: "Gain that isn't taxed. Whatever you use is gone for later sales." },
  ],
});
