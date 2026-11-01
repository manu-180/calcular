import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.severance-pay",
  h1: "Severance pay calculator Liberia",
  title: "Liberia severance pay calculator for redundancy",
  description: "Work out redundancy severance pay in Liberia under the Decent Work Act: {{lr.severance-weeks}} of pay for each completed year of service.",
  intro: [
    "Enter your weekly pay and completed years of service to see the severance pay owed when your job ends for economic reasons.",
    "The Decent Work Act gives {{lr.severance-weeks}} of severance pay for each completed year of service.",
  ],
  comoSeCalcula: [
    "Weeks of pay: completed years of service × {{lr.severance-weeks}}.",
    "Severance pay: weeks of pay × your weekly pay.",
  ],
  ejemplo: ["After 5 completed years on L$10,000 a week, severance pay is 20 weeks, or L$200,000."],
  faq: [
    {
      pregunta: "When is severance pay owed?",
      respuesta: "When your employment ends because of economic reasons, such as a reorganisation, closure or reduction of the business.",
    },
    {
      pregunta: "Do I also get notice?",
      respuesta: "Yes. Severance pay comes on top of notice or pay in lieu of notice and any other amount owed when the job ends.",
    },
    {
      pregunta: "Who is made redundant first?",
      respuesta: "The employer applies first in, last out. When service is about the same, it considers qualifications and efficiency.",
    },
  ],
  glosario: [{ termino: "Redundancy", definicion: "Ending jobs because of economic, technological or structural reasons." }],
});
