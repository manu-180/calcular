import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.kalkulator-pdv",
  h1: "Kalkulator PDV {{anio}}: stope {{me.pdv-opsta}}, {{me.pdv-snizena-15}} i {{me.pdv-snizena-7}}",
  title: "Kalkulator PDV {{anio}}: dodajte ili izdvojite {{me.pdv-opsta}}, {{me.pdv-snizena-15}} i {{me.pdv-snizena-7}}",
  description: "Dodajte PDV na iznos ili ga izdvojite iz cijene. Crna Gora ima standardnu stopu {{me.pdv-opsta}} i snižene {{me.pdv-snizena-15}} i {{me.pdv-snizena-7}}. Prag za registraciju je {{me.pdv-limit}}.",
  intro: [
    "Standardna stopa poreza na dodatu vrijednost je {{me.pdv-opsta}}. Snižena stopa od {{me.pdv-snizena-15}} važi za smještaj i usluživanje hrane i pića u ugostiteljskim objektima, a ona od {{me.pdv-snizena-7}} za druge proizvode i usluge iz člana 24a zakona.",
    "Unesite iznos, izaberite stopu i recite da li je PDV već uključen. Dobićete osnovicu, porez i ukupnu cijenu.",
  ],
  comoSeCalcula: [
    "Dodavanje: PDV je osnovica pomnožena stopom, a ukupno je zbir ta dva iznosa.",
    "Izdvajanje: cijena sa PDV se dijeli sa 1,21, sa 1,15 ili sa 1,07, a razlika je porez.",
    "Tačna lista po sniženoj stopi je u Pravilniku o utvrđivanju proizvoda i usluga. Kad niste sigurni, provjerite u Upravi prihoda i carina.",
  ],
  ejemplo: [
    "Račun u restoranu glasi 115 eura sa PDV. Stopa je 15 odsto, pa je osnovica 100 eura, a porez 15 eura.",
    "Faktura za 1.000 eura bez PDV po standardnoj stopi: porez je 210 eura, a ukupno se plaća 1.210 eura.",
  ],
  faq: [
    {
      pregunta: "Kad je obavezna registracija za PDV?",
      respuesta: "Kad promet u poslednjih 12 mjeseci ili kraćem periodu pređe {{me.pdv-limit}}. Prijava se podnosi poreskom organu do 20. dana narednog mjeseca (član 55 Zakona o PDV, „Službeni list CG“ 12/26).",
    },
    {
      pregunta: "Na šta se plaća snižena stopa od 15 odsto?",
      respuesta: "Poreska praksa ministarstva, oslanjajući se na član 24a stav 2, navodi usluge smještaja u ugostiteljskim objektima i pripremanje i usluživanje hrane, pića i napitaka, od početka 2025.",
    },
    {
      pregunta: "Važi li novi Zakon o PDV iz 2026. odmah?",
      respuesta: "Ne. Zakon objavljen u „Službenom listu CG“ 104/26 stupa na snagu, ali se primjenjuje od dana pristupanja Crne Gore Evropskoj uniji, kako navodi Uprava prihoda i carina. Do tada važe ove stope.",
    },
  ],
  glosario: [
    { termino: "PDV", definicion: "Porez na dodatu vrijednost." },
    { termino: "Osnovica", definicion: "Iznos bez poreza na koji se primjenjuje stopa." },
    { termino: "Nulta stopa", definicion: "Isporuka koja je oporeziva, ali po stopi od 0 odsto. Kalkulator je ne računa." },
  ],
});
