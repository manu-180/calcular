import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.turnover-tax-calculator",
  h1: "Turnover tax calculator Nepal {{anio}}",
  title: "Turnover tax calculator Nepal {{anio}}: small business tax",
  description: "Work out the turnover tax for a small Nepali business: a fixed amount up to NPR 30 lakh, then {{np.turnover-rate-3-5m[goods]}} to {{np.turnover-rate-3-5m[services]}} of the next slices up to NPR 1 crore.",
  intro: [
    "A small business with limited income can pay turnover tax instead of tax on its profit. Enter your yearly turnover, the place where you operate and the type of business, and the calculator adds up the amount.",
    "The tax is the Inland Revenue Department's rule for the 2083/84 income year and is filed with the Day-02 income statement.",
  ],
  comoSeCalcula: [
    "Turnover up to {{np.turnover-limit-low}} pays only a fixed amount: {{np.turnover-fixed-tax[metro]}} in a metropolitan or sub-metropolitan city, {{np.turnover-fixed-tax[municipality]}} in a municipality and {{np.turnover-fixed-tax[other]}} elsewhere.",
    "Between {{np.turnover-limit-low}} and {{np.turnover-limit-mid}}, you add a rate on the slice above the first limit: {{np.turnover-rate-3-5m[fuel]}} for gas, cigarettes and other goods sold on a margin of up to 3%, {{np.turnover-rate-3-5m[goods]}} for other goods and {{np.turnover-rate-3-5m[services]}} for services.",
    "Between {{np.turnover-limit-mid}} and {{np.turnover-limit-high}}, the rates on the slice above the second limit are {{np.turnover-rate-5-10m[fuel]}}, {{np.turnover-rate-5-10m[goods]}} and {{np.turnover-rate-5-10m[services]}}. The lower slices keep their own amounts, and the total is the sum.",
  ],
  ejemplo: ["A shop selling goods in a metropolitan city with turnover of NPR 40 lakh pays NPR 7,500 plus 1% of the NPR 10 lakh above NPR 30 lakh. The tax is NPR 17,500."],
  faq: [
    {
      pregunta: "Who can pay turnover tax in Nepal?",
      respuesta: "A resident individual whose only income is business income from Nepal, whose taxable business income is NPR 10 lakh or less, whose turnover is above NPR 30 lakh and up to NPR 1 crore, and who earns nothing from professional or expert services.",
    },
    {
      pregunta: "When do I pay it?",
      respuesta: "In two instalments. The first is due by the end of Poush on turnover to Poush 20, and the second by the end of Asar on estimated turnover for the year, less what you already paid.",
    },
    {
      pregunta: "What if my turnover is below NPR 30 lakh?",
      respuesta: "A business with income up to NPR 3 lakh and turnover up to NPR 30 lakh pays a fixed amount under the presumptive tax, which is NPR 7,500, 4,000 or 2,500 depending on where it operates.",
    },
  ],
  glosario: [
    { termino: "Turnover", definicion: "The total sales of a business in the income year, before costs." },
    { termino: "Presumptive tax", definicion: "A fixed tax that replaces the calculation of profit for very small businesses." },
  ],
});
