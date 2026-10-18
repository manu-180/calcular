import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.paye-calculator",
  "h1": "PAYE calculator Tanzania",
  "title": "PAYE calculator Tanzania 2026: monthly tax on your salary",
  "description": "Work out the PAYE your employer deducts in Tanzania Mainland, after NSSF, with the TRA bands from {{tz.paye-bands[1].tasa}} to {{tz.paye-bands[-1].tasa}}.",
  "intro": [
    "Enter your gross monthly salary to see the PAYE your employer should withhold. Your NSSF contribution comes off first, because contributions to an approved fund are not taxed.",
    "You can also see what changes if this is a secondary job or if you are not resident in Tanzania."
  ],
  "comoSeCalcula": [
    "Your share of NSSF is taken off your gross salary. What is left is your taxable pay.",
    "Taxable pay up to {{tz.paye-bands[0].hasta}} a month is not taxed. Pay up to {{tz.paye-bands[1].hasta}} is taxed at {{tz.paye-bands[1].tasa}}, up to {{tz.paye-bands[2].hasta}} at {{tz.paye-bands[2].tasa}}, up to {{tz.paye-bands[3].hasta}} at {{tz.paye-bands[3].tasa}} and anything above at {{tz.paye-bands[-1].tasa}}.",
    "A secondary employer withholds at the highest rate, {{tz.paye-bands[-1].tasa}}. Non-resident employees pay a flat {{tz.non-resident-employee-rate}} on gross pay."
  ],
  "ejemplo": [
    "On TSh 1,000,000 a month, NSSF is TSh 100,000 and taxable pay is TSh 900,000. PAYE is TSh 103,000."
  ],
  "faq": [
    {
      "pregunta": "How much salary is tax free?",
      "respuesta": "The first {{tz.paye-bands[0].hasta}} of taxable pay a month is not taxed."
    },
    {
      "pregunta": "Is NSSF deducted before PAYE?",
      "respuesta": "Yes. TRA takes contributions to an approved retirement fund off gross pay before working out PAYE."
    },
    {
      "pregunta": "What if I have two jobs?",
      "respuesta": "You choose one as your primary employment. The others withhold PAYE at the highest rate unless the Commissioner allows a lower rate."
    },
    {
      "pregunta": "Are benefits like a company car taxed?",
      "respuesta": "Yes. Benefits in kind such as a car, housing or a cheap loan are valued under TRA rules and added to your pay."
    }
  ],
  "glosario": [
    {
      "termino": "PAYE",
      "definicion": "Pay As You Earn: income tax your employer withholds from your salary."
    },
    {
      "termino": "Taxable pay",
      "definicion": "Gross salary less your NSSF contribution."
    }
  ]
});
