import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capitale = montoEjemplo(ctx, 1000);
  return {
    h1: "Calcolo interesse semplice",
    title: tituloQueEntre(`Calcolo interesse semplice e montante | ${ctx.nombrePais}`, `Calcolo interesse semplice | ${ctx.nombrePais}`, "Calcolo interesse semplice"),
    description: "Calcola l'interesse semplice su un capitale a un tasso annuo per giorni, mesi o anni. Scegli l'anno di 365 o 360 giorni e vedi il montante.",
    intro: [
      "L'interesse semplice si calcola sempre sul capitale iniziale: durante il periodo gli interessi non si aggiungono al capitale.",
      "Si usa per depositi brevi, prestiti tra privati e tanti esercizi di matematica finanziaria.",
    ],
    comoSeCalcula: [
      "Interesse = capitale × tasso annuo × tempo in anni.",
      "Per i mesi, si divide per 12. Per i giorni, per 365 o 360, a seconda dell'anno che usa la banca.",
      "Montante = capitale + interesse.",
    ],
    ejemplo: [
      `${m(capitale)} al 10% annuo per 6 mesi producono ${m(capitale * 0.1 * 0.5)} di interessi.`,
      `Lo stesso capitale per 90 giorni produce ${m((capitale * 0.1 * 90) / 365)} con l'anno di 365 giorni e ${m((capitale * 0.1 * 90) / 360)} con quello di 360.`,
    ],
    faq: [
      {
        pregunta: "Qual è la formula dell'interesse semplice?",
        respuesta: `I = C × r × t. C è il capitale, r il tasso annuo in forma decimale (il 10% è ${formatearNumero(ctx, 0.1, 2)}) e t il tempo in anni.`,
      },
      {
        pregunta: "Che differenza c'è con l'interesse composto?",
        respuesta: "L'interesse semplice si calcola sempre sullo stesso capitale. Con quello composto, gli interessi si aggiungono al capitale e producono altri interessi.",
      },
      {
        pregunta: "Come si calcola il montante?",
        respuesta: "Somma al capitale gli interessi del periodo. Oppure moltiplica il capitale per (1 + tasso × tempo), con il tasso in forma decimale.",
      },
      {
        pregunta: "Perché alcune banche usano l'anno di 360 giorni?",
        respuesta: "È una convenzione bancaria che semplifica i conti. Con 360 giorni l'interesse viene un po' più alto. Controlla quale usa la tua banca.",
      },
    ],
    glosario: [
      { termino: "Capitale", definicion: "La somma che si presta o si investe." },
      { termino: "Montante", definicion: "Il capitale più gli interessi maturati." },
      { termino: "Anno commerciale", definicion: "Un anno contato come 360 giorni, con mesi di 30 giorni." },
    ],
  };
};
