import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.property-registration-fee",
  h1: "Property registration fee calculator for Qatar",
  title: "Property registration fee in Qatar: sale, gift, mortgage",
  description:
    "Work out the Ministry of Justice fee to register property in Qatar: {{qa.property-registration-rates[sale]}} of the value for a sale, and the fees for gifts, inheritance and mortgages.",
  intro: [
    "Buying, receiving or mortgaging property in Qatar means registering it with the Ministry of Justice, which charges a fee.",
    "Choose the transaction and enter the value to see the fee under the rules in force since {{qa.property-registration-rates#desde}}.",
  ],
  comoSeCalcula: [
    "A sale pays {{qa.property-registration-rates[sale]}} of the property value. A gift outside parents, children and spouse pays the same.",
    "A gift to parents, children or a spouse pays {{qa.property-registration-fixed[gift-family]}}. A transfer by inheritance pays {{qa.property-registration-fixed[inheritance]}} for each property.",
    "A mortgage pays {{qa.property-registration-rates[mortgage]}} of the debt it secures.",
  ],
  ejemplo: ["Registering the sale of a QAR 2.5 million villa costs QAR 6,250. A QAR 1.6 million mortgage on it adds QAR 400."],
  faq: [
    {
      pregunta: "Who doesn't pay the fee?",
      respuesta: "Ministries and public bodies, charitable gifts and endowments, and property the state allocates to citizens under the housing laws, among others.",
    },
    {
      pregunta: "How is an exchange of properties charged?",
      respuesta: "At {{qa.property-registration-rates[sale]}} of the value of the more expensive property, split equally between both sides.",
    },
    {
      pregunta: "What does it cost to cancel a mortgage?",
      respuesta: "Releasing a mortgage costs QAR 100.",
    },
  ],
  glosario: [{ termino: "Real estate register", definicion: "The Ministry of Justice record of who owns each property and what rights weigh on it." }],
});
