import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.ueberstunden-rechner",
  h1: "Calcolo del lavoro straordinario in Svizzera",
  title: "Lavoro straordinario Svizzera: supplemento del {{ch.ueberstunden-zuschlag}}",
  description: "Retribuire il lavoro straordinario secondo il Codice delle obbligazioni: salario normale più un supplemento di almeno il {{ch.ueberstunden-zuschlag}}. Da salario mensile o orario.",
  intro: [
    "Il lavoro straordinario sono le ore oltre l'orario convenuto o usuale. Se non è compensato con congedo, il datore di lavoro deve il salario normale più un supplemento di almeno il {{ch.ueberstunden-zuschlag}}.",
    "Il supplemento vale salvo accordo scritto diverso o disposizione di un contratto normale o collettivo di lavoro.",
  ],
  comoSeCalcula: [
    "Salario orario dal salario mensile: salario mensile × 12 / 52 / ore settimanali.",
    "Salario normale per il lavoro straordinario: salario orario × numero di ore.",
    "Supplemento: il {{ch.ueberstunden-zuschlag}} del salario normale, o l'aliquota del tuo contratto.",
  ],
  ejemplo: [
    "Con un salario mensile di 6500 franchi e 42 ore settimanali, 10 ore di lavoro straordinario con supplemento costano circa 446 franchi.",
  ],
  faq: [
    { pregunta: "Devo prestare lavoro straordinario?", respuesta: "Sì, se è necessario, nella misura in cui puoi prestarlo e lo si può ragionevolmente pretendere da te secondo le regole della buona fede." },
    { pregunta: "Il datore di lavoro può compensare il lavoro straordinario con congedo?", respuesta: "Sì, con il tuo consenso e entro un periodo adeguato. Il congedo deve durare almeno quanto il lavoro straordinario." },
    { pregunta: "Il supplemento può essere escluso?", respuesta: "Sì, se è pattuito per scritto o previsto da un contratto normale o collettivo di lavoro. Senza un tale accordo vale il supplemento di almeno il {{ch.ueberstunden-zuschlag}}." },
  ],
  glosario: [
    { termino: "Lavoro straordinario", definicion: "Lavoro oltre l'orario convenuto o usuale, quando è necessario." },
  ],
});
