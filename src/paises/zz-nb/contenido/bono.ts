import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-nb.bono",
  h1: "Kalkulator for halvårsbonus i Zetaland",
  title: "Halvårsbonus i Zetaland: regn ut hva du får",
  description: "Regn ut halvårsbonusen din med gjeldende minstelønn i sonen din og tillegget på {{zz.bonificacion}}. Offisielle tall med dato og kilde.",
  intro: [
    "Halvårsbonusen er en ekstra månedslønn som utbetales to ganger i året.",
    "Har du jobbet hele halvåret, får du en hel månedslønn pluss et tillegg på {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Utgangspunktet er månedslønnen din før skatt. Er den lavere enn minstelønnen i sonen din, brukes minstelønnen.",
    "Lønnen ganges med antall måneder du har jobbet, og deles på 6.",
    "I en liten bedrift blir bonusen halvparten.",
    "Tillegget på {{zz.bonificacion}} legges oppå bonusen.",
  ],
  faq: [
    { pregunta: "Hva er minstelønnen i nordre sone?", respuesta: "Den er {{zz.minimo@norte}} og har gjeldt siden {{zz.minimo@norte#desde}}." },
    { pregunta: "Hva om jeg ikke har jobbet hele halvåret?", respuesta: "Du får den delen som svarer til månedene du har jobbet." },
    { pregunta: "Utbetales tillegget alltid?", respuesta: "Ja. Det er {{zz.bonificacion}} av bonusen, og bedriften betaler det sammen med bonusen." },
  ],
  glosario: [
    { termino: "Halvårsbonus", definicion: "Ekstra lønn som loven krever i juli og desember." },
    { termino: "Minstelønn", definicion: "Den laveste lønnen som kan betales for en hel arbeidsdag i hver sone." },
  ],
});
