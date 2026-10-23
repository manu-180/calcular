import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.advance-tax-calculator",
  h1: "Advance tax calculator for vehicles",
  title: "Advance tax calculator Kenya: matatus, trucks and PSVs",
  description: "Work out advance tax on a commercial or public service vehicle: {{ke.advance-tax-per-ton}} per ton a year or {{ke.advance-tax-per-passenger}} per passenger a month.",
  intro: [
    "Owners of commercial and public service vehicles pay advance tax before the vehicle is licensed. Choose the type of vehicle and enter its capacity.",
    "It is a payment on account of income tax, not an extra tax: you declare it in your yearly return.",
  ],
  comoSeCalcula: [
    "Vans, pick-ups, trucks, prime movers, trailers and lorries pay {{ke.advance-tax-per-ton}} per ton of load capacity a year.",
    "Saloons, station wagons, minibuses, buses and coaches pay {{ke.advance-tax-per-passenger}} per passenger of capacity a month.",
    "Either way, the minimum is {{ke.advance-tax-minimum}} a year.",
  ],
  ejemplo: ["A 14-seater matatu pays 14 × KSh 60 × 12 = KSh 10,080 a year."],
  faq: [
    {
      pregunta: "When is advance tax due?",
      respuesta: "On 20 January, or before the vehicle changes owner.",
    },
    {
      pregunta: "Is advance tax a final tax?",
      respuesta: "No. You declare what you paid in your yearly income tax return and pay any extra tax due.",
    },
    {
      pregunta: "What is the minimum?",
      respuesta: "{{ke.advance-tax-minimum}} a year, whatever the capacity.",
    },
  ],
  glosario: [{ termino: "PSV", definicion: "Public service vehicle: a matatu, bus or other vehicle that carries paying passengers." }],
});
