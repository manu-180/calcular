import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.stamp-duty-calculator",
  h1: "Stamp duty calculator Malaysia (MOT)",
  title: "Stamp duty calculator Malaysia: property transfer (MOT)",
  description: "Work out the stamp duty on a property transfer (memorandum of transfer) with the HASiL scale, including the rates for foreign buyers.",
  intro: [
    "When you buy property in Malaysia, the transfer instrument (MOT) pays stamp duty on the price or the market value, whichever is higher.",
    "The buyer pays it. Enter the value and who is buying to see the amount.",
  ],
  comoSeCalcula: [
    "The duty is charged for every RM100 or part of it, band by band: 1% on the first RM100,000, 2% up to RM500,000, 3% up to RM1,000,000 and 4% above.",
    "A foreign company or a non-citizen who is not a permanent resident pays a flat {{my.stamp-duty-foreign}} instead.",
    "From 1 January 2026, residential property sold to foreigners pays a flat {{my.stamp-duty-foreign-residential}}.",
  ],
  ejemplo: ["On a RM500,000 home bought by a Malaysian: RM1,000 on the first RM100,000 plus RM8,000 on the next RM400,000, so RM9,000."],
  faq: [
    {
      pregunta: "Who pays the stamp duty on a property transfer?",
      respuesta: "The buyer, or the person the property is transferred to.",
    },
    {
      pregunta: "Is it charged on the price I pay?",
      respuesta: "On the price or the market value of the property, whichever is higher.",
    },
    {
      pregunta: "Does this include the loan agreement?",
      respuesta: "No. The loan agreement is a separate instrument with its own stamp duty. This calculator covers the transfer only.",
    },
  ],
  glosario: [
    { termino: "MOT", definicion: "Memorandum of transfer, the instrument that moves ownership of the property." },
    { termino: "Ad valorem", definicion: "Duty worked out as a share of the value, not a fixed amount." },
  ],
});
