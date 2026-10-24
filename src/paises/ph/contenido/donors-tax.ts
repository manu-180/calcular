import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.donors-tax",
  h1: "Donor's tax calculator Philippines",
  title: "Donor's tax calculator ({{ph.donors-tax-rate}} over {{ph.donors-tax-exemption}})",
  description: "Work out the {{ph.donors-tax-rate}} donor's tax on gifts above the {{ph.donors-tax-exemption}} yearly exemption, counting all your gifts in the calendar year.",
  intro: [
    "When you give money or property, you may owe donor's tax. The first {{ph.donors-tax-exemption}} of gifts in a calendar year is exempt.",
    "Enter the gift and any gifts you already made this year to see the tax on this one.",
  ],
  comoSeCalcula: [
    "Add up all the gifts you made in the calendar year, including this one.",
    "The tax for the year is {{ph.donors-tax-rate}} of the total above {{ph.donors-tax-exemption}}.",
    "The tax on this gift is the tax for the year minus the tax that already applied to your earlier gifts.",
  ],
  ejemplo: ["A first gift of ₱500,000 in the year pays 6% of ₱250,000, which is ₱15,000."],
  faq: [
    {
      pregunta: "How much is donor's tax?",
      respuesta: "{{ph.donors-tax-rate}} of your total gifts in the calendar year above the {{ph.donors-tax-exemption}} exempt amount, under Section 99 of the Tax Code.",
    },
    {
      pregunta: "Does the exemption apply to each gift?",
      respuesta: "No. It applies once per calendar year to the total of your gifts.",
    },
    {
      pregunta: "Are campaign contributions covered?",
      respuesta: "Contributions to candidates, political parties or coalitions for campaign purposes are governed by the Election Code instead.",
    },
  ],
  glosario: [
    { termino: "Donor's tax", definicion: "A tax on gifts of money or property, paid by the person who gives." },
    { termino: "Calendar year", definicion: "From 1 January to 31 December." },
  ],
});
