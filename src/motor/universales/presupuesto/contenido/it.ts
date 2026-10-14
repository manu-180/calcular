import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const stipendio = montoEjemplo(ctx, 2000);
  return {
    h1: "Calcolo budget con la regola 50/30/20",
    title: tituloQueEntre(`Regola 50/30/20: calcola il tuo budget | ${ctx.nombrePais}`, `Regola 50/30/20 | ${ctx.nombrePais}`, "Regola 50/30/20"),
    description: "Dividi lo stipendio netto con la regola 50/30/20: quanto va alle spese necessarie, ai desideri e al risparmio. Puoi cambiare le percentuali.",
    intro: [
      "La regola 50/30/20 è un modo semplice per organizzare il mese. Metà va alle spese essenziali, il 30% a quello che ti piace e il 20% al risparmio.",
      "Inserisci il tuo stipendio netto e ti mostriamo quanto va a ciascuna parte. Se la tua situazione è diversa, per esempio con un affitto alto, cambia le percentuali.",
    ],
    comoSeCalcula: [
      "Spese necessarie = reddito × 50%.",
      "Desideri = reddito × 30%.",
      "Risparmio = reddito × 20%. Le tre percentuali devono fare 100%.",
    ],
    ejemplo: [
      `Con ${m(stipendio)} al mese: ${m(stipendio * 0.5)} per le spese necessarie, ${m(stipendio * 0.3)} per i desideri e ${m(stipendio * 0.2)} per il risparmio.`,
      `In un anno, quel 20% fa ${m(stipendio * 0.2 * 12)} risparmiati.`,
    ],
    faq: [
      {
        pregunta: "Cosa conta come spesa necessaria e cosa come desiderio?",
        respuesta:
          "Le spese necessarie sono quelle che devi pagare per forza: casa, spesa alimentare, bollette, trasporti, salute e rate minime. I desideri sono quelle che potresti tagliare se servisse.",
      },
      {
        pregunta: "E se le spese necessarie superano il 50%?",
        respuesta: "Succede spesso, soprattutto con un affitto alto. Prova con 60/20/20 o 70/20/10, ma cerca di non portare il risparmio a zero.",
      },
      {
        pregunta: "Le rate dei debiti contano come risparmio?",
        respuesta: "Le rate minime vanno nelle spese necessarie. Quello che paghi in più per chiudere prima un debito conta come risparmio, perché migliora il tuo patrimonio come se lo mettessi da parte.",
      },
    ],
    glosario: [
      { termino: "Stipendio netto", definicion: "Quello che ricevi dopo tasse e trattenute." },
      { termino: "Regola 50/30/20", definicion: "Un modo per dividere il reddito tra spese necessarie, desideri e risparmio." },
    ],
  };
};
