import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.gst-registration-calculator",
  h1: "GST registration threshold calculator Bhutan",
  title: "GST registration Bhutan: required from {{bt.gst-threshold}}",
  description: "Do you need to register for GST in Bhutan? Required from {{bt.gst-threshold}} a year, voluntary from {{bt.gst-voluntary-threshold}}. Enter your turnover.",
  intro: [
    "A business in Bhutan with a yearly turnover of {{bt.gst-threshold}} or more has to register for Goods and Services Tax. From {{bt.gst-voluntary-threshold}} it may choose to. Below that, it stays out. GST started on {{bt.gst-threshold#desde}}.",
    "Enter your turnover to see where you stand, and how much GST it would mean at {{bt.gst-rate}}.",
  ],
  comoSeCalcula: [
    "Compare your turnover with {{bt.gst-threshold}}, the level in Schedule II of the GST Act.",
    "If it is lower, compare it with {{bt.gst-voluntary-threshold}}, the level for choosing to register given by the Department of Revenue and Customs.",
    "The GST figure is your turnover times {{bt.gst-rate}}. It assumes all your sales are taxable, so it is an upper limit if some are exempt or zero rated.",
  ],
  ejemplo: ["A hardware store in Gelephu sells Nu. 3,000,000 a year. That is Nu. 2,000,000 under the required level but above Nu. 2,500,000, so it may register. If it did, it would charge up to Nu. 150,000 of GST on those sales."],
  faq: [
    {
      pregunta: "When must a business register for GST in Bhutan?",
      respuesta: "When annual turnover is equal to or above {{bt.gst-threshold}} (Schedule II of the GST Act of Bhutan 2020, and the DRC's questions and answers). The Act also looks at turnover in the past six months and what is expected in the months to come (section 57).",
    },
    {
      pregunta: "If I register voluntarily, can I leave?",
      respuesta: "The DRC says a voluntary registrant must stay registered for at least two years, unless allowed otherwise. It must also be engaged in an economic activity and able to comply.",
    },
    {
      pregunta: "Does a small business charge GST?",
      respuesta: "Only registered businesses charge GST at {{bt.gst-rate}}. An unregistered one does not add it to its prices.",
    },
  ],
  glosario: [
    { termino: "Turnover", definicion: "The value of your sales in a year, before costs." },
    { termino: "GST", definicion: "Goods and Services Tax, in force since 1 January 2026." },
    { termino: "Voluntary registration", definicion: "Choosing to enter GST below the required level." },
  ],
});
