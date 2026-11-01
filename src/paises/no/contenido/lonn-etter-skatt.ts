import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.lonn-etter-skatt",
  h1: "Lønn etter skatt: regn ut hva du får utbetalt",
  title: "Lønn etter skatt {{anio}}: kalkulator for nettolønn",
  description:
    "Se hva du sitter igjen med etter skatt i {{anio}}. Kalkulatoren regner trinnskatt, trygdeavgift på {{no.trygdeavgift[lonn]}} og {{no.skatt-alminnelig-inntekt}} skatt med minstefradrag.",
  intro: [
    "Skriv inn bruttolønnen per år eller per måned, så ser du lønn etter skatt og hvor mye som går til hver del av skatten.",
    "Kalkulatoren bruker satsene Skatteetaten har fastsatt for inntektsåret 2026. Den passer for vanlige lønnstakere uten store fradrag ut over minstefradraget og personfradraget.",
  ],
  comoSeCalcula: [
    "Minstefradraget er {{no.minstefradrag-sats[lonn]}} av lønnen, men høyst {{no.minstefradrag-maks[lonn]}}. Det trekkes fra før skatten på alminnelig inntekt.",
    "Alminnelig inntekt er lønn minus minstefradrag og andre fradrag. Etter personfradraget på {{no.personfradrag}} betaler du {{no.skatt-alminnelig-inntekt}} skatt av resten ({{no.skatt-alminnelig-tiltakssonen}} i tiltakssonen, der det også gis et særskilt fradrag på {{no.fradrag-tiltakssonen}}).",
    "Trinnskatt regnes av hele bruttolønnen. Første trinn begynner på {{no.trinnskatt[1].desde}} med {{no.trinnskatt[1].tasa}}, og øverste trinn er {{no.trinnskatt[-1].tasa}} over {{no.trinnskatt[-1].desde}}.",
    "Trygdeavgiften er {{no.trygdeavgift[lonn]}} av lønnen. Under {{no.trygdeavgift-nedre-grense}} betaler du ingen trygdeavgift, og like over grensen blir den aldri mer enn {{no.trygdeavgift-opptrapping}} av det som overstiger grensen.",
    "Lønn etter skatt er bruttolønn minus de tre skattene. Månedsbeløpet er årsbeløpet delt på 12.",
  ],
  ejemplo: [
    "Med 600 000 kr i årslønn blir skatten omtrent 144 180 kr i 2026: 85 750 kr på alminnelig inntekt, 12 840 kr i trinnskatt og 45 600 kr i trygdeavgift. Du sitter igjen med rundt 37 980 kr i måneden.",
  ],
  faq: [
    {
      pregunta: "Hvor mye får jeg utbetalt av 600 000 kr i årslønn?",
      respuesta: "Rundt 455 800 kr i året, eller omtrent 37 980 kr i måneden i snitt. Skatten er da litt over 24 % av bruttolønnen.",
    },
    {
      pregunta: "Hvorfor er trekket på lønnsslippen ikke det samme hver måned?",
      respuesta: "Arbeidsgiveren trekker skatt etter skattekortet ditt, og trekket kan fordele seg ulikt over året, for eksempel rundt ferie. Kalkulatoren viser snittet. Hva du faktisk skal betale for året, avgjøres i skatteoppgjøret.",
    },
    {
      pregunta: "Hva er forskjellen på trinnskatt og skatt på alminnelig inntekt?",
      respuesta: "Trinnskatt regnes av bruttolønnen uten fradrag og øker trinnvis med inntekten. Skatten på alminnelig inntekt er {{no.skatt-alminnelig-inntekt}} av inntekten etter fradrag, og der får du minstefradrag, personfradrag og for eksempel rentefradrag.",
    },
    {
      pregunta: "Hva er marginalskatt?",
      respuesta: "Marginalskatten viser hvor mye av en lønnsøkning som går til skatt. Får du 1 000 kr mer i lønn og marginalskatten er 33,6 %, sitter du igjen med 664 kr av økningen.",
    },
    {
      pregunta: "Tar kalkulatoren med formue, utleie eller pensjon?",
      respuesta: "Nei. Den regner skatt på lønn med fradragene du skriver inn. Har du formue over bunnfradraget, kapitalinntekter eller pensjon, blir den samlede skatten en annen.",
    },
  ],
  glosario: [
    { termino: "Bruttolønn", definicion: "Lønnen før skatt, slik den står i arbeidsavtalen." },
    { termino: "Personinntekt", definicion: "Lønn og annen arbeidsinntekt uten fradrag. Grunnlaget for trinnskatt og trygdeavgift." },
    { termino: "Alminnelig inntekt", definicion: "Inntekt etter fradrag. Her betaler du {{no.skatt-alminnelig-inntekt}} skatt etter personfradraget." },
    { termino: "Tiltakssonen", definicion: "Finnmark og enkelte kommuner i Nord-Troms, med lavere skattesats og eget fradrag." },
  ],
});
