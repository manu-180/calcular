import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.absd-calculator",
  h1: "ABSD calculator: Additional Buyer's Stamp Duty",
  title: "ABSD calculator Singapore 2026 for citizens, PRs, foreigners",
  description: "Work out Additional Buyer's Stamp Duty on a home in Singapore: {{sg.absd[sc-2]}} for a citizen's second home, {{sg.absd[pr-1]}} for a PR's first and {{sg.absd[extranjero]}} for foreigners.",
  intro: [
    "Additional Buyer's Stamp Duty (ABSD) is paid on top of Buyer's Stamp Duty when you buy a residential property, depending on who you are and how many homes you already own.",
    "Pick your profile and enter the price to see the ABSD, the BSD and the total stamp duty.",
  ],
  comoSeCalcula: [
    "ABSD is a flat rate on the purchase price or the market value, whichever is higher.",
    "Singapore Citizens pay nothing on their first home, {{sg.absd[sc-2]}} on the second and {{sg.absd[sc-3]}} from the third.",
    "PRs pay {{sg.absd[pr-1]}} on the first home, {{sg.absd[pr-2]}} on the second and {{sg.absd[pr-3]}} from the third. Foreigners pay {{sg.absd[extranjero]}} and entities {{sg.absd[entidad]}} on any home.",
    "ABSD is rounded down to the dollar. Buyer's Stamp Duty is added with the residential rates.",
  ],
  ejemplo: ["A foreigner buying a $2 million home pays $1,200,000 of ABSD (60%) plus $69,600 of BSD."],
  faq: [
    {
      pregunta: "We are buying together with different profiles. Which rate applies?",
      respuesta: "The highest applicable ABSD rate among the buyers applies to the whole value of the property.",
    },
    {
      pregunta: "Does a home I own jointly count?",
      respuesta: "Yes. Any share in a residential property counts as a whole property when IRAS counts how many homes you own. Homes outside Singapore do not count.",
    },
    {
      pregunta: "When did these ABSD rates start?",
      respuesta: "They apply to purchases on or after 27 April 2023.",
    },
  ],
  glosario: [
    { termino: "ABSD", definicion: "Additional Buyer's Stamp Duty, an extra duty on residential property for some buyers." },
    { termino: "Entity", definicion: "A buyer that is not an individual, such as a company or a partnership." },
  ],
});
