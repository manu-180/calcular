import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.foreldrepenger",
  h1: "Foreldrepenger: kalkulator for 100 % og 80 %",
  title: "Foreldrepenger 2026: 100 % eller 80 % dekning?",
  description:
    "Sammenlign foreldrepenger med 100 % og 80 % dekning. Se dagsats, beløp per måned og hva dere får totalt, med taket på 6 G ({{no.grunnbelop}} per G).",
  intro: [
    "Foreldrepenger erstatter inntekten når dere er hjemme med et nytt barn. Dere velger mellom 100 % dekning i en kortere periode og 80 % i en lengre.",
    "Skriv inn årsinntekten og velg dekningsgrad, så ser du hva du får per dag, per måned og for hele perioden.",
  ],
  comoSeCalcula: [
    "Grunnlaget er årsinntekten din, men høyst {{no.ytelse-tak-g}} ganger grunnbeløpet. Du må tjene minst en halv G for å ha rett.",
    "Dagsatsen er grunnlaget ganger dekningsgraden, fordelt på {{no.dagsats-divisor}}. Foreldrepenger betales for fem dager i uken.",
    "Når begge har rett, er perioden {{no.foreldrepenger-dager[begge-100]}} med 100 % og {{no.foreldrepenger-dager[begge-80]}} med 80 % (stønadsdager). Det gjelder også når mor er alene om omsorgen.",
    "Er far eller medmor alene, er perioden {{no.foreldrepenger-dager[far-alene-100]}} med 100 % og {{no.foreldrepenger-dager[far-alene-80]}} med 80 %.",
    "Har du ikke rett til foreldrepenger, kan du få engangsstønad på {{no.engangsstonad}} per barn.",
  ],
  ejemplo: [
    "Med 600 000 kr i årsinntekt og 100 % dekning blir dagsatsen 2 307,69 kr og perioden 49 uker, i alt 565 384 kr. Med 80 % blir det 1 846,15 kr per dag i 61 uker og 1 dag, i alt 564 922 kr.",
  ],
  faq: [
    {
      pregunta: "Lønner det seg med 80 % eller 100 %?",
      respuesta: "Totalbeløpet blir nesten det samme. Med 100 % får dere mer per måned i kortere tid, med 80 % mindre per måned i lengre tid. Valget handler mest om hvor lenge dere vil være hjemme.",
    },
    {
      pregunta: "Hvor lang er mødrekvoten og fedrekvoten?",
      respuesta: "For barn født fra 1. juli 2024: 15 uker hver med 100 % og 19 uker hver med 80 %. Fellesperioden er 16 uker med 100 % og 20 uker og 1 dag med 80 %. Mor må i tillegg starte 3 uker før termin.",
    },
    {
      pregunta: "Hva er taket for foreldrepenger?",
      respuesta: "Nav regner av inntekt opp til 6 G. Tjener du mer, får du ikke mer fra Nav, men noen arbeidsgivere dekker mer etter avtale.",
    },
    {
      pregunta: "Hvem får engangsstønad?",
      respuesta: "Den som ikke har rett til foreldrepenger, for eksempel fordi inntekten har vært for lav. Engangsstønaden er {{no.engangsstonad}} for hvert barn.",
    },
  ],
  glosario: [
    { termino: "Dekningsgrad", definicion: "Hvor stor del av inntekten foreldrepengene erstatter: 100 % eller 80 %." },
    { termino: "Stønadsdager", definicion: "Dager med foreldrepenger. Fem dager er én uke." },
    { termino: "G", definicion: "Grunnbeløpet i folketrygden, {{no.grunnbelop}} fra {{no.grunnbelop#desde}}." },
  ],
});
