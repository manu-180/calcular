import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.sykepenger",
  h1: "Sykepenger: regn ut hva du får når du er syk",
  title: "Sykepenger {{anio}}: kalkulator med 6 G og dagsats",
  description:
    "Se hvor mye du får i sykepenger fra Nav: dagsats, per uke og per måned. Taket er 6 G, og grunnbeløpet er {{no.grunnbelop}} fra {{no.grunnbelop#desde}}.",
  intro: [
    "Sykepenger erstatter inntekten din når du ikke kan jobbe på grunn av sykdom. Som arbeidstaker får du full lønn opp til 6 ganger grunnbeløpet.",
    "Skriv inn årsinntekten og hvor mye du er sykmeldt, så ser du dagsatsen og omtrent hva du får i måneden.",
  ],
  comoSeCalcula: [
    "Sykepengegrunnlaget er den vanlige årsinntekten din, men høyst {{no.ytelse-tak-g}} G. Med G på {{no.grunnbelop}} er taket 6 ganger det beløpet.",
    "Arbeidstakere og frilansere får {{no.sykepenger-dekning[arbeidstaker]}} av grunnlaget. Selvstendig næringsdrivende får {{no.sykepenger-dekning[selvstendig]}}.",
    "Dagsatsen er årlig sykepengegrunnlag fordelt på {{no.dagsats-divisor}}, og den betales for fem dager i uken. Er du delvis sykmeldt, får du samme andel av dagsatsen.",
    "Du må ha en årsinntekt på minst halvparten av G for å ha rett. Arbeidsgiveren betaler sykepengene de første {{no.arbeidsgiverperiode}}, deretter overtar Nav.",
  ],
  ejemplo: ["Med 600 000 kr i årslønn og full sykmelding blir dagsatsen 2 307,69 kr. Det er 11 538,46 kr i uken og omtrent 50 000 kr i måneden."],
  faq: [
    {
      pregunta: "Hvor mye får jeg i sykepenger?",
      respuesta: "Som arbeidstaker {{no.sykepenger-dekning[arbeidstaker]}} av inntekten opp til 6 G. Tjener du mer, dekker Nav bare opp til taket.",
    },
    {
      pregunta: "Hvor lenge kan jeg få sykepenger?",
      respuesta: "I høyst 52 uker. Kalkulatoren viser beløpet per dag, uke og måned, ikke hvor lenge du har rett.",
    },
    {
      pregunta: "Hva får selvstendig næringsdrivende?",
      respuesta: "{{no.sykepenger-dekning[selvstendig]}} av sykepengegrunnlaget, fra dag 17.",
    },
    {
      pregunta: "Hvorfor er dagsatsen delt på 260?",
      respuesta: "Folketrygdloven sier at grunnlaget per dag er 1/260 av årsgrunnlaget. Sykepengene betales for alle dager unntatt lørdag og søndag, altså rundt 260 dager i året.",
    },
  ],
  glosario: [
    { termino: "Sykepengegrunnlag", definicion: "Årsinntekten Nav regner sykepengene av, høyst 6 G." },
    { termino: "Arbeidsgiverperioden", definicion: "De første {{no.arbeidsgiverperiode}} av sykefraværet, som arbeidsgiveren betaler." },
    { termino: "G", definicion: "Grunnbeløpet i folketrygden, {{no.grunnbelop}} fra {{no.grunnbelop#desde}}." },
  ],
});
