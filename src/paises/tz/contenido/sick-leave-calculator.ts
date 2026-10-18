import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.sick-leave-calculator",
  "h1": "Sick leave calculator Tanzania",
  "title": "Sick leave calculator Tanzania: full and half pay days",
  "description": "See your paid sick leave in Tanzania: {{tz.sick-full-days}} days on full wages and {{tz.sick-half-days}} on half wages in each leave cycle.",
  "intro": [
    "Enter the sick days you had in this leave cycle to see how many are on full and on half wages.",
    "Add your daily wage to see the amount."
  ],
  "comoSeCalcula": [
    "You are entitled to sick leave of at least 126 days in a leave cycle.",
    "The first {{tz.sick-full-days}} days are paid at full wages and the next {{tz.sick-half-days}} at half wages.",
    "Your employer can refuse to pay if you do not produce a medical certificate."
  ],
  "ejemplo": [
    "With 70 sick days and a daily wage of TSh 20,000, you get 63 days at TSh 20,000 and 7 at TSh 10,000: TSh 1,330,000."
  ],
  "faq": [
    {
      "pregunta": "How long is a leave cycle for sick leave?",
      "respuesta": "36 months of consecutive employment with the same employer."
    },
    {
      "pregunta": "Who can issue the medical certificate?",
      "respuesta": "A registered medical practitioner, or another practitioner your employer accepts."
    },
    {
      "pregunta": "What if another fund pays me?",
      "respuesta": "Your employer does not have to pay if you get paid sick leave under another law, fund or collective agreement."
    }
  ],
  "glosario": [
    {
      "termino": "Medical certificate",
      "definicion": "A note from a medical practitioner saying you could not work."
    }
  ]
});
