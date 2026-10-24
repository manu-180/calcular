import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.semesterersattning",
  h1: "Beräkna semesterersättning och semestertillägg",
  title: "Semesterersättning 2026: beräkna {{se.semesterlon-procent}} eller semestertillägg",
  description:
    "Beräkna semesterersättning med procentregeln ({{se.semesterlon-procent}} av lönen) eller semestertillägget på {{se.semestertillagg[manad]}} per dag med sammalöneregeln.",
  intro: [
    "Semesterlagen har två sätt att räkna semesterlön. Har du timlön får du en procent av lönen du har tjänat. Har du fast månadslön får du din vanliga lön under semestern och dessutom ett semestertillägg.",
    "Välj hur du får betalt, så räknar kalkylatorn ut beloppet enligt rätt regel.",
  ],
  comoSeCalcula: [
    "Procentregeln: semesterlönen är {{se.semesterlon-procent}} av den lön du har fått under intjänandeåret. Semesterlön som du redan har fått räknas inte med.",
    "Sammalöneregeln för månadslön: du behåller lönen och får ett semestertillägg på {{se.semestertillagg[manad]}} av månadslönen för varje betald semesterdag.",
    "Sammalöneregeln för veckolön: tillägget är {{se.semestertillagg[vecka]}} av veckolönen per betald semesterdag.",
    "Fasta lönetillägg läggs till lönen innan tillägget räknas ut.",
  ],
  ejemplo: [
    "Har du tjänat 250 000 kronor på timlön blir semesterersättningen 30 000 kronor. Med 32 000 kronor i månadslön och 25 semesterdagar blir semestertillägget 3 440 kronor.",
  ],
  faq: [
    {
      pregunta: "Vad är skillnaden mellan semesterlön och semesterersättning?",
      respuesta:
        "Semesterlön får du när du tar ut semester. Semesterersättning får du i stället när anställningen tar slut innan du har fått den semesterlön du har tjänat in. Den räknas på samma sätt.",
    },
    {
      pregunta: "När gäller procentregeln?",
      respuesta:
        "För dig som inte har lön bestämd per vecka eller månad, till exempel timlön. Den gäller också om en rörlig del av lönen är minst tio procent eller om sysselsättningsgraden har ändrats.",
    },
    {
      pregunta: "Kan kollektivavtalet ge något annat?",
      respuesta:
        "Ja. Ett kollektivavtal kan ha egna regler för semesterlön och semesterersättning. Kalkylatorn följer semesterlagen.",
    },
  ],
  glosario: [
    { termino: "Intjänandeår", definicion: "Året då du tjänar in semester, som tas ut under det följande semesteråret." },
    { termino: "Sammalöneregeln", definicion: "Du får din vanliga månads- eller veckolön under semestern plus ett tillägg." },
    { termino: "Procentregeln", definicion: "Semesterlönen är en procent av den lön du har tjänat under intjänandeåret." },
  ],
});
