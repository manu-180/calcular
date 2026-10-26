import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.momskalkylator",
  h1: "Momskalkylator: räkna ut moms",
  title: "Momskalkylator 2026: räkna moms med 25, 12 och 6 procent",
  description:
    "Lägg på moms eller räkna ut momsen i ett pris. Med {{se.momssatser[generell]}}, {{se.momssatser[restaurang]}} för restaurang och {{se.momssatser[livsmedel]}} för livsmedel.",
  intro: [
    "Räkna ut hur mycket moms ett pris innehåller, eller lägg på moms på ett belopp utan moms. Välj den momssats som gäller för varan eller tjänsten.",
    "Den vanligaste momsen är {{se.momssatser[generell]}}. Livsmedel har {{se.momssatser[livsmedel]}} från {{se.momssatser#desde}}, medan restaurang och café har {{se.momssatser[restaurang]}}.",
  ],
  comoSeCalcula: [
    "Lägga på moms: belopp utan moms × momssatsen = momsen. Lägg ihop för att få priset med moms.",
    "Räkna ut momsen i ett pris: dela priset med 1 plus momssatsen. Skillnaden mot priset är momsen.",
    "Med 25 procent moms är momsen 20 procent av priset. Med 12 procent är den 10,71 procent och med 6 procent 5,66 procent.",
  ],
  ejemplo: ["En vara kostar 1 250 kronor med 25 procent moms. Utan moms är priset 1 000 kronor, och momsen är 250 kronor."],
  faq: [
    {
      pregunta: "Vilka momssatser finns i Sverige?",
      respuesta:
        "{{se.momssatser[generell]}} gäller för de flesta varor och tjänster. {{se.momssatser[restaurang]}} gäller till exempel restaurang och café. {{se.momssatser[bocker]}} gäller bland annat böcker, tidningar och persontransporter, och livsmedel har {{se.momssatser[livsmedel]}}.",
    },
    {
      pregunta: "Vad är momsen på mat 2026?",
      respuesta:
        "Från {{se.momssatser#desde}} är momsen på livsmedel {{se.momssatser[livsmedel]}}. Även mat för avhämtning räknas som livsmedel. Äter du på plats i en restaurang eller ett café är momsen {{se.momssatser[restaurang]}}.",
    },
    {
      pregunta: "Hur räknar jag bort momsen från ett pris?",
      respuesta: "Dela priset med 1,25 för 25 procent moms, med 1,12 för 12 procent och med 1,06 för 6 procent. Det du får är priset utan moms.",
    },
  ],
  glosario: [
    { termino: "Moms", definicion: "Mervärdesskatt, en skatt på försäljning av varor och tjänster." },
    { termino: "Utgående moms", definicion: "Momsen som ett företag tar ut av sina kunder." },
    { termino: "Ingående moms", definicion: "Momsen som ett företag betalar på sina inköp och får dra av." },
  ],
});
