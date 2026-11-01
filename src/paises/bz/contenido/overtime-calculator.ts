import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "bz.overtime-calculator",
  "h1": "Overtime pay calculator Belize {{anio}}",
  "title": "Belize overtime pay {{anio}}: 1.5x and double time",
  "description": "Work out overtime, Sunday and public holiday pay under the Labour Act. Time beyond {{bz.normal-day-hours}} hours a day or {{bz.normal-week-hours}} a week is paid at 1.5 times.",
  "intro": [
    "Under the Labour Act, nobody has to work more than {{bz.normal-day-hours}} hours of actual work in a day or {{bz.normal-week-hours}} hours in a week. Work beyond those limits, at the employer's request, is paid at no less than {{bz.overtime-factor}} times the ordinary rate.",
    "Enter your normal pay, say when you worked the extra hours and how many there were. The calculator shows the rate per hour and the total."
  ],
  "comoSeCalcula": [
    "The ordinary rate is your weekly wage for a 45 hour week divided by 45. Section 116 says overtime is calculated from the gross weekly wage for that week.",
    "Hours beyond the daily or weekly limit, hours on a Sunday or agreed rest day, and hours on a public holiday are paid at {{bz.overtime-factor}} times the ordinary rate.",
    "Hours on Christmas Day, Good Friday and Easter Monday are paid at {{bz.overtime-double-factor}} times the ordinary rate.",
    "Monthly pay is turned into weekly pay by multiplying by 12 and dividing by 52.",
    "People in supervision or management, or in a confidential role, are outside these rules, as section 119 sets out."
  ],
  "ejemplo": [
    "A worker earns BZ$10.00 an hour and works 8 hours beyond the daily limit. The rate is BZ$15.00 an hour, so the pay for those hours is BZ$120.00, which is BZ$40.00 above ordinary pay.",
    "A worker on BZ$900 a month has an ordinary rate of BZ$4.62 an hour. Eight hours on Good Friday at double time come to BZ$73.92."
  ],
  "faq": [
    {
      "pregunta": "What is the overtime rate in Belize?",
      "respuesta": "At least {{bz.overtime-factor}} times the ordinary rate for hours beyond {{bz.normal-day-hours}} in a day or {{bz.normal-week-hours}} in a week, under section 118 of the Labour Act."
    },
    {
      "pregunta": "Which holidays pay double?",
      "respuesta": "Christmas Day, Good Friday and Easter Monday are paid at no less than double the ordinary rate. Other public holidays are paid at 1.5 times."
    },
    {
      "pregunta": "Is Sunday work overtime?",
      "respuesta": "Work on a Sunday or other agreed rest day, at the employer's request, is paid at no less than 1.5 times the ordinary rate."
    },
    {
      "pregunta": "Can I be made to work on a public holiday?",
      "respuesta": "No. Section 115 says nobody is obliged to work on a public holiday or on a Sunday that is the agreed rest day."
    }
  ],
  "glosario": [
    {
      "termino": "Ordinary rate",
      "definicion": "The normal pay for one hour, used as the base for overtime."
    },
    {
      "termino": "Rest day",
      "definicion": "The agreed day off each week, usually Sunday."
    }
  ]
});
