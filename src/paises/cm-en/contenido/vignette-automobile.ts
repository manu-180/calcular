import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm-en.vignette-automobile",
  h1: "Vehicle stamp duty (vignette) in Cameroon",
  title: "Vehicle stamp duty Cameroon: vignette price by horsepower",
  description:
    "Find the yearly vehicle stamp duty for your car by fiscal horsepower: from {{cm.timbre-automobile[autre-2-7]}} to {{cm.timbre-automobile[autre-21]}} for a car.",
  intro: [
    "The vehicle stamp duty, often called the vignette, is a yearly tax on motor vehicles. The amount depends on fiscal horsepower.",
    "Insurance companies collect it when you take out third-party insurance.",
  ],
  comoSeCalcula: [
    "Cars and other vehicles: {{cm.timbre-automobile[autre-2-7]}} from 2 to 7 hp, {{cm.timbre-automobile[autre-8-13]}} from 8 to 13 hp, {{cm.timbre-automobile[autre-14-20]}} from 14 to 20 hp and {{cm.timbre-automobile[autre-21]}} above.",
    "Licensed public transport: {{cm.timbre-automobile[transport-2-7]}}, {{cm.timbre-automobile[transport-8-13]}}, {{cm.timbre-automobile[transport-14-20]}} and {{cm.timbre-automobile[transport-21]}} on the same bands.",
    "Motorcycles: {{cm.timbre-automobile[moto-2-roues]}} for two wheels and {{cm.timbre-automobile[moto-3-roues]}} for three. From 2 hp they pay the vehicle rates.",
  ],
  ejemplo: ["A car with 8 fiscal horsepower pays 50,000 F stamp duty a year."],
  faq: [
    {
      pregunta: "When is the vignette paid?",
      respuesta: "It is yearly and is charged with the first insurance premium payment of the year, whether partial or full.",
    },
    {
      pregunta: "What happens without a vignette?",
      respuesta: "It is an offence. You also pay the duty owed plus the same amount again as a penalty.",
    },
    {
      pregunta: "How do I prove I paid?",
      respuesta: "With the payment certificate produced by the tax administration's system, to show at roadside checks.",
    },
  ],
  glosario: [{ termino: "Fiscal horsepower", definicion: "The administrative power of the vehicle, shown on the registration card." }],
});
