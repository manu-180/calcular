import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.severance-pay-calculator",
  "h1": "Severance pay calculator Tanzania",
  "title": "Severance pay calculator Tanzania: 7 days a year of service",
  "description": "Work out severance pay in Tanzania: at least {{tz.severance-days}}' basic wage for each completed year of service, up to {{tz.severance-max-years}}.",
  "intro": [
    "When your employer ends your employment after at least 12 months, you are owed severance pay. Enter your daily basic wage and your years of service.",
    "Severance is not paid for a fair dismissal for misconduct."
  ],
  "comoSeCalcula": [
    "Severance pay is at least {{tz.severance-days}}' basic wage for each completed year of continuous service.",
    "Only the first {{tz.severance-max-years}} count.",
    "It is due when you have completed 12 months of continuous service and the employer ends the employment."
  ],
  "ejemplo": [
    "After five years at TSh 40,000 a day, severance pay is TSh 1,400,000."
  ],
  "faq": [
    {
      "pregunta": "Is severance paid if I resign?",
      "respuesta": "The Act links severance to the employer ending the employment."
    },
    {
      "pregunta": "When is no severance due?",
      "respuesta": "On a fair termination for misconduct, or if you unreasonably refuse alternative employment."
    },
    {
      "pregunta": "What is basic wage?",
      "respuesta": "Pay for ordinary hours, without allowances, overtime or extra pay for night or holiday work."
    }
  ],
  "glosario": [
    {
      "termino": "Severance pay",
      "definicion": "A payment for each completed year of service when the employer ends the employment."
    }
  ]
});
