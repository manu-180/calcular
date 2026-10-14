import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const spese = montoEjemplo(ctx, 1500);
  const versamento = montoEjemplo(ctx, 300);
  return {
    h1: "Calcolo fondo di emergenza",
    title: tituloQueEntre(`Calcolo fondo di emergenza: quanto tenere da parte | ${ctx.nombrePais}`, `Calcolo fondo di emergenza | ${ctx.nombrePais}`, "Calcolo fondo di emergenza"),
    description: "Calcola quanto deve essere grande il tuo fondo di emergenza in base alle spese essenziali, e in quanti mesi lo costruisci con quello che risparmi.",
    intro: [
      "Il fondo di emergenza sono i soldi messi da parte per quello che non puoi prevedere: perdere il lavoro, un problema di salute o una riparazione urgente in casa.",
      "Averlo ti evita di finire sulla carta di credito proprio nel momento più difficile. Inserisci le spese essenziali e quanti mesi vuoi coprire.",
    ],
    comoSeCalcula: [
      "Fondo consigliato = spese essenziali al mese × mesi da coprire.",
      "Quanto manca = fondo consigliato − quello che hai già.",
      "Mesi per completarlo = quanto manca ÷ quanto risparmi al mese, arrotondato per eccesso.",
    ],
    ejemplo: [
      `Con ${m(spese)} di spese essenziali al mese, un fondo di 6 mesi è di ${m(spese * 6)}.`,
      `Risparmiando ${m(versamento)} al mese, lo completi in ${Math.ceil((spese * 6) / versamento)} mesi.`,
    ],
    faq: [
      {
        pregunta: "Quanti mesi deve coprire un fondo di emergenza?",
        respuesta:
          "La regola più diffusa è da 3 a 6 mesi di spese essenziali. Se il tuo reddito varia, sei a partita IVA o in famiglia entra un solo stipendio, punta a 6 o 12 mesi.",
      },
      {
        pregunta: "Dove conviene tenere il fondo di emergenza?",
        respuesta: "In un posto sicuro da cui puoi prelevare in giornata, separato dal conto che usi per le spese. Non è un investimento rischioso: deve esserci quando ti serve.",
      },
      {
        pregunta: "Prima il fondo o prima i debiti?",
        respuesta: "Un approccio comune è mettere da parte un mese di spese, poi chiudere i debiti più cari come le carte revolving, poi completare il fondo.",
      },
    ],
    glosario: [
      { termino: "Spese essenziali", definicion: "Quelle che devi pagare anche se smetti di guadagnare: casa, cibo, bollette, salute." },
      { termino: "Liquidità", definicion: "Quanto in fretta puoi usare i soldi senza perdere valore." },
    ],
  };
};
