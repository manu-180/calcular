import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.sick-leave",
  h1: "Sick leave calculator Malaysia",
  title: "Sick leave entitlement under the Employment Act 1955",
  description: "See your paid sick leave under section 60F: 14, 18 or 22 days a year by length of service, and up to 60 days when you need hospitalisation.",
  intro: [
    "Enter your years of service to see how many days of paid sick leave you get each calendar year and how many you have left.",
    "Sick leave needs a certificate from a registered medical practitioner, a medical officer or a dental surgeon.",
  ],
  comoSeCalcula: [
    "Less than 2 years of service: {{my.sick-leave-days[under-2]}} days a year without hospitalisation.",
    "2 to less than 5 years: {{my.sick-leave-days[2-to-5]}} days. 5 years or more: {{my.sick-leave-days[5-plus]}} days.",
    "When hospitalisation is needed, up to {{my.sick-leave-days[hospitalisation]}} days a year.",
    "Each day is paid at your ordinary rate of pay, monthly wages divided by {{my.ordinary-rate-divisor}}.",
  ],
  ejemplo: ["With 1 year of service and 3 days already taken, you have 11 days of paid sick leave left this year."],
  faq: [
    {
      pregunta: "What if the doctor says I need hospital but I am not admitted?",
      respuesta: "If you are certified ill enough to need hospitalisation but are not hospitalised for any reason, the Act treats you as hospitalised.",
    },
    {
      pregunta: "Does dental sick leave count?",
      respuesta: "Yes. A certificate from a dental surgeon also gives paid sick leave, and those days count within the same yearly totals.",
    },
    {
      pregunta: "Is sick leave counted by calendar year?",
      respuesta: "Yes. The days are an aggregate for each calendar year.",
    },
  ],
  glosario: [
    { termino: "Hospitalisation leave", definicion: "Paid sick leave when a doctor certifies that you need to be hospitalised." },
    { termino: "Medical officer", definicion: "A doctor in government service who can certify sick leave." },
  ],
});
