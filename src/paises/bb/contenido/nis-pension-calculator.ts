import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.nis-pension-calculator",
  h1: "Barbados NIS pension calculator {{anio}}",
  title: "NIS pension calculator {{anio}}: {{bb.pension-rate-first-20}} for each year, up to {{bb.pension-max-rate}}",
  description:
    "Estimate your NIS pension in Barbados on the new basis: {{bb.pension-rate-first-20}} of average earnings for each of the first 20 years, {{bb.pension-rate-after-20}} after that, capped at {{bb.pension-max-rate}}.",
  intro: [
    "The old-age contributory pension from NISSS depends on how many years you paid contributions and on your average insurable earnings in your best five years. Pensionable age is {{bb.pensionable-age}}, and you need at least {{bb.pension-min-contributions}} contributions, which is 10 years.",
    "This calculator follows the new basis described by NISSS. Enter your average insurable earnings for a year and your contribution years to see the weekly, monthly and annual pension.",
  ],
  comoSeCalcula: [
    "Contribution years: 50 weeks of contributions count as one year, so 1,100 weeks is 22 years.",
    "First 20 years: {{bb.pension-rate-first-20}} of average annual insurable earnings for each year.",
    "Years after 20: {{bb.pension-rate-after-20}} of average annual insurable earnings for each extra year.",
    "Cap: the pension cannot be more than {{bb.pension-max-rate}} of average annual insurable earnings. The annual figure divided by 52 gives the weekly pension.",
  ],
  ejemplo: [
    "NISSS shows a contributor with 22 years and an average of Bds$35,500 over the best five years. Twenty years at 2% give Bds$14,200.00 and two years at 1.25% give Bds$887.50. The annual pension is Bds$15,087.50, which is Bds$290.14 a week. With 40 years the formula gives 65%, so the cap of 60% applies and the annual pension is Bds$21,300.00.",
  ],
  faq: [
    {
      pregunta: "How is the NIS pension worked out in Barbados?",
      respuesta:
        "On the new basis NISSS takes {{bb.pension-rate-first-20}} of the average annual earnings for each of the first 20 contribution years and {{bb.pension-rate-after-20}} for each year after that, to a maximum of {{bb.pension-max-rate}}.",
    },
    {
      pregunta: "At what age can I get the pension?",
      respuesta: "NISSS gives the pensionable age as {{bb.pensionable-age}}. Early and late pensions are worked out differently and are not covered here.",
    },
    {
      pregunta: "How many contributions do I need?",
      respuesta: "At least {{bb.pension-min-contributions}} contributions, paid or credited, according to the NISSS pension page.",
    },
    {
      pregunta: "Why might my pension differ from this estimate?",
      respuesta: "NISSS also computes an old basis pension and, for contributors in the transition, averages the two. Your own record decides which applies, so treat this figure as an estimate.",
    },
  ],
  glosario: [
    { termino: "Contribution year", definicion: "A block of 50 weekly contributions, which NISSS counts as one year." },
    { termino: "Insurable earnings", definicion: "Pay up to the ceiling on which NIS contributions are charged." },
    { termino: "Pensionable age", definicion: "The age at which the old-age contributory pension becomes payable in full." },
    { termino: "New basis", definicion: "NISSS pension formula that pays a set percentage for each contribution year." },
  ],
});
