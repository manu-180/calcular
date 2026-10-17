import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.retirement-savings-account-calculator",
  h1: "RSA retirement savings calculator",
  title: "RSA calculator: your pension savings at retirement",
  description:
    "Estimate your Retirement Savings Account balance at retirement with {{ng.pension-employee}} from you, {{ng.pension-employer}} from your employer and the return you expect.",
  intro: [
    "Every month, at least 18% of your emoluments goes into your Retirement Savings Account. Enter your pay and years to retirement to see what it could grow to.",
    "The return is an assumption. Your Pension Fund Administrator's results will differ year by year.",
  ],
  comoSeCalcula: [
    "Each month you pay {{ng.pension-employee}} and your employer {{ng.pension-employer}} of your basic, housing and transport allowances.",
    "The balance grows at the monthly rate, which is the yearly return divided by 12. Your pay rises by the percentage you enter at the start of each year.",
  ],
  ejemplo: ["On ₦450,000 a month with 10% raises and 12% returns, 25 years of contributions could reach about ₦343 million."],
  faq: [
    {
      pregunta: "Is a 12% return realistic?",
      respuesta: "It depends on the fund and on inflation. Try several rates to see a range rather than one number.",
    },
    {
      pregunta: "Can I add voluntary contributions?",
      respuesta: "Yes. You can pay more than the minimum, within the limits PenCom sets. Add them to the emoluments here to see the effect.",
    },
    {
      pregunta: "What happens at retirement?",
      respuesta: "You draw your benefits through programmed withdrawal from your PFA or buy an annuity from a life insurer, under the rules of the Pension Reform Act.",
    },
  ],
  glosario: [
    { termino: "RSA", definicion: "Retirement Savings Account, opened with a Pension Fund Administrator." },
    { termino: "PFA", definicion: "Pension Fund Administrator, the company that invests your savings." },
  ],
});
