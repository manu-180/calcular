import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.housing-benefit-calculator",
  h1: "Housing benefit tax calculator Botswana",
  title: "Housing benefit tax Botswana: PAYE on employer housing",
  description: "Work out the taxable value of a house your employer provides in Botswana and the extra PAYE it adds, with the BURS regulations and housing benefit table.",
  intro: [
    "A house or flat your employer rents or owns for you is a non-cash benefit. Its value is added to your pay and taxed through PAYE, up to a cap based on your income.",
    "Choose how the house is provided, enter its rent, rateable value or floor area, and your yearly employment income.",
  ],
  comoSeCalcula: [
    "If your employer rents the house, the yearly value is the rent it pays.",
    "If it owns the house and the council has valued it, the value is {{bw.housing-benefit-rates[rateable]}} of the rateable value.",
    "If it owns a house with no rateable value, the value is {{bw.housing-benefit-rates[not-rateable]}} of a capital valuation of {{bw.housing-capital-factor}} per square metre of floor area.",
    "The taxable benefit cannot be more than a percentage of your employment income from the BURS housing benefit table, less anything you pay for the house. Above P58 600 a year that percentage is {{bw.housing-benefit-cap}}.",
    "The extra PAYE is the tax on your income with the benefit less the tax without it.",
  ],
  ejemplo: [
    "Your employer rents a house for you at P6 000 a month and you earn P300 000 a year. The benefit is P72 000 a year, under the cap of P82 500, and adds P1 500 a month to your PAYE.",
  ],
  faq: [
    {
      pregunta: "Is free housing from my employer taxable?",
      respuesta: "Yes. The Income Tax Regulations treat a quarter or residence your employer provides as a housing benefit and add its value to your employment income.",
    },
    {
      pregunta: "What if I only had the house for part of the year?",
      respuesta: "The value is pro-rated by the months you had the house, and the cap uses the rent you paid during that period.",
    },
    {
      pregunta: "Can BURS use a lower value per square metre?",
      respuesta: "Yes. If the standard of the building makes {{bw.housing-capital-factor}} per square metre too high, the Commissioner General can apply a smaller factor, but not less than P1 700.",
    },
  ],
  glosario: [
    { termino: "Rateable value", definicion: "The value of a property on the valuation roll of the local authority, used for council rates." },
    { termino: "Housing benefit table", definicion: "The table BURS publishes with the percentage of income that caps the taxable housing benefit." },
  ],
});
