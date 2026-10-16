import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.annual-leave",
  h1: "Annual leave calculator Malaysia",
  title: "Annual leave calculator: Employment Act entitlement",
  description: "Find your paid annual leave under section 60E of the Employment Act: {{my.annual-leave-days[under-2]}}, {{my.annual-leave-days[2-to-5]}} or {{my.annual-leave-days[5-plus]}} days by length of service, pro-rated in the year you leave.",
  intro: [
    "Enter your years of service to see your paid annual leave, the days you still have this year and what they are worth at your daily rate.",
    "If you are leaving, add the completed months in your final year and the leave is pro-rated the way the Act says.",
  ],
  comoSeCalcula: [
    "Less than 2 years with the same employer: {{my.annual-leave-days[under-2]}} days for every 12 months.",
    "2 to less than 5 years: {{my.annual-leave-days[2-to-5]}} days. 5 years or more: {{my.annual-leave-days[5-plus]}} days.",
    "In the year you leave, the days are in proportion to your completed months. Under half a day is dropped; half a day or more counts as a full day.",
    "Each day is valued at your ordinary rate of pay: monthly wages divided by {{my.ordinary-rate-divisor}}.",
  ],
  ejemplo: ["After 6 years, leaving 7 months into the year: 16 × 7 ÷ 12 = 9.33, so 9 days of annual leave."],
  faq: [
    {
      pregunta: "Do rest days and public holidays count as annual leave?",
      respuesta: "No. Paid annual leave is on top of your rest days and paid holidays.",
    },
    {
      pregunta: "Can I lose my annual leave?",
      respuesta:
        "Yes, if you are absent without permission and without a reasonable excuse for more than 10% of the working days in the 12 months the leave is earned for.",
    },
    {
      pregunta: "Is the leave pro-rated in my first year?",
      respuesta: "The Act pro-rates by completed months in the year your contract ends. For a full 12 months of service you get the whole entitlement.",
    },
  ],
  glosario: [
    { termino: "Continuous service", definicion: "Unbroken employment with the same employer, used to work out which leave band applies." },
    { termino: "Ordinary rate of pay", definicion: "Your wages for one day of normal work." },
  ],
});
