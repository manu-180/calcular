import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const attuale = montoEjemplo(ctx, 5000);
  const versamento = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 67, attuale, versamento, 4);
  const capitale30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 67, attuale, versamento, 4);
  const capitale40 = a40[a40.length - 1].saldo;
  return {
    h1: "Quanto risparmiare per la pensione",
    title: tituloQueEntre(`Quanto risparmiare per la pensione | ${ctx.nombrePais}`, "Quanto risparmiare per la pensione"),
    description: "Scopri quanto potresti accumulare per la pensione con versamenti mensili e che rendita al mese ti darebbe, in soldi di oggi.",
    intro: [
      "Spesso la pensione pubblica non basta a mantenere lo stesso tenore di vita. Dei risparmi personali, anche piccoli, fanno una grande differenza se inizi presto.",
      "Inserisci la tua età, quando vuoi andare in pensione, quanto hai e quanto puoi aggiungere ogni mese. Ti mostriamo quanto avrai da parte e quanto potresti prelevare ogni mese.",
    ],
    comoSeCalcula: [
      "I risparmi crescono ogni mese al rendimento reale, cioè il rendimento meno l'inflazione. Così il risultato resta in soldi di oggi.",
      "Dalla pensione in poi, i risparmi si prelevano in rate mensili uguali per gli anni che scegli. Quello che resta intanto continua a rendere.",
      "Pensione pubblica, tasse e costi di gestione non sono compresi.",
    ],
    ejemplo: [
      `Con ${m(attuale)} da parte a 30 anni e ${m(versamento)} al mese a un rendimento reale del 4%, a 67 anni arrivi a ${m(capitale30)}. Sono ${m(rentaMensual(capitale30, 4, 25))} al mese per 25 anni.`,
      `Se inizi a 40 anni con gli stessi numeri, arrivi a ${m(capitale40)}. Dieci anni fanno una bella differenza.`,
    ],
    faq: [
      {
        pregunta: "Cos'è il rendimento reale?",
        respuesta: "È quanto rende un investimento dopo l'inflazione. Se un investimento rende il 6% e l'inflazione è al 2%, il rendimento reale è circa il 4%.",
      },
      {
        pregunta: "Questo calcolo sostituisce la pensione pubblica?",
        respuesta: "No. Sono risparmi tuoi, in aggiunta alla pensione pubblica o a un fondo pensione. Per stimare la pensione pubblica, rivolgiti all'ente previdenziale del tuo paese.",
      },
      {
        pregunta: "Quanto dovrei risparmiare per la pensione?",
        respuesta: "Non c'è un numero valido per tutti. Una regola comune è dal 10% al 15% di quello che guadagni. La cosa più importante è iniziare il prima possibile.",
      },
    ],
    glosario: [
      { termino: "Rendimento reale", definicion: "Quanto rende un investimento al netto dell'inflazione." },
      { termino: "Soldi di oggi", definicion: "Una cifra futura espressa in base a quello che potresti comprarci oggi." },
      { termino: "Previdenza complementare", definicion: "I risparmi per la pensione che si aggiungono a quella pubblica." },
    ],
  };
};
