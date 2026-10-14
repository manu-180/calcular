import { percento } from "../../comun/italiano";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const il = (n: number) => percento(formatearNumero(ctx, n, 2));
  const stipendio = montoEjemplo(ctx, 2000);
  return {
    h1: "Calcolo aumento di stipendio",
    title: tituloQueEntre(`Calcolo aumento di stipendio e inflazione | ${ctx.nombrePais}`, `Calcolo aumento di stipendio | ${ctx.nombrePais}`, "Calcolo aumento di stipendio"),
    description: "Calcola il nuovo stipendio dopo un aumento, la differenza al mese e all'anno, e se con l'aumento reale hai battuto l'inflazione.",
    intro: [
      "Ti hanno offerto un aumento, o stai per chiederlo. Inserisci il tuo stipendio e l'aumento, in percentuale o come cifra, e vedi quanto cambia ogni mese e ogni anno.",
      "Aggiungi l'inflazione del periodo e ti diciamo se guadagni davvero potere d'acquisto o recuperi solo quello che avevi perso.",
    ],
    comoSeCalcula: [
      "Nuovo stipendio = stipendio attuale × (1 + aumento ÷ 100).",
      "Differenza all'anno = differenza al mese × mensilità all'anno.",
      "Aumento reale = (1 + aumento) ÷ (1 + inflazione) − 1.",
    ],
    ejemplo: [
      `Uno stipendio di ${m(stipendio)} al mese con un aumento del 5% diventa ${m(stipendio * 1.05)}: ${m(stipendio * 0.05)} in più al mese e ${m(stipendio * 0.05 * 13)} in più all'anno su 13 mensilità.`,
      `Se nel periodo l'inflazione è stata del 3%, l'aumento reale è ${il(aumentoReal(5, 3))}. Con l'inflazione al 6%, è ${il(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Cos'è l'aumento reale?",
        respuesta: "È l'aumento al netto dell'inflazione. Ti dice se il nuovo stipendio compra di più o di meno di prima.",
      },
      {
        pregunta: "Perché non basta togliere l'inflazione dall'aumento?",
        respuesta: `Perché le due percentuali si moltiplicano, non si sommano. Con un aumento del 5% e l'inflazione al 3%, l'aumento reale è ${il(aumentoReal(5, 3))}, non il 2%. Con un'inflazione alta la differenza cresce molto.`,
      },
      {
        pregunta: "Quanto aumento chiedere?",
        respuesta: "Almeno l'inflazione dall'ultimo aumento, per non restare indietro. Oltre a quello, quanto pagano altre aziende per un ruolo come il tuo e quanto è cresciuto il tuo lavoro.",
      },
    ],
    glosario: [
      { termino: "Aumento nominale", definicion: "L'aumento come compare in busta paga, prima di considerare l'inflazione." },
      { termino: "Potere d'acquisto", definicion: "Quello che puoi comprare con il tuo stipendio." },
    ],
  };
};
