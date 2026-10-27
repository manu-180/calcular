import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.company-tax-calculator",
  h1: "Company tax calculator Botswana",
  title: "Company tax calculator Botswana: the new 24.5% rate",
  description: "Work out company income tax in Botswana at {{bw.company-tax[general]}} under the Income Tax Act, 2026, and the withholding tax when the profit is paid out as dividends.",
  intro: [
    "From 1 July 2026 most companies in Botswana pay income tax at {{bw.company-tax[general]}} of their taxable income. Enter the taxable income and the type of company to see the tax and the profit left over.",
    "If the company pays dividends to resident shareholders, it withholds {{bw.wht-resident[dividends]}} from them. Add the share of the profit you plan to pay out to see that too.",
  ],
  comoSeCalcula: [
    "Company tax is a flat rate on taxable income: {{bw.company-tax[general]}} for most companies, {{bw.company-tax[ifsc]}} for an IFSC company on its approved financial operations and {{bw.company-tax[mutual]}} for a mutual association.",
    "Profit after tax is the taxable income less the tax.",
    "Dividends to residents carry a withholding tax of {{bw.wht-resident[dividends]}}, which the company pays to BURS.",
  ],
  ejemplo: [
    "A company with taxable income of P1 000 000 pays P245 000 of company tax. If it pays out half of the P755 000 left, shareholders receive P377 500 less P37 750 of withholding tax.",
  ],
  faq: [
    {
      pregunta: "What is the company tax rate in Botswana?",
      respuesta: "{{bw.company-tax[general]}} from 1 July 2026, set in Schedule 1 of the Income Tax Act, 2026. Mining companies other than diamond companies with a Government stake pay the higher of a formula rate and the general rate.",
    },
    {
      pregunta: "Do non-resident companies pay a different rate?",
      respuesta: "The Act sets one rate for companies, {{bw.company-tax[general]}}. A non-resident that sends profits home from a Botswana branch also pays a withholding tax on the repatriated profit.",
    },
    {
      pregunta: "Is taxable income the same as accounting profit?",
      respuesta: "No. It is gross income less the deductions the Income Tax Act allows, and the Act has its own rules for items such as depreciation. Use the figure from your tax computation.",
    },
  ],
  glosario: [
    { termino: "IFSC company", definicion: "A company certified to operate in the International Financial Services Centre." },
    { termino: "Withholding tax", definicion: "Tax the payer takes from a payment and sends to BURS on behalf of the person paid." },
  ],
});
