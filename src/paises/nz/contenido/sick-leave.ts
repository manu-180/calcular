import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.sick-leave",
  h1: "Sick leave calculator NZ",
  title: "Sick leave NZ: how many days you have and your pay",
  description:
    "Check your New Zealand sick leave: {{nz.sick-leave-days}} paid days a year after 6 months, up to a balance of {{nz.sick-leave-max-balance}} days. See your sick pay and what's left.",
  intro: [
    "Eligible employees get {{nz.sick-leave-days}} days of paid sick leave a year, to look after themselves, their partner or someone who depends on them.",
    "Unused days carry over, and your balance can build up to {{nz.sick-leave-max-balance}} days.",
  ],
  comoSeCalcula: [
    "You qualify after {{nz.sick-leave-qualifying-months}} months of continuous work with the same employer.",
    "Each year you add {{nz.sick-leave-days}} days to what you carried over, up to {{nz.sick-leave-max-balance}} days in total.",
    "Each sick day is paid at what you would have earned if you had worked that day.",
  ],
  ejemplo: ["In your first year of sick leave you have 10 days. Take 3 days off at $200 a day and you get $600, with 7 days left."],
  faq: [
    {
      pregunta: "When do I start getting sick leave?",
      respuesta:
        "After 6 months of continuous work for the same employer. You can also qualify if, over 6 months, you've averaged at least 10 hours a week, with at least 1 hour every week or 40 hours every month.",
    },
    {
      pregunta: "Can I use sick leave to look after my child?",
      respuesta: "Yes. Sick leave covers you, your partner and people who depend on you.",
    },
    {
      pregunta: "What's the most sick leave I can build up?",
      respuesta: "Your balance can reach {{nz.sick-leave-max-balance}} days. Unused days above that don't carry over.",
    },
  ],
  glosario: [
    { termino: "Sick leave balance", definicion: "The paid sick days you have available, including days carried over." },
    { termino: "Dependant", definicion: "Someone who relies on you for care, such as a child or an elderly parent." },
  ],
});
