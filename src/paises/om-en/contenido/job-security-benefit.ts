import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.job-security-benefit",
  h1: "Oman job security allowance calculator",
  title: "Oman job security allowance: {{om.job-security-rate}} of average wage",
  description:
    "Work out the monthly job security allowance in Oman: {{om.job-security-rate}} of your average wage over two years, at least {{om.job-security-min}}, for up to {{om.job-security-months}}.",
  intro: [
    "The job security branch of the Social Protection Fund pays a monthly allowance to insured Omanis who lose their job, under conditions set in the regulations.",
    "Enter your average monthly wage over the last two years and how many months you expect to be out of work to see the monthly allowance and the total.",
  ],
  comoSeCalcula: [
    "Monthly allowance = {{om.job-security-rate}} of the average wage over the last two years, with no cap.",
    "The allowance is never below {{om.job-security-min}} a month.",
    "It is paid for up to {{om.job-security-months}}, in one stretch or in parts, and the branch pays your old age contributions on the amount paid.",
  ],
  ejemplo: [
    "Someone whose average wage over the last two years was OMR 700 gets OMR 420 a month, or OMR 2,520 over six months.",
  ],
  faq: [
    {
      pregunta: "How much is the job security allowance in Oman?",
      respuesta: "{{om.job-security-rate}} of the average wage over the last two years with no cap, and never below {{om.job-security-min}} a month.",
    },
    {
      pregunta: "For how many months is it paid?",
      respuesta: "Up to {{om.job-security-months}}, in one stretch or in parts, and the period counts as actual service.",
    },
    {
      pregunta: "Who is covered by job security insurance?",
      respuesta: "It is compulsory for all Omanis working in Oman on any type of contract, including temporary and training contracts. It does not cover the self-employed or part-time workers.",
    },
  ],
  glosario: [
    { termino: "Job security allowance", definicion: "A monthly amount the Social Protection Fund pays an insured person who lost their job, under the regulations." },
  ],
});
