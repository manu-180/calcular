import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.rental-income-tax-calculator",
  h1: "Rental income tax calculator Zambia",
  title: "Rental income tax calculator Zambia {{anio}}",
  description:
    "Work out the rental income tax a landlord pays ZRA: {{zm.rental-bands-monthly[1].tasa}} up to {{zm.rental-bands-annual[1].hasta}} a year and {{zm.rental-bands-annual[2].tasa}} above it, with the first band at 0%.",
  intro: [
    "Enter the rent you receive for a month or a year and see the rental income tax due.",
    "Since 1 January 2022 rental income tax is a stand-alone tax paid by the landlord, not withheld by the tenant.",
  ],
  comoSeCalcula: [
    "Each month, the first {{zm.rental-bands-monthly[0].hasta}} of rent is taxed at 0%.",
    "Rent above that and up to {{zm.rental-bands-monthly[1].hasta}} is taxed at {{zm.rental-bands-monthly[1].tasa}}.",
    "Rent above {{zm.rental-bands-monthly[2].desde}} a month is taxed at {{zm.rental-bands-monthly[2].tasa}}.",
    "Over a year the same bands are {{zm.rental-bands-annual[0].hasta}} and {{zm.rental-bands-annual[1].hasta}}.",
  ],
  ejemplo: [
    "ZRA's example: rent of K70,000 in a month pays 0% on K2,500, 4% on K64,166.67 and 16% on K3,333.33, a total of K3,100.",
  ],
  faq: [
    {
      pregunta: "When is the tax due?",
      respuesta: "The return and payment are due within 14 days after the end of the month in which you received the rent.",
    },
    {
      pregunta: "Does it cover lodges and car hire?",
      respuesta: "No. Lodges with a valid trading licence, rental of vehicles or equipment, and rental of trademarks or other intangible assets fall outside rental income tax.",
    },
    {
      pregunta: "Is rent also subject to VAT?",
      respuesta: "Rent from commercial property is subject to VAT. Rent from property let for domestic purposes is not.",
    },
    {
      pregunta: "Who pays in a partnership?",
      respuesta: "The partnership itself pays the tax, not the individual partners.",
    },
  ],
  glosario: [{ termino: "Rental income", definicion: "Money earned from letting or leasing land or buildings: houses, flats, shops, offices, farms or car parks." }],
});
