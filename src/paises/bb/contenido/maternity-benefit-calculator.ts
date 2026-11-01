import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.maternity-benefit-calculator",
  h1: "Barbados maternity benefit calculator {{anio}}",
  title: "Maternity benefit calculator {{anio}}: NIS pays {{bb.maternity-benefit-rate}}",
  description:
    "Estimate your NIS maternity benefit in Barbados at {{bb.maternity-benefit-rate}} of average insurable weekly earnings, plus the {{bb.child-grant}} child grant and {{bb.maternity-leave-weeks}} weeks of leave.",
  intro: [
    "An insured mother in Barbados who qualifies for NIS maternity benefit receives {{bb.maternity-benefit-rate}} of her average insurable weekly earnings while she is on leave. A separate child grant of {{bb.child-grant}} is paid with the claim.",
    "The Employment of Women (Maternity Leave) Act, Cap. 345A gives at least {{bb.maternity-leave-weeks}} weeks of maternity leave. Enter your average insurable weekly earnings and the weeks you expect to be paid to see the benefit.",
  ],
  comoSeCalcula: [
    "Insurable earnings: your average weekly earnings, limited to the NIS weekly ceiling of {{bb.nis-ceiling-weekly}}.",
    "Weekly benefit: {{bb.maternity-benefit-rate}} of those earnings, according to the NISSS maternity benefit page.",
    "Total: the weekly benefit multiplied by the number of weeks you enter. NISSS decides the number of paid weeks when it assesses the claim.",
    "Child grant: a payment of {{bb.child-grant}} that is shown on its own and added in the last line.",
  ],
  ejemplo: [
    "A teacher with average insurable earnings of Bds$800 a week expects 12 weeks of benefit. The weekly benefit is Bds$800.00, which makes Bds$9,600.00 over 12 weeks. With the Bds$1,280.00 child grant the claim comes to Bds$10,880.00. If she earned Bds$1,500 a week, the ceiling would limit the benefit to Bds$1,238.00 a week.",
  ],
  faq: [
    {
      pregunta: "How much is the NIS maternity benefit?",
      respuesta: "NISSS pays {{bb.maternity-benefit-rate}} of the insured person's average insurable weekly earnings, as set out on its Maternity Benefit and Child Grant page.",
    },
    {
      pregunta: "How much is the child grant?",
      respuesta: "The NISSS page gives the child grant as {{bb.child-grant}}.",
    },
    {
      pregunta: "How long is maternity leave in Barbados?",
      respuesta: "Section 3 of the Employment of Women (Maternity Leave) Act, Cap. 345A gives {{bb.maternity-leave-weeks}} weeks.",
    },
    {
      pregunta: "Does my employer also pay me during leave?",
      respuesta: "That depends on your contract and on the Act's conditions. This calculator shows only the NIS benefit, so ask your employer what, if anything, is paid on top.",
    },
  ],
  glosario: [
    { termino: "Maternity benefit", definicion: "A weekly NIS payment to an insured mother who stops work to have a child." },
    { termino: "Insurable earnings", definicion: "Pay up to the NIS ceiling, on which contributions and benefits are based." },
    { termino: "Child grant", definicion: "A one-off NIS payment linked to the birth of a child." },
    { termino: "NISSS", definicion: "The National Insurance and Social Security Service." },
  ],
});
