import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.pension-lump-sum-tax",
  h1: "Pension and provident fund lump sum tax calculator",
  title: "Provident fund lump sum tax calculator Botswana",
  description: "Work out the tax on a lump sum from a provident or pension fund in Botswana: half is tax-free and the rest is taxed or moved to a fund that pays a pension.",
  intro: [
    "When you leave a provident fund or retire, half of the lump sum is tax-free. You can take the other half in cash and pay tax on it, or move it to an approved fund that pays you a pension.",
    "Enter the lump sum and your other income for the tax year to see the tax and what lands in your account.",
  ],
  comoSeCalcula: [
    "{{bw.lump-sum-exempt-share}} of the lump sum is the non-taxable amount.",
    "If you take the rest in cash, it is added to your other income for the year and taxed at the resident rates.",
    "The tax on the lump sum is the difference between the tax with it and the tax without it.",
  ],
  ejemplo: [
    "A payout of P300 000 with no other income: P150 000 is tax-free and P150 000 is taxed. The tax is P11 925, so you receive P288 075.",
  ],
  faq: [
    {
      pregunta: "How much of my provident fund is tax-free?",
      respuesta: "Half. Section 19 of the Income Tax Act, 2026 sets the non-taxable amount at {{bw.lump-sum-exempt-share}} of the pension or lump sum.",
    },
    {
      pregunta: "Can I avoid tax on the other half?",
      respuesta: "You can transfer it to an approved retirement fund in return for a pension or annuity. Then it is not taxed now; the pension is taxed as you receive it, with half of each payment exempt.",
    },
    {
      pregunta: "Is a pension also half tax-free?",
      respuesta: "Yes. The same section makes {{bw.lump-sum-exempt-share}} of a pension from an approved retirement fund exempt and taxes the rest.",
    },
  ],
  glosario: [
    { termino: "Provident fund", definicion: "A retirement fund that pays out a lump sum when you leave it." },
    { termino: "Annuity", definicion: "A regular payment for life or for a period, bought with a lump sum." },
  ],
});
