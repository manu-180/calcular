import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.inflation-calculator",
  h1: "Barbados inflation calculator {{anio}}",
  title: "Inflation calculator {{anio}}: what last year's prices cost now",
  description:
    "See what a price from a year ago costs today using the latest Retail Price Index change, currently {{bb.inflation}}, published by the Barbados Statistical Service.",
  intro: [
    "The Barbados Statistical Service publishes the Retail Price Index each month, with the change in the All Items Index over 12 months. The latest figure is {{bb.inflation}}, for the month starting {{bb.inflation#desde}}.",
    "Enter a price from a year ago and the calculator shows what the same basket of goods and services costs now. It is a quick way to check a rent increase, a wage rise or a quote.",
  ],
  comoSeCalcula: [
    "The rate comes from the point to point change in the All Items Index, with the base July 2018 equal to 100.",
    "New price: the price a year ago multiplied by one plus the rate. At {{bb.inflation}}, a Bds$1,000 item now costs Bds$1,016.",
    "Increase: the difference between the two prices.",
    "Each monthly bulletin appears two to three months after the month it describes, so the latest rate is always a few months behind the calendar.",
  ],
  ejemplo: [
    "A landlord charged Bds$2,500 a month last year. If rent moved with inflation of 1.6%, the same flat would now cost Bds$2,540.00, an increase of Bds$40.00. A worker on Bds$4,000 a month needs at least Bds$4,064.00 to buy the same things as a year ago.",
  ],
  faq: [
    {
      pregunta: "What is the inflation rate in Barbados?",
      respuesta: "The Barbados Statistical Service reports the 12 month change in the Retail Price Index. The latest rate in this calculator is {{bb.inflation}}.",
    },
    {
      pregunta: "Where does the rate come from?",
      respuesta: "From the Statistical Bulletin on the Retail Price Index, based on July 2018 equal to 100, published by the Barbados Statistical Service.",
    },
    {
      pregunta: "Why is the rate a few months old?",
      respuesta: "The bulletin for a month is posted two to three months later, so the newest figure covers an earlier month than today.",
    },
  ],
  glosario: [
    { termino: "Retail Price Index", definicion: "A measure of the change in the prices households pay, published monthly by the Barbados Statistical Service." },
    { termino: "Point to point", definicion: "A comparison of one month with the same month a year earlier." },
    { termino: "All Items Index", definicion: "The overall index that combines every group of goods and services." },
  ],
});
