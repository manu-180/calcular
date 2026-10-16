import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.night-differential",
  h1: "Night differential calculator",
  title: "Night differential pay calculator Philippines",
  description: "Work out your night shift differential: {{ph.night-shift-differential}} of your hourly rate for every hour worked between 10 pm and 6 am, on any type of day.",
  intro: [
    "Every hour you work between 10 pm and 6 am earns a night shift differential of at least {{ph.night-shift-differential}} of your regular wage.",
    "If the night falls on a rest day or holiday, the differential is computed on that day's higher hourly rate.",
  ],
  comoSeCalcula: [
    "Your hourly rate is your daily wage divided by {{ph.normal-hours}}, with the premium of the day if it is a rest day, special day or holiday.",
    "The night differential is {{ph.night-shift-differential}} of that hourly rate for each hour between 10 pm and 6 am.",
    "For overtime hours at night, use the overtime calculator: the differential is then {{ph.night-shift-differential}} of the overtime rate.",
  ],
  ejemplo: ["With a daily wage of ₱800, a full 8-hour night shift on an ordinary day adds ₱80. Over 20 nights, that is ₱1,600."],
  faq: [
    {
      pregunta: "Who is entitled to night differential?",
      respuesta:
        "Employees in the private sector, except government workers, managerial employees, field personnel, domestic workers and those in retail and service establishments regularly employing not more than five workers.",
    },
    {
      pregunta: "What hours count as night work?",
      respuesta: "Every hour of work between ten o'clock in the evening and six o'clock in the morning.",
    },
    {
      pregunta: "Is night differential taxed for minimum wage earners?",
      respuesta: "No. The night shift differential of a minimum wage earner is exempt from income tax, like the minimum wage itself.",
    },
  ],
  glosario: [
    { termino: "Night shift differential", definicion: "Extra pay of at least 10% of the regular wage for each hour of work from 10 pm to 6 am." },
    { termino: "Field personnel", definicion: "Employees whose time and performance are not supervised by the employer." },
  ],
});
