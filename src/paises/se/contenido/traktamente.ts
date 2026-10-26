import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.traktamente",
  h1: "Räkna ut traktamente för tjänsteresor i Sverige",
  title: "Traktamente 2026: räkna ut skattefritt traktamente",
  description:
    "Räkna ut skattefritt traktamente för en tjänsteresa i Sverige: {{se.traktamente[heldag]}} per hel dag 2026, med avdrag för måltider som ingår.",
  intro: [
    "Är du på tjänsteresa med övernattning kan arbetsgivaren betala ut skattefritt traktamente för dina ökade levnadskostnader. Kalkylatorn räknar ut det högsta skattefria beloppet.",
    "Beloppet minskar om måltider ingår, till exempel frukost på hotellet, och när resan har pågått längre än tre månader på samma ort.",
  ],
  comoSeCalcula: [
    "De första tre månaderna är traktamentet {{se.traktamente[heldag]}} per hel dag och {{se.traktamente[halvdag]}} per halv dag.",
    "Efter tre månader är det {{se.traktamente[efter3]}} per hel dag och efter två år {{se.traktamente[efter2]}}.",
    "Nattraktamente på {{se.traktamente[natt]}} betalas för nätter då arbetsgivaren inte har betalat logi.",
    "För fria måltider dras ett belopp per dag. Med hela traktamentet är det {{se.traktamente-minskning[heldag-frukost]}} för frukost, {{se.traktamente-minskning[heldag-lunch]}} för lunch eller middag, {{se.traktamente-minskning[heldag-lunchmiddag]}} för lunch och middag och {{se.traktamente-minskning[heldag-allt]}} när all mat ingår.",
  ],
  ejemplo: ["Tre hela dagar och en halv dag ger 1 050 kronor. Ingår frukost två av dagarna minskar traktamentet med 120 kronor till 930 kronor."],
  faq: [
    {
      pregunta: "Vad räknas som hel dag?",
      respuesta: "Avresedagen om du åker före klockan 12, hemkomstdagen om du kommer hem efter klockan 19 och alla dagar däremellan. Annars är det en halv dag.",
    },
    {
      pregunta: "När är traktamente skattefritt?",
      respuesta: "När du övernattar minst en natt och reser till en plats mer än 50 kilometer från både din vanliga arbetsplats och din bostad, och beloppet inte är högre än schablonbeloppen.",
    },
    {
      pregunta: "Vad händer om arbetsgivaren betalar mer?",
      respuesta: "Det som är över de skattefria beloppen är lön. Du betalar skatt på den delen, och arbetsgivaren redovisar den som lön.",
    },
  ],
  glosario: [
    { termino: "Traktamente", definicion: "Ersättning för ökade levnadskostnader på en tjänsteresa." },
    { termino: "Normalbelopp", definicion: "Det skattefria beloppet för en hel dag, {{se.traktamente[heldag]}} för resor i Sverige 2026." },
    { termino: "Nattraktamente", definicion: "Ersättning för en natt då arbetsgivaren inte har betalat logi." },
  ],
});
