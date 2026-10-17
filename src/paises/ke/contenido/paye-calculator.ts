import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.paye-calculator",
  h1: "PAYE calculator Kenya",
  title: "PAYE calculator Kenya 2026: monthly tax with KRA bands",
  description:
    "Work out your monthly PAYE with the KRA bands from {{ke.paye-bands[0].tasa}} to {{ke.paye-bands[-1].tasa}}, after NSSF, SHIF and Housing Levy, less the personal relief of {{ke.personal-relief}}.",
  intro: [
    "Enter your gross pay for the month to see the PAYE your employer should deduct. The calculator takes off NSSF, SHIF and the Housing Levy first, because all three lower your taxable pay.",
    "If you pay into a pension scheme, a post-retirement medical fund, a mortgage or insurance, add those too. They can lower your tax further.",
  ],
  comoSeCalcula: [
    "NSSF is {{ke.nssf-rate}} of your pay up to {{ke.nssf-uel}}. SHIF is {{ke.shif-rate}} of gross pay with a minimum of {{ke.shif-minimum}}. The Housing Levy is {{ke.housing-levy-rate}} of gross pay.",
    "Pension contributions, NSSF included, are deductible up to {{ke.pension-deduction-cap}} a month. Mortgage interest is deductible up to {{ke.mortgage-interest-cap}} and a post-retirement medical fund up to {{ke.medical-fund-cap}}.",
    "The first {{ke.paye-bands[0].hasta}} of taxable pay is taxed at {{ke.paye-bands[0].tasa}}. Pay up to {{ke.paye-bands[1].hasta}} is taxed at {{ke.paye-bands[1].tasa}}, up to {{ke.paye-bands[2].hasta}} at {{ke.paye-bands[2].tasa}}, up to {{ke.paye-bands[3].hasta}} at {{ke.paye-bands[3].tasa}}, and anything above at {{ke.paye-bands[-1].tasa}}.",
    "From that tax you take off the personal relief of {{ke.personal-relief}} and the insurance relief: {{ke.insurance-relief-rate}} of your premiums, up to {{ke.insurance-relief-cap}} a year. What is left is your PAYE.",
  ],
  ejemplo: [
    "On KSh 100,000 a month, NSSF is KSh 6,000, SHIF KSh 2,750 and the Housing Levy KSh 1,500. Taxable pay is KSh 89,750, tax before reliefs is KSh 21,708.35 and PAYE is KSh 19,308.35.",
  ],
  faq: [
    {
      pregunta: "Are SHIF and the Housing Levy deducted before tax?",
      respuesta: "Yes. KRA lists both as allowable deductions, so they come off your gross pay before the tax bands apply.",
    },
    {
      pregunta: "When is PAYE due?",
      respuesta: "Your employer deducts it each month and pays it to KRA on or before the 9th day of the following month, with a PAYE return filed on iTax.",
    },
    {
      pregunta: "How much personal relief do I get?",
      respuesta: "Resident individuals get {{ke.personal-relief}} a month. It comes off the tax, not off your pay.",
    },
    {
      pregunta: "Are meals or medical cover from my employer taxed?",
      respuesta: "Medical cover from your employer is not taxed. Meals are not taxed up to KSh 5,000 a month. Other benefits are taxed once they pass KSh 5,000 a month.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn: income tax your employer deducts from your salary each month." },
    { termino: "Taxable pay", definicion: "Gross pay less allowable deductions such as NSSF, SHIF and the Housing Levy." },
    { termino: "Personal relief", definicion: "A fixed amount that every resident employee takes off the tax each month." },
  ],
});
