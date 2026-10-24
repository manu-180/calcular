import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kw.zakat-calculator",
  h1: "Zakat calculator Kuwait",
  title: "Zakat calculator Kuwait: nisab and zakat on money",
  description: "Work out zakat al-mal on your savings with the nisab of 85 grams of 24 carat gold at today's price from Kuwait Zakat House.",
  intro: [
    "Add up your cash, investments and debts owed to you, take off what you owe now, and see whether you reach the nisab and how much zakat to pay.",
    "The nisab and the gold price come from Kuwait Zakat House, which links its prices to those announced by the Ministry of Commerce and Industry.",
  ],
  comoSeCalcula: [
    "Zakatable wealth is cash, investments and collectable debts, less debts due now.",
    "The nisab is the value of {{kw.zakat-nisab-grams}} grams of 24 carat gold. Today a gram is {{kw.gold-24k}}.",
    "If your wealth reaches the nisab, zakat is {{kw.zakat-rate}} of it.",
  ],
  ejemplo: ["With KD 5,000 in savings and the nisab at KD 3,536.85, zakat is KD 125."],
  faq: [
    {
      pregunta: "What is the nisab today?",
      respuesta: "The value of {{kw.zakat-nisab-grams}} grams of 24 carat gold. With gold at {{kw.gold-24k}} a gram on {{kw.gold-24k#desde}}, the calculator shows the amount in dinars.",
    },
    {
      pregunta: "What rate does Kuwait Zakat House use?",
      respuesta: "{{kw.zakat-rate}} of zakatable wealth, the rate its own calculator applies.",
    },
    {
      pregunta: "Does the gold price change?",
      respuesta: "Yes. Kuwait Zakat House updates it with the prices announced by the Ministry of Commerce and Industry, so the nisab moves with the gold price.",
    },
  ],
  glosario: [
    { termino: "Nisab", definicion: "The minimum wealth on which zakat is due." },
    { termino: "Zakat al-mal", definicion: "Zakat on money and other wealth." },
  ],
});
