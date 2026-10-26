import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.inflationskalkylator",
  h1: "Inflationskalkylator med KPI",
  title: "Inflationskalkylator: räkna om pengars värde med KPI",
  description:
    "Räkna om ett belopp till dagens penningvärde med konsumentprisindex från SCB. Senaste KPI är {{se.kpi}} ({{se.kpi#desde}}, 1980 = 100).",
  intro: [
    "Vad skulle 1 000 kronor från år 2000 motsvara i dag? Kalkylatorn räknar om ett belopp mellan två månader med konsumentprisindex, KPI, från SCB.",
    "Du ser också hur mycket priserna har ändrats under perioden och vad dagens belopp hade varit värt då.",
  ],
  comoSeCalcula: [
    "Hämta KPI för startmånaden och för slutmånaden. Serien har 1980 som basår.",
    "Dela slutmånadens KPI med startmånadens. Det är hur mycket priserna har ändrats.",
    "Multiplicera beloppet med kvoten. Det är beloppet i slutmånadens penningvärde.",
  ],
  ejemplo: ["KPI var 257,5 i januari 2000 och 423,06 i september 2026. 1 000 kronor från januari 2000 motsvarar därför 1 642,95 kronor i september 2026."],
  faq: [
    {
      pregunta: "Vad är KPI?",
      respuesta: "Konsumentprisindex mäter hur priserna på det vi handlar förändras. Det är det vanligaste måttet på inflation i Sverige och tas fram av SCB varje månad.",
    },
    {
      pregunta: "Varför står det 1980 = 100?",
      respuesta:
        "Från januari 2026 fastställer SCB KPI med 2020 som basår. SCB räknar också om de nya talen till 1980 = 100, så att du kan jämföra med äldre siffror. Kalkylatorn använder den serien.",
    },
    {
      pregunta: "Hur ofta uppdateras KPI?",
      respuesta: "SCB publicerar KPI varje månad. Kalkylatorn använder den senaste månad som har publicerats.",
    },
  ],
  glosario: [
    { termino: "KPI", definicion: "Konsumentprisindex, SCB:s mått på hur konsumentpriserna förändras." },
    { termino: "Inflation", definicion: "När priserna stiger och pengarna räcker till mindre." },
    { termino: "Penningvärde", definicion: "Vad ett belopp kan köpa vid en viss tidpunkt." },
  ],
});
