import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.car-licence-fee-calculator",
  h1: "Car registration and licence fee calculator Jamaica",
  title: "Car licence fee Jamaica: what you pay to register your car",
  description:
    "See the motor vehicle licence fee for your car by engine size and period, from the TAJ fee table, plus the {{jm.fitness-fee-car}} certificate of fitness.",
  intro: [
    "The motor vehicle licence fee you pay at the tax office depends on your car's engine size and on whether you licence it for 6, 12 or 24 months.",
    "Pick the engine size and the period to see the fee, and add the certificate of fitness if it is due.",
  ],
  comoSeCalcula: [
    "Up to 1199cc: {{jm.car-licence-12m[up-1199]}} for 12 months. From 1200cc to 2999cc: {{jm.car-licence-12m[1200-2999]}}.",
    "From 3000cc to 3999cc: {{jm.car-licence-12m[3000-3999]}}. Above 3999cc: {{jm.car-licence-12m[over-3999]}}.",
    "Six months cost half the 12-month fee. For 24 months, the large-engine band costs {{jm.car-licence-24m[over-3999]}}.",
    "The certificate of fitness for a private car is {{jm.fitness-fee-car}}.",
  ],
  ejemplo: ["A 1,500cc car licensed for 12 months pays J$12,600. With the certificate of fitness the total is J$17,100."],
  faq: [
    {
      pregunta: "How much is it to register a car in Jamaica?",
      respuesta: "The yearly licence fee runs from {{jm.car-licence-12m[up-1199]}} for small cars to {{jm.car-licence-12m[over-3999]}} for engines above 3999cc.",
    },
    {
      pregunta: "Is it cheaper to licence for 24 months?",
      respuesta: "For most cars the 24-month fee is twice the 12-month fee, so you save trips to the tax office rather than money.",
    },
    {
      pregunta: "Do taxis pay a different fee?",
      respuesta: "Motor car taxis pay the same as the smallest band: {{jm.car-licence-12m[up-1199]}} for 12 months.",
    },
  ],
  glosario: [
    { termino: "Certificate of fitness", definicion: "The inspection certificate that shows the vehicle is fit to be on the road." },
    { termino: "cc", definicion: "Cubic centimetres, the size of the engine." },
  ],
});
