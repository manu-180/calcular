import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.indemnizatie-unica-la-nastere",
  h1: "Indemnizația unică la nașterea copilului 2026",
  title: "Indemnizația unică la naștere 2026: {{md.indemnizatie-nastere}}",
  description: "Pentru copiii născuți din {{md.indemnizatie-nastere#desde}}, mama primește {{md.indemnizatie-nastere}} pentru fiecare copil. Vedeți și indemnizația lunară de îngrijire.",
  intro: [
    "La nașterea unui copil, statul plătește mamei o indemnizație unică, pentru fiecare copil născut viu, inclusiv la gemeni.",
    "Pe lângă ea, pentru fiecare copil până la 2 ani se plătește lunar o indemnizație de îngrijire, indiferent dacă părintele este asigurat.",
  ],
  comoSeCalcula: [
    "Indemnizația unică este {{md.indemnizatie-nastere}} pentru fiecare copil născut viu, de la {{md.indemnizatie-nastere#desde}}.",
    "Indemnizația lunară pentru îngrijirea copilului până la 2 ani este {{md.ingrijire-copil-2-ani}} pentru fiecare copil.",
    "Calculatorul înmulțește sumele cu numărul de copii.",
  ],
  faq: [
    {
      pregunta: "Trebuie să depun cerere pentru indemnizația unică?",
      respuesta: "Nu. Din 2024, CNAS o stabilește mamei din oficiu, pe baza datelor despre naștere din Registrul de stat al populației.",
    },
    {
      pregunta: "Cine primește indemnizația unică?",
      respuesta: "Mama, iar dacă ea a decedat, reprezentantul legal al copilului. Copilul trebuie să fie înregistrat la Agenția Servicii Publice.",
    },
    {
      pregunta: "Cât este indemnizația de îngrijire până la 2 ani?",
      respuesta: "{{md.ingrijire-copil-2-ani}} pe lună pentru fiecare copil, din ziua nașterii până la vârsta de 2 ani.",
    },
  ],
  glosario: [
    { termino: "Indemnizație unică", definicion: "Plată făcută o singură dată, la nașterea copilului." },
    { termino: "Din oficiu", definicion: "Fără cerere: CNAS stabilește plata pe baza datelor din registre." },
  ],
});
