import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const ESAMI = [
  { voto: 28, cfu: 6 },
  { voto: 30, cfu: 9 },
  { voto: 24, cfu: 12 },
];

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const sommaCfu = ESAMI.reduce((s, e) => s + e.cfu, 0);
  const ponderata = ESAMI.reduce((s, e) => s + e.voto * e.cfu, 0) / sommaCfu;
  const aritmetica = ESAMI.reduce((s, e) => s + e.voto, 0) / ESAMI.length;
  return {
    h1: "Calcolo media ponderata",
    title: tituloQueEntre(`Calcolo media ponderata con CFU | ${ctx.nombrePais}`, `Calcolo media ponderata | ${ctx.nombrePais}`, "Calcolo media ponderata"),
    description: "Calcola la media dei voti, aritmetica o ponderata, con fino a 10 valori e il peso di ognuno: percentuali, CFU o numero di volte.",
    intro: [
      "Inserisci ogni voto e quanto pesa. Vedi la media ponderata e, accanto, quella aritmetica.",
      "Va bene per i voti di scuola e degli esami universitari, e per qualsiasi media in cui alcuni valori contano più di altri.",
    ],
    comoSeCalcula: [
      "Media aritmetica = somma dei valori ÷ numero di valori.",
      "Media ponderata = somma di (valore × peso) ÷ somma dei pesi.",
      "I pesi non devono per forza fare 100: il calcolo divide per il loro totale.",
    ],
    ejemplo: [
      `Con un 28 da 6 CFU, un 30 da 9 CFU e un 24 da 12 CFU, la media ponderata è ${n(ponderata)}.`,
      `La media aritmetica degli stessi tre voti è ${n(aritmetica)}: il 24 pesa di più e abbassa quella ponderata.`,
    ],
    faq: [
      {
        pregunta: "Come si calcola la media ponderata?",
        respuesta: "Moltiplica ogni valore per il suo peso, somma i risultati e dividi per la somma dei pesi.",
      },
      {
        pregunta: "Come si calcola la media ponderata all'università?",
        respuesta: "Il peso di ogni esame sono i suoi CFU. Moltiplica ogni voto per i crediti, somma tutto e dividi per il totale dei CFU.",
      },
      {
        pregunta: "Come si trasforma la media in base di laurea?",
        respuesta: `In molti atenei si moltiplica la media ponderata per 110 e si divide per 30. Con una media di ${n(ponderata)}, la base è ${n((ponderata * 110) / 30)}. Controlla il regolamento del tuo corso.`,
      },
      {
        pregunta: "E se i pesi non fanno 100%?",
        respuesta: "Nessun problema. Se un esame vale 6 crediti e un altro 9, usa 6 e 9. Il calcolo divide per il peso totale.",
      },
    ],
    glosario: [
      { termino: "Peso", definicion: "Quanto conta un valore nella media finale." },
      { termino: "CFU", definicion: "I crediti formativi universitari: misurano quanto vale ogni esame." },
      { termino: "Media ponderata", definicion: "Una media in cui ogni valore viene moltiplicato per il suo peso." },
    ],
  };
};
