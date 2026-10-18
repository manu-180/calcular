import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.overtime-calculator",
  "h1": "Overtime calculator Tanzania",
  "title": "Overtime calculator Tanzania: 1.5 times your basic wage",
  "description": "Work out overtime pay under the Employment and Labour Relations Act: at least {{tz.overtime-factor}} times your basic wage, plus {{tz.night-premium}} an hour at night.",
  "intro": [
    "Enter your basic wage for one hour and the overtime you worked to see what you should be paid.",
    "If some overtime was at night, the calculator adds the night work premium."
  ],
  "comoSeCalcula": [
    "Ordinary hours are at most {{tz.ordinary-week-hours}} a week, six days a week and nine hours a day.",
    "Overtime is paid at not less than {{tz.overtime-factor}} times the basic wage.",
    "Night work (between 8 pm and 6 am) earns at least {{tz.night-premium}} of the wage for each hour; on overtime hours it is worked out on the overtime rate."
  ],
  "ejemplo": [
    "At TSh 3,000 an hour, ten overtime hours pay TSh 45,000."
  ],
  "faq": [
    {
      "pregunta": "How much overtime can I be asked to work?",
      "respuesta": "Only by agreement, and not more than 50 overtime hours in a four week cycle. No more than 12 hours of work in a day."
    },
    {
      "pregunta": "Can I refuse overtime?",
      "respuesta": "Overtime needs an agreement between you and your employer."
    },
    {
      "pregunta": "Who cannot work at night?",
      "respuesta": "Children under 18, and pregnant employees and new mothers in the periods the Act sets, among others."
    }
  ],
  "glosario": [
    {
      "termino": "Basic wage",
      "definicion": "Your pay for ordinary hours, without allowances or overtime."
    }
  ]
});
