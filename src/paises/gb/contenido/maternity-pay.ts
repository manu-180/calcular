import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.maternity-pay",
  h1: "Statutory Maternity Pay calculator 2026/27",
  title: "Maternity pay calculator 2026/27: SMP week by week",
  description:
    "Work out your Statutory Maternity Pay: {{gb.smp-earnings-percent}} of your earnings for {{gb.smp-higher-weeks}} weeks, then {{gb.smp-standard-rate}} a week or less, for up to {{gb.smp-total-weeks}} weeks.",
  intro: [
    "Statutory Maternity Pay (SMP) is the legal minimum your employer pays while you are on maternity leave. It is paid for up to {{gb.smp-total-weeks}} weeks.",
    "Enter your average weekly earnings before tax to see what you get each week and in total.",
  ],
  comoSeCalcula: [
    "For the first {{gb.smp-higher-weeks}} weeks you get {{gb.smp-earnings-percent}} of your average weekly earnings, with no upper limit.",
    "For the rest of the weeks you get {{gb.smp-standard-rate}} a week or {{gb.smp-earnings-percent}} of your earnings, whichever is lower.",
    "You need average earnings of at least {{gb.ni-lower-earnings-limit-weekly}} a week to qualify.",
  ],
  ejemplo: ["On £600 a week you get £540 a week for 6 weeks, then £194.32 a week for 33 weeks. That is £9,652.56 before tax."],
  faq: [
    {
      pregunta: "Who gets Statutory Maternity Pay?",
      respuesta:
        "Employees who earn at least {{gb.ni-lower-earnings-limit-weekly}} a week on average, have worked for their employer for at least 26 weeks up to the 15th week before the baby is due, and give the right notice.",
    },
    {
      pregunta: "What if I do not qualify for SMP?",
      respuesta: "You may get Maternity Allowance from Jobcentre Plus instead, for example if you are self-employed or have not worked long enough for your employer.",
    },
    {
      pregunta: "Is maternity pay taxed?",
      respuesta: "Yes. SMP is paid through payroll, so Income Tax, National Insurance and any student loan or pension contributions come off as normal.",
    },
    {
      pregunta: "Does my employer have to pay more?",
      respuesta: "Not by law. Many employers pay enhanced maternity pay on top of SMP. Check your contract or staff handbook.",
    },
  ],
  glosario: [
    { termino: "Average weekly earnings", definicion: "Your average gross pay per week over the 8 weeks used for SMP, usually up to the 15th week before the due date." },
    { termino: "Maternity Allowance", definicion: "A payment from the government for people who cannot get SMP." },
  ],
});
