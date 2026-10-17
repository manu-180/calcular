import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.rpgt-calculator",
  h1: "RPGT calculator Malaysia",
  title: "RPGT calculator: real property gains tax on a sale",
  description: "Work out real property gains tax (CKHT) on selling property in Malaysia, with the HASiL rates by holding period and the RM10,000 or 10% exemption.",
  intro: [
    "Real property gains tax (RPGT, or CKHT in Malay) is charged on the gain when you sell property. The rate depends on who sells and how long they held it.",
    "Enter the sale and purchase prices with their costs and the years you held the property.",
  ],
  comoSeCalcula: [
    "The chargeable gain is the disposal price less selling costs, minus the acquisition price and the costs of buying and improving.",
    "Individuals take off an exemption of {{my.rpgt-exemption-amount}} or {{my.rpgt-exemption-rate}} of the gain, whichever is higher.",
    "Citizens and permanent residents pay {{my.rpgt-citizen[y1-3]}} within 3 years, {{my.rpgt-citizen[y4]}} in the 4th year, {{my.rpgt-citizen[y5]}} in the 5th and {{my.rpgt-citizen[y6]}} from the 6th year.",
    "Malaysian companies pay {{my.rpgt-company[y1-3]}}, {{my.rpgt-company[y4]}}, {{my.rpgt-company[y5]}} and {{my.rpgt-company[y6]}}. Non-citizens and foreign companies pay {{my.rpgt-foreigner[y1-3]}} for the first 5 years and {{my.rpgt-foreigner[y6]}} after.",
  ],
  ejemplo: [
    "A citizen sells in the 5th year for RM600,000 after buying for RM450,000. With RM27,000 of costs the gain is RM123,000, the exemption RM12,300 and the RPGT RM16,605.",
  ],
  faq: [
    {
      pregunta: "Do I pay RPGT after 5 years?",
      respuesta: "Not as a Malaysian citizen or permanent resident: from 1 January 2022 the rate is 0% from the 6th year. Companies and foreigners still pay {{my.rpgt-company[y6]}} or {{my.rpgt-foreigner[y6]}}.",
    },
    {
      pregunta: "Is there an exemption for my home?",
      respuesta:
        "Yes. A Malaysian citizen or permanent resident can claim a once-in-a-lifetime exemption on the gain from disposing of one private residence.",
    },
    {
      pregunta: "Which year of assessment does RPGT fall in?",
      respuesta: "The year in which the disposal takes place. For RPGT the year of assessment is the calendar year.",
    },
  ],
  glosario: [
    { termino: "CKHT", definicion: "Cukai Keuntungan Harta Tanah, the Malay name for RPGT." },
    { termino: "Disposal", definicion: "Selling or otherwise transferring the property." },
  ],
});
