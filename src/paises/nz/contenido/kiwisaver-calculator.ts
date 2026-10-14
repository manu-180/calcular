import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.kiwisaver-calculator",
  h1: "KiwiSaver calculator",
  title: "KiwiSaver calculator NZ: what goes in each year",
  description:
    "See how much goes into your KiwiSaver each year: your contributions, your employer's {{nz.kiwisaver-employer-rate}} after ESCT, and the government contribution of up to {{nz.kiwisaver-government-max}}.",
  intro: [
    "Your KiwiSaver grows from three sources: what you put in from your pay, what your employer adds, and a yearly government contribution.",
    "Pick your contribution rate and enter your pay to see each part for a year.",
  ],
  comoSeCalcula: [
    "Your contribution is your rate times your gross pay. The default rate is 3.5%, and you can choose 4%, 6%, 8% or 10%.",
    "Your employer adds at least {{nz.kiwisaver-employer-rate}} of your gross pay. Employer superannuation contribution tax (ESCT) comes off first, at a rate set by your salary plus the employer contribution.",
    "The government adds {{nz.kiwisaver-government-rate}} of what you contribute, up to {{nz.kiwisaver-government-max}} a year, if you're 16 to 65 and earn {{nz.kiwisaver-government-income-cap}} or less.",
  ],
  ejemplo: [
    "On $60,000 at 3.5% you put in $2,100 a year. Your employer adds $2,100, less $367.50 ESCT. The government adds $260.72. In total $4,093.22 goes into your account.",
  ],
  faq: [
    {
      pregunta: "Can I stay on 3%?",
      respuesta: "Yes. You can apply for a temporary rate reduction to stay at {{nz.kiwisaver-reduced-rate}}. It lasts 12 months, then you need to reapply, and your employer can also contribute at that rate.",
    },
    {
      pregunta: "How much do I need to put in to get the full government contribution?",
      respuesta: "You need to contribute at least {{nz.kiwisaver-government-full-contribution}} of your own money between 1 July and 30 June. Employer contributions don't count towards it.",
    },
    {
      pregunta: "Are contribution rates going up again?",
      respuesta: "Yes. The default employee rate and the employer contribution both rise to 4% for paydays from 1 April 2028.",
    },
    {
      pregunta: "Do 16 and 17 year olds get employer contributions?",
      respuesta: "Yes. Employer contributions extend to members aged 16 and 17 from 1 April 2026.",
    },
  ],
  glosario: [
    { termino: "ESCT", definicion: "Employer superannuation contribution tax, taken from your employer's contribution before it reaches your account." },
    { termino: "Government contribution", definicion: "A yearly payment from the government into your KiwiSaver, based on what you put in between 1 July and 30 June." },
  ],
});
