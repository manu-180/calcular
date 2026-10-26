import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.kontantstotte",
  h1: "Kontantstøtte: regn ut hva du får med og uten barnehage",
  title: "Kontantstøtte 2026: satser og kalkulator",
  description:
    "Full kontantstøtte er {{no.kontantstotte}} i måneden. Se hva du får med deltid i barnehage, og hvor mye det blir for hele perioden på {{no.kontantstotte-maaneder}}.",
  intro: [
    "Kontantstøtte er en støtte fra Nav for barn mellom 1 og 2 år som ikke har heltidsplass i barnehage.",
    "Velg hvor mange timer i uken barnet har avtalt plass, så ser du kontantstøtten per måned og for hele perioden.",
  ],
  comoSeCalcula: [
    "Full kontantstøtte er {{no.kontantstotte}} i måneden når barnet ikke har barnehageplass.",
    "Med avtalt plass til og med 8 timer i uken får du {{no.kontantstotte-andel[t8]}}, med 9 til 16 timer {{no.kontantstotte-andel[t16]}}, med 17 til 24 timer {{no.kontantstotte-andel[t24]}} og med 25 til 32 timer {{no.kontantstotte-andel[t32]}}.",
    "Med 33 timer eller mer i uken får du ikke kontantstøtte.",
    "Støtten gis fra måneden barnet fyller 13 måneder til og med måneden det fyller 19 måneder, altså i høyst {{no.kontantstotte-maaneder}}.",
  ],
  ejemplo: ["Uten barnehageplass får du 7 500 kr i måneden og 52 500 kr for alle sju månedene. Med 20 timer i uken blir det 3 000 kr i måneden."],
  faq: [
    {
      pregunta: "Hvor mye er kontantstøtten?",
      respuesta: "{{no.kontantstotte}} i måneden når barnet ikke har barnehageplass. Har barnet deltidsplass, får du en del av beløpet.",
    },
    {
      pregunta: "Er det tiden barnet faktisk er i barnehagen som teller?",
      respuesta: "Nei. Det er den avtalte tiden i barnehageavtalen som teller, ikke hvor mye barnet faktisk er der.",
    },
    {
      pregunta: "Hvor lenge får jeg kontantstøtte?",
      respuesta: "I høyst {{no.kontantstotte-maaneder}}, fra måneden barnet fyller 13 måneder. Adoptivforeldre kan ha egne regler.",
    },
  ],
  glosario: [
    { termino: "Avtalt oppholdstid", definicion: "Antall timer i uken barnet har plass i barnehagen etter avtalen." },
  ],
});
