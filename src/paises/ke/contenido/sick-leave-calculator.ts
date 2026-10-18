import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.sick-leave-calculator",
  h1: "Sick leave calculator Kenya",
  title: "Sick leave calculator Kenya: full pay and half pay days",
  description: "See how many sick days are paid in Kenya: {{ke.sick-full-pay-days}} days on full pay, then {{ke.sick-half-pay-days}} on half pay each year, after {{ke.sick-qualifying-months}} months of service.",
  intro: [
    "The Employment Act sets a minimum of paid sick leave each year. Enter your months of service and the sick days you had.",
    "Add your monthly pay to see what the paid days are worth.",
  ],
  comoSeCalcula: [
    "After {{ke.sick-qualifying-months}} consecutive months of service you are entitled to sick leave.",
    "In each 12 months of service, the first {{ke.sick-full-pay-days}} days are on full pay and the next {{ke.sick-half-pay-days}} on half pay.",
    "You need a certificate from a qualified medical practitioner, and you should tell your employer as soon as you can.",
  ],
  ejemplo: ["With 10 sick days on KSh 60,000 a month divided by 30, you get 7 days at KSh 2,000 and 3 days at KSh 1,000: KSh 17,000."],
  faq: [
    {
      pregunta: "When does the 12-month period start?",
      respuesta: "On the date you started the job and on each anniversary. Your employer may set one date for all employees.",
    },
    {
      pregunta: "What does full pay include?",
      respuesta: "Wages at your basic rate, without the deductions the Act allows.",
    },
    {
      pregunta: "Can my contract give more sick leave?",
      respuesta: "Yes. The Act sets the minimum, so a contract or collective agreement can give more but never less.",
    },
  ],
  glosario: [{ termino: "Certificate of incapacity", definicion: "A note from a doctor or clinic saying you cannot work." }],
});
