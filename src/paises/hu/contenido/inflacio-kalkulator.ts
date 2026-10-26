import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.inflacio-kalkulator",
  h1: "Inflációs kalkulátor",
  title: "Inflációs kalkulátor: mennyit ér ma a pénzed?",
  description:
    "Számold át egy régi összeg értékét mai forintra a KSH fogyasztóiár-indexe alapján, 2016 decemberétől a legfrissebb hónapig.",
  intro: [
    "Az infláció miatt ugyanannyi pénzért ma kevesebbet lehet venni, mint néhány éve. A kalkulátor megmutatja, mekkora összeg ér ma annyit, mint a megadott hónapban a kiinduló összeg.",
    "A számítás a Központi Statisztikai Hivatal havi fogyasztóiár-indexén alapul. A legfrissebb adat a hónap első napjával jelölve: {{hu.cpi#desde}}.",
  ],
  comoSeCalcula: [
    "A KSH havi indexeiből egy láncolt indexet képzünk, 2016 decembere a kiindulópont.",
    "Mai érték = összeg × (a záró hónap indexe / a kezdő hónap indexe).",
    "A kerekített havi indexek miatt az eredmény egy-két tizedszázalékkal eltérhet a KSH által közölt időszaki indexektől.",
  ],
  ejemplo: [
    "2020 januárjában 100 000 Ft annyit ért, mint 2026 szeptemberében 157 317 Ft. Az árak ennyi idő alatt több mint 57 százalékkal emelkedtek.",
  ],
  faq: [
    {
      pregunta: "Mennyi volt az infláció 2020 óta?",
      respuesta: "2020 januárjától 2026 szeptemberéig az árak 57,3 százalékkal emelkedtek. A kalkulátorban bármelyik két hónapot összevetheted.",
    },
    {
      pregunta: "Honnan vannak az adatok?",
      respuesta: "A KSH STADAT táblájából, amely a fogyasztóiár-indexet havonta, az előző év decemberéhez viszonyítva közli.",
    },
    {
      pregunta: "Mire jó az inflációs kalkulátor?",
      respuesta: "Megmutatja, mennyit ér ma egy régi fizetés, ár vagy megtakarítás, és hogy lépést tartott-e egy béremelés az árakkal.",
    },
  ],
  glosario: [
    { termino: "Fogyasztóiár-index", definicion: "A háztartások által vásárolt termékek és szolgáltatások árának változása." },
    { termino: "Vásárlóerő", definicion: "Amennyi árut vagy szolgáltatást egy összegért meg lehet venni." },
  ],
});
