import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.minimum-wage",
  h1: "Minimum wage in Zambia",
  title: "Minimum wage Zambia: basic pay and allowances by job",
  description:
    "Check the minimum basic pay for your job, from {{zm.minimum-wage-monthly[cat1]}} a month for a general worker, plus the housing, transport and lunch allowances.",
  intro: [
    "Choose your job and see the minimum basic pay set by the General Order, plus the allowances your employer has to add.",
    "The Order covers general workers, guards, shop and office staff and drivers. It does not cover civil servants, council staff, domestic workers, managers or unionised staff on a collective agreement.",
  ],
  comoSeCalcula: [
    "Minimum basic pay depends on your category, from {{zm.minimum-wage-monthly[cat1]}} for a general worker to {{zm.minimum-wage-monthly[cat7]}} for a qualified clerk.",
    "If your employer does not house you, add a housing allowance of {{zm.housing-allowance-rate}} of basic pay.",
    "If you live more than 3 km from work and get no transport, add {{zm.transport-allowance}} a month.",
    "If your employer does not give you free meals, add a lunch allowance of {{zm.lunch-allowance}} a month.",
  ],
  ejemplo: [
    "A general worker who is not housed, lives far from work and gets no meals is owed at least K1,487 + K446.10 + K200 + K180 = K2,313.10 a month.",
  ],
  faq: [
    {
      pregunta: "Since when do these amounts apply?",
      respuesta: "Since {{zm.minimum-wage-monthly#desde}}, when the Employment Code (Minimum Wages and Conditions of Employment) (General) Order, 2023 came into operation.",
    },
    {
      pregunta: "Can my employer cut my pay because of the Order?",
      respuesta: "No. Wages and benefits you already had cannot be reduced or changed for the worse because of the Order.",
    },
    {
      pregunta: "What if I work at night?",
      respuesta: "Hours between 18:00 and 06:00 earn a shift differential of 15% of your hourly rate on top of your normal hourly pay.",
    },
    {
      pregunta: "What else does the Order give me?",
      respuesta: "A subsistence allowance of at least K390 a night away from home in Zambia, a tool allowance of K150 a month if you use your own tools, and a funeral grant of K1,500 plus a coffin.",
    },
  ],
  glosario: [
    { termino: "Basic pay", definicion: "Your pay before allowances. The minimum excludes any amount paid in lieu of rations." },
    { termino: "General Order", definicion: "Statutory Instrument No. 48 of 2023, which sets minimum wages and conditions for workers not covered by another order." },
  ],
});
