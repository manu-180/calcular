import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.night-duty-pay-calculator",
  h1: "Night duty pay calculator Bhutan",
  title: "Night duty pay in Bhutan: the {{bt.night-duty-premium}} extra",
  description: "Calculate the extra pay for night duty in Bhutan. The Act adds {{bt.night-duty-premium}} of your normal hourly rate for each hour. Enter your pay and hours.",
  intro: [
    "An employee below supervisory level who is required to do night duty besides the normal day shift is owed an additional {{bt.night-duty-premium}} of the normal rate of pay for every hour worked. This is section 125 of the Labour and Employment Act of Bhutan 2007.",
    "The Act defines night work as work between {{bt.night-work-start-hour}} o'clock at night and {{bt.night-work-end-hour}} o'clock the following morning, on the 24-hour clock.",
  ],
  comoSeCalcula: [
    "Start with your basic monthly pay. The normal rate of pay leaves out allowances, bonuses and overtime.",
    "Divide it by the normal working hours in your month. The Ministry fixes working hours by executive order (section 104), so use the hours in your contract.",
    "Multiply the hourly rate by {{bt.night-duty-premium}} to get the extra for one night hour.",
    "Multiply that by the hours of night duty. The sum is on top of your normal pay.",
  ],
  ejemplo: [
    "You earn Nu. 25,000 a month on 208 working hours, so one hour is Nu. 120.19. The extra for one night hour is about Nu. 60.10. If you do 16 hours of night duty in the month, the extra comes to Nu. 961.54.",
  ],
  faq: [
    {
      pregunta: "What counts as night work in Bhutan?",
      respuesta: "The Act defines it as work between {{bt.night-work-start-hour}} o'clock at night and {{bt.night-work-end-hour}} o'clock the following morning.",
    },
    {
      pregunta: "How much extra is night duty paid?",
      respuesta: "An additional {{bt.night-duty-premium}} of the normal rate of pay for the hours worked (section 125).",
    },
    {
      pregunta: "Can a pregnant employee be required to work at night?",
      respuesta: "Not in the period around the birth. Section 111 bars night work between 10 at night and 8 in the morning, 140 days before she is due to give birth and 56 days after.",
    },
    {
      pregunta: "Is night duty the same as overtime?",
      respuesta: "They are separate rules. Night duty outside the normal shift earns the extra above (section 125), while overtime is paid at a minimum of the normal rate of pay (section 124).",
    },
  ],
  glosario: [
    { termino: "Night work", definicion: "Work between {{bt.night-work-start-hour}} o'clock at night and {{bt.night-work-end-hour}} o'clock the following morning." },
    { termino: "Supervisory level", definicion: "Managers and supervisors. Sections 124 and 125 cover only employees below that level." },
  ],
});
