import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.termination-pay",
  h1: "Termination pay calculator (pay in lieu of notice)",
  title: "Termination pay and notice calculator for Canada",
  description: "Find the minimum notice or termination pay you are owed in Ontario, BC, Alberta or a federally regulated job, based on your years of service.",
  intro: [
    "If your employer ends your job without cause, employment standards give you a minimum amount of written notice or pay instead of notice.",
    "Enter your length of service and your regular weekly wages to see the minimum weeks of notice and the termination pay that replaces them.",
  ],
  comoSeCalcula: [
    "Ontario: {{ca.notice-on[3]}} week after 3 months, {{ca.notice-on[12]}} weeks after 1 year, then 1 week for each full year from 3 years, up to {{ca.notice-on[96]}} weeks.",
    "British Columbia: {{ca.notice-bc[3]}} week after 3 months, {{ca.notice-bc[12]}} weeks after 12 months, then 3 weeks after 3 years plus 1 week per extra year, up to {{ca.notice-bc[96]}} weeks.",
    "Alberta: {{ca.notice-ab[3]}} week after 90 days, {{ca.notice-ab[24]}} weeks after 2 years, {{ca.notice-ab[48]}} after 4, {{ca.notice-ab[72]}} after 6, {{ca.notice-ab[96]}} after 8 and {{ca.notice-ab[120]}} after 10 years.",
    "Canada Labour Code: {{ca.notice-federal[3]}} weeks after 3 months, and from 3 years 1 week per completed year, up to {{ca.notice-federal[96]}} weeks.",
    "Termination pay is the weeks of notice times your regular weekly wages.",
  ],
  ejemplo: ["In Ontario, after 4 years at $1,200 a week, the minimum is 4 weeks of notice or $4,800 of termination pay."],
  faq: [
    {
      pregunta: "Can my employer give part notice and part pay?",
      respuesta: "Yes. Employers can give written working notice, termination pay, or a combination of both.",
    },
    {
      pregunta: "Is termination pay the same as severance pay?",
      respuesta: "No. Severance pay is a separate payment in Ontario and under the Canada Labour Code for longer-serving employees, paid on top of notice or termination pay.",
    },
    {
      pregunta: "When is no notice owed?",
      respuesta: "When you quit, are dismissed for just cause, or have worked less than the minimum period (3 months, or 90 days in Alberta).",
    },
  ],
  glosario: [
    { termino: "Pay in lieu of notice", definicion: "Money paid instead of working through the notice period." },
    { termino: "Just cause", definicion: "Serious misconduct that lets an employer dismiss without notice. The employer has to prove it." },
  ],
});
