import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.paye-calculator",
  h1: "PAYE calculator Rwanda",
  title: "PAYE calculator Rwanda 2026: tax on your monthly pay",
  description:
    "Work out the PAYE withheld from your monthly pay with the RRA bands up to {{rw.paye-bands[3].tasa}}. Covers second jobs and casual labour.",
  intro: [
    "Enter your gross pay for the month and see how much PAYE comes off it. PAYE is the income tax your employer deducts and pays to the Rwanda Revenue Authority for you.",
    "You can also check a second job, where the rate is flat, and casual labour, which has its own rate.",
  ],
  comoSeCalcula: [
    "Main job: the first {{rw.paye-bands[1].desde}} of the month is tax free. Pay from {{rw.paye-bands[1].desde}} to {{rw.paye-bands[2].desde}} is taxed at {{rw.paye-bands[1].tasa}}, pay up to {{rw.paye-bands[3].desde}} at {{rw.paye-bands[2].tasa}} and anything above at {{rw.paye-bands[3].tasa}}.",
    "Each rate applies only to the slice of pay inside its band. The RRA rounds the tax up to the next whole franc.",
    "Second job: the employer who is not your first employer withholds {{rw.paye-secondary-rate}} of everything it pays you.",
    "Casual labour: the first {{rw.casual-threshold}} of the month is taxed at 0% and the rest at {{rw.casual-rate}}.",
  ],
  ejemplo: [
    "On a gross salary of RWF 300,000 the tax is RWF 4,000 on the second band, RWF 20,000 on the third and RWF 30,000 on the top band. PAYE is RWF 54,000 and you keep RWF 246,000 before RSSB contributions.",
  ],
  faq: [
    {
      pregunta: "Is PAYE worked out on gross pay?",
      respuesta: "Yes. The RRA applies the bands to gross pay, which includes allowances such as transport and housing and benefits in kind.",
    },
    {
      pregunta: "Why does my second employer take so much?",
      respuesta: "Only your first employer can apply the tax-free band and the lower rates. Any other employer withholds a flat {{rw.paye-secondary-rate}} of what it pays you.",
    },
    {
      pregunta: "Who counts as a casual labourer?",
      respuesta: "Someone doing work that needs no special skills for 30 days or fewer in a 12-month period. They pay {{rw.casual-rate}} on what they earn above {{rw.casual-threshold}} in the month.",
    },
    {
      pregunta: "Does this include RSSB pension and CBHI?",
      respuesta: "No, this page shows PAYE only. Use the net salary calculator to see pension, maternity and CBHI as well.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn, the tax on employment income that your employer withholds." },
    { termino: "RRA", definicion: "Rwanda Revenue Authority, which collects PAYE and RSSB contributions." },
    { termino: "Marginal rate", definicion: "The rate that applies to the last franc you earn in the month." },
  ],
});
