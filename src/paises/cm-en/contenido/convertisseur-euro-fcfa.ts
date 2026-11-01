import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm-en.convertisseur-euro-fcfa",
  h1: "Euro to CFA franc (XAF) converter",
  title: "Euro to CFA franc converter: fixed BEAC parity",
  description: "Convert euros to Central African CFA francs and back with the fixed parity of {{cm.parite-euro}} francs to 1 euro.",
  intro: [
    "The CEMAC CFA franc (XAF) has a fixed parity with the euro. One euro is always worth the same number of francs.",
    "Enter an amount and the direction of the conversion.",
  ],
  comoSeCalcula: [
    "Euros to CFA francs: multiply by {{cm.parite-euro}} and round to the franc.",
    "CFA francs to euros: divide by the same parity and round to the cent.",
  ],
  ejemplo: ["100 euros are worth 65,596 CFA francs. 100,000 CFA francs are worth 152.45 euros."],
  faq: [
    {
      pregunta: "Since when has the parity been fixed?",
      respuesta: "Since {{cm.parite-euro#desde}}, when the euro arrived. It comes from the parity of the old French franc.",
    },
    {
      pregunta: "Why does my bank give a different amount?",
      respuesta: "The parity does not change, but banks and exchange offices add fees or a gap between buying and selling prices.",
    },
    {
      pregunta: "Is the West African CFA franc the same currency?",
      respuesta: "No. The West African CFA franc (XOF) is a different currency, even though it has the same parity with the euro.",
    },
  ],
  glosario: [{ termino: "XAF", definicion: "Code of the CFA franc of the Central African Economic and Monetary Community, issued by the BEAC." }],
});
