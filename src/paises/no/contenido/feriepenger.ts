import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.feriepenger",
  h1: "Beregne feriepenger etter ferieloven",
  title: "Feriepenger 2026: beregn feriepengene dine",
  description:
    "Beregn feriepenger med {{no.feriepenger-sats}} etter ferieloven, egen sats etter avtale eller med tillegget på {{no.feriepenger-tillegg-60}} for deg som er over 60 år.",
  intro: [
    "Feriepenger er lønnen du får for ferien. De regnes av lønnen du fikk utbetalt året før, og kommer i stedet for vanlig lønn mens du har fri.",
    "Skriv inn feriepengegrunnlaget, så ser du hvor mye du får. Har du avtale om lengre ferie og høyere sats, velger du egen sats.",
  ],
  comoSeCalcula: [
    "Etter ferieloven får du {{no.feriepenger-sats}} av feriepengegrunnlaget. Grunnlaget er lønnen som ble utbetalt i opptjeningsåret, vanligvis året før ferien.",
    "Fyller du 60 år i løpet av ferieåret, får du et tillegg på {{no.feriepenger-tillegg-60}} av grunnlaget. Tillegget gis bare av grunnlaget opp til 6 G ({{no.feriepenger-tak-60-g}} ganger grunnbeløpet på {{no.grunnbelop}}).",
    "Ferieloven gir ferie i {{no.feriedager[ordinaer]}} (virkedager), og {{no.feriedager[ekstra-60]}} ekstra fra du fyller 60. Lørdag regnes som virkedag.",
    "Mange har fem ukers ferie gjennom tariffavtale eller arbeidsavtale og en høyere sats. Velg da egen sats og skriv inn satsen fra avtalen.",
  ],
  ejemplo: ["Med 550 000 kr i feriepengegrunnlag gir ferieloven 56 100 kr i feriepenger. Er du over 60 år, blir det 68 750 kr."],
  faq: [
    {
      pregunta: "Hvor mye er feriepenger i prosent?",
      respuesta: "Ferieloven gir {{no.feriepenger-sats}} av feriepengegrunnlaget, og et tillegg på {{no.feriepenger-tillegg-60}} for arbeidstakere over 60 år. Mange avtaler gir en høyere sats.",
    },
    {
      pregunta: "Når blir feriepengene utbetalt?",
      respuesta: "Etter ferieloven siste vanlige lønningsdag før ferien. Du kan kreve å få dem senest en uke før ferien begynner.",
    },
    {
      pregunta: "Hva inngår i feriepengegrunnlaget?",
      respuesta: "Arbeidsvederlaget som er utbetalt i opptjeningsåret. For de fleste er det lønnen fra januar til desember året før ferien.",
    },
  ],
  glosario: [
    { termino: "Opptjeningsår", definicion: "Kalenderåret du tjener opp feriepengene, året før ferien." },
    { termino: "Ferieår", definicion: "Kalenderåret du tar ut ferien og får utbetalt feriepengene." },
    { termino: "G", definicion: "Grunnbeløpet i folketrygden, {{no.grunnbelop}} fra {{no.grunnbelop#desde}}." },
  ],
});
