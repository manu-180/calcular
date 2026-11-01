import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm-en.impot-general-synthetique",
  h1: "Global synthetic tax (IGS) calculator",
  title: "Global synthetic tax (IGS) Cameroon: how much to pay",
  description:
    "Work out your IGS from your turnover before tax, with the {{cm.igs-reduction-cga}} reduction for members of an approved management centre.",
  intro: [
    "The global synthetic tax (IGS) is the tax for small businesses. It replaces the business licence, VAT and income tax on profits.",
    "It is a fixed amount set by your band of yearly turnover before tax.",
  ],
  comoSeCalcula: [
    "The amount runs from {{cm.igs-bareme[0].cuotaFija}} a year below {{cm.igs-bareme[1].desde}} of turnover to {{cm.igs-bareme[-1].cuotaFija}} in the top band.",
    "IGS covers turnover below {{cm.igs-seuils[commercial]}} for trade, industry, crafts or agro-pastoral work, and below {{cm.igs-seuils[liberal]}} for liberal professions.",
    "Joining an approved management centre cuts the amount by {{cm.igs-reduction-cga}} for taxpayers who must keep accounts.",
  ],
  ejemplo: ["A shop with 8,000,000 F turnover pays 300,000 F IGS a year, or 75,000 F a quarter."],
  faq: [
    {
      pregunta: "When is IGS paid?",
      respuesta: "Every quarter, within fifteen days after it ends, through an online return. The yearly income return is due by 15 March.",
    },
    {
      pregunta: "What if I go over the threshold?",
      respuesta: "You are moved automatically to the actual earnings regime. You then pay VAT, income or company tax and the business licence.",
    },
    {
      pregunta: "Does IGS cover charges on my staff?",
      respuesta: "No. You still owe withholding taxes, licences and payroll taxes and contributions on your employees.",
    },
  ],
  glosario: [{ termino: "Approved management centre", definicion: "A body that helps small businesses keep their accounts and file returns." }],
});
