import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.gratuity-calculator",
  h1: "End-of-service gratuity calculator for Qatar",
  title: "Gratuity calculator Qatar: end of service benefit",
  description:
    "Work out your end-of-service gratuity in Qatar: at least {{qa.gratuity-weeks}} of your last basic salary for each year of service, under Article 54 of the Labour Law.",
  intro: [
    "When your job ends in Qatar after at least a year, your employer owes you an end-of-service gratuity on top of anything else due.",
    "Enter your last basic salary and your years of service to see the amount.",
  ],
  comoSeCalcula: [
    "The gratuity is at least {{qa.gratuity-weeks}} of basic salary for each year of service. Your contract can give more, never less.",
    "Part of a year counts in proportion, once you've completed {{qa.gratuity-min-service}} of continuous service.",
    "The base is your last basic salary, without allowances. The law doesn't say how to turn it into a weekly amount, so choose the method in your contract.",
  ],
  ejemplo: [
    "With a last basic salary of QAR 8,000 and 6.5 years of service, the minimum is 19.5 weeks. With the ÷ 30 × 7 method that comes to QAR 36,400.",
  ],
  faq: [
    {
      pregunta: "Do I get a gratuity if I resign?",
      respuesta: "Yes. Article 54 gives the gratuity to any worker with a year or more of service when the job ends. It's only lost if you're dismissed for one of the serious reasons in Article 61.",
    },
    {
      pregunta: "Are allowances included in the gratuity?",
      respuesta: "No. The law uses your last basic salary, so housing, transport and other allowances don't count.",
    },
    {
      pregunta: "Can my employer deduct anything from it?",
      respuesta: "Yes. The employer can deduct amounts you owe it.",
    },
    {
      pregunta: "What if I'm rehired soon after leaving?",
      respuesta: "Your service counts as continuous if you're taken back within two months, unless you were dismissed under Article 61.",
    },
  ],
  glosario: [
    { termino: "Basic salary", definicion: "The fixed pay for your work, without allowances or bonuses." },
    { termino: "Continuous service", definicion: "Service with the same employer that isn't broken by legal leave or a stoppage beyond your control." },
  ],
});
