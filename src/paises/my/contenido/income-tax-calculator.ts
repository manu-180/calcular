import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.income-tax-calculator",
  h1: "Income tax calculator Malaysia (YA 2026)",
  title: "Malaysia income tax calculator: YA 2026 rates and reliefs",
  description: "Estimate your income tax with the HASiL rates for resident individuals, the main personal reliefs, the tax rebate and zakat.",
  intro: [
    "Enter your income for the year and the reliefs you can claim. You get your chargeable income, the tax for the year and your effective rate.",
    "It uses the progressive rates for resident individuals, from 0% on the first RM5,000 of chargeable income up to 30% on income above RM2 million.",
  ],
  comoSeCalcula: [
    "Your reliefs come off your income: {{my.tax-reliefs[individual]}} for yourself, {{my.tax-reliefs[spouse]}} for a husband or wife with no income, {{my.tax-reliefs[child-under-18]}} for each child under 18 and {{my.tax-reliefs[child-higher-education]}} for each child at diploma level or above.",
    "Claims with a limit are capped: EPF at {{my.tax-reliefs[epf]}}, life insurance at {{my.tax-reliefs[life-insurance]}}, education and medical insurance at {{my.tax-reliefs[education-medical-insurance]}}, lifestyle at {{my.tax-reliefs[lifestyle]}}, sports at {{my.tax-reliefs[sports]}}, PRS at {{my.tax-reliefs[prs]}} and SOCSO at {{my.tax-reliefs[socso]}}.",
    "The tax rates apply band by band to what is left, your chargeable income.",
    "If your chargeable income is {{my.tax-rebate-threshold}} or less, a rebate of {{my.tax-rebate-individual}} comes off the tax, plus {{my.tax-rebate-spouse}} if your husband or wife has no income.",
    "Zakat comes off last, up to the tax you owe.",
  ],
  ejemplo: [
    "A single person earning RM72,000 a year with RM7,920 of EPF claims RM9,000 for themselves and RM4,000 of EPF. Chargeable income is RM59,000 and the tax is RM2,490, about RM207.50 a month.",
  ],
  faq: [
    {
      pregunta: "What is the tax-free amount in Malaysia?",
      respuesta:
        "The first RM5,000 of chargeable income is taxed at 0%. With the individual relief of {{my.tax-reliefs[individual]}} and the rebate for chargeable income up to {{my.tax-rebate-threshold}}, many people with modest salaries pay no tax at all.",
    },
    {
      pregunta: "How much EPF can I claim?",
      respuesta:
        "Up to {{my.tax-reliefs[epf]}} a year for compulsory or approved scheme contributions. Life insurance, family takaful and voluntary EPF have their own limit of {{my.tax-reliefs[life-insurance]}}.",
    },
    {
      pregunta: "Who gets the tax rebate?",
      respuesta:
        "A resident individual whose chargeable income is {{my.tax-rebate-threshold}} or less. If your husband or wife has no income, the rebate is {{my.tax-rebate-individual}} plus {{my.tax-rebate-spouse}}.",
    },
    {
      pregunta: "Does zakat reduce my tax?",
      respuesta: "Yes. Zakat and fitrah are a rebate: they come off the tax itself, up to the amount of tax charged.",
    },
  ],
  glosario: [
    { termino: "YA (year of assessment)", definicion: "The calendar year whose income is taxed. YA 2026 covers income from January to December 2026." },
    { termino: "Relief", definicion: "An amount that comes off your income before the tax rates apply." },
    { termino: "Rebate", definicion: "An amount that comes off the tax itself." },
  ],
});
