import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.transport-presumptive-tax",
  "h1": "Presumptive tax for transport",
  "title": "Presumptive tax for daladala, bajaji, trucks and taxis",
  "description": "See the yearly presumptive income tax for passenger, tour, goods and private hire vehicles in Tanzania, from the TRA schedule.",
  "intro": [
    "Resident individuals who carry passengers or goods pay a fixed income tax for each vehicle. Choose the type of vehicle and its capacity.",
    "Enter how many vehicles you have to see the total."
  ],
  "comoSeCalcula": [
    "Passenger service vehicles pay by number of passengers, tour vehicles by number of tourists and goods vehicles by load capacity.",
    "Taxis, ride hailing, ride sharing and special hire vehicles each have their own amount.",
    "The total is the amount for one vehicle times the number of vehicles."
  ],
  "ejemplo": [
    "A 14-seater daladala pays TSh 250,000 a year. A ride hailing car pays TSh 350,000."
  ],
  "faq": [
    {
      "pregunta": "Who pays this tax?",
      "respuesta": "Resident individuals engaged in transporting passengers or goods."
    },
    {
      "pregunta": "Is it per vehicle?",
      "respuesta": "Yes. Each vehicle has its own amount according to its class and capacity."
    },
    {
      "pregunta": "Does it replace a normal return?",
      "respuesta": "Under the presumptive regime you are not required to file a final return with audited accounts unless you choose to."
    }
  ],
  "glosario": [
    {
      "termino": "Daladala",
      "definicion": "A minibus that carries paying passengers on a fixed route."
    }
  ]
});
