import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.severance-pay-calculator",
  h1: "Severance pay calculator Malawi",
  title: "Severance pay calculator Malawi: Employment Act",
  description: "Work out the severance allowance due when a contract ends by mutual agreement or is ended by the employer, under section 35 of the Employment Act.",
  intro: [
    "Enter your completed years of service and your current weekly wage to see the severance allowance.",
    "Section 35 of the Employment Act sets the allowance through its First Schedule.",
  ],
  comoSeCalcula: [
    "Each completed year of continuous service earns a number of weeks of wages, set by the First Schedule.",
    "The weeks per year go up with length of service.",
    "The allowance is worked out on your current wage.",
  ],
  ejemplo: ["The calculator adds up the weeks for each completed year and multiplies them by your weekly wage."],
  faq: [],
  glosario: [{ termino: "Severance allowance", definicion: "A payment due when the employer ends the contract or both sides agree to end it." }],
});
