import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.foraldrapenning",
  h1: "Föräldrapenning kalkylator",
  title: "Föräldrapenning 2026: räkna ut hur mycket du får per dag",
  description:
    "Räkna ut din föräldrapenning per dag och per månad. Sjukpenningnivån är {{se.foraldrapenning[andel]}} procent av inkomsten upp till taket på {{se.foraldrapenning[tak]}} prisbasbelopp.",
  intro: [
    "Föräldrapenningen på sjukpenningnivå beror på din lön, den sjukpenninggrundande inkomsten. Kalkylatorn visar vad du får per dag och ungefär per månad beroende på hur många dagar i veckan du tar ut.",
    "Det finns ett tak. Tjänar du mer än taket får du samma föräldrapenning som den som ligger precis vid taket.",
  ],
  comoSeCalcula: [
    "Lönen räknas om till en årsinkomst, avrundas nedåt till hela hundratal och begränsas till {{se.foraldrapenning[tak]}} prisbasbelopp. Prisbasbeloppet är {{se.prisbasbelopp}}.",
    "Årsinkomsten multipliceras med {{se.foraldrapenning[faktor]}} och sedan med {{se.foraldrapenning[andel]}} procent.",
    "Beloppet delas med 365 och avrundas till hela kronor. Det är föräldrapenningen per dag.",
    "Blir beloppet {{se.foraldrapenning[grundniva]}} kronor eller lägre får du grundnivån. Dagarna på lägstanivå ger {{se.foraldrapenning[lagstaniva]}} kronor per dag.",
  ],
  ejemplo: [
    "Med 35 000 kronor i månaden blir SGI 420 000 kronor. Föräldrapenningen blir 893 kronor per dag, eller ungefär 19 348 kronor i månaden om du tar ut fem dagar i veckan.",
  ],
  faq: [
    {
      pregunta: "Hur många dagar med föräldrapenning finns det?",
      respuesta:
        "För ett barn finns 480 dagar. 390 av dem kan lämnas på sjukpenningnivå eller grundnivå och 90 dagar på lägstanivå.",
    },
    {
      pregunta: "Vad är högsta föräldrapenning per dag?",
      respuesta: "Med en inkomst vid taket, {{se.foraldrapenning[tak]}} prisbasbelopp per år, blir föräldrapenningen den högsta. Kalkylatorn visar beloppet för 2026.",
    },
    {
      pregunta: "Betalar jag skatt på föräldrapenningen?",
      respuesta: "Ja. Föräldrapenningen beskattas som inkomst. Beloppen i kalkylatorn är före skatt.",
    },
    {
      pregunta: "Får jag föräldralön från min arbetsgivare också?",
      respuesta: "Det beror på ditt kollektivavtal eller anställningsavtal. Föräldralön är inte en del av föräldrapenningen och räknas inte med här.",
    },
  ],
  glosario: [
    { termino: "SGI", definicion: "Sjukpenninggrundande inkomst: den årsinkomst som Försäkringskassan räknar ersättningen på." },
    { termino: "Sjukpenningnivå", definicion: "Föräldrapenning som beror på din inkomst." },
    { termino: "Lägstanivå", definicion: "Ett fast belopp per dag för de sista 90 dagarna." },
  ],
});
