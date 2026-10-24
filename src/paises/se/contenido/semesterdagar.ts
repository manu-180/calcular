import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.semesterdagar",
  h1: "Räkna ut hur många betalda semesterdagar du har",
  title: "Semesterdagar 2026: räkna ut dina betalda semesterdagar",
  description:
    "Räkna ut hur många betalda semesterdagar du har tjänat in enligt semesterlagen. Alla har rätt till {{se.semesterdagar}} semesterdagar, men alla är inte betalda.",
  intro: [
    "Enligt semesterlagen har du rätt till {{se.semesterdagar}} semesterdagar per år. Hur många av dem som är betalda beror på hur länge du var anställd under intjänandeåret.",
    "Började du mitt i året, eller var du ledig utan lön, blir en del av dagarna obetalda. Kalkylatorn räknar ut fördelningen.",
  ],
  comoSeCalcula: [
    "Ta antalet dagar du var anställd under intjänandeåret.",
    "Dra av de dagar du var helt ledig utan lön. Ledighet som är semesterlönegrundande, till exempel sjukdom upp till 180 dagar, räknas inte bort.",
    "Dela med antalet dagar i intjänandeåret och multiplicera med {{se.semesterdagar}}.",
    "Blir det ett brutet tal avrundas det uppåt till närmaste hela dag.",
  ],
  ejemplo: [
    "Anställd i 182 dagar av 365 ger 182 / 365 × 25 = 12,47, som avrundas till 13 betalda semesterdagar. Resten, 12 dagar, är obetald semester.",
  ],
  faq: [
    {
      pregunta: "Vad är intjänandeår och semesterår?",
      respuesta:
        "Enligt semesterlagen är semesteråret 1 april till 31 mars. Intjänandeåret är tolvmånadersperioden närmast före. Under intjänandeåret tjänar du in betald semester, som du tar ut under semesteråret.",
    },
    {
      pregunta: "Måste jag ta ut de obetalda dagarna?",
      respuesta: "Nej. Du får avstå från semesterdagar som inte är betalda.",
    },
    {
      pregunta: "Räknas sjukfrånvaro bort?",
      respuesta:
        "Nej, inte de första 180 dagarna under intjänandeåret. Sjukdom är semesterlönegrundande upp till den gränsen, och vid arbetsskada utan gräns.",
    },
  ],
  glosario: [
    { termino: "Betald semesterdag", definicion: "En semesterdag då du får semesterlön." },
    { termino: "Semesterlönegrundande frånvaro", definicion: "Ledighet som räknas som om du hade arbetat när semestern tjänas in." },
  ],
});
