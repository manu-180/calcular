import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.treasury-bill-calculator",
  h1: "Treasury bill calculator Kenya",
  title: "Treasury bill calculator Kenya: price, tax and return",
  description: "Work out what you pay CBK for a 91, 182 or 364 day Treasury bill, the {{ke.tbill-wht}} withholding tax and your return at maturity.",
  intro: [
    "Treasury bills are sold at a discount. You pay less now and receive the full face value when the bill matures.",
    "Enter the face value, the tenor and the rate to see the price, the tax and what you earn.",
  ],
  comoSeCalcula: [
    "The price for every KSh 100 of face value is 100 divided by (1 plus the rate times the days, over 36,500). That is the formula in the CBK example.",
    "The discount (face value less price) is your interest.",
    "Withholding tax of {{ke.tbill-wht}} on the discount is added to what you pay, unless you have a tax exemption certificate from KRA.",
  ],
  ejemplo: ["A KSh 100,000 bill for 91 days at 9% costs KSh 97,805.41 plus KSh 329.19 of tax. At maturity you get KSh 100,000, a return of KSh 1,865.40."],
  faq: [
    {
      pregunta: "What rate should I use?",
      respuesta: "Use the average rate of the last auction, which CBK publishes every week, or the rate you plan to bid.",
    },
    {
      pregunta: "What is the minimum investment?",
      respuesta: "CBK accepts non-competitive bids from KSh 50,000 of face value. You need an active CSD account.",
    },
    {
      pregunta: "Do I declare the interest in my tax return?",
      respuesta: "The {{ke.tbill-wht}} withholding is charged on the discount when you buy. Ask KRA if you have other income to declare with it.",
    },
  ],
  glosario: [
    { termino: "Face value", definicion: "The amount the Government pays you when the bill matures." },
    { termino: "Discount", definicion: "Face value less the price you pay. It is your interest." },
  ],
});
