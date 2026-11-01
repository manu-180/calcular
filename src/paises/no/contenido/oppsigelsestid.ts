import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.oppsigelsestid",
  h1: "Oppsigelsestid: når slutter du i jobben?",
  title: "Oppsigelsestid: kalkulator etter arbeidsmiljøloven",
  description:
    "Finn oppsigelsesfristen og siste arbeidsdag etter arbeidsmiljøloven. Fristen er {{no.oppsigelsestid[grunn]}} som hovedregel og opptil {{no.oppsigelsestid[ti-ar-60]}} etter mange år.",
  intro: [
    "Oppsigelsestiden er tiden fra oppsigelsen blir gitt til arbeidsforholdet slutter. Arbeidsmiljøloven setter minstefrister som øker med ansettelsestid og alder.",
    "Fyll inn hvem som sier opp, hvor lenge du har vært ansatt og datoen for oppsigelsen. Da ser du fristen og siste dag.",
  ],
  comoSeCalcula: [
    "Hovedregelen er {{no.oppsigelsestid[grunn]}} gjensidig frist. Etter fem år sammenhengende i virksomheten er fristen minst {{no.oppsigelsestid[fem-ar]}}, og etter ti år minst {{no.oppsigelsestid[ti-ar]}}.",
    "Sier arbeidsgiveren opp en som har vært ansatt i minst ti år, er fristen {{no.oppsigelsestid[ti-ar-50]}} etter fylte 50, {{no.oppsigelsestid[ti-ar-55]}} etter fylte 55 og {{no.oppsigelsestid[ti-ar-60]}} etter fylte 60. Sier arbeidstakeren opp selv, holder det med {{no.oppsigelsestid[arbeidstaker-ti-ar-50]}}.",
    "Fristen løper fra den første dagen i måneden etter at oppsigelsen ble gitt. Gir du oppsigelse 24. oktober, begynner fristen 1. november.",
    "I prøvetiden er fristen {{no.oppsigelsestid-provetid}} hvis ikke annet er avtalt.",
  ],
  ejemplo: ["Har du vært ansatt i seks år og sier opp 15. desember, er fristen to måneder. Den løper fra 1. januar, og siste dag er 28. februar."],
  faq: [
    {
      pregunta: "Hvor lang er oppsigelsestiden?",
      respuesta: "{{no.oppsigelsestid[grunn]}} som hovedregel, hvis ikke arbeidsavtalen eller tariffavtalen sier noe annet. Den blir lengre etter fem og ti år i virksomheten.",
    },
    {
      pregunta: "Når begynner oppsigelsestiden å løpe?",
      respuesta: "Den første dagen i måneden etter at oppsigelsen ble gitt. En oppsigelse 30. april og en 1. april gir derfor samme sluttdato.",
    },
    {
      pregunta: "Kan arbeidsavtalen gi kortere frist?",
      respuesta: "Lengre frist kan avtales. Kortere frist enn loven kan som hovedregel bare avtales mellom arbeidsgiver og tillitsvalgte i en virksomhet som er bundet av tariffavtale.",
    },
  ],
  glosario: [
    { termino: "Oppsigelsesfrist", definicion: "Hvor lenge arbeidsforholdet varer etter oppsigelsen." },
    { termino: "Prøvetid", definicion: "En avtalt periode i starten av ansettelsen med kortere oppsigelsesfrist." },
  ],
});
