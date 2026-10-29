import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.paye-calculator",
  h1: "PAYE calculator Samoa {{anio}}",
  title: "PAYE calculator Samoa {{anio}}: salary and wage tax",
  description: "Work out the PAYE your employer withholds. Nothing is taxed up to {{ws.paye-fortnightly-bands[1].hasta}} a fortnight, then {{ws.paye-fortnightly-bands[1].tasa}} and {{ws.paye-fortnightly-bands[2].tasa}}.",
  intro: [
    "PAYE is the income tax your employer holds back from each pay. In Samoa a fortnight of pay up to {{ws.paye-fortnightly-bands[1].hasta}} pays nothing. The next slice, up to {{ws.paye-fortnightly-bands[2].desde}}, is taxed at {{ws.paye-fortnightly-bands[1].tasa}}, and anything above that at {{ws.paye-fortnightly-bands[2].tasa}}.",
    "Enter your gross pay and choose how often you are paid. You see the tax, the pay left after tax and the rate that applies to your next tala.",
  ],
  comoSeCalcula: [
    "Fortnightly pay is measured against the fortnightly bands in Information Sheet IS02 of the Ministry for Revenue. Each slice of pay is taxed at the rate of its band.",
    "Monthly and yearly pay is measured against the annual bands in Information Sheet IS01: nothing up to {{ws.income-tax-bands[1].hasta}} a year, {{ws.income-tax-bands[1].tasa}} up to {{ws.income-tax-bands[2].desde}}, and {{ws.income-tax-bands[2].tasa}} above. Monthly tax is one twelfth of the yearly figure.",
    "PAYE is a final tax on your wages. It is worked out on your pay as it is and cannot be reduced by other deductions or credits, so employees file no separate return.",
  ],
  ejemplo: [
    "Take a fortnightly pay of WST 1,000. The slice from 576 to 962 is WST 386, taxed at 20%, which is WST 77.20. The last WST 38 is taxed at 27%, which is WST 10.26. PAYE for the fortnight is WST 87.46 and you keep WST 912.54 before any NPF contribution.",
  ],
  faq: [
    {
      pregunta: "Who has to pay PAYE?",
      respuesta: "Your employer is liable when your pay is more than {{ws.paye-fortnightly-bands[1].hasta}} a fortnight (IS02, Ministry for Revenue). Employers file a P4 return every month, by the 15th of the following month.",
    },
    {
      pregunta: "Does PAYE include allowances and bonuses?",
      respuesta: "Yes. IS02 counts salary, wages, overtime, bonuses, commission and allowances received as part of employment, as well as leave pay and payments on redundancy or termination.",
    },
    {
      pregunta: "Do I file a tax return as an employee?",
      respuesta: "No. IS02 says PAYE on salary and wages is a final tax, so there is no separate return for employees. You can ask the Commissioner in writing to recalculate it if you think you were overtaxed.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay as you earn: the income tax an employer withholds from salary and wages." },
    { termino: "P4 return", definicion: "The monthly return in which an employer reports pay and PAYE for all employees." },
    { termino: "Band", definicion: "A slice of pay taxed at one rate." },
  ],
});
