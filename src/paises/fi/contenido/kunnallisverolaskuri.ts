import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.kunnallisverolaskuri",
  h1: "Kunnallisverolaskuri: paljonko maksat kunnallisveroa",
  title: "Kunnallisvero {{anio}}: laske ja vertaa kuntia",
  description:
    "Laske kunnallisvero ja kirkollisvero kotikuntasi veroprosentilla. Vertaa toiseen kuntaan ja näe, paljonko verosi muuttuisivat muuton jälkeen.",
  intro: [
    "Kunnallisvero on suurin yksittäinen vero, jonka palkansaaja maksaa. Jokainen kunta päättää oman tuloveroprosenttinsa, joten sama palkka verotetaan eri kunnissa eri tavalla.",
    "Valitse kotikuntasi ja vertailukunta. Laskuri näyttää kunnallisveron ja kaikki verot molemmissa kunnissa samalla palkalla.",
  ],
  comoSeCalcula: [
    "Kunnallisvero lasketaan verotettavasta tulosta, ei bruttopalkasta. Palkasta vähennetään ensin tulonhankkimisvähennys {{fi.tulonhankkimisvahennys}}, työeläkemaksu, työttömyysvakuutusmaksu ja päivärahamaksu.",
    "Pienituloinen saa vielä perusvähennyksen, enintään {{fi.perusvahennys}}.",
    "Verotettava tulo kerrotaan kunnan tuloveroprosentilla. Kirkon jäsen maksaa lisäksi seurakunnan tuloveroprosentin mukaisen kirkollisveron.",
    "Jos valtion vero ei riitä työtulovähennykseen, loppu vähennetään kunnallisverosta, kirkollisverosta ja sairaanhoitomaksusta. Siksi pienituloisen kunnallisvero voi olla nolla.",
  ],
  ejemplo: [
    "Evankelis-luterilaisen kirkon jäsen ansaitsee 40 000 euroa vuodessa. Helsingissä kunnallisveroa kertyy 1 887,97 euroa ja verot ovat yhteensä 5 511,99 euroa.",
    "Tampereella sama palkka tuottaa kunnallisveroa 2 707,27 euroa. Kaikki verot ovat 908,36 euroa suuremmat kuin Helsingissä.",
  ],
  faq: [
    {
      pregunta: "Mistä kunnallisveroprosentti määräytyy?",
      respuesta:
        "Jokainen kunta vahvistaa oman tuloveroprosenttinsa vuodeksi kerrallaan. Verotuksessa käytetään sen kunnan prosenttia, joka oli kotikuntasi edellisen vuoden lopussa.",
    },
    {
      pregunta: "Paljonko kunnallisvero on Helsingissä?",
      respuesta: "Helsingin tuloveroprosentti on {{fi.kunnallisvero[helsinki]}}. Espoossa se on {{fi.kunnallisvero[espoo]}} ja Vantaalla {{fi.kunnallisvero[vantaa]}}.",
    },
    {
      pregunta: "Pitääkö kirkollisveroa maksaa?",
      respuesta:
        "Vain jos kuulut evankelis-luterilaiseen tai ortodoksiseen kirkkoon. Seurakunnan veroprosentti määräytyy samoin kuin kunnallisvero kotikuntasi mukaan.",
    },
    {
      pregunta: "Muuttuuko veroprosenttini heti, kun muutan?",
      respuesta:
        "Ei muutu. Kotikunta ei vaihdu verotuksessa kesken vuoden, joten koko vuoden kunnallisvero lasketaan vanhan kunnan prosentilla. Uuden kunnan prosentti koskee seuraavaa vuotta.",
    },
  ],
  glosario: [
    { termino: "Kunnallisvero", definicion: "Kunnalle maksettava tulovero. Se on prosenttiosuus verotettavasta tulosta." },
    { termino: "Kirkollisvero", definicion: "Seurakunnalle maksettava vero, jonka maksavat kirkon jäsenet." },
  ],
});
