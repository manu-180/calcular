import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.inflacni-kalkulacka",
  h1: "Inflační kalkulačka",
  title: "Inflační kalkulačka: hodnota peněz podle ČSÚ",
  description:
    "Spočítejte, kolik by dnes stála částka z minulých let a o kolik ztratily peníze hodnotu. Podle indexu spotřebitelských cen ČSÚ od roku 2015.",
  intro: [
    "Inflace snižuje kupní sílu peněz. Kalkulačka přepočte částku z jednoho měsíce na ceny jiného měsíce podle indexu spotřebitelských cen Českého statistického úřadu.",
    "Hodí se pro porovnání mezd, nájemného nebo úspor v čase.",
  ],
  comoSeCalcula: [
    "Použije se bazický index spotřebitelských cen (průměr roku 2015 = 100) za oba měsíce.",
    "Částka v nových cenách = částka × index konečného měsíce / index počátečního měsíce.",
    "Pokud konečný měsíc ještě nemá zveřejněná data, počítá se do posledního dostupného měsíce. To je poslední měsíc, za který ČSÚ index zveřejnil.",
  ],
  ejemplo: ["10 000 Kč z ledna 2020 má stejnou kupní sílu jako 14 342 Kč v září 2026. Ceny za tu dobu vzrostly o 43,4 %."],
  faq: [
    {
      pregunta: "Odkud jsou údaje o inflaci?",
      respuesta: "Z otevřených dat Českého statistického úřadu: index spotřebitelských cen za všechny domácnosti a celé Česko.",
    },
    {
      pregunta: "Jaká je aktuální inflace?",
      respuesta: "Meziroční inflaci zjistíte, když zadáte stejný měsíc loňského a letošního roku. Kalkulačka ukáže změnu cen za libovolné období od ledna 2015.",
    },
    {
      pregunta: "Proč se výsledek liší od míry inflace v médiích?",
      respuesta: "Média obvykle uvádějí meziroční inflaci za jeden měsíc. Kalkulačka počítá celkovou změnu cen mezi dvěma měsíci, které si zvolíte.",
    },
  ],
  glosario: [
    { termino: "Index spotřebitelských cen", definicion: "Měří, jak se mění ceny zboží a služeb, které kupují domácnosti." },
    { termino: "Kupní síla", definicion: "Kolik zboží a služeb si za danou částku koupíte." },
  ],
});
