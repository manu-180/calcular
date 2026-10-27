import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.sick-leave-calculator",
  h1: "Sick leave pay calculator Malawi",
  title: "Sick leave pay Malawi: 4 weeks full, 8 weeks half pay",
  description:
    "Work out your sick pay under the Employment Act: {{mw.sick-full-pay}} on full pay and {{mw.sick-half-pay}} on half pay each year, after {{mw.sick-qualifying}} of service.",
  intro: [
    "Enter your service, the weeks you were off sick this year and your weekly wage to see the sick pay you are owed.",
    "The rules come from section 46 of the Employment Act, 2000.",
  ],
  comoSeCalcula: [
    "After {{mw.sick-qualifying}} of continuous service you get at least {{mw.sick-full-pay}} of sick leave on full pay each year.",
    "After that come up to {{mw.sick-half-pay}} on half pay.",
    "Sick leave beyond those weeks is not paid under the Act, though your contract can give more.",
  ],
  ejemplo: ["Six weeks off sick at K50,000 a week: four weeks on full pay (K200,000) and two on half pay (K50,000), K250,000 in total."],
  faq: [
    {
      pregunta: "Do I need a doctor's note?",
      respuesta: "Yes. Your employer does not have to grant sick leave unless you bring a certificate from a registered medical practitioner stating the nature of your illness.",
    },
    {
      pregunta: "Can sick leave be taken from my annual leave?",
      respuesta: "No. Annual leave cannot run at the same time as sick leave.",
    },
    {
      pregunta: "What about illness from pregnancy?",
      respuesta: "If a doctor certifies an illness from pregnancy or birth affecting you or your baby, your employer has to grant extra leave beyond maternity leave, as it sees fit.",
    },
  ],
  glosario: [
    { termino: "Full pay", definicion: "Your normal rate of wages." },
    { termino: "Registered medical practitioner", definicion: "A doctor registered to practise in Malawi." },
  ],
});
