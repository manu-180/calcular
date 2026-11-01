import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.road-maintenance-levy-calculator",
  h1: "Road maintenance levy calculator Rwanda",
  title: "Road maintenance levy Rwanda: yearly amount per vehicle",
  description: "See the yearly levy on motor vehicles for road maintenance: {{rw.road-levy[car]}} for a car or jeep, up to {{rw.road-levy[trailer]}} for a trailer.",
  intro: [
    "Owners of motor vehicles pay a yearly levy for road maintenance to the RRA. The amount depends only on the vehicle category. Choose it to see what you owe.",
  ],
  comoSeCalcula: [
    "Car or jeep: {{rw.road-levy[car]}}. Pick-up, microbus, minibus or bus: {{rw.road-levy[bus]}}.",
    "Truck or half trailer: {{rw.road-levy[truck]}}. Trailer: {{rw.road-levy[trailer]}}.",
    "The amount is per vehicle and per year.",
  ],
  ejemplo: ["A family car pays RWF 50,000 a year. A transport company with three trucks pays RWF 360,000."],
  faq: [
    {
      pregunta: "When is the levy due?",
      respuesta: "Declare and pay it to the RRA by 31 December of each year.",
    },
    {
      pregunta: "Which vehicles are exempt?",
      respuesta: "Vehicles of the Government of Rwanda, of high commissions, embassies and accredited diplomats, and of international organisations with an agreement with Rwanda.",
    },
    {
      pregunta: "Which law sets it?",
      respuesta: "Law 013/2025 of 27 May 2025 establishing a levy on petrol, gas oil and motor vehicles for road maintenance.",
    },
  ],
  glosario: [
    { termino: "Road maintenance levy", definicion: "A yearly charge on motor vehicles that funds road upkeep." },
    { termino: "Half trailer", definicion: "A semi-trailer pulled by a truck." },
  ],
});
