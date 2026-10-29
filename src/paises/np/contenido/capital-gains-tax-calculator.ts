import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.capital-gains-tax-calculator",
  h1: "Capital gains tax calculator Nepal {{anio}}",
  title: "Capital gains tax Nepal {{anio}}: land, house and shares",
  description: "Estimate the capital gains tax on land, a house or listed shares: {{np.capital-gains-rate[land-long]}} on a long holding and {{np.capital-gains-rate[land-short]}} on a short one.",
  intro: [
    "Enter the sale price, what the asset cost you and how long you held it. The calculator applies the capital gains rate the Inland Revenue Department lists for a resident individual.",
    "It covers land and buildings that are not business assets, and shares of companies listed with the Securities Board. The rate is {{np.capital-gains-rate[land-long]}} or {{np.capital-gains-rate[land-short]}} on land, and {{np.capital-gains-rate[shares-long]}} or {{np.capital-gains-rate[shares-short]}} on shares.",
  ],
  comoSeCalcula: [
    "The gain is the sale price less the cost of acquiring the asset. Nothing is owed on a loss.",
    "For non-business land and buildings, the rate is {{np.capital-gains-rate[land-long]}} when you have owned it for five years or more, and {{np.capital-gains-rate[land-short]}} when you have owned it for less than five years.",
    "For listed shares, the rate is {{np.capital-gains-rate[shares-long]}} when you held them for more than 365 days and {{np.capital-gains-rate[shares-short]}} for 365 days or less.",
  ],
  ejemplo: ["Land bought for NPR 3,000,000 and sold for NPR 5,000,000 after eight years has a gain of NPR 2,000,000. At 7.5% the tax is NPR 150,000. Had it been held for three years, the rate would be 10% and the tax NPR 200,000."],
  faq: [
    {
      pregunta: "What is the capital gains tax rate on land in Nepal?",
      respuesta: "For a resident individual, 7.5% if the land or house was owned for five years or more and 10% if owned for less than five years, for the 2083/84 income year.",
    },
    {
      pregunta: "What is the tax on selling shares?",
      respuesta: "7.5% on the gain if you held shares of a listed company for more than 365 days and 10% if you held them for 365 days or less.",
    },
    {
      pregunta: "Does this cover a business asset?",
      respuesta: "No. The rates in the Inland Revenue Department table are for non-business chargeable assets, and this calculator uses only those rates.",
    },
  ],
  glosario: [
    { termino: "Capital gain", definicion: "The profit from selling an asset for more than it cost." },
    { termino: "Resident individual", definicion: "A natural person who lives in Nepal under the Income Tax Act, 2058." },
  ],
});
