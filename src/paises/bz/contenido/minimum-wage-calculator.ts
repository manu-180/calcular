import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "bz.minimum-wage-calculator",
  "h1": "Belize minimum wage {{anio}}",
  "title": "Belize minimum wage {{anio}}: hourly, weekly and monthly",
  "description": "The national minimum wage is {{bz.minimum-wage-hourly}} an hour. Enter your pay and hours to see if it meets the minimum and what a week or month should be.",
  "intro": [
    "The national minimum wage in Belize is {{bz.minimum-wage-hourly}} an hour for all categories of workers, in force since {{bz.minimum-wage-hourly#desde}}. It is a single rate for all categories of workers.",
    "Enter what you are paid and the hours you work in a normal week. The calculator turns your pay into an hourly rate, compares it with the minimum and shows any shortfall for a month."
  ],
  "comoSeCalcula": [
    "The minimum for a week is the hourly minimum times your weekly hours. The Labour Act sets the normal limit at {{bz.normal-week-hours}} hours of actual work in a week.",
    "A monthly minimum is the weekly figure times 52 weeks, divided by 12 months. A monthly wage is turned into an hourly rate the other way round, using the same 52 and 12.",
    "The rate comes from Statutory Instruments 169 and 170 of 2022, which the Ministry of Labour announced on 22 December 2022. It was the first increase since 2012."
  ],
  "ejemplo": [
    "Maria earns BZ$900 a month for a 45 hour week. Her weekly pay is 900 times 12 divided by 52, or BZ$207.69, which is BZ$4.62 an hour.",
    "The minimum for 45 hours is BZ$225.00 a week, or BZ$975.00 a month, so she is paid BZ$75.00 a month below the minimum."
  ],
  "faq": [
    {
      "pregunta": "What is the minimum wage in Belize?",
      "respuesta": "It is {{bz.minimum-wage-hourly}} an hour for all categories of workers, under Statutory Instruments 169 and 170 of 2022."
    },
    {
      "pregunta": "When did BZ$5.00 an hour start?",
      "respuesta": "On {{bz.minimum-wage-hourly#desde}}, according to the Ministry of Labour press release of 22 December 2022."
    },
    {
      "pregunta": "How many hours are in a normal week?",
      "respuesta": "The Labour Act limits actual work to {{bz.normal-week-hours}} hours in a week. Time beyond the limit is overtime."
    },
    {
      "pregunta": "Is there a different minimum for some jobs?",
      "respuesta": "The Ministry's notice says the BZ$5.00 rate applies to all categories of workers."
    }
  ],
  "glosario": [
    {
      "termino": "Statutory Instrument",
      "definicion": "A rule made by a minister under an Act. The minimum wage orders are statutory instruments."
    },
    {
      "termino": "Shortfall",
      "definicion": "The amount by which pay falls below the legal minimum."
    }
  ]
});
