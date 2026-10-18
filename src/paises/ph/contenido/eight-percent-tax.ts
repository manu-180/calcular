import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.eight-percent-tax",
  h1: "8% income tax vs graduated rates",
  title: "8% income tax calculator for freelancers and professionals",
  description:
    "Compare the 8% income tax option with the graduated rates plus percentage tax, and see which one costs less for your freelance or business income.",
  intro: [
    "If you are self-employed or a professional and your gross sales stay under {{ph.vat-threshold}}, you can pay {{ph.eight-percent-rate}} on your receipts instead of the graduated rates and the percentage tax.",
    "Enter your receipts and your expenses for the year to see which option leaves you with more.",
  ],
  comoSeCalcula: [
    "8% option: {{ph.eight-percent-rate}} of your gross sales or receipts above {{ph.eight-percent-exclusion}}. It replaces both the income tax at graduated rates and the percentage tax.",
    "Graduated option: income tax on your net income (receipts minus deductible expenses) plus a percentage tax of {{ph.percentage-tax-rate}} of your gross receipts.",
    "Above {{ph.vat-threshold}} of gross sales the 8% option is not available.",
  ],
  ejemplo: [
    "With ₱1,200,000 of receipts and ₱300,000 of expenses, the 8% option costs ₱76,000. The graduated option costs ₱127,500 of income tax plus ₱36,000 of percentage tax, so ₱163,500.",
  ],
  faq: [
    {
      pregunta: "Who can choose the 8% income tax?",
      respuesta:
        "Individuals earning from self-employment or a profession whose gross sales or receipts do not exceed {{ph.vat-threshold}}. It is not available to VAT-registered taxpayers or to partners of a general professional partnership.",
    },
    {
      pregunta: "When do I choose the 8% option?",
      respuesta:
        "In your first quarterly income tax return of the year, or the first return after you start your business. If you do not, you are taxed at graduated rates. The choice cannot be changed for that year.",
    },
    {
      pregunta: "What happens if my sales go above the VAT threshold during the year?",
      respuesta:
        "You move to the graduated rates for the whole year. The 8% tax you already paid in earlier quarters is credited against the new tax due.",
    },
    {
      pregunta: "I also have a salary. Does the ₱250,000 deduction apply?",
      respuesta:
        "No. Mixed income earners pay 8% on all their business receipts, because the first ₱250,000 is already in the 0% bracket of their salary. Use the mixed income tax calculator for that case.",
    },
  ],
  glosario: [
    { termino: "Percentage tax", definicion: "A tax on the gross sales or receipts of non-VAT businesses, filed every quarter." },
    { termino: "VAT threshold", definicion: "The yearly gross sales limit set in Section 109(BB) of the Tax Code. Above it, the 8% option is not available." },
    { termino: "Gross receipts", definicion: "Everything you were paid for your services or sales in the year, before any expenses." },
  ],
});
