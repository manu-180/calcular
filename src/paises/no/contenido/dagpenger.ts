import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.dagpenger",
  h1: "Dagpenger: regn ut hva du får når du blir arbeidsledig",
  title: "Dagpenger {{anio}}: kalkulator for dagsats og periode",
  description:
    "Se om du har rett til dagpenger, hva du får per dag og per meldekort, og om du får dagpenger i 52 eller 104 uker. Med G på {{no.grunnbelop}}.",
  intro: [
    "Dagpenger erstatter deler av inntekten når du blir arbeidsledig eller permittert. Du får {{no.dagpenger-sats}} av den tidligere inntekten, opp til 6 G.",
    "Skriv inn hva du har tjent de siste 12 månedene, og gjerne de siste 36. Kalkulatoren sjekker kravet til inntekt og viser dagsats, beløp per meldekort og hvor lenge du kan få dagpenger.",
  ],
  comoSeCalcula: [
    "Du har rett hvis du har tjent minst {{no.dagpenger-krav-12}} G de siste 12 månedene, eller {{no.dagpenger-krav-36}} G til sammen de siste 36 månedene.",
    "Grunnlaget er det beste av inntekten de siste 12 månedene og snittet av de siste 36. Inntekt over {{no.ytelse-tak-g}} G teller ikke.",
    "Dagsatsen er {{no.dagpenger-sats}} av grunnlaget fordelt på {{no.dagsats-divisor}}, og den betales for fem dager i uken.",
    "For hvert barn du forsørger, får du {{no.dagpenger-barnetillegg}} ekstra per dag. Dagpenger med barnetillegg kan ikke bli mer enn {{no.dagpenger-maks-andel}} av grunnlaget.",
    "Har du tjent minst {{no.dagpenger-grense-lang}} G, kan du få dagpenger i {{no.dagpenger-uker[lang]}}. Ellers er perioden {{no.dagpenger-uker[kort]}}.",
  ],
  ejemplo: ["Har du tjent 500 000 kr de siste 12 månedene, blir dagsatsen 1 200 kr. Det er 6 000 kr i uken og 12 000 kr per meldekort, i opptil 104 uker."],
  faq: [
    {
      pregunta: "Hvor mye får jeg i dagpenger?",
      respuesta: "{{no.dagpenger-sats}} av inntekten du hadde før, opp til 6 G. Med 500 000 kr i inntekt blir det 1 200 kr per dag, fem dager i uken.",
    },
    {
      pregunta: "Hvor mye må jeg ha tjent for å få dagpenger?",
      respuesta: "Minst {{no.dagpenger-krav-12}} G de siste 12 månedene, eller {{no.dagpenger-krav-36}} G til sammen de siste 36 månedene. Kalkulatoren regner om til kroner med dagens G på {{no.grunnbelop}}.",
    },
    {
      pregunta: "Hvor lenge får jeg dagpenger?",
      respuesta: "I opptil {{no.dagpenger-uker[lang]}} hvis inntekten var minst {{no.dagpenger-grense-lang}} G, ellers i opptil {{no.dagpenger-uker[kort]}}.",
    },
    {
      pregunta: "Får jeg mer hvis jeg har barn?",
      respuesta: "Ja, et barnetillegg på {{no.dagpenger-barnetillegg}} per barn per dag, fem dager i uken.",
    },
  ],
  glosario: [
    { termino: "Dagpengegrunnlag", definicion: "Inntekten Nav regner dagpengene av, høyst 6 G." },
    { termino: "Meldekort", definicion: "Skjemaet du sender til Nav hver 14. dag for å få utbetalt dagpenger." },
    { termino: "G", definicion: "Grunnbeløpet i folketrygden, {{no.grunnbelop}} fra {{no.grunnbelop#desde}}." },
  ],
});
