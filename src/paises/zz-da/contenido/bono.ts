import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-da.bono",
  h1: "Beregner til halvårsbonus i Zetaland",
  title: "Halvårsbonus i Zetaland: beregn, hvad du får",
  description: "Beregn din halvårsbonus med den gældende mindsteløn i din zone og tillægget på {{zz.bonificacion}}. Officielle tal med dato og kilde.",
  intro: [
    "Halvårsbonussen er en ekstra månedsløn, der udbetales to gange om året.",
    "Har du arbejdet hele halvåret, får du en hel månedsløn plus et tillæg på {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Udgangspunktet er din månedsløn før skat. Er den under mindstelønnen i din zone, bruges mindstelønnen.",
    "Lønnen ganges med antallet af arbejdede måneder og deles med 6.",
    "I en lille virksomhed er bonussen det halve.",
    "Tillægget på {{zz.bonificacion}} lægges oven i bonussen.",
  ],
  faq: [
    { pregunta: "Hvad er mindstelønnen i den nordlige zone?", respuesta: "Den er {{zz.minimo@norte}} og har gældet siden {{zz.minimo@norte#desde}}." },
    { pregunta: "Hvad hvis jeg ikke har arbejdet hele halvåret?", respuesta: "Du får den del, der svarer til de måneder, du har arbejdet." },
    { pregunta: "Udbetales tillægget altid?", respuesta: "Ja. Det er {{zz.bonificacion}} af bonussen, og virksomheden udbetaler det sammen med bonussen." },
  ],
  glosario: [
    { termino: "Halvårsbonus", definicion: "Ekstra løn, som loven kræver i juli og december." },
    { termino: "Mindsteløn", definicion: "Den laveste løn, der må betales for en hel arbejdsdag i hver zone." },
  ],
});
