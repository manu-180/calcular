import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.nssf-pension-calculator",
  "h1": "NSSF pension calculator Tanzania",
  "title": "NSSF pension calculator Tanzania: pension and lump sum",
  "description": "Estimate your NSSF retirement pension: the monthly pension and the lump sum, using the NSSF formula with a replacement rate of 1/{{tz.nssf-pension-divisor}}.",
  "intro": [
    "Enter your annual pensionable emoluments and the number of monthly contributions to see your pension.",
    "The formula is the one NSSF uses for members who retire from 1 July 2022."
  ],
  "comoSeCalcula": [
    "Annual pension = number of contributions × annual pensionable emoluments / {{tz.nssf-pension-divisor}}, up to {{tz.nssf-max-pension}} of your emoluments.",
    "{{tz.nssf-commuted-share}} is paid at once as a lump sum, worked out over {{tz.nssf-pension-years}}.",
    "The rest is paid as a monthly pension. You need at least {{tz.nssf-min-contributions}} monthly contributions."
  ],
  "ejemplo": [
    "With 300 contributions and TSh 18 million of annual pensionable emoluments, the monthly pension is TSh 519,827.59 and the lump sum TSh 38,405,172.41."
  ],
  "faq": [
    {
      "pregunta": "What are annual pensionable emoluments?",
      "respuesta": "The average of your three highest years of earnings in the ten years before you retire."
    },
    {
      "pregunta": "What if I have fewer than 180 contributions?",
      "respuesta": "You receive an old age special lump sum: your contributions plus interest."
    },
    {
      "pregunta": "Is there a minimum pension?",
      "respuesta": "Yes. NSSF sets the minimum at 40% of the lowest statutory minimum wage."
    }
  ],
  "glosario": [
    {
      "termino": "Commuted pension",
      "definicion": "The part of the pension paid at once when you retire."
    }
  ]
});
