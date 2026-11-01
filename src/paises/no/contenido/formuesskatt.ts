import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.formuesskatt",
  h1: "Formuesskatt {{anio}}: regn ut skatten på formuen din",
  title: "Formuesskatt {{anio}}: kalkulator med bunnfradrag",
  description:
    "Regn ut formuesskatten for {{anio}} med bunnfradrag på {{no.formue-bunnfradrag}}, rabatt på bolig og aksjer og gjeldsreduksjon. Se skatt til kommunen og staten.",
  intro: [
    "Formuesskatt betaler du av nettoformuen over bunnfradraget: verdien av det du eier etter verdsettelsesrabatter, minus gjeld.",
    "Fyll inn verdiene, så ser du formuesverdien, nettoformuen og hvor mye du betaler til kommunen og staten.",
  ],
  comoSeCalcula: [
    "Primærboligen settes til {{no.formue-verdsettelse[primaerbolig]}} av beregnet markedsverdi opp til {{no.formue-primaerbolig-grense}}, og {{no.formue-verdsettelse[primaerbolig-over]}} av verdien over grensen. Sekundærbolig settes til {{no.formue-verdsettelse[sekundaerbolig]}}.",
    "Aksjer og aksjefond settes til {{no.formue-verdsettelse[aksjer]}} av verdien. Bankinnskudd tas med fullt.",
    "Gjelden fordeles på formuen etter full verdi. Delen som faller på aksjer og fond, reduseres med samme rabatt (gjeldsreduksjon).",
    "Av nettoformuen over {{no.formue-bunnfradrag}} betaler du {{no.formuesskatt-kommune}} til kommunen og {{no.formuesskatt-stat[trinn1]}} til staten. Over {{no.formue-trinn2}} er statens sats {{no.formuesskatt-stat[trinn2]}}.",
    "Ektefeller får dobbelt bunnfradrag og dobbel grense for trinn 2.",
  ],
  ejemplo: [
    "En enslig med primærbolig til 8 mill. kr, aksjer for 10 mill. kr, 2 mill. kr i banken og 2 mill. kr i gjeld får en nettoformue på 10,2 mill. kr. Formuesskatten blir 83 000 kr.",
  ],
  faq: [
    {
      pregunta: "Hvor høy er formuesskatten i 2026?",
      respuesta: "{{no.formuesskatt-kommune}} til kommunen og {{no.formuesskatt-stat[trinn1]}} til staten av nettoformue over {{no.formue-bunnfradrag}}. Over {{no.formue-trinn2}} øker statens del til {{no.formuesskatt-stat[trinn2]}}.",
    },
    {
      pregunta: "Hvorfor er boligen verdt mindre i formuesskatten?",
      respuesta: "Primærboligen verdsettes til {{no.formue-verdsettelse[primaerbolig]}} av beregnet markedsverdi opp til {{no.formue-primaerbolig-grense}}. Det er en rabatt i loven, ikke en vurdering av boligen din.",
    },
    {
      pregunta: "Hva er gjeldsreduksjon?",
      respuesta: "Eier du aksjer eller fond med rabatt, får du ikke fullt fradrag for gjelden. Den delen av gjelden som faller på aksjene, reduseres med samme prosent som rabatten.",
    },
    {
      pregunta: "Hva tar ikke kalkulatoren med?",
      respuesta: "Fritidsbolig, næringseiendom, driftsmidler og skattebegrensning. Har du slike verdier, viser skattemeldingen den riktige formuesskatten.",
    },
  ],
  glosario: [
    { termino: "Nettoformue", definicion: "Formuesverdi minus gjeld, slik skatten regnes av." },
    { termino: "Bunnfradrag", definicion: "Den delen av nettoformuen som er fri for formuesskatt." },
    { termino: "Primærbolig", definicion: "Boligen du bor i og er folkeregistrert på." },
  ],
});
