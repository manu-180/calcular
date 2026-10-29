import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bn.stamp-duty-penalty-calculator",
  h1: "Stamp duty late penalty calculator Brunei {{anio}}",
  title: "Brunei stamp duty penalty {{anio}}: late stamping",
  description:
    "Find the penalty for stamping late in Brunei: {{bn.stamp-early-factor}} times the duty after {{bn.stamp-grace-days}} days, {{bn.stamp-late-factor}} times after {{bn.stamp-window-months}} months.",
  intro: [
    "Stamp duty in Brunei Darussalam is charged on the documents listed in the First Schedule of the Stamp Act (Chapter 34), such as a tenancy agreement, a share transfer or a conveyance. The Revenue Division assesses the duty. If you stamp late, a penalty is added on top.",
    "This calculator works out the penalty from the duty you still owe and how late you are. It does not work out the duty itself, because the rate depends on the type of instrument in the Schedule.",
  ],
  comoSeCalcula: [
    "Within {{bn.stamp-grace-days}} days of signing, or of first receipt in Brunei for papers signed abroad, there is no penalty.",
    "After {{bn.stamp-grace-days}} days and within {{bn.stamp-window-months}} months, the penalty is {{bn.stamp-early-factor}} times the deficient duty or {{bn.stamp-early-minimum}}, whichever is greater.",
    "After {{bn.stamp-window-months}} months, the penalty is {{bn.stamp-late-factor}} times the deficient duty or {{bn.stamp-late-minimum}}, whichever is greater. The penalty is paid in addition to the duty.",
  ],
  ejemplo: [
    "An agreement carries duty of BND 400 and you present it after 20 days. The penalty is BND 800.00, because double the duty is more than the BND 10 minimum. You pay BND 1,200.00 in all. After four months the penalty would be BND 1,600.00.",
  ],
  faq: [
    {
      pregunta: "Which loans and rents are exempt from stamp duty?",
      respuesta: "The Revenue Division lists a loan instrument for a first house, land included, up to {{bn.stamp-first-home-loan}}, and a house tenancy with rent of up to {{bn.stamp-tenancy-rent}}. Transfers of property or shares from husband to wife, wife to husband, or parent to child, adopted children included, are also exempt.",
    },
    {
      pregunta: "Can I ask the Revenue Division what I owe?",
      respuesta: "Yes. You can apply for the Collector's opinion on the duty payable. The Revenue Division charges an adjudication fee of 25 dollars for each instrument, even if you withdraw the application.",
    },
    {
      pregunta: "When must a document signed in Brunei be stamped?",
      respuesta: "The Revenue Division says instruments executed in Brunei Darussalam are to be stamped before they are signed. Instruments signed abroad must be stamped within 30 days of first receipt in Brunei.",
    },
    {
      pregunta: "Why is the penalty described differently on two Revenue Division pages?",
      respuesta: "The stamp duty page sets the higher penalty after 3 months. The FAQ page speaks of 30 days. We follow the stamp duty page. If your instrument sits near that line, ask the Revenue Division.",
    },
  ],
  glosario: [
    { termino: "Instrument", definicion: "A document that carries duty, such as a lease or a conveyance." },
    { termino: "Deficient duty", definicion: "The stamp duty that was not paid on time." },
    { termino: "Adjudication", definicion: "The Collector's written opinion on the duty payable on an instrument." },
  ],
});
