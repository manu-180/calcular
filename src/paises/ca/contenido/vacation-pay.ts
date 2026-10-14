import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.vacation-pay",
  h1: "Vacation pay calculator for Canada",
  title: "Vacation pay calculator: 4%, 6% or 8% of your wages",
  description: "Work out your vacation pay in Ontario, BC, Alberta or a federally regulated job. The rate goes up with your years of service under each province's rules.",
  intro: [
    "Enter your gross wages for the vacation year and how long you have worked for your employer to see the minimum vacation pay you are owed.",
    "Each province sets its own rules. This calculator covers Ontario, British Columbia, Alberta and jobs under the Canada Labour Code.",
  ],
  comoSeCalcula: [
    "In Ontario, BC and Alberta vacation pay is {{ca.vacation-pay-on[rate-0]}}% of gross wages, and {{ca.vacation-pay-on[rate-1]}}% once you reach {{ca.vacation-pay-on[years-1]}} years with the same employer.",
    "Under the Canada Labour Code it is {{ca.vacation-pay-federal[rate-0]}}%, then {{ca.vacation-pay-federal[rate-1]}}% after {{ca.vacation-pay-federal[years-1]}} consecutive years and {{ca.vacation-pay-federal[rate-2]}}% after {{ca.vacation-pay-federal[years-2]}}.",
    "Each 2% of vacation pay matches one week of vacation time: 4% goes with 2 weeks, 6% with 3 weeks and 8% with 4 weeks.",
  ],
  ejemplo: [
    "In Ontario, with 2 years of service and $50,000 of wages, vacation pay is 4%: $2,000. With 6 years it would be 6%: $3,000.",
  ],
  faq: [
    {
      pregunta: "Do I get vacation pay in my first year?",
      respuesta: "Yes. Vacation pay builds up from your first day at the base rate. Paid time off starts after you complete your first year.",
    },
    {
      pregunta: "Which wages count?",
      respuesta: "Your gross wages for the vacation year. In Alberta, overtime pay, general holiday pay and termination pay are not counted, and tips do not count under the Canada Labour Code.",
    },
    {
      pregunta: "What happens to vacation pay when I leave my job?",
      respuesta: "Under the Canada Labour Code your employer has to pay out the vacation pay you are owed within 30 days after your job ends, including the part of the current year.",
    },
  ],
  glosario: [
    { termino: "Vacation pay", definicion: "A percentage of your wages that your employer pays for your vacation time." },
    { termino: "Vacation entitlement year", definicion: "The 12-month period your employer uses to count vacation time and pay." },
  ],
});
