import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "bz.sick-leave-pay-calculator",
  "h1": "Sick leave pay calculator Belize {{anio}}",
  "title": "Belize sick leave pay {{anio}}: paid days and amount",
  "description": "Check how many paid sick days you have in Belize. The Labour Act gives up to {{bz.sick-leave-days}} working days in 12 months after {{bz.sick-leave-qualifying-days}} days of service.",
  "intro": [
    "A worker in Belize who has been employed for at least {{bz.sick-leave-qualifying-days}} days in the last twelve months can ask for paid sick leave of up to {{bz.sick-leave-days}} working days in any twelve months.",
    "Enter your pay, the days you are off and the paid days you have already used. The calculator shows how many days are paid and what the employer owes."
  ],
  "comoSeCalcula": [
    "Section 131 of the Labour Act applies when the illness was not caused by the worker's own default or misconduct.",
    "The pay for each sick day is the worker's remuneration over the last sixteen days of work. The calculator uses your monthly pay turned into weekly pay and divided by the working days in your week.",
    "Paid days stop at {{bz.sick-leave-days}} in any period of twelve months, less the paid days already used.",
    "The employer can ask for a certificate from a registered medical practitioner. If it is not produced within 48 hours of a written request, the right to paid sick leave is lost.",
    "Where a worker also qualifies for a Social Security sickness benefit, the Board pays the benefit and the employer pays the top up in section 131(4). That top up is not calculated here."
  ],
  "ejemplo": [
    "An employee on BZ$2,000 a month works five days a week. One working day is BZ$92.31, so five days off sick are paid BZ$461.55.",
    "If the same employee has already used 14 paid days, only two more are paid, which is BZ$184.62. The other three days are unpaid."
  ],
  "faq": [
    {
      "pregunta": "How many paid sick days are there in Belize?",
      "respuesta": "Up to {{bz.sick-leave-days}} working days in any twelve months, under section 131 of the Labour Act."
    },
    {
      "pregunta": "Who qualifies?",
      "respuesta": "A worker with at least {{bz.sick-leave-qualifying-days}} days of service with the same employer in the preceding twelve months."
    },
    {
      "pregunta": "Do I need a medical certificate?",
      "respuesta": "If the employer asks for one in writing, you must produce it within 48 hours or you lose the paid leave."
    },
    {
      "pregunta": "How does Social Security sickness benefit fit in?",
      "respuesta": "A worker entitled to both receives the Social Security benefit, and the employer adds the payments set out in section 131(4) of the Labour Act."
    }
  ],
  "glosario": [
    {
      "termino": "Sickness benefit",
      "definicion": "A payment from the Social Security Board to an insured person who cannot work because of illness."
    },
    {
      "termino": "Registered medical practitioner",
      "definicion": "A doctor registered to practise in Belize."
    }
  ]
});
