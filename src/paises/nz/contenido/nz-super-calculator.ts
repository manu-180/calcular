import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.nz-super-calculator",
  h1: "NZ Super calculator",
  title: "NZ Super rates: how much you get a fortnight",
  description:
    "See how much NZ Superannuation you get each fortnight, week and year, before and after tax, for your living situation. Rates from Work and Income.",
  intro: [
    "NZ Super is paid every fortnight. How much you get depends on whether you live alone, share accommodation or have a partner.",
    "A single person living alone gets {{nz.nz-super-net-m[single-alone]}} a fortnight after tax at the M tax code, from {{nz.nz-super-net-m#desde}}.",
  ],
  comoSeCalcula: [
    "Pick your living situation to see the fortnightly rate set by Work and Income.",
    "The after-tax amount uses the M tax code. A week is half a fortnight, and a year is 26 fortnights.",
  ],
  ejemplo: ["A single person living alone gets $1,294.74 a fortnight before tax and $1,110.30 after tax, about $28,867.80 a year."],
  faq: [
    {
      pregunta: "Why is the rate higher if I live alone?",
      respuesta: "The rate for single people living alone, or with a dependent child, includes the Living Alone Payment.",
    },
    {
      pregunta: "Why would I get less than these amounts?",
      respuesta: "If you have other income, your tax code may be S, SH, ST or SA, so more tax comes off each payment. Overseas pensions can also affect what you get.",
    },
    {
      pregunta: "What do couples get?",
      respuesta: "When both partners qualify, each gets {{nz.nz-super-net-m[couple-each]}} a fortnight after tax at the M code.",
    },
  ],
  glosario: [
    { termino: "NZ Super", definicion: "New Zealand Superannuation, the pension paid by Work and Income." },
    { termino: "M tax code", definicion: "The main tax code, used when NZ Super is your main source of income." },
  ],
});
