import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.profits-tax-calculator",
  h1: "Profits tax calculator Hong Kong",
  title: "Profits tax calculator Hong Kong: two-tiered rates",
  description:
    "Work out Hong Kong profits tax with the two-tiered rates: {{hk.profits-tax-corporations[0].tasa}} on the first {{hk.profits-tax-corporations[0].hasta}} for companies and {{hk.profits-tax-unincorporated[0].tasa}} for unincorporated firms.",
  intro: [
    "Profits tax is charged on the profits a business makes in Hong Kong. Companies and unincorporated businesses have different rates.",
    "Under the two-tiered system, the first part of the profits pays a lower rate. Enter your assessable profits to see the tax.",
  ],
  comoSeCalcula: [
    "Corporations pay {{hk.profits-tax-corporations[0].tasa}} on assessable profits up to {{hk.profits-tax-corporations[0].hasta}} and {{hk.profits-tax-corporations[-1].tasa}} on the rest.",
    "Unincorporated businesses pay {{hk.profits-tax-unincorporated[0].tasa}} up to {{hk.profits-tax-unincorporated[0].hasta}} and {{hk.profits-tax-unincorporated[-1].tasa}} on the rest.",
    "If a one-off reduction applies to the year, it comes off the tax, up to the cap.",
  ],
  ejemplo: ["A company with $3 million of assessable profits pays $165,000 on the first $2 million and $165,000 on the next $1 million: $330,000 in total."],
  faq: [
    {
      pregunta: "What is the profits tax rate for a company in Hong Kong?",
      respuesta: "{{hk.profits-tax-corporations[0].tasa}} on the first {{hk.profits-tax-corporations[0].hasta}} of assessable profits and {{hk.profits-tax-corporations[-1].tasa}} on the rest.",
    },
    {
      pregunta: "And for a sole proprietor or partnership?",
      respuesta: "{{hk.profits-tax-unincorporated[0].tasa}} on the first {{hk.profits-tax-unincorporated[0].hasta}} and {{hk.profits-tax-unincorporated[-1].tasa}} on the rest.",
    },
    {
      pregunta: "Is there a profits tax reduction for 2025/26?",
      respuesta: "Yes. The 2025/26 profits tax is reduced by 100%, up to {{hk.tax-reduction-cap[2025-26]}} for each business.",
    },
  ],
  glosario: [
    { termino: "Assessable profits", definicion: "The profits that profits tax is charged on, after allowable expenses." },
    { termino: "Two-tiered rates", definicion: "A lower rate on the first part of the profits and the normal rate on the rest." },
  ],
});
