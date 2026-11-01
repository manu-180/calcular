import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.paternity-benefit-calculator",
  h1: "Barbados paternity benefit calculator {{anio}}",
  title: "Paternity benefit calculator {{anio}}: {{bb.paternity-benefit-weeks}} at {{bb.paternity-benefit-rate}}",
  description:
    "Estimate your NIS paternity benefit in Barbados: {{bb.paternity-benefit-rate}} of average insurable weekly earnings for {{bb.paternity-benefit-weeks}} weeks, with earnings limited to {{bb.nis-ceiling-weekly}} a week.",
  intro: [
    "Since June 2025 an insured father in Barbados can claim a paternity benefit from the National Insurance Scheme. NISSS pays {{bb.paternity-benefit-rate}} of average insurable weekly earnings for {{bb.paternity-benefit-weeks}} weeks.",
    "Type in your average insurable weekly earnings. The calculator limits them to the weekly ceiling and shows the weekly amount and the total.",
  ],
  comoSeCalcula: [
    "Insurable earnings: your average weekly earnings, up to the NIS weekly ceiling of {{bb.nis-ceiling-weekly}}.",
    "Weekly benefit: {{bb.paternity-benefit-rate}} of your average insurable weekly earnings, as stated on the NISSS paternity benefit page.",
    "Number of weeks: {{bb.paternity-benefit-weeks}}, the period the page sets for the benefit. It has applied since {{bb.paternity-benefit-weeks#desde}}.",
    "Total: the weekly benefit multiplied by those weeks. NISSS tests the claim against its contribution and relationship conditions.",
  ],
  ejemplo: [
    "A warehouse supervisor averages Bds$800 of insurable earnings a week. His benefit is Bds$800.00 a week, so three weeks pay Bds$2,400.00. A manager earning Bds$2,000 a week is treated as earning the Bds$1,238 ceiling, so his three weeks pay Bds$3,714.00.",
  ],
  faq: [
    {
      pregunta: "How much is the NIS paternity benefit?",
      respuesta: "NISSS pays {{bb.paternity-benefit-rate}} of your average insurable weekly earnings, according to its Paternity Benefit page.",
    },
    {
      pregunta: "For how long is it paid?",
      respuesta: "The page sets {{bb.paternity-benefit-weeks}} weeks.",
    },
    {
      pregunta: "Does the weekly ceiling apply?",
      respuesta: "Yes. NIS benefits are based on insurable earnings, and the weekly ceiling is {{bb.nis-ceiling-weekly}} in the NISSS contribution table.",
    },
  ],
  glosario: [
    { termino: "Paternity benefit", definicion: "A weekly NIS payment to an insured father after the birth of a child." },
    { termino: "Insurable earnings", definicion: "Pay up to the NIS ceiling, on which contributions and benefits are based." },
    { termino: "NISSS", definicion: "The National Insurance and Social Security Service." },
  ],
});
