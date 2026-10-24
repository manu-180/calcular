import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.sdl-calculator",
  "h1": "SDL calculator Tanzania",
  "title": "SDL calculator Tanzania: Skills Development Levy at {{tz.sdl-rate}}",
  "description": "Work out the Skills Development Levy: {{tz.sdl-rate}} of the gross emoluments paid to all employees, for employers with {{tz.sdl-min-employees}} or more employees.",
  "intro": [
    "SDL is paid by the employer, not deducted from salaries. Enter the gross emoluments for the month and your number of employees.",
    "Emoluments include salaries, wages, leave pay, fees, commissions, bonuses, gratuity and allowances."
  ],
  "comoSeCalcula": [
    "SDL is {{tz.sdl-rate}} of the total gross emoluments paid in the month.",
    "It applies to employers with {{tz.sdl-min-employees}} or more employees, counting permanent, part time, secondary and casual workers.",
    "The monthly return goes to TRA by the 7th day of the following month."
  ],
  "ejemplo": [
    "A business with 12 employees and a payroll of TSh 20 million pays TSh 700,000 of SDL for the month."
  ],
  "faq": [
    {
      "pregunta": "Who does not pay SDL?",
      "respuesta": "Among others: Government departments, diplomatic missions, the UN, registered educational institutions, local government authorities and farm employers whose staff work directly in farming."
    },
    {
      "pregunta": "Is SDL deducted from my salary?",
      "respuesta": "No. It is due and payable by the employer."
    },
    {
      "pregunta": "When is it due?",
      "respuesta": "With the monthly return, by the 7th day of the month after the payroll month."
    }
  ],
  "glosario": [
    {
      "termino": "Gross emoluments",
      "definicion": "Everything paid to employees for their work in the month, before deductions."
    }
  ]
});
