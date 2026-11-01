import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.paye-calculator",
  h1: "PAYE calculator Fiji {{anio}}",
  title: "PAYE calculator Fiji {{anio}}: tax on your pay",
  description:
    "Work out the PAYE on your wages with the current FRCS bands. The first {{fj.paye-bands[1].desde}} of income is tax free. Weekly, fortnightly, monthly or yearly pay.",
  intro: [
    "The first {{fj.paye-bands[1].desde}} you earn in a year carries no income tax in Fiji. Above that, the rate starts at {{fj.paye-bands[1].tasa}} and climbs to {{fj.paye-bands[-1].tasa}} on income over {{fj.paye-bands[-1].desde}}.",
    "Enter your gross pay and choose how often you are paid. You see the PAYE for each pay, the tax over a full year and your average rate. Pick non-resident to use the flatter table that FRCS publishes for people who are not tax resident.",
  ],
  comoSeCalcula: [
    "PAYE stands for Pay As You Earn. Your employer takes the tax out of each pay and sends it to the Fiji Revenue and Customs Service (FRCS).",
    "Each part of your yearly income is taxed at the rate of its own band. Income from {{fj.paye-bands[1].desde}} to {{fj.paye-bands[2].desde}} is taxed at {{fj.paye-bands[1].tasa}}, and income from {{fj.paye-bands[2].desde}} to {{fj.paye-bands[3].desde}} at {{fj.paye-bands[2].tasa}}. Higher bands step up from {{fj.paye-bands[3].tasa}}.",
    "The calculator turns your pay into a yearly amount, applies the bands, and divides the tax back into your pay periods. This matches how Regulation 6 of the Income Tax (Withholding Tax) Regulations 2013 treats a steady wage.",
    "A non-resident pays {{fj.paye-bands-non-resident[0].tasa}} on income up to {{fj.paye-bands-non-resident[0].hasta}}, then the same rates as a resident above that.",
  ],
  ejemplo: [
    "Say you earn FJ$5,000 a month. Over a year that is FJ$60,000. The first FJ$30,000 is tax free, the next FJ$20,000 is taxed at 18% (FJ$3,600) and the last FJ$10,000 at 20% (FJ$2,000). Your yearly income tax is FJ$5,600, so your employer holds back FJ$466.67 from each monthly pay and you keep FJ$4,533.33 before FNPF.",
  ],
  faq: [
    {
      pregunta: "What is the tax free threshold in Fiji?",
      respuesta:
        "A resident pays no income tax on the first {{fj.paye-bands[1].desde}} of chargeable income. FRCS publishes the bands on its tax rates page, and they apply from the 2024 tax year until the Income Tax Regulations are amended.",
    },
    {
      pregunta: "Is Social Responsibility Tax still charged?",
      respuesta:
        "No. FRCS lists Social Responsibility Tax as ending with the 2023 tax year. The higher bands from {{fj.paye-bands[3].desde}} upward now carry the rates of {{fj.paye-bands[3].tasa}} to {{fj.paye-bands[-1].tasa}}.",
    },
    {
      pregunta: "How much is withheld if I do not give my employer a tax code?",
      respuesta:
        "Your employer must deduct {{fj.paye-no-declaration-rate}} of your gross pay if no tax code declaration arrives within five working days of you starting. The Employer Guide 2026 sets this rule. Fill in the declaration form (IRS 458A) to move to normal PAYE.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn, the income tax your employer withholds from each pay and pays to FRCS." },
    { termino: "Chargeable income", definicion: "Income that is subject to tax after exempt amounts and allowed deductions." },
    { termino: "Tax code P", definicion: "The code for your main job. Other jobs use code S." },
  ],
});
