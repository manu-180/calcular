import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kw.gold-zakat-calculator",
  h1: "Zakat on gold calculator Kuwait",
  title: "Zakat on gold Kuwait: by weight and carat",
  description: "Work out zakat on your gold by weight and carat with today's gram prices from Kuwait Zakat House: 24, 22, 21 and 18 carat.",
  intro: [
    "Enter the grams of gold you own by carat. The calculator values it at today's prices and applies the zakat rate.",
    "Gram prices come from Kuwait Zakat House, which links them to the prices announced by the Ministry of Commerce and Industry.",
  ],
  comoSeCalcula: [
    "Each weight is multiplied by the price of a gram of that carat: 24 carat is {{kw.gold-24k}}, 22 carat {{kw.gold-22k}}, 21 carat {{kw.gold-21k}} and 18 carat {{kw.gold-18k}}.",
    "The values are added up.",
    "Zakat is {{kw.zakat-rate}} of the total, the rate Kuwait Zakat House applies.",
  ],
  ejemplo: ["100 grams of 21 carat gold at KD 36.44 a gram is worth KD 3,644, so zakat is KD 91.100."],
  faq: [
    {
      pregunta: "Which gold price does the calculator use?",
      respuesta: "The price per gram published by Kuwait Zakat House on {{kw.gold-24k#desde}}, for each carat.",
    },
    {
      pregunta: "What zakat rate applies to gold?",
      respuesta: "{{kw.zakat-rate}} of the value, the rate in the Kuwait Zakat House calculator.",
    },
    {
      pregunta: "Why does the result change from day to day?",
      respuesta: "Gold prices move every day, and Kuwait Zakat House updates its gram prices with them.",
    },
  ],
  glosario: [
    { termino: "Carat", definicion: "The purity of gold. 24 carat is pure gold; lower carats have other metals mixed in." },
    { termino: "Kuwait Zakat House", definicion: "The Kuwaiti institution whose official zakat calculator supplies the gold prices used here." },
  ],
});
