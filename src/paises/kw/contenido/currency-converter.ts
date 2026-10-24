import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kw.currency-converter",
  h1: "Kuwaiti dinar converter (CBK rates)",
  title: "KWD converter: dinar to dollar, rupee and more",
  description: "Convert Kuwaiti dinars to US dollars, euros, rupees and other currencies with the official Central Bank of Kuwait rates, updated every working day.",
  intro: [
    "Convert an amount between the Kuwaiti dinar and ten common currencies, from the US dollar to the Indian rupee.",
    "Rates come from the Central Bank of Kuwait, which publishes them every working day. Today one US dollar is {{kw.fx-usd}}.",
  ],
  comoSeCalcula: [
    "The CBK publishes how many fils one unit of each currency is worth. One dinar is 1,000 fils.",
    "To go from dinars to another currency, the amount is divided by that rate; to go back, it is multiplied.",
    "The calculator uses the latest CBK rate, dated {{kw.fx-usd#desde}}.",
  ],
  ejemplo: ["At 308.150 fils per dollar, KD 100 is about USD 324.52."],
  faq: [
    {
      pregunta: "Is this the rate I get at an exchange company?",
      respuesta: "No. The CBK rate is a reference. Banks and exchange companies apply their own buy and sell rates and may charge a fee.",
    },
    {
      pregunta: "How often does the rate change?",
      respuesta: "The CBK publishes a rate for each working day. This calculator updates when a new one comes out.",
    },
    {
      pregunta: "Which currencies are included?",
      respuesta: "US dollar, euro, pound sterling, Saudi riyal, UAE dirham, Indian rupee, Egyptian pound, Pakistani rupee, Bangladeshi taka and Sri Lankan rupee.",
    },
  ],
  glosario: [
    { termino: "Fils", definicion: "A thousandth of a Kuwaiti dinar." },
    { termino: "CBK", definicion: "The Central Bank of Kuwait." },
  ],
});
