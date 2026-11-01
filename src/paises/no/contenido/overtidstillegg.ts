import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.overtidstillegg",
  h1: "Overtidstillegg: regn ut betaling for overtid",
  title: "Overtidskalkulator: regn ut overtidstillegg",
  description:
    "Regn ut hva du får for overtid med minst {{no.overtidstillegg}} overtidstillegg etter arbeidsmiljøloven, eller med satsen i avtalen din. Fra timelønn eller månedslønn.",
  intro: [
    "Jobber du ut over den avtalte arbeidstiden, har du rett til overtidsbetaling. Den er vanlig timelønn pluss et overtidstillegg.",
    "Skriv inn timelønnen eller månedslønnen, antall timer og tillegget, så ser du hva du skal ha for overtiden.",
  ],
  comoSeCalcula: [
    "Arbeidsmiljøloven krever et overtidstillegg på minst {{no.overtidstillegg}} av lønnen for tilsvarende arbeid i vanlig arbeidstid.",
    "Betaling per overtidstime er timelønn pluss tillegget. Ganger du med antall timer, får du betalingen for overtiden.",
    "Har du månedslønn, regner kalkulatoren timelønnen som årslønn delt på ukentlig arbeidstid ganger 52. Lønnsslippen din kan bruke en annen deler.",
    "Loven setter grenser: høyst {{no.overtid-grenser[uke]}} på sju dager, {{no.overtid-grenser[fire-uker]}} på fire sammenhengende uker og {{no.overtid-grenser[ar]}} på 52 uker. En tariffavtale kan tillate mer.",
  ],
  ejemplo: ["Med 300 kr i timelønn og 40 % tillegg får du 420 kr per overtidstime. Ti timer overtid gir 4 200 kr før skatt."],
  faq: [
    {
      pregunta: "Hvor mye er overtidstillegget?",
      respuesta: "Minst {{no.overtidstillegg}} etter arbeidsmiljøloven. Mange arbeidsavtaler og tariffavtaler gir mer.",
    },
    {
      pregunta: "Kan jeg ta overtid som avspasering?",
      respuesta: "Ja, hvis du og arbeidsgiveren avtaler skriftlig at overtidstimene helt eller delvis tas ut som fri på et avtalt tidspunkt.",
    },
    {
      pregunta: "Hvor mye overtid kan arbeidsgiveren kreve?",
      respuesta: "Høyst {{no.overtid-grenser[uke]}} i løpet av sju dager, {{no.overtid-grenser[fire-uker]}} på fire uker og {{no.overtid-grenser[ar]}} på 52 uker etter hovedregelen.",
    },
  ],
  glosario: [
    { termino: "Overtid", definicion: "Arbeid ut over den alminnelige arbeidstiden i loven." },
    { termino: "Avspasering", definicion: "Fri i stedet for lønn for overtidstimene." },
  ],
});
