import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.usd-to-cad",
  h1: "USD to CAD converter (Bank of Canada rate)",
  title: "USD to CAD converter with the Bank of Canada rate",
  description: "Convert US dollars to Canadian dollars, or back, with the latest daily average exchange rate published by the Bank of Canada.",
  intro: [
    "Enter an amount to convert between US and Canadian dollars at the Bank of Canada's daily average rate.",
    "The rate updates every business day, so you see the date of the rate used next to the result.",
  ],
  comoSeCalcula: [
    "The Bank of Canada publishes one indicative rate per business day: how many Canadian dollars one US dollar is worth.",
    "US dollars are multiplied by that rate to get Canadian dollars. Canadian dollars are divided by it to get US dollars.",
  ],
  ejemplo: ["At a rate of 1.4222, US$100 is CA$142.22, and CA$100 is about US$70.31."],
  faq: [
    {
      pregunta: "Is this the rate my bank will give me?",
      respuesta: "No. The Bank of Canada rate is an average for reference. Banks, exchange offices and card issuers add their own margin.",
    },
    {
      pregunta: "Where does the rate come from?",
      respuesta: "From the Bank of Canada's FXUSDCAD series: the daily average exchange rate of the US dollar in Canadian dollars.",
    },
    {
      pregunta: "Why is there no rate on weekends?",
      respuesta: "The Bank of Canada publishes rates on business days only. On weekends and holidays the latest business day's rate is used.",
    },
  ],
  glosario: [
    { termino: "Daily average rate", definicion: "The Bank of Canada's indicative exchange rate for a business day." },
    { termino: "USD/CAD", definicion: "The number of Canadian dollars needed to buy one US dollar." },
  ],
});
