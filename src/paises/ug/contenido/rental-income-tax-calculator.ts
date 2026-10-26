import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.rental-income-tax-calculator",
  h1: "Rental income tax calculator Uganda",
  title: "Rental income tax calculator Uganda: URA 12% and 30%",
  description: "Work out rental tax in Uganda: individuals pay {{ug.rental-tax-rate}} on rent above {{ug.rental-tax-threshold}} a year, companies {{ug.company-tax-rate}} after expenses.",
  intro: [
    "Landlords in Uganda pay rental income tax on rent from land and buildings, separately from their other income.",
    "Choose who owns the property and enter the rent for the year to see the tax.",
  ],
  comoSeCalcula: [
    "Individuals: add up the gross rent from all your properties for the year and take off {{ug.rental-tax-threshold}}. The rest is taxed at {{ug.rental-tax-rate}}.",
    "No other deductions are allowed for individuals.",
    "Companies, trusts and retirement funds deduct their expenses, up to {{ug.rental-expense-cap}} of gross rent, and pay {{ug.company-tax-rate}} on what is left.",
  ],
  ejemplo: ["An individual earning Ushs 6,000,000 in rent a year pays 12% of Ushs 3,180,000, which is Ushs 381,600."],
  faq: [
    {
      pregunta: "When do I file and pay?",
      respuesta: "Individuals file a provisional return within three months of the start of the year of income, and the final return within six months after it ends. The year of income runs from 1 July to 30 June.",
    },
    {
      pregunta: "What happens if I file late?",
      respuesta: "URA charges Ushs 200,000 a month or 2% of the tax, whichever is higher, while the return is outstanding. Unpaid tax carries interest of 2% a month.",
    },
    {
      pregunta: "Do I charge VAT on rent?",
      respuesta: "Only on commercial property, and only if your rent reaches the VAT registration threshold of Ushs 150 million a year. Then you charge your tenants VAT.",
    },
    {
      pregunta: "How is a partnership taxed?",
      respuesta: "URA works out each partner's share of the gross rent by the profit sharing ratio and taxes it like an individual's rent.",
    },
  ],
  glosario: [
    { termino: "Gross rent", definicion: "All rent received before any expenses." },
    { termino: "Chargeable rental income", definicion: "The amount the tax rate applies to." },
  ],
});
