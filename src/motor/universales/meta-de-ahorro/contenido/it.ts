import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const obiettivo = montoEjemplo(ctx, 10000);
  const attuale = montoEjemplo(ctx, 1000);
  return {
    h1: "Calcolo obiettivo di risparmio",
    title: tituloQueEntre(`Quanto risparmiare al mese per un obiettivo | ${ctx.nombrePais}`, `Obiettivo di risparmio | ${ctx.nombrePais}`, "Obiettivo di risparmio"),
    description: "Scopri quanto mettere da parte ogni mese per arrivare alla cifra che ti serve entro la tua scadenza, contando quello che hai e quanto rende.",
    intro: [
      "Un viaggio, un'auto, l'anticipo per la casa o un fondo per gli imprevisti. Un obiettivo con una cifra e una data è molto più facile da raggiungere.",
      "Inserisci quanto vuoi risparmiare e in quanti mesi. Ti diciamo quanto mettere da parte ogni mese e ogni settimana.",
    ],
    comoSeCalcula: [
      "Prima calcola quanto cresceranno i risparmi che hai già fino alla fine del periodo.",
      "Quello che manca si divide in versamenti mensili uguali.",
      "Se i risparmi rendono, rende anche ogni versamento, quindi ti basta versare un po' meno.",
    ],
    ejemplo: [
      `Per risparmiare ${m(obiettivo)} in 24 mesi senza interessi, ti servono ${m(obiettivo / 24)} al mese.`,
      `Con ${m(attuale)} già da parte e un rendimento del 3% annuo, bastano ${m(aporteNecesario(obiettivo, attuale, 24, 3))} al mese.`,
    ],
    faq: [
      {
        pregunta: "Come faccio a rispettare l'obiettivo?",
        respuesta: "Sposta i soldi appena arriva lo stipendio, prima di spendere per altro. Se puoi, imposta un bonifico automatico verso un conto separato.",
      },
      {
        pregunta: "E se la cifra mensile è troppo alta?",
        respuesta: "Datti più tempo o abbassa l'obiettivo. Puoi anche iniziare con quello che riesci e aumentare quando cresce il tuo reddito.",
      },
      {
        pregunta: "Devo tenere conto dell'inflazione?",
        respuesta: "Se l'obiettivo è lontano qualche anno, aggiungi alla cifra l'inflazione prevista. Quello che oggi costa 100 potrebbe costare parecchio di più quando ci arrivi.",
      },
    ],
    glosario: [
      { termino: "Versamento", definicion: "I soldi che metti da parte ogni mese per l'obiettivo." },
      { termino: "Rendimento", definicion: "Quello che fruttano i tuoi risparmi su un conto o un investimento." },
    ],
  };
};
