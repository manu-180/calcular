import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.usd-to-ttd",
  h1: "US dollar to TT dollar converter",
  title: "USD to TTD today: Central Bank exchange rate",
  description: "Convert US dollars, Canadian dollars, pounds and euros to TT dollars and back at the Central Bank of Trinidad and Tobago rates.",
  intro: [
    "Check what your US dollars are worth in TT dollars, or how much foreign currency your TT dollars will buy, at the rates the Central Bank publishes each business day.",
    "Today's US dollar selling rate is {{tt.usd-sell}}, from {{tt.usd-sell#desde}}.",
  ],
  comoSeCalcula: [
    "Foreign currency to TT dollars: the amount times the Central Bank buying rate ({{tt.usd-buy}} for the US dollar).",
    "TT dollars to foreign currency: the amount divided by the selling rate ({{tt.usd-sell}} for the US dollar).",
    "Banks and cambios set their own rates around these, and may charge fees.",
  ],
  ejemplo: ["At the rates of October 26, 2026, US$100 comes to TT$671.35 and TT$1,000 buys US$147.32."],
  faq: [
    {
      pregunta: "What is the US dollar rate in Trinidad today?",
      respuesta: "The Central Bank's latest rates are {{tt.usd-buy}} buying and {{tt.usd-sell}} selling, as of {{tt.usd-sell#desde}}.",
    },
    {
      pregunta: "Why is there a buying and a selling rate?",
      respuesta: "The buying rate is what banks pay you for foreign currency. The selling rate is what you pay to buy it. The gap covers the dealer's margin.",
    },
    {
      pregunta: "Which other currencies can I convert?",
      respuesta: "The Canadian dollar, the pound sterling and the euro, which the Central Bank publishes alongside the US dollar.",
    },
  ],
  glosario: [{ termino: "Central Bank of Trinidad and Tobago", definicion: "The country's central bank. It publishes the daily exchange rates used here." }],
});
