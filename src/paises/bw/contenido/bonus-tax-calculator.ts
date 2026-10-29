import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.bonus-tax-calculator",
  h1: "Bonus tax calculator Botswana",
  title: "Bonus tax calculator: PAYE on a bonus in Botswana",
  description: "See how much PAYE comes off a bonus, a 13th cheque or any one-off payment in Botswana, worked out the way the BURS tax table tells employers to do it.",
  intro: [
    "A bonus is taxed at your top rates, not at your average rate, so the tax on it is often higher than you expect. Enter your regular monthly salary and the bonus to see what you will actually receive.",
  ],
  comoSeCalcula: [
    "Your regular salary is turned into a yearly amount.",
    "The tax on that yearly amount is worked out with and without the bonus, using the annual tax table.",
    "The difference is the PAYE your employer withholds from the bonus.",
  ],
  ejemplo: [
    "This is the BURS example: an employee on P4 000 a month gets a bonus of one month. Regular pay is P48 000 a year, which pays no tax. With the bonus it is P52 000, which pays P200. So P200 comes off the bonus.",
  ],
  faq: [
    {
      pregunta: "Why is so much tax taken from my bonus?",
      respuesta: "The whole bonus sits on top of your regular pay, so it is taxed at your marginal rate. With a yearly income above {{bw.paye-resident[-1].desde}} that rate is {{bw.paye-resident[-1].tasa}}.",
    },
    {
      pregunta: "Is a 13th cheque taxed the same way?",
      respuesta: "Yes. Any additional payment on top of a regular salary, such as a 13th cheque, a performance bonus or occasional overtime, is taxed with this method in the BURS tax table.",
    },
    {
      pregunta: "Will I get some of the tax back?",
      respuesta: "Not if your income for the year turns out as expected. The method already spreads the tax correctly over the year, so the PAYE withheld should match the tax you owe.",
    },
  ],
  glosario: [
    { termino: "Marginal rate", definicion: "The rate on the last pula you earn, which is the rate a bonus pays." },
  ],
});
