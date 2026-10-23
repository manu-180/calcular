import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.percentage-tax",
  h1: "Percentage tax calculator",
  title: "Percentage tax calculator: {{ph.percentage-tax-rate}} quarterly for non-VAT",
  description: "Work out the {{ph.percentage-tax-rate}} percentage tax on your quarterly gross sales or receipts as a non-VAT business or professional.",
  intro: [
    "Non-VAT businesses and professionals pay a percentage tax on their gross sales or receipts every quarter.",
    "The rate is {{ph.percentage-tax-rate}} since 1 July 2023, after the temporary 1% rate of the CREATE law ended.",
  ],
  comoSeCalcula: [
    "Take your gross sales or receipts for the quarter, before expenses.",
    "Multiply by {{ph.percentage-tax-rate}}. That is the tax for the quarter.",
    "It applies when your yearly gross sales do not exceed {{ph.vat-threshold}}.",
  ],
  ejemplo: ["With ₱250,000 of receipts in a quarter, the percentage tax is ₱7,500."],
  faq: [
    {
      pregunta: "Who pays the 3% percentage tax?",
      respuesta:
        "Corporations, self-employed individuals and professionals whose gross sales or receipts do not exceed {{ph.vat-threshold}}. Cooperatives and those who chose the 8% income tax are not covered.",
    },
    {
      pregunta: "Why was it 1% before?",
      respuesta: "The CREATE law lowered it to 1% for a period that ended on 30 June 2023. Sales from 1 July 2023 are taxed at 3% again.",
    },
    {
      pregunta: "Do I still pay percentage tax with the 8% option?",
      respuesta: "No. The 8% income tax replaces both the graduated income tax and the percentage tax.",
    },
  ],
  glosario: [
    { termino: "Non-VAT", definicion: "A business or professional that is not registered for VAT." },
    { termino: "CREATE law", definicion: "Republic Act No. 11534, which lowered some tax rates for a limited time." },
  ],
});
