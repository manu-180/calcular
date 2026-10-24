import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.prisbasbelopp",
  h1: "Prisbasbelopp 2026: räkna om till kronor",
  title: "Prisbasbelopp 2026: {{se.prisbasbelopp}} och inkomstbasbelopp",
  description:
    "Prisbasbeloppet för 2026 är {{se.prisbasbelopp}}, det förhöjda {{se.forhojt-prisbasbelopp}} och inkomstbasbeloppet {{se.inkomstbasbelopp}}. Räkna om basbelopp till kronor.",
  intro: [
    "Många gränser i skatter och försäkringar anges i prisbasbelopp eller inkomstbasbelopp. Kalkylatorn räknar om ett antal basbelopp till kronor för 2026.",
    "Prisbasbeloppet följer prisutvecklingen och inkomstbasbeloppet följer inkomstutvecklingen. Båda fastställs för ett år i taget.",
  ],
  comoSeCalcula: [
    "Prisbasbeloppet 2026 är {{se.prisbasbelopp}}. Det förhöjda prisbasbeloppet är {{se.forhojt-prisbasbelopp}}.",
    "Inkomstbasbeloppet 2026 är {{se.inkomstbasbelopp}}.",
    "Antal basbelopp × basbeloppet = beloppet i kronor.",
  ],
  ejemplo: ["Taket för sjukpenninggrundande inkomst är tio prisbasbelopp. 10 × 59 200 = 592 000 kronor per år, eller 49 333 kronor i månaden."],
  faq: [
    {
      pregunta: "Vad används prisbasbeloppet till?",
      respuesta: "Bland annat till grundavdraget och jobbskatteavdraget i skatten, taket för föräldrapenning och sjukpenning och lägsta årsbelopp för studielån.",
    },
    {
      pregunta: "Vad används inkomstbasbeloppet till?",
      respuesta: "Till exempel taket för den allmänna pensionsavgiften och för public service-avgiften.",
    },
    {
      pregunta: "Vad är det förhöjda prisbasbeloppet?",
      respuesta: "Ett något högre prisbasbelopp, {{se.forhojt-prisbasbelopp}} för 2026, som används i pensionssystemet.",
    },
  ],
  glosario: [
    { termino: "Prisbasbelopp", definicion: "Ett belopp som följer prisutvecklingen och används för gränser i skatter och förmåner." },
    { termino: "Inkomstbasbelopp", definicion: "Ett belopp som följer inkomstutvecklingen och används i pensionssystemet." },
  ],
});
